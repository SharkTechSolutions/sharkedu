import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { categories, courses, faqs, stats, testimonials } from "@/data/courses";

export default function HomePage() {
  const featured = courses.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Career-focused online academy</p>
            <h1>Upgrade your skills with expert-led online courses</h1>
            <p className="hero-copy">
              Learn with practical projects, mentor feedback, and a structured
              roadmap built to help you land better opportunities.
            </p>
            <div className="hero-actions">
              <Link href="/courses" className="btn">
                Browse Courses
              </Link>
              <Link href="/checkout" className="btn btn-ghost">
                Start Enrollment
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <h2>Why learners choose CourseCraft</h2>
            <ul>
              <li>Real-world capstone projects and portfolio support</li>
              <li>Weekly mentor office hours and community discussions</li>
              <li>Industry-recognized certificates and interview prep</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stat-grid">
          {stats.map((item) => (
            <article key={item.label}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Featured Courses</h2>
            <Link href="/courses">See all courses</Link>
          </div>
          <div className="course-grid">
            {featured.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Popular Categories</h2>
          </div>
          <div className="pill-grid">
            {categories.map((category) => (
              <span key={category} className="pill">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Student Success Stories</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((person) => (
              <article key={person.name} className="testimonial">
                <p>{person.quote}</p>
                <h3>{person.name}</h3>
                <span>{person.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
