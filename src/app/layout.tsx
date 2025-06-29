import "./globals.css";
import { Inter, Poppins } from "next/font/google";

// Load Inter as the default body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Load Poppins for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-heading",
  display: "swap",
});

// Metadata for the app
export const metadata = {
  title: "Health Tracker App",
  description: "Track your health, weight, habits, and more.",
};

// Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-text`}
      >
        {children}
      </body>
    </html>
  );
}
