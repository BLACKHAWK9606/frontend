'use client';
import { useState } from 'react';
import { 
  RefreshCw,
  Search,
  Filter,
  Bell,
  Send,
  Calendar,
  User,
  DollarSign,
  X
} from 'lucide-react';

interface Renewal {
  id: string;
  policyNumber: string;
  customerName: string;
  productType: string;
  currentPremium: number;
  renewalDate: string;
  daysUntilRenewal: number;
  status: 'Due' | 'Upcoming' | 'Overdue';
  contact: string;
}

export default function RenewalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRenewal, setSelectedRenewal] = useState<Renewal | null>(null);
  const [modalType, setModalType] = useState<'reminder' | 'process'>('reminder');

  const renewals: Renewal[] = [
    {
      id: '1',
      policyNumber: 'POL-2023-001',
      customerName: 'John Kamau',
      productType: 'Life Insurance',
      currentPremium: 5000,
      renewalDate: '2024-02-15',
      daysUntilRenewal: 30,
      status: 'Upcoming',
      contact: '+254712345678'
    },
    {
      id: '2',
      policyNumber: 'POL-2023-045',
      customerName: 'Sarah Wanjiku',
      productType: 'Health Insurance',
      currentPremium: 3200,
      renewalDate: '2024-01-30',
      daysUntilRenewal: 5,
      status: 'Due',
      contact: '+254723456789'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Due: "bg-yellow-100 text-yellow-800",
      Upcoming: "bg-blue-100 text-blue-800",
      Overdue: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </span>
    );
  };

  const filteredRenewals = renewals.filter(renewal =>
    renewal.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    renewal.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    renewal.productType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (renewal: Renewal, type: 'reminder' | 'process') => {
    setSelectedRenewal(renewal);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRenewal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <RefreshCw className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Policy Renewals</h1>
          </div>
          <p className="text-gray-600">Manage policy renewals and send notifications</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  type="text"
                  placeholder="Search renewals..."
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
                <option value="Due">Due</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                <Send className="w-3 h-3" />
                Send Notices
              </button>
              <button className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                <Bell className="w-3 h-3" />
                Reminders
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
                  <th className="px-3 py-2 text-left font-medium">Renewal Date</th>
                  <th className="px-3 py-2 text-left font-medium">Days Left</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRenewals.map((renewal) => (
                  <tr key={renewal.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{renewal.policyNumber}</td>
                    <td className="px-3 py-2 text-gray-900">{renewal.customerName}</td>
                    <td className="px-3 py-2 text-gray-500">{renewal.productType}</td>
                    <td className="px-3 py-2 text-gray-500">KES {renewal.currentPremium.toLocaleString()}</td>
                    <td className="px-3 py-2 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {renewal.renewalDate}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{renewal.daysUntilRenewal} days</td>
                    <td className="px-3 py-2">{getStatusBadge(renewal.status)}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openModal(renewal, 'reminder')}
                          className="text-blue-600 hover:text-blue-900 text-xs"
                        >
                          Send Reminder
                        </button>
                        <button 
                          onClick={() => openModal(renewal, 'process')}
                          className="text-green-600 hover:text-green-900 text-xs"
                        >
                          Process
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
        {isModalOpen && selectedRenewal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalType === 'reminder' ? 'Send Renewal Reminder' : 'Process Renewal'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><strong>Policy Number:</strong> {selectedRenewal.policyNumber}</div>
                  <div><strong>Customer:</strong> {selectedRenewal.customerName}</div>
                  <div><strong>Product Type:</strong> {selectedRenewal.productType}</div>
                  <div><strong>Current Premium:</strong> KES {selectedRenewal.currentPremium.toLocaleString()}</div>
                  <div><strong>Renewal Date:</strong> {selectedRenewal.renewalDate}</div>
                  <div><strong>Days Until Renewal:</strong> {selectedRenewal.daysUntilRenewal} days</div>
                  <div><strong>Status:</strong> {getStatusBadge(selectedRenewal.status)}</div>
                  <div><strong>Contact:</strong> {selectedRenewal.contact}</div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {modalType === 'reminder' ? 'Reminder Message' : 'Processing Notes'}
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    rows={3}
                    placeholder={modalType === 'reminder' ? 'Enter reminder message...' : 'Enter processing notes...'}
                    defaultValue={modalType === 'reminder' ? `Dear ${selectedRenewal.customerName}, your policy ${selectedRenewal.policyNumber} is due for renewal on ${selectedRenewal.renewalDate}.` : ''}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 p-4 border-t">
                <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Cancel
                </button>
                {modalType === 'reminder' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Send Reminder
                  </button>
                )}
                {modalType === 'process' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Process Renewal
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