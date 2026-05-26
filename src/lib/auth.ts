import type { AuthSession, SessionRole, UserAccount } from "./types";

const ACCOUNTS_KEY = "viltrumhacks:accounts:v1";
const SESSION_KEY = "viltrumhacks:session:v1";
const ACCOUNTS_META_KEY = "viltrumhacks:accounts-meta:v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAccounts(): Record<string, UserAccount> {
  if (!isBrowser()) return {};
  try {
    const raw = sessionStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, UserAccount>) : {};
  } catch {
    return {};
  }
}

function saveAccounts(accounts: Record<string, UserAccount>): void {
  if (!isBrowser()) return;
  sessionStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function getSession(): AuthSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function setSession(session: AuthSession): void {
  if (!isBrowser()) return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function signup(
  fullName: string,
  email: string,
  password: string,
  role: SessionRole,
): AuthSession {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();

  if (accounts[normalizedEmail]) {
    throw new Error("An account with this email already exists.");
  }

  const account: UserAccount = {
    email: normalizedEmail,
    password,
    fullName: fullName.trim(),
    role,
  };

  accounts[normalizedEmail] = account;
  saveAccounts(accounts);

  const session: AuthSession = {
    email: account.email,
    role: account.role,
    fullName: account.fullName,
  };
  setSession(session);
  return session;
}

export function login(email: string, password: string): AuthSession {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getAccounts();
  const account = accounts[normalizedEmail];

  if (!account || account.password !== password) {
    throw new Error("Invalid email or password.");
  }

  const session: AuthSession = {
    email: account.email,
    role: account.role,
    fullName: account.fullName,
    applicationId: account.applicationId,
  };
  setSession(session);
  return session;
}

export function logout(): void {
  if (!isBrowser()) return;
  sessionStorage.removeItem(SESSION_KEY);
}

export function updateSession(
  partial: Partial<Pick<AuthSession, "applicationId">>,
): void {
  const session = getSession();
  if (!session) return;

  const updated: AuthSession = { ...session, ...partial };
  setSession(updated);

  const accounts = getAccounts();
  const account = accounts[session.email];
  if (account) {
    accounts[session.email] = { ...account, ...partial };
    saveAccounts(accounts);
  }
}

const DEMO_ACCOUNTS: UserAccount[] = [
  {
    email: "mark@viltrumhacks.test",
    password: "mark",
    fullName: "Mark Grayson",
    role: "attendee",
    applicationId: "VH-2026-SEED",
  },
  {
    email: "eve@viltrumhacks.test",
    password: "eve",
    fullName: "Atom Eve",
    role: "attendee",
    applicationId: "VH-2026-SD02",
  },
  {
    email: "allen@viltrumhacks.test",
    password: "allen",
    fullName: "Allen the Alien",
    role: "staff",
    applicationId: "VH-2026-SD03",
  },
];

export function seedDemoAccounts(): void {
  if (!isBrowser()) return;
  try {
    const metaRaw = sessionStorage.getItem(ACCOUNTS_META_KEY);
    const meta = metaRaw ? JSON.parse(metaRaw) : {};
    if (meta.seeded) return;

    const accounts = getAccounts();
    for (const demo of DEMO_ACCOUNTS) {
      if (!accounts[demo.email]) {
        accounts[demo.email] = demo;
      }
    }
    saveAccounts(accounts);
    sessionStorage.setItem(
      ACCOUNTS_META_KEY,
      JSON.stringify({ seeded: true }),
    );
  } catch {
    // ignore storage errors
  }
}
