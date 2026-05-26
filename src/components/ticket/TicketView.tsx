import type { Application } from "@/lib/types";
import { QRDisplay } from "@/components/qr/QRDisplay";

type TicketViewProps = {
  application: Application;
  heading?: string;
  subheading?: string;
};

export function TicketView({
  application,
  heading = "You're in!",
  subheading = "Save your check-in QR code for event day.",
}: TicketViewProps) {
  return (
    <div className="mx-auto max-w-lg space-y-6 rounded-xl bg-white p-8 shadow-lg print-area">
      <h1 className="font-display text-3xl font-bold text-navy-900">{heading}</h1>
      <p className="text-text-muted">{subheading}</p>

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between border-b border-gray-100 py-2">
          <dt className="text-text-muted">Application ID</dt>
          <dd className="font-mono font-medium">{application.applicationId}</dd>
        </div>
        <div className="flex justify-between border-b border-gray-100 py-2">
          <dt className="text-text-muted">Name</dt>
          <dd className="font-medium">{application.fullName}</dd>
        </div>
        <div className="flex justify-between border-b border-gray-100 py-2">
          <dt className="text-text-muted">Role</dt>
          <dd className="font-medium capitalize">{application.role}</dd>
        </div>
        {application.role === "hacker" && (
          <div className="flex justify-between py-2">
            <dt className="text-text-muted">School</dt>
            <dd className="font-medium">{application.school}</dd>
          </div>
        )}
      </dl>

      <QRDisplay application={application} />

      <p className="rounded-lg bg-amber-50 px-4 py-3 text-xs text-amber-900">
        Practice app — data stored only in this browser. Check-in status does
        not sync across devices.
      </p>
    </div>
  );
}
