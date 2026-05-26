"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getApplication } from "@/lib/storage";
import { TicketView } from "@/components/ticket/TicketView";

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const application = id ? getApplication(id) : null;

  if (!application) {
    return (
      <div className="mx-auto max-w-lg rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="font-display text-2xl font-bold text-navy-900">
          Application not found
        </h1>
        <p className="mt-2 text-text-muted">
          This application may not exist on this device.
        </p>
        <Link
          href="/apply"
          className="mt-6 inline-block rounded-lg bg-accent-yellow px-6 py-2 font-semibold text-navy-950"
        >
          Apply again
        </Link>
      </div>
    );
  }

  return <TicketView application={application} />;
}

export default function SuccessPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <Suspense fallback={<p className="text-center">Loading…</p>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
