import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";

export const metadata = {
  title: "SharkEdu | Practical Tech Learning",
  description: "SharkEdu delivers practical, industry-ready training for software, design, and analytics careers.",
  viewport: "width=device-width, initial-scale=1",
    icons: {
    icon: "/logo.jpeg",   // ← add this line
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
