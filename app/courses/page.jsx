import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

export const metadata = {
  title: "All Courses | SharkEdu",
  description: "Browse all available courses and enroll today."
};

export default function CoursesPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h1>All Courses</h1>
          <p className="section-subtext">
            Choose a path, build practical projects, and earn a certificate.
          </p>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
