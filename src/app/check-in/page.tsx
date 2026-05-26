"use client";

import { AuthGate } from "@/components/auth/AuthGate";
import { CheckInStaffContent } from "@/components/check-in/CheckInStaffContent";

export default function CheckInPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <AuthGate requiredRole="staff">
        <CheckInStaffContent />
      </AuthGate>
    </div>
  );
}
