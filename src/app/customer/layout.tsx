"use client";

import { useState } from 'react';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar Navigation*/}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-linear-to-t from-blue-900 to-blue-600 text-white border-r-2 shadow-lg transition-all duration-300 flex flex-col`}>
        
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isSidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold ">Bancassurance</span>
            </div>
          )}
          {!isSidebarOpen && (
            <div className="w-8 h-8 bg-blue-200 rounded-lg mx-auto"></div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <a href="./dashboard" className="flex items-center gap-3 p-3 ">
            <i className="fas fa-chart-bar text-lg"></i>
            {isSidebarOpen && <span>Dashboard</span>}
          </a>

          <a href="./customer" className="flex items-center gap-3 p-3  border-b-2 border-b-blue-50">
            <i className="fas fa-users text-blue-600 text-lg"></i>
            {isSidebarOpen && <span className="font-medium">Customers</span>}
          </a>
        </nav>

        <footer className="p-4 border-t border-gray-200">
          {isSidebarOpen ? (
            <div className="text-center">
              <p className="text-xs text-white mt-1">© 2025 Bancassurance</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xs text-blue-500">B.A</p>
            </div>
          )}
        </footer>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <header className="bg-white shadow-md border-b mb-1">
          <div className="flex items-center justify-between px-6 py-4">
            
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-blue-600">Customer Management</h1>
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
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
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
  );
}