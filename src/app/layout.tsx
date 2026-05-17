import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareerMind AI - Turn Your Projects Into Career Proof",
  description: "AI-powered Career Memory Assistant to help you remember what you built, extract project metadata, and generate tailored resumes and interview prep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.className}`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}
