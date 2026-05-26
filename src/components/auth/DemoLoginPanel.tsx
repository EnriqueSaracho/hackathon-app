"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DEMO_PERSONAS } from "@/lib/demo-personas";
import { setDemoSession, getDemoSession, clearDemoSession } from "@/lib/demo-session";
import { seedApplications } from "@/lib/storage";
import type { DemoPersonaId } from "@/lib/types";

function DemoLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const existing = getDemoSession();

  function login(personaId: DemoPersonaId) {
    const persona = DEMO_PERSONAS.find((p) => p.id === personaId);
    if (!persona) return;

    seedApplications();
    setDemoSession({
      personaId: persona.id,
      sessionRole: persona.sessionRole,
      applicationId: persona.applicationId,
    });

    const next = searchParams.get("next");
    const destination =
      next && next.startsWith("/") ? next : persona.defaultRoute;
    router.replace(destination);
  }

  function logout() {
    clearDemoSession();
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      {existing && (
        <div className="rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm">
          <p className="text-text-muted">
            Signed in as{" "}
            <span className="font-medium text-navy-900">
              {DEMO_PERSONAS.find((p) => p.id === existing.personaId)?.label}
            </span>
          </p>
          <button
            type="button"
            onClick={logout}
            className="mt-2 text-sm font-medium text-navy-900 underline"
          >
            Sign out
          </button>
        </div>
      )}

      <p className="text-center text-sm text-text-muted">
        Practice demo — pick a persona to test tickets or staff check-in. Not
        real authentication.
      </p>

      <div className="space-y-3">
        {DEMO_PERSONAS.map((persona) => (
          <button
            key={persona.id}
            type="button"
            onClick={() => login(persona.id)}
            className="w-full rounded-xl border-2 border-navy-900 bg-white px-5 py-4 text-left transition hover:bg-navy-50"
          >
            <span className="block font-display text-lg font-bold text-navy-900">
              {persona.label}
            </span>
            <span className="mt-1 block text-sm text-text-muted">
              {persona.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DemoLoginPanel() {
  return (
    <Suspense fallback={<p className="text-center">Loading…</p>}>
      <DemoLoginContent />
    </Suspense>
  );
}
