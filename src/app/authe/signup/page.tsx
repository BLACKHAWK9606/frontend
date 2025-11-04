"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

// --- TEMP validator (since TS can't find '../../lib/validators') ---
function validateEmail(email: string): { ok: boolean; message?: string } {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email)
    ? { ok: true }
    : { ok: false, message: "Invalid email format" };
}

interface FormData {
  identifier: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const router = useRouter();

  const [usePhone, setUsePhone] = useState(false);
  const [form, setForm] = useState<FormData>({
    identifier: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerMsg(null);
  }

  function clientValidate(): boolean {
    const errs: Partial<FormData> = {};
    if (!form.identifier) errs.identifier = "Email or phone is required";
    if (!form.password || form.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (!usePhone) {
      const e = validateEmail(form.identifier);
      if (!e.ok) errs.identifier = e.message;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!clientValidate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.identifier,
          password: form.password,
          type: usePhone ? "phone" : "email",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerMsg(data?.message || "Sign up failed");
      } else {
        setServerMsg("Account created successfully — redirecting...");
        setTimeout(() => router.push("/authe/signin"), 800);
      }
    } catch (err) {
      console.error("Network error", err);
      setServerMsg("Network error — please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Create your account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">
              Sign up with {usePhone ? "phone" : "email"}
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 underline"
              onClick={() => setUsePhone(!usePhone)}
            >
              Use {usePhone ? "email" : "phone"} instead
            </button>
          </div>

          <div>
            <input
              name="identifier"
              value={form.identifier}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.identifier ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={usePhone ? "+254700000000" : "you@example.com"}
            />
            {errors.identifier && (
              <p className="text-sm text-red-600 mt-1">{errors.identifier}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="At least 8 characters"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <a
              href="/authe/signin"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Already have an account? Sign in
            </a>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">Or sign up with</p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <a
                href="/api/auth/ad/start"
                className="px-3 py-2 border rounded-md hover:bg-gray-50"
              >
                Active Directory
              </a>
            </div>
          </div>

          {serverMsg && (
            <p
              className={`mt-2 text-center text-sm ${
                serverMsg.includes("successfully")
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              {serverMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
