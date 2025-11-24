'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ClipboardCheck } from 'lucide-react';

type Claim = {
  id: number;
  type: string;
  status: string;
  submitted: string;
  documents: number;
  policyNumber: string;
  customer: string;
  amount: string;
  description: string;
};

type ClaimsState = {
  all: Claim[];
  approved: Claim[];
  pending: Claim[];
  rejected: Claim[];
};

type ModalType = 'view' | 'edit' | 'add' | null;

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

const allClaims = [
  {
    id: 1,
    type: 'Motor Insurance',
    status: 'Approved',
    submitted: '2025-10-12',
    documents: 3,
    policyNumber: 'POL-001',
    customer: 'Chiamaka Adebayo',
    amount: 'KES 150,000',
    description: 'Vehicle collision repair',
  },
  {
    id: 2,
    type: 'Health Insurance',
    status: 'Pending',
    submitted: '2025-11-01',
    documents: 2,
    policyNumber: 'POL-002',
    customer: 'James Smith',
    amount: 'KES 75,000',
    description: 'Hospitalization expenses',
  },
  {
    id: 3,
    type: 'Life Insurance',
    status: 'Rejected',
    submitted: '2025-09-28',
    documents: 4,
    policyNumber: 'POL-003',
    customer: 'Naledi Moloi',
    amount: 'KES 2,000,000',
    description: 'Life insurance claim',
  },
];

const claimsData: ClaimsState = {
  all: allClaims,
  approved: allClaims.filter(claim => claim.status === 'Approved'),
  pending: allClaims.filter(claim => claim.status === 'Pending'),
  rejected: allClaims.filter(claim => claim.status === 'Rejected'),
};

const statusColors: Record<string, string> = {
  Approved: 'text-green-600',
  Pending: 'text-yellow-600',
  Rejected: 'text-red-600',
};

