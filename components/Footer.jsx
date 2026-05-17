import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo" >
  <img
    src="/logo1.png"          // ← change this to your actual filename
    alt="SharkEdu"
    style={{ height: "60px", width: "auto", display: "block" }}
  />
</Link>
          <p>Practical learning for software builders, designers, and product teams.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/checkout">Checkout</Link></li>
            <li><Link href="/my-courses">My Courses</Link></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul>
            <li>contact@sharktechsolutions.in</li>
            <li>
    <a
      href="https://wa.me/918931918656"
      target="_blank"
      rel="noopener noreferrer"
    >
      WhatsApp Support
    </a>
  </li>
            <li>Global learning community</li>
          </ul>
        </div>
      </div>
      <p className="copyright container">
        Copyright {new Date().getFullYear()} SharkEdu. All rights reserved.
      </p>
    </footer>
  );
}
