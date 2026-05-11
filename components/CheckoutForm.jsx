"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function formatPriceInr(amountInRupees) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amountInRupees);
}

function loadRazorpayScript() {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutForm({
  courses,
  initialCourseSlug,
  studentEmail,
  studentName
}) {
  const [selectedSlug, setSelectedSlug] = useState(initialCourseSlug);
  const [fullName, setFullName] = useState(studentName || "");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const selectedCourse = useMemo(() => {
    return courses.find((course) => course.slug === selectedSlug) || courses[0];
  }, [courses, selectedSlug]);

  async function handlePayment(event) {
    event.preventDefault();
    setProcessing(true);
    setError("");

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        throw new Error("Razorpay SDK failed to load. Check your network and try again.");
      }

      const createOrderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: selectedSlug })
      });

      const createOrderData = await createOrderResponse.json();

      if (!createOrderResponse.ok) {
        throw new Error(createOrderData.error || "Unable to start payment.");
      }

      const options = {
        key: createOrderData.keyId,
        amount: createOrderData.amount,
        currency: createOrderData.currency,
        name: "CourseCraft",
        description: `Purchase ${createOrderData.courseTitle}`,
        order_id: createOrderData.orderId,
        prefill: {
          name: fullName || studentName || "Student",
          email: studentEmail
        },
        theme: {
          color: "#0f7b6c"
        },
        handler: async function onPaymentSuccess(response) {
          try {
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response)
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment verification failed.");
            }

            router.push("/my-courses?payment=success");
            router.refresh();
          } catch (verificationError) {
            setError(verificationError.message || "Payment verification failed.");
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: function onDismiss() {
            setProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function onPaymentFailed() {
        setError("Payment failed. Please try again.");
        setProcessing(false);
      });
      razorpay.open();
    } catch (paymentError) {
      setError(paymentError.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  }

  return (
    <form className="checkout-form" onSubmit={handlePayment}>
      <label htmlFor="fullName">Full Name</label>
      <input
        id="fullName"
        name="fullName"
        placeholder="Jane Doe"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        required
      />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" value={studentEmail} readOnly />

      <label htmlFor="course">Select Course</label>
      <select
        id="course"
        name="course"
        value={selectedSlug}
        onChange={(event) => setSelectedSlug(event.target.value)}
      >
        {courses.map((course) => (
          <option key={course.slug} value={course.slug}>
            {course.title}
          </option>
        ))}
      </select>

      <label htmlFor="payment">Payment Method</label>
      <select id="payment" name="payment" value="razorpay" disabled>
        <option value="razorpay">Razorpay (Card, UPI, Netbanking, Wallets)</option>
      </select>

      {error ? <p className="error-text">{error}</p> : null}

      <button type="submit" className="btn full-width" disabled={processing}>
        {processing
          ? "Processing..."
          : `Pay ${formatPriceInr(selectedCourse.price)} with Razorpay`}
      </button>
    </form>
  );
}
