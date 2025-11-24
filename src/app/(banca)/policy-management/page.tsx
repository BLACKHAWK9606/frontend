'use client'; 
import { useState } from 'react'; 
import { useSearchParams } from 'next/navigation'; 
import Link from 'next/link'; 
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card'; 
import {Input} from '@/components/ui/input'; 

type Policy = { 
  id: number;
  policyNumber: string; 
  customer: string; 
  type: string; 
  status: string; 
  startDate: string; 
  endDate: string; 
  premium: string; 
}; 

type ModalType = 'view' | 'edit' | 'add' | null;

export default function PolicyPage() { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [formData, setFormData] = useState<Partial<Policy> | null>(null);
  
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';

  const policyTabs = [ 
    { id: 'all', label: 'All Policies', href: '?tab=all' }, 
    { id: 'active', label: 'Active', href: '?tab=active' }, 
    { id: 'expired', label: 'Expired', href: '?tab=expired' }, 
    { id: 'pending', label: 'Pending', href: '?tab=pending' }, 
    { id: 'cancelled', label: 'Cancelled', href: '?tab=cancelled' }, 
  ]; 

  const policyTabContent = { 
    all: { title: "All Policies", description: "View and manage all issued policies across all statuses", stats: "Total policies: 1,024", icon: "fas fa-file-alt" }, 
    active: { title: "Active Policies", description: "Policies currently in force and up to date", stats: "Active: 768", icon: "fas fa-check-circle" }, 
    expired: { title: "Expired Policies", description: "Policies that have reached their end date", stats: "Expired: 112", icon: "fas fa-calendar-times" }, 
    pending: { title: "Pending Policies", description: "Policies awaiting approval or payment", stats: "Pending: 98", icon: "fas fa-hourglass-half" }, 
    cancelled: { title: "Cancelled Policies", description: "Policies terminated before maturity", stats: "Cancelled: 46", icon: "fas fa-ban" } 
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

  const openAddModal = () => {
    setModalType('add');
    setFormData({
      policyNumber: '',
      customer: '',
      type: 'Life',
      status: 'Pending',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      premium: '',
    });
    setIsModalOpen(true);
  }; 
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedPolicy(null);
    setFormData(null);
  }; 

  const openViewModal = (policy: Policy) => {
    setSelectedPolicy(policy);
    setModalType('view');
    setIsModalOpen(true);
  };

  const openEditModal = (policy: Policy) => {
    setSelectedPolicy(policy);
    setFormData({ ...policy });
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSavePolicy = () => {
    if (formData && selectedPolicy) {
      // Here you would typically make an API call to update the policy
      console.log('Saving policy:', formData);
      alert(`Policy ${formData.policyNumber} updated successfully!`);
      closeModal();
    }
  };

  const getStatusBadge = (status: string) => { 
    const statusStyles = { 
      Active: "bg-green-100 text-green-800", 
      Pending: "bg-yellow-100 text-yellow-800", 
      Expired: "bg-red-100 text-red-800", 
      Cancelled: "bg-gray-100 text-gray-800" 
    }; 
    return ( 
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-black-800'}`}>
        {status}
      </span> 
    ) 
  }

  // Modal Component
  const Modal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4" onClick={closeModal}>
        <div className="bg-white rounded-lg w-full max-w-4xl shadow-lg transform transition-all duration-200" onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 bg-blue-600 border-b rounded-t-lg">
            <h3 className="text-lg font-semibold text-white">
              {modalType === 'view' ? 'Policy Details' : modalType === 'edit' ? 'Edit Policy' : 'Add New Policy'}
            </h3>
            <button 
              onClick={closeModal}
              className="text-white hover:text-gray-200 text-xl"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {modalType === 'view' && selectedPolicy && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Policy Number</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPolicy.policyNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPolicy.customer}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Policy Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPolicy.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedPolicy.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPolicy.startDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPolicy.endDate}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Premium</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPolicy.premium}</p>
                </div>
              </div>
            )}

            {(modalType === 'edit' || modalType === 'add') && formData && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Policy Number</label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={formData.policyNumber || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer</label>
                  <input
                    type="text"
                    name="customer"
                    value={formData.customer || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Policy Type</label>
                  <select
                    name="type"
                    value={formData.type || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Life">Life</option>
                    <option value="Health">Health</option>
                    <option value="Motor">Motor</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Expired">Expired</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Premium</label>
                  <input
                    type="text"
                    name="premium"
                    value={formData.premium || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
            {(modalType === 'edit' || modalType === 'add') && (
              <button
                onClick={handleSavePolicy}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                {modalType === 'add' ? 'Add Policy' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Main Section 
  return ( 
    <div className="min-h-screen bg-gray-50"> 
      {/* Page Container */} 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"> 
        {/* Header Section */} 
        <div className="bg-white mt-4 border rounded-lg shadow-sm px-6 py-4"> 
          <nav className="flex items-center justify-end gap-6 py-3"> 
            {policyTabs.map((tab) => ( 
              <Link key={tab.id} href={tab.href} className={`pb-3 px-1 font-medium transition-colors ${ 
                currentTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-700" 
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
              <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition font-medium" > 
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
                <Input placeholder="Search by customer or policy number" className="w-full sm:w-64" /> 
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
                        <tr key={policy.policyNumber} className="hover:bg-gray-50 transition" > 
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
                            <button 
                              onClick={() => openViewModal(policy)} 
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            > 
                              View 
                            </button> 
                            <button 
                              onClick={() => openEditModal(policy)} 
                              className="text-blue-600 hover:text-blue-900"
                            > 
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

      {/* Modal */}
      <Modal />
    </div> 
  ); 
} 