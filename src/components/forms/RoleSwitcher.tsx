"use client";

import Link from "next/link";
import type { ApplicationRole } from "@/lib/types";
import { useAuth } from "@/components/auth/AuthProvider";

const roleLinks: {
  role: ApplicationRole;
  href: string;
  label: string;
}[] = [
  { role: "hacker", href: "/apply", label: "Apply as Hacker" },
  { role: "mentor", href: "/mentor", label: "Become a Mentor" },
  { role: "volunteer", href: "/volunteer", label: "Volunteer" },
];

const activeClass =
  "rounded-lg bg-accent-yellow px-4 py-2 text-sm font-semibold text-navy-950";
const inactiveClass =
  "rounded-lg border border-navy-900/20 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:border-accent-yellow hover:text-navy-900";

export function RoleSwitcher({ currentRole }: { currentRole: ApplicationRole }) {
  const { session } = useAuth();
  const links = roleLinks.filter((l) =>
    session?.role === "staff" ? l.role !== "hacker" : l.role === "hacker"
  );

  return (
    <nav aria-label="Application role" className="space-y-3">
      <p className="text-sm text-text-muted">Applying for a different role?</p>
      <div className="flex flex-wrap gap-3">
        {links.map(({ role, href, label }) =>
          role === currentRole ? (
            <span key={role} aria-current="page" className={activeClass}>
              {label}
            </span>
          ) : (
            <Link key={role} href={href} className={inactiveClass}>
              {label}
            </Link>
          ),
        )}
      </div>
    </nav>
  );
}