export default function ClaimsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [formData, setFormData] = useState<Partial<Claim> | null>(null);
  const [claims, setClaims] = useState<ClaimsState>(claimsData);
  const [searchQuery, setSearchQuery] = useState('');

  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'all';
  const currentContent = claimsContent[currentTab as keyof typeof claimsContent] || claimsContent.all;
  const currentClaims = claims[currentTab as keyof typeof claims] || claims.all;

  const filteredClaims = currentClaims.filter(c =>
    c.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.policyNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setModalType('add');
    setFormData({
      type: 'Motor Insurance',
      status: 'Pending',
      submitted: new Date().toISOString().split('T')[0],
      documents: 0,
      policyNumber: '',
      customer: '',
      amount: '',
      description: '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedClaim(null);
    setFormData(null);
  };

  const openViewModal = (claim: Claim) => {
    setSelectedClaim(claim);
    setModalType('view');
    setIsModalOpen(true);
  };

  const openEditModal = (claim: Claim) => {
    setSelectedClaim(claim);
    setFormData({ ...claim });
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: name === 'documents' ? parseInt(value) || 0 : value } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveClaim();
  };

  const handleSaveClaim = () => {
    if (!formData) return;

    if (modalType === 'add') {
      const newId = claims.all.length ? Math.max(...claims.all.map(c => c.id)) + 1 : 1;
      const newClaim: Claim = { ...(formData as Claim), id: newId };

      setClaims(prev => ({
        all: [...prev.all, newClaim],
        approved: newClaim.status === 'Approved' ? [...prev.approved, newClaim] : prev.approved,
        pending: newClaim.status === 'Pending' ? [...prev.pending, newClaim] : prev.pending,
        rejected: newClaim.status === 'Rejected' ? [...prev.rejected, newClaim] : prev.rejected,
      }));
    }

    if (modalType === 'edit' && selectedClaim) {
      const updatedClaim: Claim = { ...selectedClaim, ...(formData as Claim) };

      const updateArray = (arr: Claim[]) =>
        arr.map(c => (c.id === selectedClaim.id ? updatedClaim : c));

      setClaims(prev => ({
        all: updateArray(prev.all),
        approved: updateArray(prev.approved),
        pending: updateArray(prev.pending),
        rejected: updateArray(prev.rejected),
      }));
    }

    closeModal();
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'view': return 'Claim Details';
      case 'edit': return 'Edit Claim';
      case 'add': return 'Add New Claim';
      default: return 'Claim';
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Rejected: "bg-red-100 text-red-800"
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  // Modal Component
  const Modal = () => {
    if (!isModalOpen) return null;

    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
      <div
        className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4"
        onClick={closeModal}
      >
        <div
          role="dialog"
          aria-modal="true"
          className="bg-white rounded-lg w-full max-w-4xl shadow-lg transform transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 bg-blue-600 border-b rounded-t-lg">
            <h3 className="text-lg font-semibold text-white">{getModalTitle()}</h3>
            <button
              onClick={closeModal}
              className="text-white hover:text-gray-200 text-xl"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {modalType === 'view' && selectedClaim && (
                <div className="space-y-4">
                  <p><strong>Type:</strong> {selectedClaim.type}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedClaim.status)}</p>
                  <p><strong>Policy:</strong> {selectedClaim.policyNumber}</p>
                  <p><strong>Customer:</strong> {selectedClaim.customer}</p>
                  <p><strong>Amount</strong>{selectedClaim.amount}</p>
                  <p><strong>Description:</strong> {selectedClaim.description}</p>
                  <p><strong>Submitted:</strong> {selectedClaim.submitted}</p>
                  <p><strong>Documents:</strong> {selectedClaim.documents} files</p>
                </div>
              )}

              {(modalType === 'edit' || modalType === 'add') && formData && (
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Claim Type *
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="Motor Insurance">Motor Insurance</option>
                        <option value="Health Insurance">Health Insurance</option>
                        <option value="Life Insurance">Life Insurance</option>
                        <option value="Travel Insurance">Travel Insurance</option>
                        <option value="Home Insurance">Home Insurance</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Policy Number *
                      </label>
                      <input
                        id="policyNumber"
                        type="text"
                        name="policyNumber"
                        value={formData.policyNumber || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
                        Customer *
                      </label>
                      <input
                        id="customer"
                        type="text"
                        name="customer"
                        value={formData.customer || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Claim Amount *
                      </label>
                      <input
                        id="amount"
                        type="text"
                        name="amount"
                        value={formData.amount || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="submitted" className="block text-sm font-medium text-gray-700 mb-1">
                        Submitted Date *
                      </label>
                      <input
                        id="submitted"
                        type="date"
                        name="submitted"
                        value={formData.submitted || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Documents
                      </label>
                      <input
                        id="documents"
                        type="number"
                        name="documents"
                        value={formData.documents || 0}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              {(modalType === 'edit' || modalType === 'add') && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  {modalType === 'add' ? 'Add Claim' : 'Save Changes'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <nav className="flex items-center justify-end gap-8 px-6 py-3 border-b border-gray-200 bg-white">
        {Object.keys(claimsContent).map((tabKey) => {
          const tab = { id: tabKey, label: tabKey.charAt(0).toUpperCase() + tabKey.slice(1), href: `?tab=${tabKey}` };
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`pb-3 px-1 font-medium transition-colors ${
                currentTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-700'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="text-blue-600 w-5 h-5" />
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
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition-colors font-medium"
            >
              Add Claim
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{currentContent.title}</h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Search */}
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search claims..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Search</button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                {filteredClaims.length === 0 ? (
                  <p className="text-center text-gray-500 py-6">No claims found.</p>
                ) : (
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
                      {filteredClaims.map((claim) => (
                        <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {claim.type}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${statusColors[claim.status]}`}>
                            {claim.status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {claim.submitted}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {claim.documents}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openViewModal(claim)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              aria-label={`View claim ${claim.policyNumber}`}
                            >
                              View
                            </button>
                            <button
                              onClick={() => openEditModal(claim)}
                              className="text-blue-600 hover:text-blue-900"
                              aria-label={`Edit claim ${claim.policyNumber}`}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal />
    </div>
  );
}
