import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import CourseCard from "@/components/CourseCard";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getCourseBySlug } from "@/data/courses";

export const metadata = {
  title: "My Courses | CourseCraft",
  description: "View your enrolled courses and continue learning."
};

export default async function MyCoursesPage({ searchParams }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const normalizedEmail = session.user.email.toLowerCase();
  const student = await prisma.student.findUnique({
    where: { email: normalizedEmail },
    include: {
      purchases: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  const purchasedSlugs = [];
  const purchasedSlugSet = new Set();

  for (const purchase of student?.purchases || []) {
    if (!purchasedSlugSet.has(purchase.courseSlug)) {
      purchasedSlugs.push(purchase.courseSlug);
      purchasedSlugSet.add(purchase.courseSlug);
    }
  }

  const myCourses = purchasedSlugs
    .map((slug) => getCourseBySlug(slug))
    .filter(Boolean);
  const purchaseSuccess = searchParams?.payment === "success";

  return (
    <section className="section">
      <div className="container">
        {purchaseSuccess ? (
          <p className="success-banner">
            Payment successful. Your new course is now added to My Courses.
          </p>
        ) : null}

        <div className="section-head">
          <div>
            <h1>My Courses</h1>
            <p className="section-subtext">
              Signed in as {normalizedEmail}. Continue where you left off.
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
