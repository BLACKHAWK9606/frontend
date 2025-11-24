'use client';
import { useState } from 'react';
import { 
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  User,
  Calendar,
  DollarSign,
  X
} from 'lucide-react';

interface Policy {
  id: string;
  policyNumber: string;
  customerName: string;
  productType: string;
  status: 'Active' | 'Lapsed' | 'Pending' | 'Expired';
  premiumAmount: number;
  startDate: string;
  endDate: string;
  sumAssured: number;
  lastPaymentDate: string;
}

export default function PolicyEnquiryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const policies: Policy[] = [
    {
      id: '1',
      policyNumber: 'POL-2023-001',
      customerName: 'John Kamau',
      productType: 'Life Insurance',
      status: 'Active',
      premiumAmount: 5000,
      startDate: '2023-01-15',
      endDate: '2024-01-15',
      sumAssured: 500000,
      lastPaymentDate: '2023-12-15'
    },
    {
      id: '2',
      policyNumber: 'POL-2023-045',
      customerName: 'Sarah Wanjiku',
      productType: 'Health Insurance',
      status: 'Lapsed',
      premiumAmount: 3200,
      startDate: '2023-03-10',
      endDate: '2024-03-10',
      sumAssured: 250000,
      lastPaymentDate: '2023-11-30'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Active: "bg-green-100 text-green-800",
      Lapsed: "bg-red-100 text-red-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Expired: "bg-gray-100 text-gray-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </span>
    );
  };

  const filteredPolicies = policies.filter(policy =>
    policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.productType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPolicy(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Policy Enquiry</h1>
          </div>
          <p className="text-gray-600">Search and view policy information</p>
        </div>

        {/* Search Controls */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  type="text"
                  placeholder="Search policies..."
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
                <option value="Active">Active</option>
                <option value="Lapsed">Lapsed</option>
                <option value="Pending">Pending</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-2 py-1 border rounded text-sm hover:bg-gray-50">
                <Download className="w-3 h-3" />
                Export
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                Search
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
                  <th className="px-3 py-2 text-left font-medium">Policy No</th>
                  <th className="px-3 py-2 text-left font-medium">Customer</th>
                  <th className="px-3 py-2 text-left font-medium">Product</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Premium</th>
                  <th className="px-3 py-2 text-left font-medium">Sum Assured</th>
                  <th className="px-3 py-2 text-left font-medium">Start Date</th>
                  <th className="px-3 py-2 text-left font-medium">End Date</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{policy.policyNumber}</td>
                    <td className="px-3 py-2 text-gray-900">{policy.customerName}</td>
                    <td className="px-3 py-2 text-gray-500">{policy.productType}</td>
                    <td className="px-3 py-2">{getStatusBadge(policy.status)}</td>
                    <td className="px-3 py-2 text-gray-500">KES {policy.premiumAmount.toLocaleString()}</td>
                    <td className="px-3 py-2 text-gray-500">KES {policy.sumAssured.toLocaleString()}</td>
                    <td className="px-3 py-2 text-gray-500">{policy.startDate}</td>
                    <td className="px-3 py-2 text-gray-500">{policy.endDate}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openModal(policy)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="w-3 h-3" />
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
        {isModalOpen && selectedPolicy && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Policy Details</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div><strong>Policy Number:</strong> {selectedPolicy.policyNumber}</div>
                  <div><strong>Customer Name:</strong> {selectedPolicy.customerName}</div>
                  <div><strong>Product Type:</strong> {selectedPolicy.productType}</div>
                  <div><strong>Status:</strong> {getStatusBadge(selectedPolicy.status)}</div>
                  <div><strong>Premium Amount:</strong> KES {selectedPolicy.premiumAmount.toLocaleString()}</div>
                  <div><strong>Sum Assured:</strong> KES {selectedPolicy.sumAssured.toLocaleString()}</div>
                  <div><strong>Start Date:</strong> {selectedPolicy.startDate}</div>
                  <div><strong>End Date:</strong> {selectedPolicy.endDate}</div>
                  <div className="col-span-2"><strong>Last Payment Date:</strong> {selectedPolicy.lastPaymentDate}</div>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-4 border-t">
                <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Download Policy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}