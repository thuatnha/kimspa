import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Roboto } from "next/font/google";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <title>Kim Skin Beauty And Health Care - Tái Sinh Làn Da, Khơi Nguồn Vẻ Đẹp</title>
        <meta
          name="description"
          content="Dịch vụ spa và skincare cao cấp dành cho phụ nữ"
        />
        <meta name="facebook-domain-verification" content="ojoyp8vqw14qbz5jci6em3s1xa00cj" />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XD0P2G3SGZ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XD0P2G3SGZ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={`${roboto.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  generator: "vMagic",
};
