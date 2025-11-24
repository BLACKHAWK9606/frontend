"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../layout";
import { toast } from "sonner";

interface ForgotPasswordResponse {
  tempResetToken?: string;
  message?: string;
  success?: boolean;
  hasSecurityQuestions?: boolean;
  userId?: string;
}

interface VerifyOtpResponse {
  verified: boolean;
  message?: string;
  passwordResetToken?: string;
  requiresSecurityQuestions?: boolean;
  userId?: string;
}

interface SecurityQuestionsStatus {
  isSetup: boolean;
  questions?: Array<{ questionId: number; questionText: string }>;
  userId: string;
}

export default function ResetRequestPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [tempResetToken, setTempResetToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Check security questions status for a user
  async function checkSecurityQuestionsStatus(userId: string): Promise<SecurityQuestionsStatus> {
    try {
      const response = await fetch(`/auth/security-questions/status/${userId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        // If endpoint doesn't exist or returns error, assume no security questions
        return { isSetup: false, userId };
      }

      return await response.json();
    } catch (error) {
      console.error("Error checking security questions status:", error);
      // If we can't check the status, assume no security questions
      return { isSetup: false, userId };
    }
  }

  async function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email.trim(),
        }),
      });

      const data: ForgotPasswordResponse = await response.json();

      if (response.ok && data.tempResetToken) {
        setTempResetToken(data.tempResetToken);
        setUserId(data.userId || null);
        setShowOtpInput(true);
        
        toast.success("OTP sent to your email! Please check your inbox.");
      } else {
        toast.error(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
      console.error("Forgot password error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!tempResetToken) {
      toast.error("Invalid reset token. Please request a new OTP.");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setOtpLoading(true);

    try {
      const response = await fetch("/auth/verify-reset-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tempResetToken,
          otpCode: otp,
        }),
      });

      const data: VerifyOtpResponse = await response.json();

      if (response.ok && data.verified) {
        toast.success("OTP verified successfully!");

        // Determine next step based on security questions requirement
        if (data.requiresSecurityQuestions && data.userId) {
          // Check if user actually has security questions setup
          const status = await checkSecurityQuestionsStatus(data.userId);
          
          if (status.isSetup && status.questions && status.questions.length > 0) {
            // User has security questions - redirect to answer them
            router.push(`/security/answers?userId=${data.userId}&identifier=${encodeURIComponent(email)}`);
          } else {
            // User doesn't have security questions - offer to setup or skip
            const shouldSetup = confirm(
              "For better security, would you like to setup security questions now? " +
              "This will help protect your account in the future.\n\n" +
              "Click OK to setup security questions, or Cancel to continue without them."
            );
            
            if (shouldSetup) {
              router.push(`/security/setup?setup=true&userId=${data.userId}&identifier=${encodeURIComponent(email)}`);
            } else {
              // Continue to password reset without security questions
              if (data.passwordResetToken) {
                sessionStorage.setItem("resetToken", data.passwordResetToken);
              }
              router.push(`/new?identifier=${encodeURIComponent(email)}&userId=${data.userId}`);
            }
          }
        } else if (data.passwordResetToken) {
          // No security questions required, go directly to password reset
          sessionStorage.setItem("resetToken", data.passwordResetToken);
          router.push(`/security/setup?identifier=${encodeURIComponent(email)}${data.userId ? `&userId=${data.userId}` : ''}`);
        } else {
          // Fallback - go to password reset
          router.push(`/new?identifier=${encodeURIComponent(email)}${data.userId ? `&userId=${data.userId}` : ''}`);
        }

      } else {
        toast.error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      console.error("OTP verification error:", error);
    } finally {
      setOtpLoading(false);
    }
  }

  async function handleResendOtp() {
    setLoading(true);

    try {
      const response = await fetch("/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email.trim(),
        }),
      });

      const data: ForgotPasswordResponse = await response.json();

      if (response.ok && data.tempResetToken) {
        setTempResetToken(data.tempResetToken);
        setOtp("");
        toast.success("New OTP sent! Please check your email.");
      } else {
        toast.error(data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      console.error("Resend OTP error:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleBackToEmail() {
    setShowOtpInput(false);
    setOtp("");
    setTempResetToken(null);
    setUserId(null);
  }

  function handleOtpChange(value: string) {
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setOtp(numericValue);
  }

  return (
    
      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Reset Password
        </h1>
        
        {!showOtpInput ? (
          <>
            <p className="text-gray-600 text-center mb-6 text-sm">
              Enter your account email to receive a password reset OTP.
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-gray-600 text-center mb-6 text-sm">
              Enter the 6-digit OTP sent to <br />
              <strong className="text-blue-600">{email}</strong>
            </p>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium mb-1 text-gray-700">
                  OTP Code
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  required
                  value={otp}
                  onChange={(e) => handleOtpChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl font-mono tracking-widest transition-colors"
                  placeholder="000000"
                  maxLength={6}
                  pattern="\d{6}"
                  disabled={otpLoading}
                  autoComplete="one-time-code"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Enter the 6-digit code from your email
                </p>
              </div>

              <button
                type="submit"
                disabled={otpLoading || otp.length !== 6}
                className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {otpLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>

            <div className="mt-4 space-y-2">
              <button
                onClick={handleResendOtp}
                disabled={loading}
                className="w-full text-sm text-blue-600 hover:text-blue-700 underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Resending OTP..." : "Resend OTP"}
              </button>
              
              <button
                onClick={handleBackToEmail}
                className="w-full text-sm text-gray-600 hover:text-blue-600 underline transition-colors"
              >
                Use different email
              </button>
            </div>
          </>
        )}

        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-gray-600 hover:text-blue-600 underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    
  );
}