"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { CheckInPanel } from "@/components/check-in/CheckInPanel";

export function CheckInStaffContent() {
  const router = useRouter();
  const { logout } = useAuth();

  function signOut() {
    logout();
    router.replace("/");
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-text-muted">Staff scanner</p>
        <button
          type="button"
          onClick={signOut}
          className="text-sm font-medium text-navy-900 underline"
        >
          Sign out
        </button>
      </div>
      <h1 className="mb-2 text-center font-display text-3xl font-bold text-navy-900">
        Volunteer check-in
      </h1>
      <p className="mb-8 text-center text-sm text-text-muted">
        Scan a ticket QR or enter an 8-character code to validate and check in
        attendees.
      </p>
      <Suspense fallback={<p className="text-center">Loading…</p>}>
        <CheckInPanel />
      </Suspense>
    </div>
  );
}
