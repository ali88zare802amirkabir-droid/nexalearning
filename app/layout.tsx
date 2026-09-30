import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AppShell } from "@/components/layout/app-shell";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NexaLearning — Modern Learning Management Platform",
    template: "%s · NexaLearning",
  },
  description:
    "NexaLearning is a modern Learning Management System for online courses, instructors, students, learning progress, assignments, and educational analytics.",
  openGraph: {
    title: "NexaLearning — Modern Learning Management Platform",
    description:
      "A modern LMS for online courses, instructors, students, learning progress, assignments, and educational analytics.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b12",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={vazir.variable}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("nexalearning-theme");document.documentElement.classList.toggle("light",t==="light")}catch(e){}`,
          }}
        />
        <div className="app-bg" aria-hidden />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}