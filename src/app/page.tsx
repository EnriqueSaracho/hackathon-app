import Link from "next/link";
import {
  about,
  pastProjects,
  site,
  sponsors,
  stats,
  teamBlurb,
  teamMembers,
  values,
  schedule,
} from "@/content/site";
import { Hero } from "@/components/home/Hero";
import { StatCard } from "@/components/home/StatCard";
import { ValueCard } from "@/components/home/ValueCard";
import { ScheduleOutline } from "@/components/home/ScheduleOutline";
import { PastProjectCard } from "@/components/home/PastProjectCard";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { SponsorBadge } from "@/components/home/SponsorBadge";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="about" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold text-navy-900">
            About ViltrumHacks
          </h2>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 30)} className="mt-4 max-w-3xl text-text-muted">
              {p}
            </p>
          ))}
          <p className="mt-4 rounded-lg border-l-4 border-accent-yellow bg-white px-4 py-3 text-sm font-medium text-navy-900">
            {about.eligibility}
          </p>
        </div>
      </section>

      <section id="values" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold text-navy-900">
            Our Values
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <ValueCard key={v.title} {...v} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold text-navy-900">
            Last year we had…
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold text-navy-900">
            Schedule
          </h2>
          <p className="mt-2 text-text-muted">
            {site.dates} &middot; {site.format}
          </p>
          <div className="mt-8">
            <ScheduleOutline items={schedule} />
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold text-navy-900">
            Past Projects
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastProjects.map((p) => (
              <PastProjectCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-off-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-bold text-navy-900">
            FAQ
          </h2>
          <div className="mt-8">
            <FAQAccordion />
          </div>
        </div>
      </section>

      <section id="sponsors" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold text-navy-900">
            Our Sponsors
          </h2>
          <p className="mt-2 text-text-muted">
            Interested in sponsoring?{" "}
            <a
              href={`mailto:${site.sponsorEmail}`}
              className="font-medium text-accent-red hover:underline"
            >
              {site.sponsorEmail}
            </a>
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((s) => (
              <SponsorBadge key={s.name} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-4xl font-bold">Meet the team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">{teamBlurb}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((m) => (
              <div
                key={m.name}
                className="rounded-xl bg-navy-800/50 p-6"
              >
                <p className="font-display text-lg font-bold">{m.name}</p>
                <p className="mt-1 text-sm text-white/60">{m.role}</p>
              </div>
            ))}
          </div>
          <Link
            href="/apply"
            className="mt-10 inline-block rounded-lg bg-accent-yellow px-8 py-3 font-semibold text-navy-950"
          >
            Apply now
          </Link>
        </div>
      </section>
    </>
  );
}
