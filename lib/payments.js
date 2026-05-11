import crypto from "crypto";
import prisma from "@/lib/prisma";

export function getRazorpaySecrets() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Missing Razorpay credentials in environment variables.");
  }

  return { keyId, keySecret };
}

export function verifyRazorpaySignature({ orderId, paymentId, signature, keySecret }) {
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expected === signature;
}

export async function upsertStudentFromSession(sessionUser) {
  const email = (sessionUser?.email || "").toLowerCase();

  if (!email) {
    throw new Error("Authenticated session is missing student email.");
  }

  return prisma.student.upsert({
    where: { email },
    update: {
      name: sessionUser.name || null,
      authProviderId: sessionUser.id || null
    },
    create: {
      email,
      name: sessionUser.name || null,
      authProviderId: sessionUser.id || null
    }
  });
}
