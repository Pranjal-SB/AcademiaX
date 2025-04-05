import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import GoogleAnalytics from "./googleAnalytics";

export const runtime = "edge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const description =
  "AcademiaX SRM helps you manage your attendance, marks, timetable, and more, all in one beautifully designed platform tailored for SRM students.";
export const metadata: Metadata = {
  title: "AcademiaX SRM",
  description,
  authors: [{ name: "jackwaghan", url: "https://jackwaghan.com" }],
  keywords: ["SRM", "Academia", "AcademiaX", "AcademiaX SRM", "SRM Academia"],
  openGraph: {
    title: "AcademiaX SRM",
    description,
    url: "https://academiax.in",
    siteName: "AcademiaX SRM",
    images: [
      {
        url: "https://academiax.in/screenshots/Desktop.png",
        width: 1920,
        height: 1080,
        alt: "AcademiaX SRM",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@academiax",
    title: "AcademiaX SRM",
    description,
    creator: "@jackwaghan",
    images: ["https://academiax.in/screenshots/Desktop.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="AcademiaX" />
        <link rel="manifest" href="/Manifest" />
      </head>
      <body
        className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable} antialiased  `}
      >
        <GoogleAnalytics />
        <ThemeProvider
          enableSystem={false}
          defaultTheme="dark"
          attribute="class"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
