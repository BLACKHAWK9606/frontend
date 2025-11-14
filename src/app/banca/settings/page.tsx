'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

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

const settingsContent = {
  general: {
    title: 'General Settings',
    description: 'Manage your account and application preferences',
    stats: 'Last updated: Today',
  },
  notifications: {
    title: 'Notification Settings',
    description: 'Configure how you receive alerts and updates',
    stats: 'Active notifications: 5',
  },
  security: {
    title: 'Security Settings',
    description: 'Manage your password and security preferences',
    stats: 'Last login: Today',
  },
  system: {
    title: 'System Settings',
    description: 'Configure system-wide preferences and defaults',
    stats: 'System status: Active',
  },
};


export default function SettingsPage() {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
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
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('calendly-store');
        sessionStorage.removeItem('calendly-internal-store');
        window.location.href = '/';
      } else {
        sessionStorage.clear();
        window.location.href = '/';
      }
    } catch (error) {
      sessionStorage.clear();
      window.location.href = '/';
    } finally {
      setIsLoggingOut(false);
    }
  };
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'general';
  const currentContent = settingsContent[currentTab as keyof typeof settingsContent] || settingsContent.general;

const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
     if (!token) {
    router.replace("/"); // absolute path
    return;
  }
  const userStr = sessionStorage.getItem("user");
  if (!userStr) {
    router.replace("/"); // absolute path
    return;
  }
  const user = JSON.parse(userStr);
  if (user.roleName !== "SUPERUSER") {
    router.replace("/dashboard"); // absolute path
  }
  }, [router]);



  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen
            ? 'w-64 xl:w-64 lg:w-56 md:w-48'
            : 'w-20 xl:w-20 lg:w-16 md:w-14'
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
          <a href="./dashboard" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <BarChart2 className="w-5 h-5" />
            {isSidebarOpen && <span>Dashboard</span>}
          </a>
          <a href="./customer" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            {isSidebarOpen && <span>Customers</span>}
          </a>
          <a href="./policy-management" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <FileText className="w-5 h-5" />
            {isSidebarOpen && <span>Policy Management</span>}
          </a>
          <a href="./claims-processing" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <ClipboardCheck className="w-5 h-5" />
            {isSidebarOpen && <span>Claims Processing</span>}
          </a>
          <a href="./reports" className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
            <LineChart className="w-5 h-5" />
            {isSidebarOpen && <span>Reports & Analytics</span>}
          </a>
          <a href="./settings" className="flex items-center gap-3 p-3 bg-blue-700 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            {isSidebarOpen && <span className="font-semibold">Settings</span>}
          </a>
        </nav>

        <footer className="p-4 border-t border-blue-700 space-y-3">
          <button onClick={handleLogout} disabled={isLoggingOut} className="w-full flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>{isLoggingOut ? 'Signing Out...' : 'Sign Out'}</span>}
          </button>
          <div className="text-center">
            <p className={`text-xs ${isSidebarOpen ? 'text-white' : 'text-blue-200'}`}>
              {isSidebarOpen ? '© 2025 Bancassurance' : 'B.A'}
            </p>
          </div>
        </footer>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <header className="bg-white shadow-md border-b mb-1">
          <div className="flex items-center justify-between px-6 py-4">
            
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-blue-600">Settings</h1>
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
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i className="fas fa-user text-gray-400"></i>
                      My Profile
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i className="fas fa-cog text-gray-400"></i>
                      Settings
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i className="fas fa-question-circle text-gray-400"></i>
                      Help & Support
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button onClick={handleLogout} disabled={isLoggingOut} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed">
                      <i className="fas fa-sign-out-alt"></i>
                      {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="min-h-screen bg-gray-50">
          <nav className="flex items-center justify-end gap-8 px-6 py-3 border-b border-gray-200 bg-white">
            {Object.keys(settingsContent).map((tabKey) => {
              const tab = { id: tabKey, label: tabKey.charAt(0).toUpperCase() + tabKey.slice(1), href: `?tab=${tabKey}` };
              return (
                <Link key={tab.id} href={tab.href} className={`pb-3 px-1 font-medium transition-colors ${currentTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600': 'text-gray-500 hover:text-blue-700'}`}>
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="text-blue-600 w-5 h-5" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{currentContent.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{currentContent.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentContent.stats}</p>
                <p className="text-xs text-gray-500 mt-1">Last updated: Just now</p>
              </div>
            </div>
          </div>

          <main className="p-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{currentContent.title}</h3>
              </div>
              <div className="p-6 space-y-6">
                {currentTab === 'general' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>System Default</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>English</option>
                        <option>French</option>
                        <option>Swahili</option>
                      </select>
                    </div>
                  </div>
                )}
                {currentTab === 'notifications' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notification Settings</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Email & SMS</option>
                        <option>Email Only</option>
                        <option>SMS Only</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>
                )}
                {currentTab === 'security' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input type="password" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Current password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input type="password" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="New password" />
                    </div>
                  </div>
                )}
                {currentTab === 'system' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">System Timezone</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>UTC</option>
                        <option>EAT (UTC+3)</option>
                        <option>WAT (UTC+1)</option>
                      </select>
                    </div>
                  </div>
                )}
                <div className="pt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>

      </div>

      {/* Profile  */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </div>
  );
}
