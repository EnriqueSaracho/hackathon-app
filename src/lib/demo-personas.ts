import type { DemoPersonaId, SessionRole } from "./types";

export type DemoPersona = {
  id: DemoPersonaId;
  label: string;
  description: string;
  applicationId: string;
  sessionRole: SessionRole;
  defaultRoute: string;
};

export const DEMO_PERSONAS: DemoPersona[] = [
  {
    id: "mark",
    label: "Mark Grayson",
    description: "Demo hacker — show your ticket",
    applicationId: "VH-2026-SEED",
    sessionRole: "attendee",
    defaultRoute: "/my-ticket",
  },
  {
    id: "eve",
    label: "Atom Eve",
    description: "Demo mentor — show your ticket",
    applicationId: "VH-2026-SD02",
    sessionRole: "attendee",
    defaultRoute: "/my-ticket",
  },
  {
    id: "allen",
    label: "Allen the Alien",
    description: "Demo volunteer — staff check-in scanner",
    applicationId: "VH-2026-SD03",
    sessionRole: "staff",
    defaultRoute: "/check-in",
  },
];

export function getDemoPersona(id: DemoPersonaId): DemoPersona | undefined {
  return DEMO_PERSONAS.find((p) => p.id === id);
}
