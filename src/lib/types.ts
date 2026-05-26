export type ApplicationRole = "hacker" | "mentor" | "volunteer";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export type TeamPreference = "solo" | "have-team" | "find-team";

export type Application = {
  applicationId: string;
  checkInCode: string;
  role: ApplicationRole;
  createdAt: string;
  fullName: string;
  email: string;
  school: string;
  experienceLevel: ExperienceLevel;
  dietaryNotes?: string;
  teamPreference?: TeamPreference;
  agreedToCoC: true;
  checkedInAt?: string;
  checkedInBy?: string;
};

export type DemoPersonaId = "mark" | "eve" | "allen";

export type SessionRole = "attendee" | "staff";

export type DemoSession = {
  personaId: DemoPersonaId;
  sessionRole: SessionRole;
  applicationId: string;
};

export type QRPayload = {
  v: 1;
  event: "viltrumhacks-2026";
  applicationId: string;
  checkInCode: string;
};

export type SponsorTier = "title" | "gold" | "silver" | "bronze";

export type Sponsor = {
  name: string;
  tier: SponsorTier;
};

export type FAQItem = {
  category: string;
  question: string;
  answer: string;
};

export type PastProject = {
  title: string;
  description: string;
  team: string;
};

export type Value = {
  title: string;
  description: string;
};

export type Stat = {
  label: string;
  value: string;
};

export type ScheduleItem = {
  time: string;
  activity: string;
};

export type TeamMember = {
  name: string;
  role: string;
};
