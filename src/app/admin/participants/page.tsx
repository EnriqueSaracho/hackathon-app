"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { AuthGate } from "@/components/auth/AuthGate";
import { useAuth } from "@/components/auth/AuthProvider";
import { getApplications } from "@/lib/storage";
import type { Application } from "@/lib/types";

function formatCheckedIn(app: Application): string {
  if (!app.checkedInAt) return "Not checked in";
  try {
    return format(new Date(app.checkedInAt), "MMM d, yyyy h:mm a");
  } catch {
    return app.checkedInAt;
  }
}

function buildCsv(apps: Application[]): string {
  const headers = [
    "Name",
    "Email",
    "Role",
    "School",
    "Experience",
    "Dietary Notes",
    "Team Preference",
    "Check-in Status",
    "Application ID",
  ];
  const rows = apps.map((a) => [
    a.fullName,
    a.email,
    a.role,
    a.role === "hacker" ? a.school : "",
    a.experienceLevel,
    a.dietaryNotes ?? "",
    a.role === "hacker" ? a.teamPreference : "",
    a.checkedInAt ? `Checked in ${a.checkedInAt}` : "Not checked in",
    a.applicationId,
  ]);

  const escape = (val: string) =>
    val.includes(",") || val.includes('"')
      ? `"${val.replace(/"/g, '""')}"`
      : val;

  return [headers, ...rows].map((r) => r.map(escape).join(",")).join("\n");
}

function AdminParticipantsContent() {
  const router = useRouter();
  const { logout } = useAuth();
  const [search, setSearch] = useState("");

  const allApps = Object.values(getApplications());
  const filtered = search
    ? allApps.filter(
        (a) =>
          a.fullName.toLowerCase().includes(search.toLowerCase()) ||
          a.email.toLowerCase().includes(search.toLowerCase()),
      )
    : allApps;

  function signOut() {
    logout();
    router.replace("/");
  }

  function downloadCsv() {
    const csv = buildCsv(allApps);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "viltrumhacks-participants.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium text-navy-900 underline">
          &larr; Back to home
        </Link>
        <button
          type="button"
          onClick={signOut}
          className="text-sm font-medium text-navy-900 underline"
        >
          Sign out
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="font-display text-3xl font-bold text-navy-900">
          Participants
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          {allApps.length} total application{allApps.length !== 1 && "s"}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="input-field max-w-sm"
          />
          <button
            type="button"
            onClick={downloadCsv}
            className="rounded-lg bg-accent-yellow px-4 py-2 text-sm font-semibold text-navy-950 transition hover:brightness-110"
          >
            Download CSV
          </button>
        </div>

        <div className="mt-6 overflow-x-auto rounded-lg border border-navy-900/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-900/10 bg-navy-950/5">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy-900">Name</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy-900">Email</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy-900">Role</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy-900">School</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy-900">Experience</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy-900">Dietary Notes</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy-900">Team Pref</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy-900">Check-in Status</th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy-900">App ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-900/5">
              {filtered.map((app) => (
                <tr key={app.applicationId} className="hover:bg-navy-950/[0.02]">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-navy-900">
                    {app.fullName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-text-muted">
                    {app.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 capitalize">
                    {app.role}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {app.role === "hacker" ? app.school : "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 capitalize">
                    {app.experienceLevel}
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {app.dietaryNotes || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 capitalize">
                    {app.role === "hacker" ? app.teamPreference : "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {app.checkedInAt ? (
                      <span className="inline-flex items-center gap-1 text-success">
                        <span className="inline-block h-2 w-2 rounded-full bg-success" />
                        {formatCheckedIn(app)}
                      </span>
                    ) : (
                      <span className="text-text-muted">Not checked in</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-text-muted">
                    {app.applicationId}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-text-muted">
                    No participants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminParticipantsPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <AuthGate requiredRole="organizer">
        <AdminParticipantsContent />
      </AuthGate>
    </div>
  );
}
