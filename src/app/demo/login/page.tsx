import { DemoLoginPanel } from "@/components/auth/DemoLoginPanel";

export default function DemoLoginPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-2 text-center font-display text-3xl font-bold text-navy-900">
          Demo login
        </h1>
        <p className="mb-8 text-center text-sm text-text-muted">
          ViltrumHacks practice app — test attendee tickets or volunteer
          check-in.
        </p>
        <DemoLoginPanel />
      </div>
    </div>
  );
}
