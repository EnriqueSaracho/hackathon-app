import type {
  FAQItem,
  PastProject,
  ScheduleItem,
  Sponsor,
  Stat,
  TeamMember,
  Value,
} from "@/lib/types";

export const site = {
  name: "ViltrumHacks 2026",
  tagline: "Embrace the power within.",
  dates: "August 16–17, 2026",
  format: "24-hour in-person hackathon",
  venue: "Pacific Heights Campus Center, Vancouver, BC",
  applicationOpens: "June 1, 2026",
  applicationDeadline: "August 5, 2026, 11:59 PM PDT",
  deadlineISO: "2026-08-05T23:59:00-07:00",
  maxTeamSize: 4,
  cost: "Free",
  audience: "University students in British Columbia",
  contactEmail: "info@viltrumhacks.test",
  sponsorEmail: "sponsors@viltrumhacks.test",
} as const;

export const hero = {
  headline: "ViltrumHacks 2026",
  subhead:
    "Western Canada's boldest student hackathon — 24 hours to build something extraordinary.",
  body: "Join hundreds of BC students for a weekend of building, learning, and defending your best ideas. Whether it's your first line of code or your tenth hackathon, there's a place for you in the arena.",
};

export const about = {
  paragraphs: [
    "ViltrumHacks is a student-run hackathon celebrating builders who show up, ship, and support each other. For 24 hours, you'll team up, prototype boldly, and present something real — no perfect plan required.",
    "We're inspired by stories of ordinary people doing extraordinary things. You don't need superpowers — just curiosity, grit, and a laptop.",
  ],
  eligibility:
    "Current university students in BC, 18+ or age of majority. Solo or teams up to 4. All skill levels welcome.",
};

export const values: Value[] = [
  {
    title: "Courage",
    description: "Ship something even when it's imperfect.",
  },
  {
    title: "Community",
    description: "No hero hacks alone.",
  },
  {
    title: "Growth",
    description: "Beginners welcome; mentors on site.",
  },
  {
    title: "Integrity",
    description: "Honest demos, real builds.",
  },
  {
    title: "Protection",
    description: "An inclusive, harassment-free space for everyone.",
  },
];

export const stats: Stat[] = [
  { label: "Hackers", value: "412" },
  { label: "Projects", value: "89" },
  { label: "Mentors", value: "64" },
  { label: "Prizes", value: "$18,500" },
  { label: "Sponsors", value: "28" },
];

export const schedule: ScheduleItem[] = [
  { time: "Sat 9:00 AM", activity: "Check-in & breakfast" },
  { time: "Sat 10:00 AM", activity: "Opening ceremony" },
  { time: "Sat 11:00 AM", activity: "Hacking begins" },
  { time: "Sat 12:30 PM", activity: "Lunch" },
  { time: "Sat 3:00 PM", activity: "Workshop: Pitch Like a Pro" },
  { time: "Sat 6:00 PM", activity: "Dinner" },
  { time: "Sat 8:00 PM", activity: "Mentor office hours" },
  { time: "Sun 12:00 AM", activity: "Midnight snacks" },
  { time: "Sun 8:00 AM", activity: "Breakfast" },
  { time: "Sun 11:00 AM", activity: "Hacking ends — submit projects" },
  { time: "Sun 12:00 PM", activity: "Lunch" },
  { time: "Sun 1:00 PM", activity: "Demos & judging" },
  { time: "Sun 3:30 PM", activity: "Awards & closing" },
];

export const pastProjects: PastProject[] = [
  {
    title: "OmniTrack",
    description:
      "Campus safety walk companion with live buddy check-ins.",
    team: "Guardians Three",
  },
  {
    title: "FlightPath Planner",
    description:
      "AI study scheduler that adapts when life gets chaotic.",
    team: "Velocity Squad",
  },
  {
    title: "ShieldBudget",
    description: "Student finance app with emergency-fund nudges.",
    team: "Cape Calculators",
  },
  {
    title: "Signal Boost",
    description:
      "Accessibility overlay for lecture slides in real time.",
    team: "Atom & Co",
  },
  {
    title: "Rebuild Relay",
    description:
      "Disaster-response resource matcher for local nonprofits.",
    team: "ReAnimators",
  },
];

