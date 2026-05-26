"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/components/auth/AuthProvider";
import { loginSchema, type LoginFormData } from "@/lib/validation";

const APPLY_ROUTES = ["/apply", "/mentor", "/volunteer"];

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [authError, setAuthError] = useState("");

  const next = searchParams.get("next");
  const isApplyRedirect = next ? APPLY_ROUTES.some((r) => next.startsWith(r)) : false;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormData) {
    setAuthError("");
    try {
      login(data.email, data.password);
      const destination = next && next.startsWith("/") ? next : "/";
      router.replace(destination);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Login failed.");
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-2 text-center font-display text-3xl font-bold text-navy-900">
        {isApplyRedirect ? "Log in to continue your application" : "Log in"}
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
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-error">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-accent-yellow py-3 font-semibold text-navy-950 transition hover:brightness-110 disabled:opacity-50"
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-center text-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href={next ? `/signup?next=${encodeURIComponent(next)}` : "/signup"}
            className="font-medium text-navy-900 underline"
          >
            Sign up
          </Link>
        </p>
      </form>

      <div className="mt-6 rounded-lg border border-navy-200 bg-white px-4 py-4 text-sm text-text-muted">
        <p className="mb-2 font-medium text-navy-900">Demo accounts</p>
        <ul className="space-y-1 font-mono text-xs">
          <li>
            <span className="text-navy-900">mark@viltrumhacks.test</span> /
            mark &mdash; attendee
          </li>
          <li>
            <span className="text-navy-900">eve@viltrumhacks.test</span> / eve
            &mdash; attendee
          </li>
          <li>
            <span className="text-navy-900">allen@viltrumhacks.test</span> /
            allen &mdash; staff (volunteer scanner)
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-off-white px-6 py-16">
      <Suspense fallback={<p className="text-center">Loading…</p>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
