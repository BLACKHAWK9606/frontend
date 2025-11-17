"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../layout";
import { toast } from "sonner";

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);



  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    const tempToken = sessionStorage.getItem("tempToken");
    if (!tempToken) {
      setMessage("Missing temporary token. Please sign in again.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/auth/verify-login-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          tempToken,      
          otpCode: otp,   
        }),
      });

      const text = await res.text();
      let data: any;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        setMessage(data?.message || `Verification failed (${res.status})`);
        return;
      }

      // Success — store tokens if backend returns them
      if (data?.accessToken) {
        sessionStorage.setItem("accessToken", data.accessToken);
        if (data?.refreshToken)
          sessionStorage.setItem("refreshToken", data.refreshToken);
      }

      sessionStorage.removeItem("tempToken");
      setMessage("✅ OTP verified! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err:any) {
      toast.error("OTP verification error:", err);
      setMessage("Network error — please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    
      <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-xl sm:text-2xl font-semibold mb-3 text-center">
            Verify OTP
          </h1>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-4">
            Enter the 6-digit code sent to your email or phone.
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              className="w-full border rounded-md px-3 py-2 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
            />

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-3 text-center text-sm ${
                message.includes("✅") ? "text-blue-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="text-center mt-4">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-gray-600 hover:text-blue-600 underline"
            >
              Back to Sign In
            </button>
          </div>
        </div>
    
  );
}
