'use client';

import { useState, useEffect } from "react";

interface User {
  fullName?: string;
  roleName?: string;
}

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const userStr = sessionStorage.getItem("user");
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    } catch {
      setUser(null);
    }
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="bg-white shadow-md border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-blue-600">Dashboard</h1>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <i className="fas fa-bell text-lg"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <i className="fas fa-envelope text-lg"></i>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.fullName ? user.fullName.slice(0, 2).toUpperCase() : "U"}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.fullName || "User"}
                </p>
                <p className="text-xs text-gray-500">{user?.roleName || ""}</p>
              </div>
              <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-60 overflow-hidden">
                <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 max-h-60">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-700">
                      {greeting()}, {user?.fullName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 uppercase">{user?.roleName || ""}</p>
                  </div>

                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-user text-gray-400"></i>
                    My Profile
                  </a>
                  <a
                    href="./settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-cog text-gray-400"></i>
                    Settings
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-question-circle text-gray-400"></i>
                    Help & Support
                  </a>
                  <div className="border-t border-gray-200 my-1"></div>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    Sign Out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
