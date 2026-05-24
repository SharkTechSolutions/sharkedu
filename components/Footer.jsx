"use client";

import Link from "next/link";

export default function Footer({ onOpenEnquiry }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <img
              src="/logo1.png"
              alt="SharkEdu"
              style={{ height: "56px", width: "auto", display: "block" }}
            />
          </Link>
          <p>Practical learning for software builders, designers, and product teams.</p>
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
            <li>
              <Link href="/my-courses">My Courses</Link>
            </li>
            <li>
              <button type="button" className="footer-link-button" onClick={onOpenEnquiry}>
                Enquiry Form
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="footer-contact-list">
            <li>
              <a
                href="https://www.linkedin.com/company/sharktech-solutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/sharktech.solutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.sharktechsolutions.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                sharktechsolutions.in
              </a>
            </li>
                        <li>
              <a
                href="https://wa.me/918931918656"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href="tel:+918931918656">+91 89319 18656</a>
            </li>

          </ul>
        </div>
      </div>

      <p className="copyright container">
        Copyright {new Date().getFullYear()} SharkEdu. All rights reserved.
      </p>
    </footer>
  );
}
