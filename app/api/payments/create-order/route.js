import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Razorpay from "razorpay";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getCourseBySlug } from "@/data/courses";
import { getRazorpaySecrets, upsertStudentFromSession } from "@/lib/payments";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug } = await request.json();
    const course = getCourseBySlug(courseSlug);

    if (!course) {
      return NextResponse.json({ error: "Invalid course selected." }, { status: 400 });
    }

    const { keyId, keySecret } = getRazorpaySecrets();
    const student = await upsertStudentFromSession(session.user);
    const existingPurchase = await prisma.coursePurchase.findUnique({
      where: {
        studentId_courseSlug: {
          studentId: student.id,
          courseSlug: course.slug
        }
      }
    });

    if (existingPurchase) {
      return NextResponse.json(
        { error: "You already own this course. Check your My Courses page." },
        { status: 409 }
      );
    }

    const amount = course.price * 100;
    const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`.slice(
      0,
      40
    );

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt,
      notes: {
        courseSlug: course.slug,
        studentEmail: student.email
      }
    });

    await prisma.paymentOrder.upsert({
      where: { id: order.id },
      update: {
        studentId: student.id,
        studentEmail: student.email,
        courseSlug: course.slug,
        amount: order.amount,
        currency: order.currency,
        status: order.status
      },
      create: {
        id: order.id,
        studentId: student.id,
        studentEmail: student.email,
        courseSlug: course.slug,
        amount: order.amount,
        currency: order.currency,
        status: order.status
      }
    });

    return NextResponse.json({
      keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseTitle: course.title,
      courseSlug: course.slug,
      studentEmail: student.email
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to create Razorpay order." },
      { status: 500 }
    );
  }
}
