"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

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

    setLoading(true);
    // --- Simulate backend reset ---
    setTimeout(() => {
      setMessage("✅ Password reset successfully! Redirecting...");
      setLoading(false);
      setTimeout(() => router.push("/"), 1500);
    }, 1200);
  }

  return (
    
     <div className="flex flex-col md:flex-row w-screen h-screen">    
            
  {/* Left Section – Sign-in */}
  <div className="flex-1 flex items-center justify-center p-8 text-foreground dark:text-foreground">
    <div className="w-full max-w-md p-8">

      {/* Logo / Image Title */}
      <div className="flex justify-center mb-6">
        <img 
          src="/insuremaster_logo.png" 
          alt="insuremaster logo" 
          className="h-14 w-auto object-contain"
        />
      </div>

      {/* Text Title */}
      <h2 className="text-center text-xl font-semibold mb-2 text-(--custom-secondary)">
        First Time Login Password Reset
      </h2>
      <p className="text-center text-sm text-foreground dark:text-foreground mb-6 ">
        Please enter New Password to reset
      </p>

      {/* Create new password Form */}

      <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Old Password"
            />
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter New Password"
            />
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
            />
        
        {/* Submit Button */}
        <button
              type="submit"
              disabled={loading}
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
                    <span className="mx-auto">Resetting...</span>
                  ) : (
                  <>
                    <span>Reset password</span>
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
        
          {message && (
            <p
              className={`mt-3 text-center text-sm ${
                message.includes("✅") ? "text-blue-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
  

        {/* Form Text*/}
        <div className="flex items-center justify-between mt-4">
         
          {/* Right: Forgot password */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-sm text-blue-600 hover:text-blue-800 underline justify-end"
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
          src="/reset_first_time.png"
          alt="Authentication Illustration"
          className="w-full h-full object-fit"
        /> 
        </div>

        {/* Overlay Text with Circle Icon */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex flex-col items-start mb-3 gap-2">
            {/* Circle Icon */}
            <span className="bg-(--custom-secondary) rounded-full w-10 h-10"></span>
            <h2 className="text-white text-2xl font-bold drop-shadow-lg">
              A single touchpoint to manage the whole insurance policy management cycle
            </h2>
          </div>
        </div>
      </div>
    </div>
      </div>
   
  );
}
