'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LineChart, ChevronLeft, ChevronRight, BarChart2, Users, FileText, ClipboardCheck, Settings, LogOut } from 'lucide-react';

const reportContent = {
  sales: {
    title: 'Sales Report',
    description: 'Overview of policy sales across channels',
    stats: 'Total Sales: KES 3.2M',
  },
  claims: {
    title: 'Claims Report',
    description: 'Claims submitted, approved, and pending',
    stats: 'Claims Processed: 1,024',
  },
  engagement: {
    title: 'Customer Engagement',
    description: 'App usage, interactions, and feedback',
    stats: 'Active Users: 12,480',
  },
  revenue: {
    title: 'Revenue Insights',
    description: 'Premium collections and growth trends',
    stats: 'Monthly Revenue: KES 1.1M',
  },
};

const reportData = {
  sales: [
    { id: 1, metric: 'Life Policies Sold', value: '320' },
    { id: 2, metric: 'Motor Policies Sold', value: '210' },
  ],
  claims: [
    { id: 1, metric: 'Approved Claims', value: '890' },
    { id: 2, metric: 'Pending Claims', value: '134' },
  ],
  engagement: [
    { id: 1, metric: 'App Logins', value: '24,000' },
    { id: 2, metric: 'Feedback Submitted', value: '1,200' },
  ],
  revenue: [
    { id: 1, metric: 'Life Premiums', value: 'KES 600K' },
    { id: 2, metric: 'Motor Premiums', value: 'KES 300K' },
  ],
};

export default function ReportPage(){
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'sales';
  const currentContent = reportContent[currentTab as keyof typeof reportContent] || reportContent.sales;
  const currentReports = reportData[currentTab as keyof typeof reportData] || reportData.sales;

  return (
        <div className="min-h-screen bg-gray-50">
          <nav className="flex items-center justify-end gap-8 px-6 py-3 border-b border-gray-200 bg-white">
            {Object.keys(reportContent).map((tabKey) => {
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
            <LineChart className="text-blue-600 w-5 h-5" />
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
                placeholder="Search metrics..." 
                className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Search</button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-600 text-white text-medium font-semibold uppercase tracking-wider">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left">Metric</th>
                      <th scope="col" className="px-6 py-3 text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.metric}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.value}</td>
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