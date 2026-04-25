import Link from "next/link";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}

export default function CourseCard({ course }) {
  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <article className="course-card">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-content">
        <p className="badge">{course.category}</p>
        <h3>{course.title}</h3>
        <p className="course-summary">{course.summary}</p>

        <div className="course-meta">
          <span>{course.level}</span>
          <span>{course.duration}</span>
          <span>{course.lessons} lessons</span>
        </div>

        <div className="price-row">
          <p>
            <strong>{formatPrice(course.price)}</strong>
            <span className="muted">{formatPrice(course.originalPrice)}</span>
          </p>
          <span className="discount">{discount}% OFF</span>
        </div>

        <div className="actions-row">
          <Link href={`/courses/${course.slug}`} className="btn btn-secondary">
            View Details
          </Link>
          <Link href={`/checkout?course=${course.slug}`} className="btn">
            Enroll Now
          </Link>
        </div>
      </div>
    </article>
  );
}
