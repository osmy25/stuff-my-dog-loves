import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Stuff My Dog Loves",
  description: "The most popular site 2026",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-emerald-50 text-zinc-800">
        <header className="border-b border-emerald-100 bg-emerald-100/70 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-lg font-extrabold tracking-tight text-emerald-900"
            >
              Stuff My Dog <span className="text-emerald-500">Loves</span>
            </Link>

            <nav className="flex gap-6 text-sm font-medium text-emerald-700">
              <Link href="/" className="hover:text-emerald-900">
                Home
              </Link>
              <Link href="/about" className="hover:text-emerald-900">
                About
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}