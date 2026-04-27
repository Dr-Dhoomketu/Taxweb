import type { Metadata } from "next";
import "./globals.css";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "ShishirPandey.in | Tax & Compliance Services",
  description: "Chartered Accountant services in India. Simplifying Tax, GST, and Accounting.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteLayout>
          {children}
        </SiteLayout>
      </body>
    </html>
  );
}
