"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/category/world", label: "World" },
    { href: "/category/business", label: "Business" },
    { href: "/category/tech", label: "Tech" },
    { href: "/category/health", label: "Health" },
    { href: "/category/sports", label: "Sports" },
  ];

  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-500"
            >
              <path
                d="M16 2L2 12V28L16 30L30 28V12L16 2Z"
                fill="currentColor"
              />
              <path d="M16 8L8 14V24L16 26L24 24V14L16 8Z" fill="white" />
            </svg>
            <div className="flex flex-col">
              <span className="font-sans text-[16px] font-bold leading-tight tracking-tight text-neutral-900">
                Serene
              </span>
              <span className="font-sans text-[16px] font-bold leading-tight tracking-tight text-neutral-900">
                Lavoisier
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-body font-medium pb-1 transition-colors ${
                    isActive
                      ? "text-primary-500 border-b-2 border-primary-500"
                      : "text-neutral-900 hover:text-primary-500"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-neutral-500" />
            </div>
            <Input
              type="search"
              aria-label="Search for news, topics, or keywords"
              placeholder="Search for news, topics, or keywords..."
              className="pl-9 bg-neutral-100 border-transparent rounded-full focus-visible:ring-primary-500 focus-visible:bg-white focus-visible:border-neutral-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex rounded-full">
              Sign In
            </Button>
            <Button className="rounded-full">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