export const sponsors: Sponsor[] = [
  { name: "OmniCorp Industries", tier: "title" },
  { name: "Global Defense Solutions", tier: "gold" },
  { name: "Guardians United", tier: "gold" },
  { name: "Atom Eve Labs", tier: "silver" },
  { name: "Robot Consulting Group", tier: "silver" },
  { name: "Flaxan Financial", tier: "silver" },
  { name: "Teen Team Tech", tier: "bronze" },
  { name: "Immortal Ventures", tier: "bronze" },
  { name: "ReAniman Studios", tier: "bronze" },
];

export const teamMembers: TeamMember[] = [
  { name: "Alex Chen", role: "Lead Organizer" },
  { name: "Jordan Reyes", role: "Sponsorship Director" },
  { name: "Sam Okonkwo", role: "Logistics Lead" },
  { name: "Priya Sharma", role: "Design & Brand" },
];

export const teamBlurb =
  "ViltrumHacks is organized by the Pacific Heights Tech Collective — students from across BC who love running events that actually help people grow.";

export const landAcknowledgment =
  "ViltrumHacks takes place on the unceded territories of the xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish), and səlilwətaɬ (Tsleil-Waututh) Nations. We are grateful to learn and build on these lands.";

export const faqs: FAQItem[] = [
  {
    category: "General",
    question: "What is a hackathon?",
    answer:
      "A hackathon is an event where you build a project in a short time — here, 24 hours. You can learn, experiment, and present something at the end.",
  },
  {
    category: "General",
    question: "Do I need coding experience?",
    answer:
      "No. Beginners are welcome. Mentors will be on site to help you get unstuck.",
  },
  {
    category: "General",
    question: "How much does it cost?",
    answer:
      "ViltrumHacks is completely free for accepted participants, including meals.",
  },
  {
    category: "General",
    question: "What are the prizes?",
    answer:
      "Last year we awarded $18,500 CAD across track prizes, sponsor challenges, and community choice.",
  },
  {
    category: "Teams & Projects",
    question: "Do I need a team?",
    answer:
      "No. You can register solo and form a team at the event, or register with up to 3 teammates (max team size 4).",
  },
  {
    category: "Teams & Projects",
    question: "What can I build?",
    answer:
      "Any software or hardware project — web apps, mobile apps, games, tools, hardware hacks. It must be built during the event (existing code allowed with disclosure).",
  },
  {
    category: "Teams & Projects",
    question: "Are there project rules?",
    answer:
      "Projects must be started or significantly extended during the hackathon. Be honest in your demo. No hate speech or illegal content.",
  },
  {
    category: "Logistics",
    question: "Is it overnight?",
    answer:
      "Yes. ViltrumHacks runs 24 hours. Quiet rooms and nap spaces are available.",
  },
  {
    category: "Logistics",
    question: "Is food provided?",
    answer:
      "Yes — breakfast, lunch, dinner, snacks, and midnight fuel are included.",
  },
  {
    category: "Logistics",
    question: "What should I bring?",
    answer:
      "Laptop, charger, student ID, toiletries, a water bottle, and optionally a sleeping bag for nap areas.",
  },
  {
    category: "Logistics",
    question: "How does QR check-in work?",
    answer:
      "After you apply, you'll receive a unique check-in code and QR. Show it at registration — staff scan or enter the code on the volunteer check-in page.",
  },
  {
    category: "Logistics",
    question: "How do I try the demo login?",
    answer:
      "This practice app includes demo personas (Mark, Eve, Allen) at Demo login. Mark and Eve show attendee tickets; Allen opens the staff scanner. On first visit each device seeds the same three demo applications so two phones can test check-in with codes DEMO0001–DEMO0003. New applications and check-in status stay in this browser only — they do not sync across devices.",
  },
  {
    category: "Eligibility",
    question: "Who can attend?",
    answer:
      "Current university students in British Columbia, 18+ or age of majority in your province.",
  },
  {
    category: "Eligibility",
    question: "Is there a code of conduct?",
    answer:
      "Yes. You must agree to our Code of Conduct when applying. We maintain a safe, inclusive environment.",
  },
  {
    category: "Eligibility",
    question: "Can I get a refund?",
    answer: "The event is free — there's nothing to refund.",
  },
  {
    category: "Eligibility",
    question: "Is the venue accessible?",
    answer:
      "Pacific Heights Campus Center has step-free access and accessible restrooms. Contact us before the event for specific accommodations.",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Values", href: "#values" },
  { label: "Schedule", href: "#schedule" },
  { label: "FAQ", href: "#faq" },
  { label: "Sponsors", href: "#sponsors" },
];
