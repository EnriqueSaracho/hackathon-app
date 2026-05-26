"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDemoSession } from "@/lib/demo-session";
import type { SessionRole } from "@/lib/types";

type DemoAuthGateProps = {
  requiredRole: SessionRole;
  children: React.ReactNode;
};

export function DemoAuthGate({ requiredRole, children }: DemoAuthGateProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = getDemoSession();
    if (!session) {
      const next =
        typeof window !== "undefined"
          ? encodeURIComponent(window.location.pathname)
          : requiredRole === "staff"
            ? "%2Fcheck-in"
            : "%2Fmy-ticket";
      router.replace(`/demo/login?next=${next}`);
      return;
    }
    if (session.sessionRole !== requiredRole) {
      router.replace(
        session.sessionRole === "staff" ? "/check-in" : "/my-ticket",
      );
      return;
    }
    setReady(true);
  }, [requiredRole, router]);

  if (!ready) {
    return (
      <p className="text-center text-sm text-text-muted">Checking session…</p>
    );
  }

  return <>{children}</>;
}
