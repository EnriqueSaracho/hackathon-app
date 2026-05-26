"use client";

import { AuthGate } from "@/components/auth/AuthGate";
import { ApplicationForm } from "@/components/forms/ApplicationForm";

export default function VolunteerPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <AuthGate requiredRole="staff">
        <ApplicationForm role="volunteer" />
      </AuthGate>
    </div>
  );
}
