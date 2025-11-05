"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // Example: handle logout
  const handleLogout = () => {
    router.push("/"); 
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-lg bg-white p-10 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-semibold mb-3 text-gray-800">
          Welcome back! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          You’ve successfully logged in. This is your personalized homepage.
        </p>
        <button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
        >
          Log Out
        </button>
      </div>
    </main>
  );
}
