import {
  Heart,
  Rocket,
  Shield,
  Sprout,
  Users,
} from "lucide-react";
import type { Value } from "@/lib/types";

const icons = [Rocket, Users, Sprout, Heart, Shield];

export function ValueCard({
  title,
  description,
  index,
}: Value & { index: number }) {
  const Icon = icons[index % icons.length];
  return (
    <div className="rounded-xl border border-navy-800/10 bg-white p-6 shadow-md">
      <Icon className="h-8 w-8 text-accent-red" aria-hidden />
      <h3 className="mt-4 font-display text-xl font-bold text-navy-900">
        {title}
      </h3>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
    </div>
  );
}
