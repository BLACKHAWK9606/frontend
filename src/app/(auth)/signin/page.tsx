"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";



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
    
  <div className="flex flex-col md:flex-row w-screen h-screen">    
            
 {/* Left Section – Sign-in */}
<div className="flex-1 flex items-center justify-center p-8">
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
    <p className="text-start text-sm text-gray-600 dark:text-gray-300 mb-6">
      Login with your credentials to proceed
    </p>

    {/* Login Form */}

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

      {/* Identifier */}
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full py-2 px-4
          flex flex-row items-center justify-between
          rounded-md
          bg-(--custom-primary) dark:bg-(--custom-primary) text-white font-semibold
          hover:bg-(--hover)
          disabled:opacity-60
          transition-all duration-300
          group
        "
      >
        {loading ? (
          <span className="mx-auto">Signing in...</span>
        ) : (
          <>
            <span>Login</span>
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
        )}
      </button>

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

      {/* Remember + Forgot password */}
      <div className="flex items-center justify-between mt-4">
        {/* Left: checkbox */}
        <label className="flex items-center gap-2 text-sm text-foreground ">
          <input 
            type="checkbox" 
            className="h-4 w-4 rounded border border-gray-400"
          />
          Remember me
        </label>

        {/* Right: Forgot password */}
        <button
          type="button"
          onClick={() => router.push("/request")}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Forgot password?
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
        src="/login_image.png"
        alt="Authentication Illustration"
        className="w-full h-full object-fit"
      /> 
      </div>

      {/* Overlay Text with Circle Icon */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center mb-3">
          {/* Circle Icon */}
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-amber-600 mr-2"
          >
            <circle cx="12" cy="12" r="10"/>
          </svg>
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
