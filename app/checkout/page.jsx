import { courses, getCourseBySlug } from "@/data/courses";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}

export const metadata = {
  title: "Checkout | CourseCraft",
  description: "Complete your enrollment and start learning today."
};

export default function CheckoutPage({ searchParams }) {
  const selectedSlug = searchParams?.course;
  const selectedCourse = getCourseBySlug(selectedSlug) || courses[0];

  return (
    <section className="section">
      <div className="container checkout-layout">
        <article>
          <h1>Complete Enrollment</h1>
          <p className="hero-copy">
            Secure your seat in under 2 minutes. Access starts immediately after
            payment.
          </p>

          <form className="checkout-form">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" placeholder="Jane Doe" required />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              required
            />

            <label htmlFor="course">Select Course</label>
            <select id="course" name="course" defaultValue={selectedCourse.slug}>
              {courses.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.title}
                </option>
              ))}
            </select>

            <label htmlFor="payment">Payment Method</label>
            <select id="payment" name="payment" defaultValue="card">
              <option value="card">Credit / Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="upi">UPI</option>
            </select>

            <button type="button" className="btn full-width">
              Pay {formatPrice(selectedCourse.price)}
            </button>
          </form>
        </article>

        <aside className="checkout-card">
          <h2>Order Summary</h2>
          <p className="badge">{selectedCourse.category}</p>
          <h3>{selectedCourse.title}</h3>
          <p>{selectedCourse.duration}</p>
          <p>{selectedCourse.lessons} lessons with certificate</p>

          <div className="order-pricing">
            <p>
              Subtotal <span>{formatPrice(selectedCourse.originalPrice)}</span>
            </p>
            <p>
              Discount <span>-{formatPrice(selectedCourse.originalPrice - selectedCourse.price)}</span>
            </p>
            <p className="total-row">
              Total <span>{formatPrice(selectedCourse.price)}</span>
            </p>
          </div>

          <p className="muted">
            7-day refund policy. Lifetime access included after enrollment.
          </p>
        </aside>
      </div>
    </section>
  );
}
