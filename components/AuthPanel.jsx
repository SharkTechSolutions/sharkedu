"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthPanel({ mode = "login" }) {
  const { data: session, status } = useSession();
  const isSignup = mode === "signup";

  if (status === "loading") {
    return (
      <div className="auth-card">
        <h1>Checking your session...</h1>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="auth-card">
        <p className="badge">Signed In</p>
        <h1>Welcome back, {session.user.name || "Student"}.</h1>
        <p className="hero-copy">{session.user.email}</p>

        <div className="auth-actions">
          <Link href="/my-courses" className="btn">
            View My Courses
          </Link>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <p className="badge">{isSignup ? "Create account" : "Student login"}</p>
      <h1>{isSignup ? "Sign up to start learning" : "Login to your student account"}</h1>
      <p className="hero-copy">
        Continue with Google to access enrollments, certificates, and your learning
        dashboard.
      </p>

      <div className="auth-actions">
        <button
          className="btn"
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/my-courses" })}
        >
          {isSignup ? "Sign Up with Google" : "Login with Google"}
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/my-courses" })}
        >
          {isSignup ? "Already have an account? Login" : "New here? Create account"}
        </button>
      </div>
    </div>
  );
}
