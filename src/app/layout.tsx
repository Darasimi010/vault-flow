import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, QueryProvider } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VaultFlow | SME Treasury & Expense Management",
  description:
    "VaultFlow is a comprehensive treasury and expense management platform for SMEs. Track cash flow, manage expenses, and onboard vendors with ease.",
  keywords: [
    "treasury management",
    "expense tracking",
    "SME finance",
    "vendor management",
    "cash flow",
  ],
  authors: [{ name: "VaultFlow Team" }],
  openGraph: {
    title: "VaultFlow | SME Treasury & Expense Management",
    description:
      "Comprehensive treasury and expense management platform for SMEs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="vaultflow-theme">
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
