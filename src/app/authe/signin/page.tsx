"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

// --- TEMP validator ---
function validateEmail(email: string): { ok: boolean; message?: string } {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email)
    ? { ok: true }
    : { ok: false, message: "Invalid email format" };
}

interface FormData {
  identifier: string;
  password: string;
  authType: string;
}

export default function SignInPage() {
  const router = useRouter();

  const [usePhone, setUsePhone] = useState(false);
  const [form, setForm] = useState<FormData>({ identifier: "", password: "", authType: "email" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerMsg(null);
  }

  function clientValidate(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.identifier) errs.identifier = "Email or phone is required";
    if (!form.password || form.password.length < 8)
      errs.password = "Password must be at least 8 characters";
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
      console.log('Making request to /auth/login with:', {
        identifier: form.identifier,
        authType: usePhone ? "phone" : "email"
      });
      
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.identifier,
          password: form.password,
          authType: usePhone ? "phone" : "email",
        }),
      });

    //   console.log('Response status:', res.status);
    //   console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      
      const responseText = await res.text();
      console.log('Response text:', responseText);
      console.log("Response body:", responseText);
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText };
      }
      console.log('Parsed response data:', data);
      if (!res.ok) {
        setServerMsg(data?.message || `Sign in failed (${res.status})`);
      } else {
        // Store tokens securely using AuthManager
        const { accessToken, refreshToken, expiresIn } = data;
        // AuthManager.setTokens({ accessToken, refreshToken, expiresIn });
        setServerMsg("Signed in successfully — redirecting...");
        setTimeout(() => router.push("/dashboard"), 800);
      }
    } catch (err) {
      console.error("Network error", err);
      setServerMsg(`Network error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">
              Sign in with {usePhone ? "phone" : "email"}
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
              placeholder="Your password"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <a
              href="/forgot-password"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Forgot password?
            </a>
            <a
              href="/authe/signup"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              No account? Sign up
            </a>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
          
          <div className="text-center">
            <a
              href="/api/test"
              target="_blank"
              className="text-xs text-gray-500 underline"
            >
              Test Backend Connection
            </a>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">Or sign in with</p>
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
