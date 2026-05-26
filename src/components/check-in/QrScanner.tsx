"use client";

import { useEffect, useId, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

type QrScannerProps = {
  enabled: boolean;
  onScan: (decodedText: string) => void;
};

function isBenignScannerError(err: unknown): boolean {
  if (err instanceof DOMException && err.name === "AbortError") return true;
  if (err instanceof Error) {
    if (err.name === "AbortError") return true;
    if (err.message.includes("play() request was interrupted")) return true;
  }
  return false;
}

async function safeStopAndClear(scanner: Html5Qrcode): Promise<void> {
  try {
    await scanner.stop();
  } catch (err) {
    if (!isBenignScannerError(err)) {
      // Scanner was not running or other benign teardown race
    }
  }
  try {
    scanner.clear();
  } catch {
    // Ignore clear errors
  }
}

export function QrScanner({ enabled, onScan }: QrScannerProps) {
  const readerId = useId().replace(/:/g, "");
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    if (!enabled) return;

    const lifecycle = { cancelled: false, running: false };
    const scanner = new Html5Qrcode(readerId);

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          onScanRef.current(decodedText);
        },
        () => {},
      )
      .then(() => {
        if (lifecycle.cancelled) {
          void safeStopAndClear(scanner);
          return;
        }
        lifecycle.running = true;
      })
      .catch((err) => {
        if (!isBenignScannerError(err)) {
          // Camera denied or unavailable — manual fallback remains
        }
      });

    return () => {
      lifecycle.cancelled = true;
      if (lifecycle.running) {
        void safeStopAndClear(scanner);
      }
    };
  }, [enabled, readerId]);

  return (
    <div
      className={
        enabled
          ? "overflow-hidden rounded-xl border border-navy-200 bg-black"
          : "hidden"
      }
      aria-hidden={!enabled}
    >
      <div id={readerId} className="w-full" />
    </div>
  );
}
