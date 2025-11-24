'use client';
import { useState } from 'react';
import { 
  AlertTriangle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Mail,
  Phone,
  Calendar,
  X
} from 'lucide-react';

interface LapsedPolicy {
  id: string;
  policyNumber: string;
  customerName: string;
  productType: string;
  premiumAmount: number;
  lapseDate: string;
  daysLapsed: number;
  status: 'Recent' | 'Warning' | 'Critical';
  contact: string;
  lastPaymentDate: string;
}

export default function LapsePoliciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<LapsedPolicy | null>(null);

  const lapsedPolicies: LapsedPolicy[] = [
    {
      id: '1',
      policyNumber: 'POL-2023-001',
      customerName: 'John Kamau',
      productType: 'Life Insurance',
      premiumAmount: 5000,
      lapseDate: '2024-01-15',
      daysLapsed: 15,
      status: 'Recent',
      contact: '+254712345678',
      lastPaymentDate: '2023-12-15'
    },
    {
      id: '2',
      policyNumber: 'POL-2023-045',
      customerName: 'Sarah Wanjiku',
      productType: 'Health Insurance',
      premiumAmount: 3200,
      lapseDate: '2024-01-05',
      daysLapsed: 25,
      status: 'Warning',
      contact: '+254723456789',
      lastPaymentDate: '2023-11-30'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Recent: "bg-blue-100 text-blue-800",
      Warning: "bg-yellow-100 text-yellow-800",
      Critical: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </span>
    );
  };

  const filteredPolicies = lapsedPolicies.filter(policy =>
    policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.productType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (policy: LapsedPolicy) => {
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
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h1 className="text-xl font-bold text-gray-900">Lapsed Policies</h1>
          </div>
          <p className="text-gray-600">Manage and track lapsed insurance policies</p>
        </div>

        {/* Controls */}
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
                <option value="Recent">Recent</option>
                <option value="Warning">Warning</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-2 py-1 border rounded text-sm hover:bg-gray-50">
                <Download className="w-3 h-3" />
                Export
              </button>
              <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                <RefreshCw className="w-3 h-3" />
                Refresh
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
                  <th className="px-3 py-2 text-left font-medium">Premium</th>
                  <th className="px-3 py-2 text-left font-medium">Lapse Date</th>
                  <th className="px-3 py-2 text-left font-medium">Days Lapsed</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Contact</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{policy.policyNumber}</td>
                    <td className="px-3 py-2 text-gray-900">{policy.customerName}</td>
                    <td className="px-3 py-2 text-gray-500">{policy.productType}</td>
                    <td className="px-3 py-2 text-gray-500">KES {policy.premiumAmount.toLocaleString()}</td>
                    <td className="px-3 py-2 text-gray-500">{policy.lapseDate}</td>
                    <td className="px-3 py-2 text-gray-500">{policy.daysLapsed} days</td>
                    <td className="px-3 py-2">{getStatusBadge(policy.status)}</td>
                    <td className="px-3 py-2 text-gray-500">{policy.contact}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openModal(policy)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Phone className="w-3 h-3" />
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
            <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Policy Details</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><strong>Policy Number:</strong> {selectedPolicy.policyNumber}</div>
                  <div><strong>Customer:</strong> {selectedPolicy.customerName}</div>
                  <div><strong>Product Type:</strong> {selectedPolicy.productType}</div>
                  <div><strong>Premium:</strong> KES {selectedPolicy.premiumAmount.toLocaleString()}</div>
                  <div><strong>Lapse Date:</strong> {selectedPolicy.lapseDate}</div>
                  <div><strong>Days Lapsed:</strong> {selectedPolicy.daysLapsed} days</div>
                  <div><strong>Status:</strong> {getStatusBadge(selectedPolicy.status)}</div>
                  <div><strong>Contact:</strong> {selectedPolicy.contact}</div>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-4 border-t">
                <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Take Action
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}