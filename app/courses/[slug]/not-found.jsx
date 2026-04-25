import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container center-copy">
        <h1>Course Not Found</h1>
        <p>The requested course does not exist or may have been removed.</p>
        <Link href="/courses" className="btn">
          Explore All Courses
        </Link>
      </div>
    </section>
  );
}
