"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // --- Simulated verification delay ---
    setTimeout(() => {
      if (otp === "123456") {
        setMessage("✅ OTP verified! Redirecting...");
        // fake saving a token
        sessionStorage.setItem("token", "fake-auth-token");
        setTimeout(() => router.push("/banca/dashboard"), 1500);
      } else {
        setMessage("❌ Invalid OTP. Try again.");
      }
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left side - image */}
      <div className="hidden lg:flex items-center justify-center bg-gray-100">
        <img
          src="/login.jpg"
          alt="Authentication visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - form */}
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
        <div className="max-w-sm sm:max-w-md w-full bg-white p-4 sm:p-6 rounded-2xl shadow">
          <h1 className="text-xl sm:text-2xl font-semibold mb-3 text-center">
            Verify OTP
          </h1>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-4">
            Enter the 6-digit code sent to your email or phone.
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
      </div>
    </div>
  );
}
