"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { findByCheckInCode, markCheckedIn } from "@/lib/storage";
import { parseCheckInInput } from "@/lib/qr";
import type { Application } from "@/lib/types";
import { QrScanner } from "@/components/check-in/QrScanner";

type LookupState =
  | "idle"
  | "invalid"
  | "pending"
  | "success"
  | "already";

function formatCheckedInAt(iso: string): string {
  try {
    return format(new Date(iso), "MMM d, yyyy h:mm a");
  } catch {
    return iso;
  }
}

function lookupApplication(rawInput: string): Application | "invalid" {
  const parsed = parseCheckInInput(rawInput);
  if (!parsed) return "invalid";

  const app = findByCheckInCode(parsed.checkInCode);
  if (!app) return "invalid";
  if (parsed.applicationId && app.applicationId !== parsed.applicationId) {
    return "invalid";
  }
  return app;
}

export function CheckInPanel() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [lookupState, setLookupState] = useState<LookupState>("idle");
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) setInput(code);
  }, [searchParams]);

  const runLookup = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setLookupState("idle");
      setApplication(null);
      return;
    }

    const result = lookupApplication(trimmed);
    if (result === "invalid") {
      setLookupState("invalid");
      setApplication(null);
      return;
    }

    setApplication(result);
    if (result.checkedInAt) {
      setLookupState("already");
    } else {
      setLookupState("pending");
    }
    setInput(trimmed.startsWith("{") ? trimmed : result.checkInCode);
  }, []);

  function validate() {
    runLookup(input);
  }

  function handleScan(decodedText: string) {
    setInput(decodedText);
    runLookup(decodedText);
  }

  function checkIn() {
    if (!application) return;
    if (application.checkedInAt) {
      setLookupState("already");
      return;
    }
    const updated = markCheckedIn(application.applicationId, "allen-demo");
    if (!updated) {
      setLookupState("invalid");
      setApplication(null);
      return;
    }
    setApplication(updated);
    setLookupState("success");
  }

  function reset() {
    setInput("");
    setLookupState("idle");
    setApplication(null);
    setShowScanner(false);
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setShowScanner((v) => !v)}
          className="flex-1 rounded-lg border border-navy-900 px-4 py-2 text-sm font-medium text-navy-900"
        >
          {showScanner ? "Hide camera" : "Scan QR"}
        </button>
        {lookupState !== "idle" && (
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-text-muted"
          >
            Clear
          </button>
        )}
      </div>

      <div className={showScanner ? undefined : "hidden"}>
        <QrScanner enabled={showScanner} onScan={handleScan} />
      </div>

      <div>
        <label
          htmlFor="checkin-code"
          className="mb-2 block text-sm font-medium text-text-dark"
        >
          Check-in code or QR payload
        </label>
        <textarea
          id="checkin-code"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setLookupState("idle");
            setApplication(null);
          }}
          placeholder="Enter 8-character code (e.g. DEMO0001) or paste QR JSON"
          className="input-field min-h-[100px] font-mono text-sm"
          rows={3}
        />
      </div>
      <button
        type="button"
        onClick={validate}
        className="w-full rounded-lg bg-accent-yellow py-3 font-semibold text-navy-950"
      >
        Validate
      </button>

      {lookupState === "invalid" && (
        <div
          role="status"
          className="rounded-xl border-2 border-error bg-red-50 px-6 py-4 text-center"
        >
          <p className="font-display text-2xl font-bold text-error">INVALID</p>
          <p className="mt-1 text-sm text-text-muted">
            No matching application found.
          </p>
        </div>
      )}

      {lookupState === "pending" && application && (
        <div
          role="status"
          className="rounded-xl border-2 border-success bg-green-50 px-6 py-4"
        >
          <p className="text-center font-display text-2xl font-bold text-success">
            VALID
          </p>
          <p className="mt-2 text-center text-lg font-semibold text-navy-900">
            {application.fullName}
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-muted">Event role</dt>
              <dd className="capitalize font-medium">{application.role}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-muted">School</dt>
              <dd className="font-medium">{application.school}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-muted">Application ID</dt>
              <dd className="font-mono text-xs">{application.applicationId}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-muted">Code</dt>
              <dd className="font-mono font-medium">{application.checkInCode}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={checkIn}
            className="mt-4 w-full rounded-lg bg-navy-900 py-3 font-semibold text-white"
          >
            Check in
          </button>
        </div>
      )}

      {lookupState === "success" && application?.checkedInAt && (
        <div
          role="status"
          className="rounded-xl border-2 border-success bg-green-50 px-6 py-4 text-center"
        >
          <p className="font-display text-2xl font-bold text-success">
            Checked in
          </p>
          <p className="mt-2 font-semibold text-navy-900">
            {application.fullName}
          </p>
          <p className="mt-1 text-sm text-text-muted">
            {formatCheckedInAt(application.checkedInAt)}
          </p>
        </div>
      )}

      {lookupState === "already" && application?.checkedInAt && (
        <div
          role="status"
          className="rounded-xl border-2 border-amber-500 bg-amber-50 px-6 py-4 text-center"
        >
          <p className="font-display text-2xl font-bold text-amber-800">
            Already checked in
          </p>
          <p className="mt-2 font-semibold text-navy-900">
            {application.fullName}
          </p>
          <p className="mt-1 text-sm text-text-muted">
            {formatCheckedInAt(application.checkedInAt)}
          </p>
          {application.checkedInBy && (
            <p className="mt-1 text-xs text-text-muted">
              By {application.checkedInBy}
            </p>
          )}
        </div>
      )}

      <p className="text-center text-xs text-text-muted">
        Demo codes: <code className="font-mono">DEMO0001</code>–
        <code className="font-mono">DEMO0003</code>
      </p>
    </div>
  );
}
