import AuthPanel from "@/components/AuthPanel";

export const metadata = {
  title: "Sign Up | SharkEdu",
  description: "Create your SharkEdu account to access courses, certificates and progress tracking.",
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
