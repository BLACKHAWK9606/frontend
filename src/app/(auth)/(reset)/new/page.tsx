"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../layout";

export default function NewPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    if (password.length < 12) {
      setMessage("Password must contain at least 12 characters.");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords must be identical.");
      return;
    }

    const resetToken = sessionStorage.getItem("resetToken");

    if (!resetToken) {
      setMessage("Reset token missing. Please restart the password reset process.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: resetToken,    
          newPassword: password, 
        }),
      });

      const data = await res.json();
      console.log("Reset password response:", data);

      if (!res.ok || data.success === false) {
        setMessage(data.message || "Password reset failed.");
        setLoading(false);
        return;
      }

      setMessage("Password reset successfully! Redirecting...");

      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h1 className="text-2xl font-semibold mb-2 text-center">
        Create new password
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Enter your new password below to complete the reset process.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="************"
          />
          <p className="text-xs text-gray-500 mt-1">
            Password must contain at least 12 characters.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm password
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="************"
          />
          <p className="text-xs text-gray-500 mt-1">
            Passwords must be identical.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-center text-sm ${
            message.includes("success") ? "text-blue-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
