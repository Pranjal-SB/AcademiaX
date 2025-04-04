"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: [string, string, Record<string, unknown>?]) => void;
  }
}
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID!;

export default function GoogleAnalytics() {
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
