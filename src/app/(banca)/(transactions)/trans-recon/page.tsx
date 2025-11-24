'use client';
import { useState } from 'react';
import { 
  BarChart3,
  Search,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  X
} from 'lucide-react';

interface Reconciliation {
  id: string;
  date: string;
  transactionCount: number;
  matchedCount: number;
  unmatchedCount: number;
  totalAmount: number;
  status: 'Reconciled' | 'Pending' | 'Discrepancies';
  reconciledBy?: string;
}

export default function TransactionReconciliationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReconciliation, setSelectedReconciliation] = useState<Reconciliation | null>(null);

  const reconciliations: Reconciliation[] = [
    {
      id: '1',
      date: '2024-01-15',
      transactionCount: 156,
      matchedCount: 148,
      unmatchedCount: 8,
      totalAmount: 2450000,
      status: 'Discrepancies',
      reconciledBy: 'john.doe'
    },
    {
      id: '2',
      date: '2024-01-14',
      transactionCount: 142,
      matchedCount: 142,
      unmatchedCount: 0,
      totalAmount: 1890000,
      status: 'Reconciled',
      reconciledBy: 'jane.smith'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Reconciled: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Discrepancies: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </span>
    );
  };

  const filteredReconciliations = reconciliations.filter(reconciliation =>
    reconciliation.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reconciliation.reconciledBy?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (reconciliation: Reconciliation) => {
    setSelectedReconciliation(reconciliation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReconciliation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-900">Transaction Reconciliation</h1>
          </div>
          <p className="text-gray-600">Reconcile transactions and identify discrepancies</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  type="text"
                  placeholder="Search reconciliations..."
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
                <option value="Reconciled">Reconciled</option>
                <option value="Pending">Pending</option>
                <option value="Discrepancies">Discrepancies</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                <RefreshCw className="w-3 h-3" />
                Run Reconciliation
              </button>
              <button className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                <Download className="w-3 h-3" />
                Export Report
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
                  <th className="px-3 py-2 text-left font-medium">Date</th>
                  <th className="px-3 py-2 text-left font-medium">Transactions</th>
                  <th className="px-3 py-2 text-left font-medium">Matched</th>
                  <th className="px-3 py-2 text-left font-medium">Unmatched</th>
                  <th className="px-3 py-2 text-left font-medium">Total Amount</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Reconciled By</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReconciliations.map((reconciliation) => (
                  <tr key={reconciliation.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-900">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {reconciliation.date}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{reconciliation.transactionCount}</td>
                    <td className="px-3 py-2">
                      <span className="text-green-600 font-medium">{reconciliation.matchedCount}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-red-600 font-medium">{reconciliation.unmatchedCount}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-500">KES {reconciliation.totalAmount.toLocaleString()}</td>
                    <td className="px-3 py-2">{getStatusBadge(reconciliation.status)}</td>
                    <td className="px-3 py-2 text-gray-500">{reconciliation.reconciledBy || '-'}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openModal(reconciliation)}
                          className="text-blue-600 hover:text-blue-900 text-xs"
                        >
                          View Details
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <CheckCircle className="w-3 h-3" />
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
        {isModalOpen && selectedReconciliation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Reconciliation Details</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div><strong>Date:</strong> {selectedReconciliation.date}</div>
                  <div><strong>Status:</strong> {getStatusBadge(selectedReconciliation.status)}</div>
                  <div><strong>Total Transactions:</strong> {selectedReconciliation.transactionCount}</div>
                  <div><strong>Total Amount:</strong> KES {selectedReconciliation.totalAmount.toLocaleString()}</div>
                  <div><strong>Matched Transactions:</strong> <span className="text-green-600 font-medium">{selectedReconciliation.matchedCount}</span></div>
                  <div><strong>Unmatched Transactions:</strong> <span className="text-red-600 font-medium">{selectedReconciliation.unmatchedCount}</span></div>
                  <div className="col-span-2"><strong>Reconciled By:</strong> {selectedReconciliation.reconciledBy || 'Not reconciled'}</div>
                </div>
                {selectedReconciliation.unmatchedCount > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">Discrepancies Found</h4>
                    <p className="text-red-700 text-sm">
                      There are {selectedReconciliation.unmatchedCount} unmatched transactions that require attention.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 p-4 border-t">
                <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}