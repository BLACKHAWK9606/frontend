'use client';
import { useRouter } from "next/navigation";
import { useState } from 'react';
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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setShowLogoutConfirm(false);
    router.push("/");
  }

  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? 'w-64 xl:w-64 lg:w-56 md:w-48' : 'w-20 xl:w-20 lg:w-16 md:w-14'
        } bg-gradient-to-t from-blue-900 to-blue-600 text-white border-r-2 shadow-lg transition-all duration-300 flex flex-col`}
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
          <a href="./dashboard" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <BarChart2 className="w-5 h-5" />
            {isSidebarOpen && <span>Dashboard</span>}
          </a>
          <a href="./customer" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium">Customers</span>}
          </a>
          <a href="./policy-management" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <FileText className="w-5 h-5" />
            {isSidebarOpen && <span>Policy Management</span>}
          </a>
          <a href="./claims" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <ClipboardCheck className="w-5 h-5" />
            {isSidebarOpen && <span>Claims Processing</span>}
          </a>
          <a href="./reports" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <LineChart className="w-5 h-5" />
            {isSidebarOpen && <span>Reports & Analytics</span>}
          </a>
          <a href="./settings" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            {isSidebarOpen && <span>Settings</span>}
          </a>
        </nav>

        <footer className="p-4 border-t border-blue-700 space-y-3">
          <button
            className="w-full flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Sign Out</span>}
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

     {/* confirmation message */}
      {showLogoutConfirm && (
        <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Sign Out</h2>
            <p className="mb-6">Are you sure you want to sign out?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
