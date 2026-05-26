import type { DemoSession, SessionRole } from "./types";

const SESSION_KEY = "viltrumhacks:demo-session:v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getDemoSession(): DemoSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
}

export function setDemoSession(session: DemoSession): void {
  if (!isBrowser()) return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearDemoSession(): void {
  if (!isBrowser()) return;
  sessionStorage.removeItem(SESSION_KEY);
}

export function hasSessionRole(role: SessionRole): boolean {
  const session = getDemoSession();
  return session?.sessionRole === role;
}
