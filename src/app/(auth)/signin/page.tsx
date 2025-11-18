"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return { ok: false, message: "Invalid email format" };
  }

  return { ok: true };
}


interface FormData {
  identifier: string;
  password: string;
  authType: string;
}

export default function SignInPage() {
  const router = useRouter();

  const [useAD, setUseAD] = useState(false);
  const [form, setForm] = useState<FormData>({
    identifier: "",
    password: "",
    authType: "EMAIL",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    try {

      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Access Token not found");
      }
      setToken(token);
            
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
    }

    }, []);




  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerMsg(null);
  }

  function clientValidate(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};

    if (!form.identifier) errs.identifier = "Email or domain email is required";
    if (!form.password || form.password.length < 8)
      errs.password = "Password must be at least 8 characters";

    // For EMAIL authType, validate format
    if (!useAD) {
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
      const payload = {
        identifier: form.identifier,
        password: form.password,
        authType: useAD ? "ACTIVE_DIRECTORY" : "EMAIL",
      };

      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          accept :"application/json", 
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify(payload),
        credentials: "include",
      }
    );

      let data;
        try {
             data = await res.json();     
        } catch {
             const text = await res.text(); 
              data = { message: text };
        }

      if (!res.ok) {
        setServerMsg(data?.message || `Sign in failed (${res.status})`);
      } else {
        // 🔹 Save tempToken for OTP verification
        if (data?.tempToken) {
          sessionStorage.setItem("tempToken", data.tempToken);
        }
        if (data?.user) {
          sessionStorage.setItem("user", JSON.stringify(data.user));
        }

        setServerMsg("OTP sent! Redirecting to verification page...");
        setTimeout(() => router.push("/otp"), 800);
      }
    } catch (err) {
      console.error("Network error", err);
      setServerMsg(
        `Network error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Auth toggle */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium">
            Sign in with {useAD ? "Active Directory" : "Email"}
          </label>
          <button
            type="button"
            className="text-sm text-blue-600 underline"
            onClick={() => setUseAD(!useAD)}
          >
            Use {useAD ? "Email" : "Active Directory"} instead
          </button>
        </div>

        {/* Identifier Input */}
        <div>
          <input
            name="identifier"
            value={form.identifier}
            onChange={onChange}
            className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
              errors.identifier ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={
              useAD ? "domain\\username or user@domain.com" : "you@example.com"
            }
          />
          {errors.identifier && (
            <p className="text-sm text-red-600 mt-1">{errors.identifier}</p>
          )}
        </div>

        {/* Password */}
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

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>

        {/* Message */}
        {serverMsg && (
          <p
            className={`mt-2 text-center text-sm ${
              serverMsg.includes("OTP") ? "text-blue-600" : "text-red-600"
            }`}
          >
            {serverMsg}
          </p>
        )}
      </form>

      <div className="text-center mt-4">
        <button
          onClick={() => router.push("/request")}
          className="text-sm text-gray-600 hover:text-blue-600 underline"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
}
