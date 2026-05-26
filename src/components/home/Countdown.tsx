"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

const PLACEHOLDER: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  expired: false,
};

function calcTimeLeft(): TimeLeft {
  const target = new Date(site.deadlineISO).getTime();
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-navy-800/80 px-4 py-3 min-w-[4.5rem]">
      <span className="font-display text-3xl font-bold text-accent-yellow">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs uppercase tracking-wide text-white/60">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [time, setTime] = useState<TimeLeft>(PLACEHOLDER);

  useEffect(() => {
    setTime(calcTimeLeft());
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.expired) {
    return (
      <p className="text-lg font-semibold text-accent-yellow">
        Applications are closed.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Unit value={time.days} label="Days" />
      <Unit value={time.hours} label="Hrs" />
      <Unit value={time.minutes} label="Mins" />
      <Unit value={time.seconds} label="Secs" />
    </div>
  );
}
