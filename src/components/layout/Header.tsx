// src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { BookStoreIcon } from "@/components/ui/BookStoreIcon";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <BookStoreIcon
              size={40}
              variant="gradient"
              className="text-red-600"
            />
            <span className="text-2xl font-bold text-red-600">BookStore</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/services"
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="/my-books"
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              My Books
            </Link>
            <Link
              href="/trends"
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Trends
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          <div>
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  Hi, {session.user?.name}
                </span>
                <Button size="sm" variant="outline" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => signIn("google")}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
