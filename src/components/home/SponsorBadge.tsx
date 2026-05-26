import type { Sponsor } from "@/lib/types";

const tierStyles: Record<Sponsor["tier"], string> = {
  title: "font-bebas text-4xl tracking-wide text-navy-900",
  gold: "font-playfair text-2xl italic text-navy-800",
  silver: "font-rajdhani text-xl font-semibold uppercase text-text-dark",
  bronze: "font-space-mono text-base text-text-muted",
};

const tierLabels: Record<Sponsor["tier"], string> = {
  title: "Title Sponsor",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};

export function SponsorBadge({ name, tier }: Sponsor) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-navy-800/10 bg-white p-6 shadow-sm">
      <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-red">
        {tierLabels[tier]}
      </span>
      <span className={tierStyles[tier]}>{name}</span>
    </div>
  );
}
