"use client";

import { AuthGate } from "@/components/auth/AuthGate";
import { ApplicationForm } from "@/components/forms/ApplicationForm";

export default function MentorPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <AuthGate requiredRole="staff">
        <ApplicationForm role="mentor" />
      </AuthGate>
    </div>
  );
}
