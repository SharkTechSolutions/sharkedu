import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/data/courses";

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }) {
  const course = getCourseBySlug(params.slug);
  if (!course) return { title: "Course Not Found | SharkEdu" };
  return { title: `${course.title} | SharkEdu`, description: course.summary };
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CourseDetailsPage({ params }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  return (
    <section className="section">
      <div className="container details-layout">
        <article>
          <p className="badge">{course.category}</p>
          <h1>{course.title}</h1>
          <p className="hero-copy">{course.summary}</p>

          <div className="details-stats">
            <span>{course.level}</span>
            <span>{course.duration}</span>
            <span>{course.lessons} lessons</span>
            <span>{course.students.toLocaleString()} students</span>
            <span>⭐ {course.rating} rating</span>
          </div>

          <h2>Course outcomes</h2>
          <ul className="list">
            {course.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>

          <h2>Curriculum highlights</h2>
          <ol className="list">
            {course.curriculum.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>

        <aside className="checkout-card">
          <img src={course.image} alt={course.title} className="details-image" />
          <p className="instructor">Lead instructor: {course.instructor}</p>

          <p className="course-price">
            <strong>{formatPrice(course.price)}</strong>
            <span>{formatPrice(course.originalPrice)}</span>
          </p>

          <Link href={`/checkout?course=${course.slug}`} className="btn full-width btn-lg">
            Enroll in this Course
          </Link>
          <Link href="/courses" className="btn btn-ghost full-width">
            Back to Courses
          </Link>
        </aside>
      </div>
    </section>
  );
}
