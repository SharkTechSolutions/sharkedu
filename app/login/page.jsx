import AuthPanel from "@/components/AuthPanel";

export const metadata = {
  title: "Login | CourseCraft",
  description: "Login to your CourseCraft account with Google OAuth."
};

export default function LoginPage() {
  return (
    <section className="section">
      <div className="container auth-layout">
        <AuthPanel mode="login" />
      </div>
    </section>
  );
}
