'use client';
import { useState } from 'react';
import { 
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Upload,
  FileText,
  Building,
  UserCheck,
  Link,
  Edit,
  Eye,
  Trash2,
  ChevronDown,
  X,
  Save,
  Mail,
  Phone,
  Calendar,
  DollarSign
} from 'lucide-react';

interface Intermediary {
  id: string;
  name: string;
  type: 'Introducer' | 'Marketer' | 'Link Agent';
  accountType: string;
  customerNumber: string;
  noterundiaryType: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
  totalClients: number;
  totalPremium: number;
  address?: string;
  commissionRate?: number;
  notes?: string;
}

type ModalType = 'view' | 'edit' | 'add' | 'delete' | null;

export default function IntermediariesPage() {
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedIntermediary, setSelectedIntermediary] = useState<Intermediary | null>(null);
  const [formData, setFormData] = useState<Partial<Intermediary>>({});

  const intermediariesData: Intermediary[] = [
    {
      id: 'INT-001',
      name: 'ABC Insurance Brokers',
      type: 'Introducer',
      accountType: 'Corporate',
      customerNumber: 'CUST-78901',
      noterundiaryType: 'Type A',
      email: 'contact@abcbrokers.com',
      phone: '+254712345678',
      status: 'Active',
      joinDate: '2023-01-15',
      totalClients: 45,
      totalPremium: 1250000,
      address: 'Nairobi, Kenya',
      commissionRate: 15,
      notes: 'Top performing introducer'
    },
    {
      id: 'INT-002',
      name: 'John Marketing Agency',
      type: 'Marketer',
      accountType: 'Individual',
      customerNumber: 'CUST-78902',
      noterundiaryType: 'Type B',
      email: 'john@marketing.co.ke',
      phone: '+254723456789',
      status: 'Active',
      joinDate: '2023-03-20',
      totalClients: 28,
      totalPremium: 850000,
      address: 'Mombasa, Kenya',
      commissionRate: 12,
      notes: 'Specializes in corporate clients'
    },
    {
      id: 'INT-003',
      name: 'Prime Link Agents',
      type: 'Link Agent',
      accountType: 'Corporate',
      customerNumber: 'CUST-78903',
      noterundiaryType: 'Type C',
      email: 'info@primelink.co.ke',
      phone: '+254734567890',
      status: 'Pending',
      joinDate: '2024-01-10',
      totalClients: 12,
      totalPremium: 320000,
      address: 'Kisumu, Kenya',
      commissionRate: 10
    }
  ];

  const accountTypes = ['Corporate', 'Individual', 'Partnership', 'LLC'];
  const informationCategories = ['Introducer', 'Marketer', 'Link Agent'];
  const noterundiaryTypes = ['Type A', 'Type B', 'Type C', 'Type D'];
  const statusOptions = ['Active', 'Inactive', 'Pending'];

  // Modal Handlers
  const openModal = (type: ModalType, intermediary?: Intermediary) => {
    setModalType(type);
    setSelectedIntermediary(intermediary || null);
    
    if (type === 'add') {
      setFormData({
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        totalClients: 0,
        totalPremium: 0,
        commissionRate: 10
      });
    } else if (type === 'edit' && intermediary) {
      setFormData({ ...intermediary });
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedIntermediary(null);
    setFormData({});
  };

  const handleInputChange = (field: keyof Intermediary, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (modalType === 'add') {
      // Generate new ID and add intermediary
      const newId = `INT-${String(intermediariesData.length + 1).padStart(3, '0')}`;
      const newIntermediary: Intermediary = {
        id: newId,
        name: formData.name || '',
        type: formData.type as 'Introducer' | 'Marketer' | 'Link Agent',
        accountType: formData.accountType || '',
        customerNumber: formData.customerNumber || '',
        noterundiaryType: formData.noterundiaryType || '',
        email: formData.email || '',
        phone: formData.phone || '',
        status: formData.status as 'Active' | 'Inactive' | 'Pending',
        joinDate: formData.joinDate || '',
        totalClients: formData.totalClients || 0,
        totalPremium: formData.totalPremium || 0,
        address: formData.address,
        commissionRate: formData.commissionRate,
        notes: formData.notes
      };
      console.log('Adding new intermediary:', newIntermediary);
      alert('Intermediary added successfully!');
    } else if (modalType === 'edit' && selectedIntermediary) {
      console.log('Updating intermediary:', formData);
      alert('Intermediary updated successfully!');
    }
    
    closeModal();
  };

  const handleDelete = () => {
    if (selectedIntermediary) {
      console.log('Deleting intermediary:', selectedIntermediary.id);
      alert(`Intermediary ${selectedIntermediary.name} deleted successfully!`);
      closeModal();
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles: { [key: string]: string } = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-red-100 text-red-800",
      Pending: "bg-yellow-100 text-yellow-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Introducer':
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'Marketer':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'Link Agent':
        return <Link className="w-4 h-4 text-purple-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredIntermediaries = intermediariesData.filter(intermediary =>
    intermediary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intermediary.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intermediary.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (selectedAccountType && intermediary.accountType === selectedAccountType) ||
    (selectedCategory && intermediary.type === selectedCategory)
  );

  // Modal Component
  const Modal = () => {
    if (!isModalOpen) return null;

    const getModalTitle = () => {
      switch (modalType) {
        case 'view': return 'Intermediary Details';
        case 'edit': return 'Edit Intermediary';
        case 'add': return 'Add New Intermediary';
        case 'delete': return 'Confirm Delete';
        default: return '';
      }
    };

    return (
      <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4" onClick={closeModal}>
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] shadow-lg transform transition-all duration-200 flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
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

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {modalType === 'view' && selectedIntermediary && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Intermediary ID</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedIntermediary.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div>{getStatusBadge(selectedIntermediary.status)}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedIntermediary.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedIntermediary.type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedIntermediary.accountType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer No</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedIntermediary.customerNumber}</p>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="flex items-center gap-2 text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        <Mail className="w-4 h-4" />
                        {selectedIntermediary.email}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="flex items-center gap-2 text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        <Phone className="w-4 h-4" />
                        {selectedIntermediary.phone}
                      </div>
                    </div>
                    {selectedIntermediary.address && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedIntermediary.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Clients</label>
                      <p className="text-2xl font-bold text-gray-900">{selectedIntermediary.totalClients}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Premium</label>
                      <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                        <DollarSign className="w-5 h-5" />
                        {selectedIntermediary.totalPremium.toLocaleString()}
                      </div>
                    </div>
                    {selectedIntermediary.commissionRate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate</label>
                        <p className="text-2xl font-bold text-gray-900">{selectedIntermediary.commissionRate}%</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedIntermediary.notes && (
                  <div className="border-t pt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedIntermediary.notes}</p>
                  </div>
                )}
              </div>
            )}

            {(modalType === 'edit' || modalType === 'add') && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter intermediary name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                    <select
                      value={formData.type || ''}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      {informationCategories.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type *</label>
                    <select
                      value={formData.accountType || ''}
                      onChange={(e) => handleInputChange('accountType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Account Type</option>
                      {accountTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                    <select
                      value={formData.status || ''}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Number *</label>
                    <input
                      type="text"
                      value={formData.customerNumber || ''}
                      onChange={(e) => handleInputChange('customerNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter customer number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Noterundiary Type</label>
                    <select
                      value={formData.noterundiaryType || ''}
                      onChange={(e) => handleInputChange('noterundiaryType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      {noterundiaryTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={formData.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                      <input
                        type="number"
                        value={formData.commissionRate || ''}
                        onChange={(e) => handleInputChange('commissionRate', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter commission rate"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                      <input
                        type="date"
                        value={formData.joinDate || ''}
                        onChange={(e) => handleInputChange('joinDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      value={formData.notes || ''}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter any additional notes..."
                    />
                  </div>
                </div>
              </div>
            )}

            {modalType === 'delete' && selectedIntermediary && (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Intermediary</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete <strong>{selectedIntermediary.name}</strong>? This action cannot be undone.
                </p>
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
            {modalType === 'delete' ? (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            ) : (
              (modalType === 'edit' || modalType === 'add') && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  {modalType === 'add' ? 'Add Intermediary' : 'Save Changes'}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">Intermediary List</h1>
          <p className="text-gray-600 mt-1">Manage insurance intermediaries, marketers, and agents</p>
        </div>

        {/* Account Type Section */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Type</h2>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <select
              value={selectedAccountType}
              onChange={(e) => setSelectedAccountType(e.target.value)}
              className="w-full lg:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Account Type</option>
              {accountTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="flex gap-2 w-full lg:w-auto">
              <button 
                onClick={() => openModal('add')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <UserPlus className="w-4 h-4" />
                Add Intermediary
              </button>
            </div>
          </div>
        </div>

        {/* ... Rest of the components remain the same as before ... */}
        {/* Intermodalities Section */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Intermodalities</h2>
          <p className="text-gray-600 mb-4">Import Each Agent/Marketer Data</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <Upload className="w-4 h-4" />
              Import Data
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Download Template
            </button>
          </div>
        </div>

        {/* Information Category Section */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Information Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {informationCategories.map((category) => (
              <div key={category} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                {getTypeIcon(category)}
                <span className="font-medium text-gray-900">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Show</span>
                <select 
                  value={showEntries}
                  onChange={(e) => setShowEntries(Number(e.target.value))}
                  className="border rounded-md px-3 py-1 text-sm"
                >
                  <option value={10}>10 entries</option>
                  <option value={25}>25 entries</option>
                  <option value={50}>50 entries</option>
                  <option value={100}>100 entries</option>
                </select>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-md px-3 py-1 text-sm"
              >
                <option value="">All Categories</option>
                {informationCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search intermediaries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Modified By Section */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Modified By</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Noterundiary Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Noterundiary Type</option>
                {noterundiaryTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer No
              </label>
              <input
                type="text"
                placeholder="Enter customer number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Intermediaries Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">ID</th>
                  <th className="px-3 py-2 text-left font-medium">Name</th>
                  <th className="px-3 py-2 text-left font-medium">Type</th>
                  <th className="px-3 py-2 text-left font-medium">Account</th>
                  <th className="px-3 py-2 text-left font-medium">Customer No</th>
                  <th className="px-3 py-2 text-left font-medium">Contact</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Clients</th>
                  <th className="px-3 py-2 text-left font-medium">Premium</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIntermediaries.slice(0, showEntries).map((intermediary) => (
                  <tr key={intermediary.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{intermediary.id}</td>
                    <td className="px-3 py-2 text-gray-900 truncate max-w-32">{intermediary.name}</td>
                    <td className="px-3 py-2 text-gray-500">{intermediary.type}</td>
                    <td className="px-3 py-2 text-gray-500">{intermediary.accountType}</td>
                    <td className="px-3 py-2 text-gray-500">{intermediary.customerNumber}</td>
                    <td className="px-3 py-2 text-gray-500 truncate max-w-24">{intermediary.email}</td>
                    <td className="px-3 py-2">{getStatusBadge(intermediary.status)}</td>
                    <td className="px-3 py-2 text-gray-500 text-center">{intermediary.totalClients}</td>
                    <td className="px-3 py-2 text-gray-500">KES {intermediary.totalPremium.toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openModal('view', intermediary)} className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-3 h-3" />
                        </button>
                        <button onClick={() => openModal('edit', intermediary)} className="text-green-600 hover:text-green-900">
                          <Edit className="w-3 h-3" />
                        </button>
                        <button onClick={() => openModal('delete', intermediary)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Intermediaries</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{intermediariesData.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          {/* ... other summary cards ... */}
        </div>
      </div>

      {/* Modal Component */}
      <Modal />
    </div>
  );
}