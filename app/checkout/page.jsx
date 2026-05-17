import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import CheckoutForm from "@/components/CheckoutForm";
import { courses, getCourseBySlug } from "@/data/courses";
import { authOptions } from "@/lib/auth";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export const metadata = {
  title: "Checkout | SharkEdu",
  description: "Complete your enrollment and unlock immediate access to your course.",
};

export default async function CheckoutPage({ searchParams }) {
  const selectedSlug = searchParams?.course;
  const selectedCourse = getCourseBySlug(selectedSlug) || courses[0];
  const callbackUrl = `/checkout?course=${selectedCourse.slug}`;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const studentEmail = session.user.email.toLowerCase();
  const studentName = session.user.name || "";

  return (
    <section className="section">
      <div className="container checkout-layout">
        <article>
          <h1>Confirm Enrollment</h1>
          <p className="hero-copy">
            Secure your course seat and get instant access to curriculum, resources, and mentor support.
          </p>
          <CheckoutForm
            courses={courses}
            initialCourseSlug={selectedCourse.slug}
            studentEmail={studentEmail}
            studentName={studentName}
          />
        </article>

        <aside className="checkout-card">
          <h2>Order Summary</h2>
          <p className="badge">{selectedCourse.category}</p>
          <h3>{selectedCourse.title}</h3>
          <p>{selectedCourse.duration} &mdash; {selectedCourse.lessons} lessons with certificate</p>

          <div className="order-pricing">
            <p>
              Subtotal <span>{formatPrice(selectedCourse.originalPrice)}</span>
            </p>
            <p>
              Discount <span>−{formatPrice(selectedCourse.originalPrice - selectedCourse.price)}</span>
            </p>
            <p className="total-row">
              Total <span>{formatPrice(selectedCourse.price)}</span>
            </p>
          </div>

          <p>7-day refund policy. Lifetime access included after enrollment.</p>
        </aside>
      </div>
    </section>
  );
}
