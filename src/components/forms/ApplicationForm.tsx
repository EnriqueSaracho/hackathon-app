"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Application, ApplicationRole } from "@/lib/types";
import { updateSession } from "@/lib/auth";
import {
  emailExists,
  getApplications,
  saveApplication,
} from "@/lib/storage";
import { generateApplicationId, generateCheckInCode } from "@/lib/ids";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  hackerSchema,
  mentorSchema,
  volunteerSchema,
  type HackerFormData,
  type MentorFormData,
  type VolunteerFormData,
} from "@/lib/validation";
import { RoleSwitcher } from "@/components/forms/RoleSwitcher";

type FormData = HackerFormData | MentorFormData | VolunteerFormData;

const roleLabels: Record<ApplicationRole, string> = {
  hacker: "Hacker",
  mentor: "Mentor",
  volunteer: "Volunteer",
};

function getSchema(role: ApplicationRole) {
  if (role === "hacker") return hackerSchema;
  if (role === "mentor") return mentorSchema;
  return volunteerSchema;
}

export function ApplicationForm({ role }: { role: ApplicationRole }) {
  const router = useRouter();
  const { session, refresh } = useAuth();
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const schema = getSchema(role);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: session?.fullName ?? "",
      email: session?.email ?? "",
      experienceLevel: "beginner",
      ...(role === "hacker" ? { teamPreference: "solo" as const } : {}),
    },
  });

  const email = watch("email");

  function checkDuplicate(value: string) {
    setDuplicateWarning(value ? emailExists(value) : false);
  }

  function onSubmit(data: FormData) {
    let applicationId = generateApplicationId();
    const apps = getApplications();
    while (apps[applicationId]) {
      applicationId = generateApplicationId();
    }

    const base = {
      applicationId,
      checkInCode: generateCheckInCode(),
      createdAt: new Date().toISOString(),
      fullName: data.fullName,
      email: data.email,
      experienceLevel: data.experienceLevel,
      dietaryNotes: data.dietaryNotes,
      agreedToCoC: true as const,
    };

    const application: Application =
      role === "hacker"
        ? { ...base, role: "hacker", school: (data as HackerFormData).school, teamPreference: (data as HackerFormData).teamPreference }
        : { ...base, role: role as "mentor" | "volunteer" };

    saveApplication(application);
    updateSession({ applicationId });
    refresh();
    router.push(`/apply/success?id=${applicationId}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-lg space-y-5 rounded-xl bg-white p-8 shadow-lg"
    >
      <h1 className="font-display text-3xl font-bold text-navy-900">
        Apply as {roleLabels[role]}
      </h1>

      {session?.role === "staff" && <RoleSwitcher currentRole={role} />}

      {duplicateWarning && (
        <p className="rounded-lg border border-accent-yellow/50 bg-accent-yellow/10 px-4 py-3 text-sm text-navy-900">
          This email already has an application on this device. You can still
          submit another.
        </p>
      )}

      <Field label="Full name" error={errors.fullName?.message}>
        <input
          {...register("fullName")}
          className="input-field"
          autoComplete="name"
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          className="input-field"
          autoComplete="email"
          onBlur={(e) => checkDuplicate(e.target.value)}
        />
      </Field>

      {role === "hacker" && (
        <Field
          label="School"
          error={
            "school" in errors
              ? (errors as { school?: { message?: string } }).school?.message
              : undefined
          }
        >
          <input {...register("school" as keyof FormData)} className="input-field" />
        </Field>
      )}

      <Field label="Experience level" error={errors.experienceLevel?.message}>
        <select {...register("experienceLevel")} className="input-field">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </Field>

      {role === "hacker" && (
        <Field
          label="Team preference"
          error={
            "teamPreference" in errors
              ? (errors as { teamPreference?: { message?: string } })
                  .teamPreference?.message
              : undefined
          }
        >
          <select
            {...register("teamPreference" as keyof FormData)}
            className="input-field"
          >
            <option value="solo">Solo</option>
            <option value="have-team">I have a team</option>
            <option value="find-team">Help me find a team</option>
          </select>
        </Field>
      )}

      <Field label="Dietary notes (optional)" error={undefined}>
        <textarea
          {...register("dietaryNotes")}
          className="input-field min-h-[80px]"
          rows={3}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          {...register("agreedToCoC")}
          className="mt-1"
        />
        <span>
          I agree to the Code of Conduct and confirm I meet the eligibility
          requirements.
        </span>
      </label>
      {errors.agreedToCoC && (
        <p className="text-sm text-error">{errors.agreedToCoC.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-accent-yellow py-3 font-semibold text-navy-950 transition hover:brightness-110 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting…" : "Submit application"}
      </button>

      <p className="text-xs text-text-muted">
        Practice app — data stored only in this browser.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-text-dark">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
