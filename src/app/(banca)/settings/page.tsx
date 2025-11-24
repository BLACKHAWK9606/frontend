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
  const [theme, setTheme] = useState('light');
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'general';
  const currentContent = settingsContent[currentTab as keyof typeof settingsContent] || settingsContent.general;

  return (
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
                      <select 
                        value={theme} 
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System Default</option>
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

  );
}
