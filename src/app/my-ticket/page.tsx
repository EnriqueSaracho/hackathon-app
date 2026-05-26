"use client";

import { AuthGate } from "@/components/auth/AuthGate";
import { MyTicketContent } from "@/components/ticket/MyTicketContent";

export default function MyTicketPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <AuthGate requiredRole="attendee">
        <MyTicketContent />
      </AuthGate>
    </div>
  );
}
