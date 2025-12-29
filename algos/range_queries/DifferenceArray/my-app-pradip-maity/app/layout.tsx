import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Difference Array Visualizer - Pradip Maity",
  description: "Interactive visualization of range updates using Difference Array",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 antialiased">{children}</body>
    </html>
  );
}