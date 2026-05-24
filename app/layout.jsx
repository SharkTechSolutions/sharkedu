import "./globals.css";
import EnquiryShell from "@/components/EnquiryShell";
import Providers from "./providers";

export const metadata = {
  title: "SharkEdu | Practical Tech Learning",
  description: "SharkEdu delivers practical, industry-ready training for software, design, and analytics careers.",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <EnquiryShell>{children}</EnquiryShell>
        </Providers>
      </body>
    </html>
  );
}
