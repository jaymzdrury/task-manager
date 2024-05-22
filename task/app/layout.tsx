import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/navbar/theme-provider";
import { Toaster } from "../components/ui/toaster";
import { pageMetaData } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
  display: "swap",
});

export const metadata: Metadata = pageMetaData(
  "Task Manager | Home",
  "This is the Task Manager Home Page"
);

export default function RootLayout({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster />
          {process.env.VERCEL && (
            <>
              <SpeedInsights />
              <Analytics />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
