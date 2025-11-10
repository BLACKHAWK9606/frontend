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

import {Card, CardHeader, CardTitle, CardContent} from '@/shadcn/ui/card';
import {Input} from '@/shadcn/ui/input';

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

  return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar Navigation*/}
       <aside className={`${isSidebarOpen ? 'w-64 xl:w-64 lg:w-56 md:w-48' : 'w-20 xl:w-20 lg:w-16 md:w-14'} bg-gradient-to-t from-blue-900 to-blue-600 text-white border-r-2 shadow-lg transition-all duration-300 flex flex-col`}>
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
     
             <a
               href="./settings"
               className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors"
             >
               <Settings className="w-5 h-5" />
               {isSidebarOpen && <span>Settings</span>}
             </a>
           </nav>
     
           <footer className="p-4 border-t border-blue-700 space-y-3">
             <button className="w-full flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors">
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

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <header className="bg-white shadow-md border-b mb-1">
          <div className="flex items-center justify-between px-6 py-4">
            
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-blue-600">Policy Management</h1>
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
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      <i className="fas fa-sign-out-alt"></i>
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        <div className="min-h-screen bg-gray-50">
            {/* Tabs */}
          <nav className="flex items-center justify-end gap-8 px-6 py-3 border-b border-gray-200 bg-white">
            {policyTabs.map((tab) => (
              <Link key={tab.id} href={tab.href} className={`pb-3 px-1 font-medium transition-colors ${currentTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600': 'text-gray-500 hover:text-blue-700'}`}>
            {tab.label}
              </Link>
            ))}
          </nav>

            {/* Tab Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className={`${currentContent.icon} text-blue-600 text-xl`}></i>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{currentContent.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{currentContent.description}</p>
                </div>
              </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{currentContent.stats}</p>
              <p className="text-xs text-gray-500 mt-1">Last updated: Just now</p>
            </div>
            <button
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition-colors font-medium"
            >
              Add Policy
            </button>
          </div>
        </div>
      </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Policy Management</CardTitle>
                  </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between items-center">
                        <Input placeholder="Search by customer or policy number" className="w-64" />
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Search</button>
                      </div>

                      <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-600 text-white text-medium font-semibold uppercase tracking-wider">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left">Policy #</th>
                                <th scope="col" className="px-6 py-3 text-left">Customer</th>
                                <th scope="col" className="px-6 py-3 text-left">Type</th>
                                <th scope="col" className="px-6 py-3 text-left">Status</th>
                                <th scope="col" className="px-6 py-3 text-left">Start</th>
                                <th scope="col" className="px-6 py-3 text-left">End</th>
                                <th scope="col" className="px-6 py-3 text-left">Premium</th>
                                <th scope="col" className="px-6 py-3 text-left">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {currentPolicies.map((policy) => (
                                <tr key={policy.policyNumber} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{policy.policyNumber}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.customer}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.type}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(policy.status)}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.startDate}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.endDate}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.premium}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
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
        </main>
      </div>

        {/* Profile  */}
        {isProfileOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsProfileOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
