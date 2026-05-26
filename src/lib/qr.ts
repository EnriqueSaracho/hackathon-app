import type { Application, QRPayload } from "./types";

export function encodeQRPayload(app: Application): string {
  const payload: QRPayload = {
    v: 1,
    event: "viltrumhacks-2026",
    applicationId: app.applicationId,
    checkInCode: app.checkInCode,
  };
  return JSON.stringify(payload);
}

export function parseCheckInInput(input: string): {
  applicationId?: string;
  checkInCode: string;
} | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed) as QRPayload;
      if (
        parsed.v === 1 &&
        parsed.event === "viltrumhacks-2026" &&
        parsed.checkInCode
      ) {
        return {
          applicationId: parsed.applicationId,
          checkInCode: parsed.checkInCode,
        };
      }
    } catch {
      return null;
    }
  }

  return { checkInCode: trimmed.toUpperCase() };
}
