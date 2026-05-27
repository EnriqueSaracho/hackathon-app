"use client";

import Link from "next/link";
import { hero, site } from "@/content/site";
import { useAuth } from "@/components/auth/AuthProvider";
import { Countdown } from "./Countdown";

function HeroCTAs() {
  const { session } = useAuth();

  if (session?.applicationId) {
    return (
      <>
        <Link
          href="/my-ticket"
          className="rounded-lg bg-accent-yellow px-6 py-3 font-semibold text-navy-950 transition hover:brightness-110"
        >
          View My Ticket
        </Link>
        {(session.role === "staff" || session.role === "organizer") && (
          <Link
            href="/check-in"
            className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-accent-yellow hover:text-accent-yellow"
          >
            Open Scanner
          </Link>
        )}
        {session.role === "organizer" && (
          <Link
            href="/admin/participants"
            className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-accent-yellow hover:text-accent-yellow"
          >
            Admin Dashboard
          </Link>
        )}
      </>
    );
  }

  if (session?.role === "organizer") {
    return (
      <>
        <Link
          href="/check-in"
          className="rounded-lg bg-accent-yellow px-6 py-3 font-semibold text-navy-950 transition hover:brightness-110"
        >
          Go to Check-in
        </Link>
        <Link
          href="/admin/participants"
          className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-accent-yellow hover:text-accent-yellow"
        >
          Admin Dashboard
        </Link>
        <Link
          href="/mentor"
          className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-accent-yellow hover:text-accent-yellow"
        >
          Become a Mentor
        </Link>
        <Link
          href="/volunteer"
          className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-accent-yellow hover:text-accent-yellow"
        >
          Volunteer
        </Link>
      </>
    );
  }

  if (session?.role === "staff") {
    return (
      <>
        <Link
          href="/check-in"
          className="rounded-lg bg-accent-yellow px-6 py-3 font-semibold text-navy-950 transition hover:brightness-110"
        >
          Go to Check-in
        </Link>
        <Link
          href="/mentor"
          className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-accent-yellow hover:text-accent-yellow"
        >
          Become a Mentor
        </Link>
        <Link
          href="/volunteer"
          className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-accent-yellow hover:text-accent-yellow"
        >
          Volunteer
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/apply"
        className="rounded-lg bg-accent-yellow px-6 py-3 font-semibold text-navy-950 transition hover:brightness-110"
      >
        Apply as Hacker
      </Link>
      <Link
        href="/mentor"
        className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-accent-yellow hover:text-accent-yellow"
      >
        Become a Mentor
      </Link>
      <Link
        href="/volunteer"
        className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-accent-yellow hover:text-accent-yellow"
      >
        Volunteer
      </Link>
    </>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-[#2a1f4e] px-6 py-24 text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-yellow/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-yellow">
          {site.dates} &middot; {site.venue}
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-7xl">
          {hero.headline}
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-white/90">{hero.subhead}</p>
        <p className="mt-4 max-w-2xl text-white/70">{hero.body}</p>

        <div className="mt-10">
          <p className="mb-3 text-sm text-white/60">
            Applications close {site.applicationDeadline}
          </p>
          <Countdown />
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <HeroCTAs />
        </div>
      </div>
    </section>
  );
}
