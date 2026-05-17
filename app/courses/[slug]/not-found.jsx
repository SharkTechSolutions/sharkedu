import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <article className="empty-card">
          <h2>Course not found</h2>
          <p>The course you are looking for does not exist or has been removed.</p>
          <Link href="/courses" className="btn">Browse All Courses</Link>
        </article>
      </div>
    </section>
  );
}
