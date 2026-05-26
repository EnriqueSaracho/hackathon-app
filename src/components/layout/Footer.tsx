import Link from "next/link";
import { landAcknowledgment, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-navy-950 px-6 py-12 text-white/80">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              {site.name}
            </h3>
            <p className="mt-2 text-sm">{site.tagline}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <p className="mt-2 text-sm">
              <a
                href={`mailto:${site.contactEmail}`}
                className="hover:text-accent-yellow"
              >
                {site.contactEmail}
              </a>
            </p>
            <p className="text-sm">
              <a
                href={`mailto:${site.sponsorEmail}`}
                className="hover:text-accent-yellow"
              >
                {site.sponsorEmail}
              </a>
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Event</h4>
            <Link
              href="/check-in"
              className="mt-2 block text-sm hover:text-accent-yellow"
            >
              Volunteer check-in
            </Link>
            <Link
              href="/mentor"
              className="mt-1 block text-sm hover:text-accent-yellow"
            >
              Become a Mentor
            </Link>
            <Link
              href="/volunteer"
              className="mt-1 block text-sm hover:text-accent-yellow"
            >
              Volunteer
            </Link>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-8 text-xs leading-relaxed">
          {landAcknowledgment}
        </p>
        <p className="mt-4 text-xs text-white/50">
          Copyright &copy; {site.name}. Practice project — not affiliated with
          any real organization.
        </p>
      </div>
    </footer>
  );
}
