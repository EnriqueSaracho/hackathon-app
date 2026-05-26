"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Copy, Download } from "lucide-react";
import type { Application } from "@/lib/types";
import { encodeQRPayload } from "@/lib/qr";

export function QRDisplay({ application }: { application: Application }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const payload = encodeQRPayload(application);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, payload, {
      width: 220,
      margin: 2,
      color: { dark: "#121A2E", light: "#FFFFFF" },
    });
  }, [payload]);

  async function copyCode() {
    await navigator.clipboard.writeText(application.checkInCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `viltrumhacks-${application.applicationId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="flex flex-col items-center gap-4 print-area">
      <canvas ref={canvasRef} aria-label="Check-in QR code" />
      <p className="font-mono text-lg font-bold tracking-widest text-navy-900">
        {application.checkInCode}
      </p>
      <div className="flex flex-wrap gap-3 no-print">
        <button
          type="button"
          onClick={downloadPng}
          className="flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white"
        >
          <Download className="h-4 w-4" />
          Download QR as PNG
        </button>
        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-2 rounded-lg border border-navy-900 px-4 py-2 text-sm font-medium text-navy-900"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy check-in code"}
        </button>
      </div>
    </div>
  );
}
