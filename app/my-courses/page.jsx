import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import CourseCard from "@/components/CourseCard";
import { authOptions } from "@/lib/auth";
import { getCoursesForStudent } from "@/data/courses";

export const metadata = {
  title: "My Courses | CourseCraft",
  description: "View your enrolled courses and continue learning."
};

export default async function MyCoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const myCourses = getCoursesForStudent(session.user.email);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h1>My Courses</h1>
            <p className="section-subtext">
              Signed in as {session.user.email}. Continue where you left off.
            </p>
          </div>
          <Link href="/courses" className="btn btn-ghost">
            Browse More Courses
          </Link>
        </div>

        {myCourses.length ? (
          <div className="course-grid">
            {myCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        ) : (
          <article className="empty-card">
            <h2>No enrolled courses yet</h2>
            <p className="hero-copy">
              Explore our catalog and enroll to unlock your learning dashboard.
            </p>
            <Link href="/courses" className="btn">
              Explore Courses
            </Link>
          </article>
        )}
      </div>
    </section>
  );
}
