import type { PastProject } from "@/lib/types";

export function PastProjectCard({ title, description, team }: PastProject) {
  return (
    <article className="rounded-xl border border-navy-800/10 bg-white p-6 shadow-md">
      <h3 className="font-display text-lg font-bold text-navy-900">{title}</h3>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent-red">
        {team}
      </p>
    </article>
  );
}
