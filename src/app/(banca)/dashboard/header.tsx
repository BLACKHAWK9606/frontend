"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "@/components/ui/toast";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Get the token from sessionStorage
      const token = sessionStorage.getItem('token');

      if (!token) {
        console.error('No token found in sessionStorage');
        //Redirect to login anyway
        sessionStorage.clear();
        window.location.href = '/';
        return;
      }

      const response = await fetch ('/auth/logout', {
        method: 'POST', 
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if(response.ok) {
        const result = await response.json ();
        console.log('Logout Successful:', result);
        toast.success('Logged out successfully');

        //Clear all user data from sessionStorage
        sessionStorage.removeItem('token');
        // Remove any other auth-related items if they exist
        sessionStorage.removeItem('calendly-store');
        sessionStorage.removeItem('calendly-internal-store');

        //Redirect to login page
        window.location.href = '/'
      } else {
        console.error('Logout Failed:', response.status);
        //Even if API call fails, clear session storage and redirect
        sessionStorage.clear();
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Error during logout:', error);
      //Clear storage and redirect even on network errors
      sessionStorage.clear();
      window.location.href = '/'
    } finally {
      setIsLoggingOut(false);
      setIsProfileOpen(false);
    }
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
              <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AD</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-60 overflow-hidden">
                <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 max-h-60">
                  <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-user text-gray-400"></i>
                    My Profile
                  </Link>
                  <Link href="./settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-cog text-gray-400"></i>
                    Settings
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-question-circle text-gray-400"></i>
                    Help & Support
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button onClick={handleLogout} disabled={isLoggingOut} className={`flex items-center gap-3 px-4 py-2 text-sm w-full text-left ${isLoggingOut ? 'text-gray-400 cursor-not-allowed':'text-red-600 hover:bg-gray-100'}`}>
                      <i className="fas fa-sign-out-alt"></i>
                      {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
