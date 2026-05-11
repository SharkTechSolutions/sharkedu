"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const studentName = session?.user?.name?.split(" ")[0] || "Student";
  const isLoggedIn = Boolean(session?.user);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="logo">
          CourseCraft
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/my-courses">My Courses</Link>
          {!isLoggedIn ? <Link href="/login">Login</Link> : null}
          {!isLoggedIn ? <Link href="/signup">Sign Up</Link> : null}
        </nav>

        {!isLoggedIn ? (
          <Link href="/courses" className="btn btn-sm">
            Explore Courses
          </Link>
        ) : (
          <div className="auth-nav">
            <span className="user-chip">Hi, {studentName}</span>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
