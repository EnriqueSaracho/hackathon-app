"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import type { SessionRole } from "@/lib/types";

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

    if (session.role !== requiredRole) {
      router.replace(session.role === "staff" ? "/check-in" : "/my-ticket");
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
