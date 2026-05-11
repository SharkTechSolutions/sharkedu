import AuthPanel from "@/components/AuthPanel";

export const metadata = {
  title: "Login | CourseCraft",
  description: "Login to your CourseCraft account with Google OAuth."
};

export default function LoginPage({ searchParams }) {
  const callbackUrl = searchParams?.callbackUrl || "/my-courses";

  return (
    <section className="section">
      <div className="container auth-layout">
        <AuthPanel mode="login" callbackUrl={callbackUrl} />
      </div>
    </section>
  );
}
