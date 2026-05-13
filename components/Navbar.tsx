"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = ["Properties", "Services", "Resources", "Company"];

import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <>
      <div className="bg-[#f97316] text-white text-center text-sm py-2 px-4 font-medium">
        Check any property&apos;s{" "}
        <a href="#" className="underline font-semibold">fair price</a>{" "}
        &amp; negotiate confidently.
      </div>

      <header className="border-b border-border">
        <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.svg" alt="Propsoch logo" width={36} height={36} />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-primary">Prop</span>
              <span className="text-foreground">soch</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-foreground">
            {NAV_LINKS.map((label) => (
              <button key={label} className="flex items-center gap-1 hover:text-primary transition-colors">
                {label} <ChevronDown className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="w-9 h-9 rounded-md border border-border flex items-center justify-center hover:bg-accent">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90">
              Get Started
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}