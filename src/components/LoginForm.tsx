"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Info, LoaderCircle } from "lucide-react";
import { Field, fieldClass, safeNext } from "./forms/Field";
import { useStore } from "./store/StoreProvider";
import { EMAIL_RE } from "@/lib/validation";

export function LoginForm() {
  const router = useRouter();
  const { onLogin } = useStore();
  const [next, setNext] = useState("/account");
  const [reason, setReason] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect -- read ?next / ?reason after hydration */
    setNext(safeNext(sp.get("next")));
    setReason(sp.get("reason"));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!EMAIL_RE.test(email.trim())) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Enter your password.";
    setErrors(errs);
    setFormError("");
    if (Object.keys(errs).length) return;

    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; user?: { firstName: string } };
      if (!res.ok || !json.ok || !json.user) throw new Error(json.error || "Login failed. Please try again.");
      onLogin(json.user.firstName);
      router.replace(next);
      router.refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Login failed. Please try again.");
      setBusy(false);
    }
  }

  return (
    <>
      {reason && (
        <p className="mt-6 flex items-start gap-2 rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {reason === "buy" ? "Please log in to complete your purchase." : "Please log in to add products to your cart."} Your
          selection will be saved.
        </p>
      )}
      <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
        <Field label="Email" required error={errors.email}>
          {(a) => (
            <input
              {...a}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className={fieldClass(errors.email)}
            />
          )}
        </Field>
        <Field label="Password" required error={errors.password}>
          {(a) => (
            <div className="relative">
              <input
                {...a}
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className={`${fieldClass(errors.password)} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center text-muted hover:text-ink"
              >
                {show ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
              </button>
            </div>
          )}
        </Field>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 accent-brand-600"
            />
            Remember me for 30 days
          </label>
          <Link href="/forgot-password" className="text-sm font-medium text-brand-600 underline underline-offset-2">
            Forgot password?
          </Link>
        </div>

        {formError && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {formError}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn-primary w-full py-3 text-base disabled:opacity-70">
          {busy && <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />}
          {busy ? "Logging in…" : "Login"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-body">
        Don&apos;t have an account?{" "}
        <Link
          href={`/register${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-semibold text-brand-600 underline underline-offset-2"
        >
          Create one
        </Link>
      </p>
    </>
  );
}
