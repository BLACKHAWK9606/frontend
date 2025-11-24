'use client';
import { useState } from 'react';
import { 
  DollarSign,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  X
} from 'lucide-react';

interface Refund {
  id: string;
  refundId: string;
  customerName: string;
  policyNumber: string;
  amount: number;
  reason: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processed';
  priority: 'Low' | 'Medium' | 'High';
}

export default function RefundsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);
  const [modalType, setModalType] = useState<'approve' | 'reject' | 'details'>('details');

  const refunds: Refund[] = [
    {
      id: '1',
      refundId: 'REF-001234',
      customerName: 'John Kamau',
      policyNumber: 'POL-2023-001',
      amount: 7500,
      reason: 'Policy Cancellation',
      submittedDate: '2024-01-15',
      status: 'Pending',
      priority: 'Medium'
    },
    {
      id: '2',
      refundId: 'REF-001235',
      customerName: 'Sarah Wanjiku',
      policyNumber: 'POL-2023-045',
      amount: 12000,
      reason: 'Premium Overpayment',
      submittedDate: '2024-01-16',
      status: 'Approved',
      priority: 'High'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Pending: "bg-yellow-100 text-yellow-800",
      Approved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      Processed: "bg-blue-100 text-blue-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </span>
    );
  };

  const filteredRefunds = refunds.filter(refund =>
    refund.refundId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (refund: Refund, type: 'approve' | 'reject' | 'details') => {
    setSelectedRefund(refund);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRefund(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h1 className="text-xl font-bold text-gray-900">Refunds</h1>
          </div>
          <p className="text-gray-600">Manage and process refund requests</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  type="text"
                  placeholder="Search refunds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-7 pr-3 py-1 border rounded text-sm w-48 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Processed">Processed</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-2 py-1 border rounded text-sm hover:bg-gray-50">
                <Filter className="w-3 h-3" />
                Filter
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                Process Selected
              </button>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Refund ID</th>
                  <th className="px-3 py-2 text-left font-medium">Customer</th>
                  <th className="px-3 py-2 text-left font-medium">Policy</th>
                  <th className="px-3 py-2 text-left font-medium">Amount</th>
                  <th className="px-3 py-2 text-left font-medium">Reason</th>
                  <th className="px-3 py-2 text-left font-medium">Submitted</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRefunds.map((refund) => (
                  <tr key={refund.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{refund.refundId}</td>
                    <td className="px-3 py-2 text-gray-900">{refund.customerName}</td>
                    <td className="px-3 py-2 text-gray-500">{refund.policyNumber}</td>
                    <td className="px-3 py-2 text-gray-500">KES {refund.amount.toLocaleString()}</td>
                    <td className="px-3 py-2 text-gray-500 truncate max-w-32">{refund.reason}</td>
                    <td className="px-3 py-2 text-gray-500">{refund.submittedDate}</td>
                    <td className="px-3 py-2">{getStatusBadge(refund.status)}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openModal(refund, 'approve')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => openModal(refund, 'reject')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => openModal(refund, 'details')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FileText className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedRefund && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalType === 'approve' ? 'Approve Refund' : 
                   modalType === 'reject' ? 'Reject Refund' : 'Refund Details'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><strong>Refund ID:</strong> {selectedRefund.refundId}</div>
                  <div><strong>Customer:</strong> {selectedRefund.customerName}</div>
                  <div><strong>Policy:</strong> {selectedRefund.policyNumber}</div>
                  <div><strong>Amount:</strong> KES {selectedRefund.amount.toLocaleString()}</div>
                  <div><strong>Reason:</strong> {selectedRefund.reason}</div>
                  <div><strong>Submitted:</strong> {selectedRefund.submittedDate}</div>
                  <div><strong>Status:</strong> {getStatusBadge(selectedRefund.status)}</div>
                  <div><strong>Priority:</strong> {selectedRefund.priority}</div>
                </div>
                {modalType !== 'details' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {modalType === 'approve' ? 'Approval Comments' : 'Rejection Reason'}
                    </label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      rows={3}
                      placeholder={modalType === 'approve' ? 'Enter approval comments...' : 'Enter rejection reason...'}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 p-4 border-t">
                <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Cancel
                </button>
                {modalType === 'approve' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Approve Refund
                  </button>
                )}
                {modalType === 'reject' && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Reject Refund
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}