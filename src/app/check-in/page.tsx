"use client";

import { DemoAuthGate } from "@/components/auth/DemoAuthGate";
import { CheckInStaffContent } from "@/components/check-in/CheckInStaffContent";

export default function CheckInPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <DemoAuthGate requiredRole="staff">
        <CheckInStaffContent />
      </DemoAuthGate>
    </div>
  );
}
