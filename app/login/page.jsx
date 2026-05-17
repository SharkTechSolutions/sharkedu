import AuthPanel from "@/components/AuthPanel";

export const metadata = {
  title: "Login | SharkEdu",
  description: "Sign in to your SharkEdu account and continue your learning journey.",
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
