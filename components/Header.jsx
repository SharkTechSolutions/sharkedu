"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="logo">
          SharkEdu
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>

        <Link href="/courses" className="btn btn-sm">
          Explore Courses
        </Link>
      </div>
    </header>
  );
}
