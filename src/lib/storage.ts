import type { Application } from "./types";
import { seedDemoAccounts } from "./auth";

const APPLICATIONS_KEY = "viltrumhacks:applications:v1";
const META_KEY = "viltrumhacks:meta:v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getApplications(): Record<string, Application> {
  if (!isBrowser()) return {};
  try {
    const raw = sessionStorage.getItem(APPLICATIONS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Application>) : {};
  } catch {
    return {};
  }
}

export function getApplication(id: string): Application | null {
  return getApplications()[id] ?? null;
}

export function saveApplication(app: Application): void {
  if (!isBrowser()) return;
  const apps = getApplications();
  apps[app.applicationId] = app;
  sessionStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
}

export function findByCheckInCode(code: string): Application | null {
  const normalized = code.trim().toUpperCase();
  const apps = Object.values(getApplications());
  return (
    apps.find((a) => a.checkInCode.toUpperCase() === normalized) ?? null
  );
}

export function emailExists(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return Object.values(getApplications()).some(
    (a) => a.email.toLowerCase() === normalized,
  );
}

export function exportApplicationsJson(): string {
  return JSON.stringify(getApplications(), null, 2);
}

export function markCheckedIn(
  applicationId: string,
  checkedInBy?: string,
): Application | null {
  if (!isBrowser()) return null;
  const app = getApplication(applicationId);
  if (!app) return null;
  if (app.checkedInAt) return app;

  const updated: Application = {
    ...app,
    checkedInAt: new Date().toISOString(),
    checkedInBy: checkedInBy ?? "staff-demo",
  };
  saveApplication(updated);
  return updated;
}

const SEED_APPLICATIONS: Application[] = [
  {
    applicationId: "VH-2026-SEED",
    checkInCode: "DEMO0001",
    role: "hacker",
    createdAt: "2025-08-01T12:00:00.000Z",
    fullName: "Mark Grayson (Demo)",
    email: "mark@viltrumhacks.test",
    school: "Pacific Heights University",
    experienceLevel: "intermediate",
    teamPreference: "solo",
    agreedToCoC: true,
  },
  {
    applicationId: "VH-2026-SD02",
    checkInCode: "DEMO0002",
    role: "mentor",
    createdAt: "2025-08-01T12:00:00.000Z",
    fullName: "Atom Eve (Demo)",
    email: "eve@viltrumhacks.test",
    school: "Pacific Heights University",
    experienceLevel: "advanced",
    agreedToCoC: true,
  },
  {
    applicationId: "VH-2026-SD03",
    checkInCode: "DEMO0003",
    role: "volunteer",
    createdAt: "2025-08-01T12:00:00.000Z",
    fullName: "Allen the Alien (Demo)",
    email: "allen@viltrumhacks.test",
    school: "Pacific Heights University",
    experienceLevel: "beginner",
    agreedToCoC: true,
  },
];

export function seedApplications(): void {
  if (!isBrowser()) return;
  try {
    const metaRaw = sessionStorage.getItem(META_KEY);
    const meta = metaRaw ? JSON.parse(metaRaw) : {};
    if (meta.seeded) return;

    const apps = getApplications();
    for (const seed of SEED_APPLICATIONS) {
      if (!apps[seed.applicationId]) {
        apps[seed.applicationId] = seed;
      }
    }
    sessionStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
    sessionStorage.setItem(META_KEY, JSON.stringify({ seeded: true }));

    seedDemoAccounts();
  } catch {
    // ignore storage errors
  }
}
