import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="logo">SharkEdu</p>
          <p>
            Practical, mentor-backed learning paths to help you grow your career and
            build real-world skills.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/courses">Courses</Link>
            </li>
            <li>
              <Link href="/checkout">Checkout</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul>
            <li>support@sharkedu.academy</li>
            <li>+1 (555) 217-9034</li>
            <li>Global Learner Community</li>
          </ul>
        </div>
      </div>
      <p className="copyright">
        Copyright {new Date().getFullYear()} SharkEdu. All rights reserved.
      </p>
    </footer>
  );
}
