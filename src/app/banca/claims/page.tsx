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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';
  const currentContent = claimsContent[currentTab as keyof typeof claimsContent] || claimsContent.all;
  const currentClaims = claimsData[currentTab as keyof typeof claimsData] || claimsData.all;

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar Navigation*/}
     <aside className={`${isSidebarOpen ? 'w-64 xl:w-64 lg:w-56 md:w-48' : 'w-20 xl:w-20 lg:w-16 md:w-14'
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
             <a
               href="./dashboard"
               className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors"
             >
               <BarChart2 className="w-5 h-5" />
               {isSidebarOpen && <span>Dashboard</span>}
             </a>
     
             <a
               href="./customer"
               className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors"
             >
               <Users className="w-5 h-5" />
               {isSidebarOpen && <span className="font-medium">Customers</span>}
             </a>
     
             <a
               href="./policy-management"
               className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors"
             >
               <FileText className="w-5 h-5" />
               {isSidebarOpen && <span>Policy Management</span>}
             </a>
     
             <a
               href="./claims-processing"
               className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors"
             >
               <ClipboardCheck className="w-5 h-5" />
               {isSidebarOpen && <span>Claims Processing</span>}
             </a>
     
             <a
               href="./reports"
               className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors"
             >
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
              <h1 className="text-2xl font-semibold text-blue-600">Claims Processing</h1>
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
