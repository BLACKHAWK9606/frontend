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

import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';

type Policy = {
  policyNumber: string;
  customerName: string;
  policyType: string;
  status: string;
  startDate: string;
  endDate: string;
  premium: string;
};

export default function PolicyPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const searchParams = useSearchParams ()
  const currentTab = searchParams.get ('tab')|| 'all';

    const policyTabs = [
    { id: 'all', label: 'All Policies', href: '?tab=all' },
    { id: 'active', label: 'Active', href: '?tab=active' },
    { id: 'expired', label: 'Expired', href: '?tab=expired' },
    { id: 'pending', label: 'Pending', href: '?tab=pending' },
    { id: 'cancelled', label: 'Cancelled', href: '?tab=cancelled' },
  ];

  const policyTabContent = {
    all: {
      title: "All Policies",
      description: "View and manage all issued policies across all statuses",
      stats: "Total policies: 1,024",
      icon: "fas fa-file-alt"
    },
    active: {
      title: "Active Policies",
      description: "Policies currently in force and up to date",
      stats: "Active: 768",
      icon: "fas fa-check-circle"
    },
    expired: {
      title: "Expired Policies",
      description: "Policies that have reached their end date",
      stats: "Expired: 112",
      icon: "fas fa-calendar-times"
    },
    pending: {
      title: "Pending Policies",
      description: "Policies awaiting approval or payment",
      stats: "Pending: 98",
      icon: "fas fa-hourglass-half"
    },
    cancelled: {
      title: "Cancelled Policies",
      description: "Policies terminated before maturity",
      stats: "Cancelled: 46",
      icon: "fas fa-ban"
    }
  };

  const policyData = {
    all: [
      { id: 1, policyNumber: "POL-001", customer: "Chiamaka Adebayo", type: "Life", status: "Active", startDate: "2023-01-01", endDate: "2028-01-01", premium: "KES 5,000/month" },
      { id: 2, policyNumber: "POL-002", customer: "James Smith", type: "Health", status: "Pending", startDate: "2024-04-01", endDate: "2025-04-01", premium: "KES 3,200/month" },
      { id: 3, policyNumber: "POL-003", customer: "Naledi Moloi", type: "Motor", status: "Active", startDate: "2023-11-01", endDate: "2024-11-01", premium: "KES 2,500/month" },
      { id: 4, policyNumber: "POL-004", customer: "Emma Wilson", type: "Travel", status: "Expired", startDate: "2022-06-01", endDate: "2023-06-01", premium: "KES 1,000/one-time" },
      { id: 5, policyNumber: "POL-005", customer: "Kwame Asante", type: "Life", status: "Cancelled", startDate: "2024-01-01", endDate: "2029-01-01", premium: "KES 4,800/month" }
    ],
    active: [
      { id: 1, policyNumber: "POL-001", customer: "Chiamaka Adebayo", type: "Life", status: "Active", startDate: "2023-01-01", endDate: "2028-01-01", premium: "KES 5,000/month" },
      { id: 3, policyNumber: "POL-003", customer: "Naledi Moloi", type: "Motor", status: "Active", startDate: "2023-11-01", endDate: "2024-11-01", premium: "KES 2,500/month" }
    ],
    expired: [
      { id: 4, policyNumber: "POL-004", customer: "Emma Wilson", type: "Travel", status: "Expired", startDate: "2022-06-01", endDate: "2023-06-01", premium: "KES 1,000/one-time" }
    ],
    pending: [
      { id: 2, policyNumber: "POL-002", customer: "James Smith", type: "Health", status: "Pending", startDate: "2024-04-01", endDate: "2025-04-01", premium: "KES 3,200/month" }
    ],
    cancelled: [
      { id: 5, policyNumber: "POL-005", customer: "Kwame Asante", type: "Life", status: "Cancelled", startDate: "2024-01-01", endDate: "2029-01-01", premium: "KES 4,800/month" }
    ]
  };

  const currentContent = policyTabContent[currentTab as keyof typeof policyTabContent] || policyTabContent.all;
  const currentPolicies = policyData[currentTab as keyof typeof policyData] || policyData.all;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getStatusBadge = (status: string) => {
    const statusStyles = {
       Active: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Expired: "bg-red-100 text-red-800",
      Cancelled: "bg-gray-100 text-gray-800"
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-black-800'}`}>{status}</span>
    )
  }

 // Main Section
return (
  <div className="min-h-screen bg-gray-50">

    {/* Page Container */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="bg-white mt-4 border rounded-lg shadow-sm px-6 py-4">
        <nav className="flex items-center justify-end gap-6 py-3">
        {policyTabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`pb-3 px-1 font-medium transition-colors ${
              currentTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-700"
            }`}
          >
            {tab.label}
          </Link>
        ))}
        </nav>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Left */}
          <div className="flex items-center gap-3">
            <i className={`${currentContent.icon} text-blue-600 text-xl`}></i>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {currentContent.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {currentContent.description}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {currentContent.stats}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Last updated: Just now
              </p>
            </div>

            <button
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition font-medium"
            >
              Add Policy
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-6">
        <Card className="bg-white text-black">
          <CardHeader>
            <CardTitle>Policy Management</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Search Row */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
              <Input
                placeholder="Search by customer or policy number"
                className="w-full sm:w-64"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Search
              </button>
            </div>
{/* Table Responsive Wrapper */}
<div className="bg-white rounded-xl shadow border w-full overflow-hidden">
  <div className="w-full overflow-x-auto">
    <table className="min-w-max w-full table-auto divide-y divide-gray-200">
      <thead className="bg-blue-600 text-white uppercase text-sm">
        <tr>
          <th className="px-4 py-3 text-left">Policy #</th>
          <th className="px-4 py-3 text-left">Customer</th>
          <th className="px-4 py-3 text-left">Type</th>
          <th className="px-4 py-3 text-left">Status</th>
          <th className="px-4 py-3 text-left">Start</th>
          <th className="px-4 py-3 text-left">End</th>
          <th className="px-4 py-3 text-left">Premium</th>
          <th className="px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {currentPolicies.map((policy) => (
          <tr
            key={policy.policyNumber}
            className="hover:bg-gray-50 transition"
          >
            <td className="px-4 py-4 text-sm font-medium text-gray-900">
              {policy.policyNumber}
            </td>
            <td className="px-4 py-4 text-sm">
              {policy.customer}
            </td>
            <td className="px-4 py-4 text-sm">
              {policy.type}
            </td>
            <td className="px-4 py-4">
              {getStatusBadge(policy.status)}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500">
              {policy.startDate}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500">
              {policy.endDate}
            </td>
            <td className="px-4 py-4 text-sm">
              {policy.premium}
            </td>
            <td className="px-4 py-4 text-sm font-medium">
              <button className="text-blue-600 hover:text-blue-900 mr-3">
                View
              </button>
              <button className="text-blue-600 hover:text-blue-900">
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>




          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

}
