import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";

export const metadata = {
  title: "CourseCraft | Learn High-Demand Skills",
  description:
    "CourseCraft helps you learn tech, design, and business skills through practical courses and guided projects."
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
