"use client";

import { useEffect } from "react";
import { seedApplications } from "@/lib/storage";

export function StorageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    seedApplications();
  }, []);

  return <>{children}</>;
}
