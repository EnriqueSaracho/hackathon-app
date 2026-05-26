"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/components/auth/AuthProvider";
import { signupSchema, type SignupFormData } from "@/lib/validation";

const APPLY_ROUTES = ["/apply", "/mentor", "/volunteer"];

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup } = useAuth();
  const [authError, setAuthError] = useState("");

  const next = searchParams.get("next");
  const isApplyRedirect = next ? APPLY_ROUTES.some((r) => next.startsWith(r)) : false;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: "attendee" },
  });

  function onSubmit(data: SignupFormData) {
    setAuthError("");
    try {
      signup(data.fullName, data.email, data.password, data.role);
      const destination = next && next.startsWith("/") ? next : "/";
      router.replace(destination);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Signup failed.");
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-2 text-center font-display text-3xl font-bold text-navy-900">
        {isApplyRedirect ? "Sign up to continue your application" : "Create an account"}
      </h1>

      <div className="mb-6 rounded-lg border border-accent-yellow/40 bg-accent-yellow/10 px-4 py-3 text-center text-sm text-navy-900">
        This is a demo &mdash; your data is stored only in this browser&apos;s
        session and will be lost when you close the tab.
      </div>

      {authError && (
        <p className="mb-4 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-center text-sm text-error">
          {authError}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-xl bg-white p-8 shadow-lg"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-text-dark">
            Full name
          </label>
          <input
            {...register("fullName")}
            className="input-field"
            autoComplete="name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-error">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-dark">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="input-field"
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-dark">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="input-field"
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-error">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-dark">
            Role
          </label>
          <select {...register("role")} className="input-field">
            <option value="attendee">Attendee</option>
            <option value="staff">Volunteer / Staff</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-error">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-accent-yellow py-3 font-semibold text-navy-950 transition hover:brightness-110 disabled:opacity-50"
        >
          {isSubmitting ? "Creating account…" : "Sign up"}
        </button>

        <p className="text-center text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            href={next ? `/login?next=${encodeURIComponent(next)}` : "/login"}
            className="font-medium text-navy-900 underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <Suspense fallback={<p className="text-center">Loading…</p>}>
        <SignupContent />
      </Suspense>
    </div>
  );
}
