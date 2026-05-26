"use client";

import { DemoAuthGate } from "@/components/auth/DemoAuthGate";
import { MyTicketContent } from "@/components/ticket/MyTicketContent";

export default function MyTicketPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <DemoAuthGate requiredRole="attendee">
        <MyTicketContent />
      </DemoAuthGate>
    </div>
  );
}
