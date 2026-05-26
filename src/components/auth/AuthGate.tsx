"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import type { SessionRole } from "@/lib/types";

const ROLE_RANK: Record<SessionRole, number> = {
  attendee: 0,
  staff: 1,
  organizer: 2,
};

type AuthGateProps = {
  requiredRole: SessionRole;
  children: React.ReactNode;
};

export function AuthGate({ requiredRole, children }: AuthGateProps) {
  const router = useRouter();
  const { session, loading } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!session) {
      const next =
        typeof window !== "undefined"
          ? encodeURIComponent(window.location.pathname)
          : requiredRole === "staff"
            ? "%2Fcheck-in"
            : "%2Fmy-ticket";
      router.replace(`/login?next=${next}`);
      return;
    }

    const authorized = ROLE_RANK[session.role] >= ROLE_RANK[requiredRole];

    if (!authorized) {
      if (session.role === "organizer") router.replace("/admin/participants");
      else if (session.role === "staff") router.replace("/check-in");
      else router.replace("/my-ticket");
      return;
    }

    setReady(true);
  }, [requiredRole, router, session, loading]);

  if (!ready) {
    return (
      <p className="text-center text-sm text-text-muted">Checking session…</p>
    );
  }

  return <>{children}</>;
}
