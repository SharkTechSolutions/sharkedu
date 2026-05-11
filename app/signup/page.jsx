import AuthPanel from "@/components/AuthPanel";

export const metadata = {
  title: "Sign Up | CourseCraft",
  description: "Create your CourseCraft student account using Google OAuth."
};

export default function SignupPage({ searchParams }) {
  const callbackUrl = searchParams?.callbackUrl || "/my-courses";

  return (
    <section className="section">
      <div className="container auth-layout">
        <AuthPanel mode="signup" callbackUrl={callbackUrl} />
      </div>
    </section>
  );
}
