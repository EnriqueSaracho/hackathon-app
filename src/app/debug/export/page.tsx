"use client";

import { exportApplicationsJson } from "@/lib/storage";

export default function DebugExportPage() {
  function download() {
    const json = exportApplicationsJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "viltrumhacks-applications.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-off-white px-6 py-16">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="font-display text-2xl font-bold text-navy-900">
          Export Applications
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Download all applications stored in this browser as JSON.
        </p>
        <button
          type="button"
          onClick={download}
          className="mt-6 rounded-lg bg-navy-900 px-6 py-3 font-semibold text-white"
        >
          Download JSON
        </button>
      </div>
    </div>
  );
}
