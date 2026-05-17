import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getRazorpaySecrets, verifyRazorpaySignature } from "@/lib/payments";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      await request.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment verification fields." }, { status: 400 });
    }

    const orderRecord = await prisma.paymentOrder.findUnique({
      where: { id: razorpay_order_id }
    });

    if (!orderRecord) {
      return NextResponse.json({ error: "Order not found for verification." }, { status: 404 });
    }

    if (orderRecord.studentEmail !== session.user.email.toLowerCase()) {
      return NextResponse.json({ error: "Order does not belong to signed-in student." }, { status: 403 });
    }

    const { keySecret } = getRazorpaySecrets();
    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      keySecret
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid Razorpay signature." }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.coursePurchase.upsert({
        where: {
          studentId_courseSlug: {
            studentId: orderRecord.studentId,
            courseSlug: orderRecord.courseSlug
          }
        },
        update: {
          studentEmail: orderRecord.studentEmail,
          amount: orderRecord.amount,
          currency: orderRecord.currency,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          status: "captured"
        },
        create: {
          studentId: orderRecord.studentId,
          studentEmail: orderRecord.studentEmail,
          courseSlug: orderRecord.courseSlug,
          amount: orderRecord.amount,
          currency: orderRecord.currency,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          status: "captured"
        }
      });

      await tx.paymentOrder.update({
        where: { id: razorpay_order_id },
        data: { status: "paid" }
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to verify payment." },
      { status: 500 }
    );
  }
}
