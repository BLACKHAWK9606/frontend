'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BarChart2,
  Users,
  FileText,
  ClipboardCheck,
  LineChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        console.error('No token found in sessionStorage');
        sessionStorage.clear();
        window.location.href = '/';
        return;
      }

      const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Logout Successful:', result);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('calendly-store');
        sessionStorage.removeItem('calendly-internal-store');
        window.location.href = '/';
      } else {
        console.error('Logout Failed:', response.status);
        sessionStorage.clear();
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during logout:', error);
      sessionStorage.clear();
      window.location.href = '/';
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-64 xl:w-64 lg:w-56 md:w-48' : 'w-20 xl:w-20 lg:w-16 md:w-14'
      } bg-linear-to-t from-blue-900 to-blue-600 text-white border-r-2 shadow-lg transition-all duration-300 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isSidebarOpen ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold">Bancassurance</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-blue-200 rounded-lg mx-auto"></div>
        )}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 rounded-lg hover:bg-blue-700 text-white"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="./dashboard" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
          <BarChart2 className="w-5 h-5" />
          {isSidebarOpen && <span>Dashboard</span>}
        </Link>

        <Link href="./customer" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
          <Users className="w-5 h-5" />
          {isSidebarOpen && <span className="font-medium">Customers</span>}
        </Link>

        <Link href="./policy-management" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
          <FileText className="w-5 h-5" />
          {isSidebarOpen && <span>Policy Management</span>}
        </Link>

        <Link href="./claims" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
          <ClipboardCheck className="w-5 h-5" />
          {isSidebarOpen && <span>Claims Processing</span>}
        </Link>

        <Link href="./reports" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
          <LineChart className="w-5 h-5" />
          {isSidebarOpen && <span>Reports & Analytics</span>}
        </Link>

        <Link href="./settings" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          {isSidebarOpen && <span>Settings</span>}
        </Link>
      </nav>

      <footer className="p-4 border-t border-blue-700 space-y-3">
        <button onClick={handleLogout} disabled={isLoggingOut} className="w-full flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <LogOut className="w-5 h-5" />
          {isSidebarOpen && <span>{isLoggingOut ? 'Signing Out...' : 'Sign Out'}</span>}
        </button>
        {isSidebarOpen ? (
          <div className="text-center">
            <p className="text-xs text-white mt-1">© 2025 Bancassurance</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xs text-blue-200">B.A</p>
          </div>
        )}
      </footer>
    </aside>
  );
}
