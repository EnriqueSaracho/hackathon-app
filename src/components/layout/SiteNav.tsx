"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { useAuth } from "@/components/auth/AuthProvider";

function PrimaryAction({ onClick }: { onClick?: () => void }) {
  const { session } = useAuth();

  if (session?.applicationId) {
    return (
      <Link
        href="/my-ticket"
        className="rounded-lg bg-accent-yellow px-4 py-2 text-center text-sm font-semibold text-navy-950 transition hover:brightness-110"
        onClick={onClick}
      >
        My Ticket
      </Link>
    );
  }

  if (session?.role === "staff") {
    return (
      <Link
        href="/check-in"
        className="rounded-lg bg-accent-yellow px-4 py-2 text-center text-sm font-semibold text-navy-950 transition hover:brightness-110"
        onClick={onClick}
      >
        Check-in
      </Link>
    );
  }

  return (
    <Link
      href="/apply"
      className="rounded-lg bg-accent-yellow px-4 py-2 text-center text-sm font-semibold text-navy-950 transition hover:brightness-110"
      onClick={onClick}
    >
      Apply
    </Link>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { session, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-wide text-white"
        >
          {site.name}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition hover:text-accent-yellow"
            >
              {link.label}
            </a>
          ))}
          <PrimaryAction />
          {session ? (
            <button
              type="button"
              onClick={logout}
              className="text-sm text-white/80 underline transition hover:text-accent-yellow"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-accent-yellow hover:text-accent-yellow"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <PrimaryAction onClick={() => setOpen(false)} />
            {session ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-sm text-white/80 underline"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-lg border border-white/30 px-4 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
