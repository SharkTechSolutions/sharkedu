import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

export const metadata = {
  title: "All Courses | SharkEdu",
  description: "Browse modern development, design and analytics programs built for working professionals.",
};

export default function CoursesPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h1>All Courses</h1>
            <p className="section-subtext">
              Choose a technical path, build portfolio-ready projects, and earn a recognized credential.
            </p>
          </div>
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
