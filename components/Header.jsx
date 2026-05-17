"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const studentName = session?.user?.name?.split(" ")[0] || "Student";
  const isLoggedIn = Boolean(session?.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);
  const toggleMenu = () => setMobileMenuOpen((current) => !current);

  return (
  <header className="site-header">
  <div className="container nav-wrap">
    {/* Logo */}
    <Link href="/" className="logo" onClick={closeMenu}>
      <img
        src="/logo1.png"
        alt="SharkEdu"
        style={{
          height: "60px",
          width: "auto",
          display: "block",
        }}
      />
    </Link>

    {/* Right Side */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginLeft: "auto",
      }}
    >
      {/* User Name */}
      {isLoggedIn && (
        <span className="user-chip">
          Hi, {studentName}
        </span>
      )}

      {/* Hamburger */}
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-expanded={mobileMenuOpen}
        aria-label={
          mobileMenuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        onClick={toggleMenu}
      >
        <span className="hamburger-bar" aria-hidden="true" />
        <span className="hamburger-bar" aria-hidden="true" />
        <span className="hamburger-bar" aria-hidden="true" />
      </button>
    </div>

    {/* Navigation */}
    <nav
      className={`nav-links${mobileMenuOpen ? " nav-open" : ""}`}
      aria-label="Main navigation"
    >
      <Link href="/" onClick={closeMenu}>
        Home
      </Link>

      <Link href="/courses" onClick={closeMenu}>
        Courses
      </Link>

      <Link href="/checkout" onClick={closeMenu}>
        Checkout
      </Link>

      <Link href="/my-courses" onClick={closeMenu}>
        My Courses
      </Link>

      {!isLoggedIn && (
        <Link href="/login" onClick={closeMenu}>
          Login
        </Link>
      )}

      {!isLoggedIn && (
        <Link href="/signup" onClick={closeMenu}>
          Sign Up
        </Link>
      )}

      {isLoggedIn && (
        <button
          type="button"
          className="btn btn-sm btn-ghost mobile-logout"
          onClick={() => {
            closeMenu();
            signOut({ callbackUrl: "/" });
          }}
        >
          Logout
        </button>
      )}
    </nav>
  </div>
</header>
  );
}
