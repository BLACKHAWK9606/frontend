'use client';
import { useState } from 'react';
import { 
  Clock,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  X
} from 'lucide-react';

interface PendingTransaction {
  id: string;
  transactionId: string;
  type: 'Payment' | 'Refund' | 'Adjustment' | 'Commission';
  amount: number;
  customerName: string;
  policyNumber: string;
  submittedDate: string;
  status: 'Pending' | 'Under Review' | 'Approval Required';
  priority: 'Low' | 'Medium' | 'High';
}

export default function PendingTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<PendingTransaction | null>(null);
  const [modalType, setModalType] = useState<'approve' | 'reject' | 'details'>('details');

  const pendingTransactions: PendingTransaction[] = [
    {
      id: '1',
      transactionId: 'TXN-001234',
      type: 'Payment',
      amount: 15000,
      customerName: 'John Kamau',
      policyNumber: 'POL-2023-001',
      submittedDate: '2024-01-15',
      status: 'Pending',
      priority: 'Medium'
    },
    {
      id: '2',
      transactionId: 'TXN-001235',
      type: 'Refund',
      amount: 7500,
      customerName: 'Sarah Wanjiku',
      policyNumber: 'POL-2023-045',
      submittedDate: '2024-01-16',
      status: 'Under Review',
      priority: 'High'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Pending: "bg-yellow-100 text-yellow-800",
      'Under Review': "bg-blue-100 text-blue-800",
      'Approval Required': "bg-orange-100 text-orange-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      Low: "bg-gray-100 text-gray-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityStyles[priority as keyof typeof priorityStyles]}`}>
        {priority}
      </span>
    );
  };

  const filteredTransactions = pendingTransactions.filter(transaction =>
    transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (transaction: PendingTransaction, type: 'approve' | 'reject' | 'details') => {
    setSelectedTransaction(transaction);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-6 h-6 text-yellow-600" />
            <h1 className="text-xl font-bold text-gray-900">Pending Transactions</h1>
          </div>
          <p className="text-gray-600">Review and process pending transactions</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-7 pr-3 py-1 border rounded text-sm w-48 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="Payment">Payment</option>
                <option value="Refund">Refund</option>
                <option value="Adjustment">Adjustment</option>
                <option value="Commission">Commission</option>
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
                  <th className="px-3 py-2 text-left font-medium">Transaction ID</th>
                  <th className="px-3 py-2 text-left font-medium">Type</th>
                  <th className="px-3 py-2 text-left font-medium">Amount</th>
                  <th className="px-3 py-2 text-left font-medium">Customer</th>
                  <th className="px-3 py-2 text-left font-medium">Policy</th>
                  <th className="px-3 py-2 text-left font-medium">Submitted</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Priority</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{transaction.transactionId}</td>
                    <td className="px-3 py-2 text-gray-500">{transaction.type}</td>
                    <td className="px-3 py-2 text-gray-500">KES {transaction.amount.toLocaleString()}</td>
                    <td className="px-3 py-2 text-gray-900">{transaction.customerName}</td>
                    <td className="px-3 py-2 text-gray-500">{transaction.policyNumber}</td>
                    <td className="px-3 py-2 text-gray-500">{transaction.submittedDate}</td>
                    <td className="px-3 py-2">{getStatusBadge(transaction.status)}</td>
                    <td className="px-3 py-2">{getPriorityBadge(transaction.priority)}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openModal(transaction, 'approve')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => openModal(transaction, 'reject')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => openModal(transaction, 'details')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <AlertCircle className="w-3 h-3" />
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
        {isModalOpen && selectedTransaction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalType === 'approve' ? 'Approve Transaction' : 
                   modalType === 'reject' ? 'Reject Transaction' : 'Transaction Details'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><strong>Transaction ID:</strong> {selectedTransaction.transactionId}</div>
                  <div><strong>Type:</strong> {selectedTransaction.type}</div>
                  <div><strong>Amount:</strong> KES {selectedTransaction.amount.toLocaleString()}</div>
                  <div><strong>Customer:</strong> {selectedTransaction.customerName}</div>
                  <div><strong>Policy:</strong> {selectedTransaction.policyNumber}</div>
                  <div><strong>Submitted:</strong> {selectedTransaction.submittedDate}</div>
                  <div><strong>Status:</strong> {getStatusBadge(selectedTransaction.status)}</div>
                  <div><strong>Priority:</strong> {getPriorityBadge(selectedTransaction.priority)}</div>
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
                    Approve
                  </button>
                )}
                {modalType === 'reject' && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Reject
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