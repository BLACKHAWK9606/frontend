'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
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

const claimsContent = {
  all: {
    title: 'All Claims',
    description: 'View and manage all submitted claims',
    stats: 'Total Claims: 1,024',
  },
  approved: {
    title: 'Approved Claims',
    description: 'Claims that have been approved for payment',
    stats: 'Approved: 768',
  },
  pending: {
    title: 'Pending Claims',
    description: 'Claims awaiting review and processing',
    stats: 'Pending: 134',
  },
  rejected: {
    title: 'Rejected Claims',
    description: 'Claims that have been denied',
    stats: 'Rejected: 122',
  },
};

const claimsData = {
  all: [
    { id: 1, type: 'Motor Insurance', status: 'Approved', submitted: '2025-10-12', documents: 3 },
    { id: 2, type: 'Health Insurance', status: 'Pending', submitted: '2025-11-01', documents: 2 },
    { id: 3, type: 'Life Insurance', status: 'Rejected', submitted: '2025-09-28', documents: 4 },
  ],
  approved: [
    { id: 1, type: 'Motor Insurance', status: 'Approved', submitted: '2025-10-12', documents: 3 },
  ],
  pending: [
    { id: 2, type: 'Health Insurance', status: 'Pending', submitted: '2025-11-01', documents: 2 },
  ],
  rejected: [
    { id: 3, type: 'Life Insurance', status: 'Rejected', submitted: '2025-09-28', documents: 4 },
  ],
};

const statusColors: Record<string, string> = {
  Approved: 'text-green-600',
  Pending: 'text-yellow-600',
  Rejected: 'text-red-600',
};

export default function ClaimsPage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';
  const currentContent = claimsContent[currentTab as keyof typeof claimsContent] || claimsContent.all;
  const currentClaims = claimsData[currentTab as keyof typeof claimsData] || claimsData.all;

  return (
        <div className="min-h-screen bg-gray-50">
          <nav className="flex items-center justify-end gap-8 px-6 py-3 border-b border-gray-200 bg-white">
            {Object.keys(claimsContent).map((tabKey) => {
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
                <ClipboardCheck className="text-blue-600 w-5 h-5" />
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
                <div className="flex justify-between items-center">
                  <input 
                    type="text" 
                    placeholder="Search claims..." 
                    className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Search</button>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-blue-600 text-white text-medium font-semibold uppercase tracking-wider">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left">Claim Type</th>
                          <th scope="col" className="px-6 py-3 text-left">Status</th>
                          <th scope="col" className="px-6 py-3 text-left">Submitted On</th>
                          <th scope="col" className="px-6 py-3 text-left">Documents</th>
                          <th scope="col" className="px-6 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentClaims.map((claim) => (
                          <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.type}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${statusColors[claim.status]}`}>
                              {claim.status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{claim.submitted}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{claim.documents}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button className="text-blue-600 hover:underline">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
  );
}
