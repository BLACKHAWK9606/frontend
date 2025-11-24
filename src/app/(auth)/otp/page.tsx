"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

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
    toast.error(null);

    const tempToken = sessionStorage.getItem("tempToken");
    if (!tempToken) {
      toast.error("Missing temporary token. Please sign in again.");
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

      let data;
        try {
             data = await res.json();     
        } catch {
             const text = await res.text(); 
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
      toast.error("✅ OTP verified! Redirecting...");
    } catch (err:any) {
      toast.error("OTP verification error:", err);
      toast.error("Network error — please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
     <div className="flex flex-col md:flex-row w-screen h-screen">    
            

 {/* Left Section – Sign-in */}
<div className="flex-1 flex items-center justify-center p-8 text-foreground dark:text-foreground">
  <div className="w-full max-w-md p-8">

    {/* Logo / Image Title */}
    <div className="flex justify-start mb-6">
      <img 
        src="/insuremaster_logo.png" 
        alt="insuremaster logo" 
        className="h-14 w-auto object-contain"
      />
    </div>

    {/* Text Title */}
    <h2 className="text-start text-xl font-semibold mb-2 text-(--custom-secondary)">
      Welcome to InsureMaster
    </h2>
    <p className="text-start text-sm text-foreground dark:text-foreground mb-6">
      Enter OTP
    </p>

    {/* OTP Form */}

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
      
      {/* Submit Button */}
      <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full py-2 px-4
              flex flex-row items-center justify-between
              rounded-md
              bg-(--custom-primary) dark:bg-(--custom-primary) text-white font-semibold
              hover:bg-(--hover)
              disabled:opacity-60
              transition-all duration-300
              group"
            >
              {loading ? (
                  <span className="mx-auto">Verifying ...</span>
                ) : (
                <>
                  <span>Submit</span>
                  <ArrowRight
                    className="
                      w-4 h-4 
                      transform transition-all duration-300
                      opacity-80
                      group-hover:translate-x-1
                      group-hover:opacity-100
                    "
                  />
                </>
                )
              }

      </button>
      

      {/* Message */}
       {message && (
            <p
              className={`mt-3 text-center text-sm ${
                message.includes("✅") ? "text-blue-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}  

      {/* Remember + Forgot password */}
      <div className="flex items-center justify-between mt-4">
        {/* Left: Resend OTP*/}
        <label className="flex items-center gap-2 text-sm text-foreground dark:text-foreground">
          Resend OTP
        </label>

        {/* Right: Forgot password */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Back to Login
        </button>
      </div>  
    </form>

    {/* Footer (Logo + text link) */}
    <div className="mt-10 flex flex-row items-start gap-3 text-xs text-foreground dark:text-foreground">
      <div className="flex items-center gap-3">
        <img
          src="/em_tech_logo.png"
          alt="InsureMaster small footer logo"
          className="h-6 w-auto"
        />
      </div> 
      <div className="flex flex-col items-start gap-2">
       <span className="font-normal">Developed and maintained by:</span> 
       <span className="font-bold text-(--custom-primary)">E&M Technology House </span>
       </div>
    </div>
  </div>
</div>

  {/* Right Section – Hero Image */}
  <div className="flex-1 hidden md:flex items-center justify-center p-4">
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      
      
      {/* Overlay Gradient for Readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent min-w-md">
     <img
        src="/otp_image.png"
        alt="Authentication Illustration"
        className="w-full h-full object-fit"
      /> 
      </div>

      {/* Overlay Text with Circle Icon */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white gap-1">
          <div className="flex flex-col items-start mb-3">
            {/* Circle Icon */}
            <span className="bg-(--custom-secondary) rounded-full w-10 h-10"></span>
            <h2 className="text-white text-4xl font-medium drop-shadow-lg">
              A single touchpoint to manage the whole insurance policy management cycle
            </h2>
          </div>
        </div>
    </div>
  </div>
</div>
      
    
  );
}
