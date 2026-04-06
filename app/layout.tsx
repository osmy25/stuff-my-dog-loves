import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Stuff My Dog Loves",
  description: "The most popular site 2026",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="p-10 flex flex-col items-center justify-start pt-24 min-h-screen">
        <header className="flex gap-4 mb-10">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </header>
        {children}
      </body>
    </html>
  );
}