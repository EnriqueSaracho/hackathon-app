"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDemoSession, clearDemoSession } from "@/lib/demo-session";
import { getApplication } from "@/lib/storage";
import { TicketView } from "@/components/ticket/TicketView";

export function MyTicketContent() {
  const router = useRouter();
  const session = getDemoSession();
  const application = session
    ? getApplication(session.applicationId)
    : null;

  function signOut() {
    clearDemoSession();
    router.replace("/demo/login");
  }

  if (!application) {
    return (
      <div className="mx-auto max-w-lg rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="font-display text-2xl font-bold text-navy-900">
          Ticket not found
        </h1>
        <p className="mt-2 text-text-muted">
          This application may not exist on this device.
        </p>
        <Link
          href="/demo/login"
          className="mt-6 inline-block rounded-lg bg-accent-yellow px-6 py-2 font-semibold text-navy-950"
        >
          Demo login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">Demo attendee ticket</p>
        <button
          type="button"
          onClick={signOut}
          className="text-sm font-medium text-navy-900 underline"
        >
          Sign out
        </button>
      </div>
      <TicketView
        application={application}
        heading="My ticket"
        subheading="Show this QR or code at registration."
      />
    </div>
  );
}
