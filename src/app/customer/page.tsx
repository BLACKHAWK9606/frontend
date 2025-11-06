"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CustomerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';

  // Tab configuration
  const tabs = [
    { id: 'all', label: 'All Customers', href: '?tab=all' },
    { id: 'new', label: 'New Customers', href: '?tab=new' },
    { id: 'active', label: 'Active', href: '?tab=active' },
    { id: 'inactive', label: 'Inactive', href: '?tab=inactive' },
    { id: 'archived', label: 'Archived', href: '?tab=archived' },
  ];

  // Tab content configuration
  const tabContent = {
    all: {
      title: "All Customers",
      description: "View and manage all customers across all statuses",
      stats: "Total customers: 1,234",
      icon: "fas fa-users"
    },
    new: {
      title: "New Customers",
      description: "Recently registered customers awaiting activation",
      stats: "New signups: 42",
      icon: "fas fa-user-plus"
    },
    active: {
      title: "Active Customers",
      description: "Customers with active policies and subscriptions",
      stats: "Active customers: 856",
      icon: "fas fa-user-check"
    },
    inactive: {
      title: "Inactive Customers",
      description: "Customers with expired or suspended policies",
      stats: "Inactive customers: 198",
      icon: "fas fa-user-clock"
    },
    archived: {
      title: "Archived Customers",
      description: "Customers who have been archived or deleted",
      stats: "Archived customers: 138",
      icon: "fas fa-archive"
    }
  };

  
  const customerData = {
    all: [
      { id: 1, name: "Chiamaka Adebayo", email: "chiamaka.adebayo@example.com", phone: "(555) 123-4567", status: "Active", type: "Premium Member", joinDate: "2024-01-15" },
      { id: 2, name: "James Smith", email: "james.smith@example.com", phone: "(555) 987-6543", status: "Pending", type: "Standard Member", joinDate: "2024-03-10" },
      { id: 3, name: "Naledi Moloi", email: "naledi.moloi@example.com", phone: "(555) 456-7890", status: "Active", type: "VIP Member", joinDate: "2023-11-22" },
      { id: 4, name: "Emma Wilson", email: "emma.wilson@example.com", phone: "(555) 234-5678", status: "Inactive", type: "Standard Member", joinDate: "2023-08-05" },
      { id: 5, name: "Kwame Asante", email: "kwame.asante@example.com", phone: "(555) 345-6789", status: "Active", type: "Premium Member", joinDate: "2024-02-18" }
    ],
    new: [
      { id: 2, name: "James Smith", email: "james.smith@example.com", phone: "(555) 987-6543", status: "Pending", type: "Standard Member", joinDate: "2024-03-10" },
      { id: 6, name: "Fatoumata Diallo", email: "fatoumata.diallo@example.com", phone: "(555) 567-8901", status: "Pending", type: "Premium Member", joinDate: "2024-03-12" },
      { id: 7, name: "Sarah Johnson", email: "sarah.johnson@example.com", phone: "(555) 678-9012", status: "Pending", type: "Standard Member", joinDate: "2024-03-11" }
    ],
    active: [
      { id: 1, name: "Chiamaka Adebayo", email: "chiamaka.adebayo@example.com", phone: "(555) 123-4567", status: "Active", type: "Premium Member", joinDate: "2024-01-15" },
      { id: 3, name: "Naledi Moloi", email: "naledi.moloi@example.com", phone: "(555) 456-7890", status: "Active", type: "VIP Member", joinDate: "2023-11-22" },
      { id: 5, name: "Kwame Asante", email: "kwame.asante@example.com", phone: "(555) 345-6789", status: "Active", type: "Premium Member", joinDate: "2024-02-18" },
      { id: 8, name: "David Brown", email: "david.brown@example.com", phone: "(555) 789-0123", status: "Active", type: "VIP Member", joinDate: "2023-12-18" }
    ],
    inactive: [
      { id: 4, name: "Emma Wilson", email: "emma.wilson@example.com", phone: "(555) 234-5678", status: "Inactive", type: "Standard Member", joinDate: "2023-08-05" },
      { id: 9, name: "Amina Jalloh", email: "amina.jalloh@example.com", phone: "(555) 890-1234", status: "Inactive", type: "Premium Member", joinDate: "2023-09-30" }
    ],
    archived: [
      { id: 10, name: "Thomas Green", email: "thomas.green@example.com", phone: "(555) 901-2345", status: "Archived", type: "Standard Member", joinDate: "2022-05-15" },
      { id: 11, name: "Zara Nkosi", email: "zara.nkosi@example.com", phone: "(555) 012-3456", status: "Archived", type: "Premium Member", joinDate: "2022-11-20" },
      { id: 12, name: "Robert Taylor", email: "robert.taylor@example.com", phone: "(555) 123-4567", status: "Archived", type: "Standard Member", joinDate: "2022-07-14" }
    ]
  };

  const currentContent = tabContent[currentTab as keyof typeof tabContent] || tabContent.all;
  const currentCustomers = customerData[currentTab as keyof typeof customerData] || customerData.all;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Active: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Inactive: "bg-red-100 text-red-800",
      Archived: "bg-gray-100 text-gray-800"
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Secondary Navbar Header */}
      <nav className="flex items-center justify-end gap-8 px-6 py-3 border-b border-gray-200 bg-white">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`pb-3 px-1 font-medium transition-colors ${
              currentTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-700'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {/* Tab Content Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
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
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {currentContent.stats}
              </p>
              <p className="text-xs text-gray-500 mt-1">Last updated: Just now</p>
            </div>
            <button 
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition-colors font-medium"
            >
              Add Customer
            </button>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white text-medium font-semibold uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left ">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left ">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Join Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left ">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>Showing {currentCustomers.length} of {currentCustomers.length} customers</p>
        </div>
      </div>

      {/* Modal User box*/}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6  bg-blue-600 border-b">
              <h3 className="text-lg font-semibold text-white">Add New Customer</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter customer name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Membership Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select membership</option>
                  <option value="standard">Standard Member</option>
                  <option value="premium">Premium Member</option>
                  <option value="vip">VIP Member</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button 
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}