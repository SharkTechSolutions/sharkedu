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
            <p className="eyebrow">Industry-ready tech learning</p>
            <h1>Build modern development skills with real product projects</h1>
            <p className="hero-copy">
              Master the systems, tools and workflows used by engineering teams.
              Practical learning designed for developers, designers and analysts.
            </p>
            <div className="hero-actions">
              <Link href="/courses" className="btn btn-lg">
                Explore Programs
              </Link>
              <Link href="/checkout" className="btn btn-ghost btn-lg">
                Start Learning
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <h2>Why learners choose SharkEdu</h2>
            <ul>
              <li>Build production-quality apps and technical portfolios</li>
              <li>Receive mentor review, team-style feedback and practical guidance</li>
              <li>Earn credentials grounded in real development workflows</li>
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
            <h2>Featured Programs</h2>
            <Link href="/courses">Browse all courses</Link>
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
            <h2>Core learning tracks</h2>
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
            <h2>Learner outcomes</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((person) => (
              <article key={person.name} className="testimonial">
                <p>{person.quote}</p>
                <div>
                  <h3>{person.name}</h3>
                  <span>{person.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Common questions</h2>
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
