"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../layout";

export default function ResetRequestPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    // --- Simulate backend request ---
    setTimeout(() => {
      setMessage("✅ Password reset link sent! Check your email.");
      setLoading(false);
    }, 1000);
  }

  return (
    
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Reset password
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your account email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Reset password"}
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
