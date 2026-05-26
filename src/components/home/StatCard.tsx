"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/types";

function parseValue(value: string): number {
  const num = parseInt(value.replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 0 : num;
}

export function StatCard({ label, value }: Stat) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const target = parseValue(value);
  const prefix = value.startsWith("$") ? "$" : "";
  const suffix = value.includes("CAD") ? "" : value.replace(/[0-9$,]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setDisplay(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(Math.floor(target * progress));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      className="rounded-xl bg-white p-6 text-center shadow-lg"
    >
      <p className="font-display text-3xl font-bold text-navy-900">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-text-muted">{label}</p>
    </div>
  );
}
