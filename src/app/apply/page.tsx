"use client";

import { AuthGate } from "@/components/auth/AuthGate";
import { ApplicationForm } from "@/components/forms/ApplicationForm";

export default function ApplyPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <AuthGate requiredRole="attendee">
        <ApplicationForm role="hacker" />
      </AuthGate>
    </div>
  );
}
