'use client';
import { useState } from 'react';
import { 
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Calendar,
  UserCheck,
  X,
  Save,
  FileText
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  idPassportRegNo: string;
  email: string;
  phone: string;
  clientType: 'Individual' | 'Corporate' | 'SME';
  status: 'Active' | 'Inactive' | 'Pending';
  citNo: string;
  createdOn: string;
  createdBy: string;
  approved: boolean;
  address?: string;
  dateOfBirth?: string;
  registrationDate?: string;
}

type ModalType = 'view' | 'edit' | 'add' | 'delete' | null;

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState(10);
  const [selectedClientType, setSelectedClientType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Partial<Client>>({});

  const clientsData: Client[] = [
    {
      id: 'CLI-001',
      name: 'John Kamau',
      idPassportRegNo: '12345678',
      email: 'john.kamau@email.com',
      phone: '+254712345678',
      clientType: 'Individual',
      status: 'Active',
      citNo: 'P051234567M',
      createdOn: '2023-01-15',
      createdBy: 'admin.user',
      approved: true,
      address: 'Nairobi, Kenya',
      dateOfBirth: '1985-05-15'
    },
    {
      id: 'CLI-002',
      name: 'ABC Corporation Ltd',
      idPassportRegNo: 'CORP-2020-789',
      email: 'info@abccorp.co.ke',
      phone: '+254720987654',
      clientType: 'Corporate',
      status: 'Active',
      citNo: 'C001234567X',
      createdOn: '2023-03-20',
      createdBy: 'admin.user',
      approved: true,
      address: 'Westlands, Nairobi',
      registrationDate: '2020-01-10'
    },
    {
      id: 'CLI-003',
      name: 'Sarah Wanjiku',
      idPassportRegNo: '98765432',
      email: 'sarah.w@email.com',
      phone: '+254733456789',
      clientType: 'Individual',
      status: 'Pending',
      citNo: 'P059876543N',
      createdOn: '2024-01-10',
      createdBy: 'agent.mike',
      approved: false,
      address: 'Mombasa, Kenya',
      dateOfBirth: '1990-08-22'
    },
    {
      id: 'CLI-004',
      name: 'Tech Solutions SME',
      idPassportRegNo: 'SME-2022-456',
      email: 'contact@techsme.co.ke',
      phone: '+254744567890',
      clientType: 'SME',
      status: 'Inactive',
      citNo: 'S001234568Y',
      createdOn: '2022-11-05',
      createdBy: 'admin.user',
      approved: true,
      address: 'Kisumu, Kenya',
      registrationDate: '2022-03-15'
    }
  ];

  const clientTypes = ['Individual', 'Corporate', 'SME'];
  const statusOptions = ['Active', 'Inactive', 'Pending'];

  // Modal Handlers
  const openModal = (type: ModalType, client?: Client) => {
    setModalType(type);
    setSelectedClient(client || null);
    
    if (type === 'add') {
      setFormData({
        status: 'Pending',
        createdOn: new Date().toISOString().split('T')[0],
        approved: false,
        clientType: 'Individual'
      });
    } else if (type === 'edit' && client) {
      setFormData({ ...client });
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedClient(null);
    setFormData({});
  };

  const handleInputChange = (field: keyof Client, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newId = `CLI-${String(clientsData.length + 1).padStart(3, '0')}`;
      const newClient: Client = {
        id: newId,
        name: formData.name || '',
        idPassportRegNo: formData.idPassportRegNo || '',
        email: formData.email || '',
        phone: formData.phone || '',
        clientType: formData.clientType as 'Individual' | 'Corporate' | 'SME',
        status: formData.status as 'Active' | 'Inactive' | 'Pending',
        citNo: formData.citNo || '',
        createdOn: formData.createdOn || '',
        createdBy: formData.createdBy || 'current.user',
        approved: formData.approved || false,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        registrationDate: formData.registrationDate
      };
      console.log('Adding new client:', newClient);
      alert('Client added successfully!');
    } else if (modalType === 'edit' && selectedClient) {
      console.log('Updating client:', formData);
      alert('Client updated successfully!');
    }
    
    closeModal();
  };

  const handleDelete = () => {
    if (selectedClient) {
      console.log('Deleting client:', selectedClient.id);
      alert(`Client ${selectedClient.name} deleted successfully!`);
      closeModal();
    }
  };

  const handleApprove = (clientId: string) => {
    console.log('Approving client:', clientId);
    alert(`Client ${clientId} approved successfully!`);
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

  const getApprovalBadge = (approved: boolean) => {
    return approved ? (
      <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
        <CheckCircle className="w-3 h-3" />
        Approved
      </span>
    ) : (
      <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
        <XCircle className="w-3 h-3" />
        Pending
      </span>
    );
  };

  const getClientTypeIcon = (type: string) => {
    switch (type) {
      case 'Individual':
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'Corporate':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'SME':
        return <FileText className="w-4 h-4 text-purple-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.idPassportRegNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (selectedClientType && client.clientType === selectedClientType) ||
    (selectedStatus && client.status === selectedStatus)
  );

  // Modal Component
  const Modal = () => {
    if (!isModalOpen) return null;

    const getModalTitle = () => {
      switch (modalType) {
        case 'view': return 'Client Details';
        case 'edit': return 'Edit Client';
        case 'add': return 'Add New Client';
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
            {modalType === 'view' && selectedClient && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client ID</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedClient.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div>{getStatusBadge(selectedClient.status)}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedClient.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Type</label>
                    <div className="flex items-center gap-2 text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {getClientTypeIcon(selectedClient.clientType)}
                      {selectedClient.clientType}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID/Passport/Reg No</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedClient.idPassportRegNo}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CIT No</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedClient.citNo}</p>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="flex items-center gap-2 text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        <Mail className="w-4 h-4" />
                        {selectedClient.email}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="flex items-center gap-2 text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        <Phone className="w-4 h-4" />
                        {selectedClient.phone}
                      </div>
                    </div>
                    {selectedClient.address && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedClient.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Created On</label>
                      <div className="flex items-center gap-2 text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        <Calendar className="w-4 h-4" />
                        {selectedClient.createdOn}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Created By</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedClient.createdBy}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Approval Status</label>
                      <div>{getApprovalBadge(selectedClient.approved)}</div>
                    </div>
                    {selectedClient.dateOfBirth && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedClient.dateOfBirth}</p>
                      </div>
                    )}
                    {selectedClient.registrationDate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
                        <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedClient.registrationDate}</p>
                      </div>
                    )}
                  </div>
                </div>
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
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Type *</label>
                    <select
                      value={formData.clientType || ''}
                      onChange={(e) => handleInputChange('clientType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Client Type</option>
                      {clientTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID/Passport/Reg No *</label>
                    <input
                      type="text"
                      value={formData.idPassportRegNo || ''}
                      onChange={(e) => handleInputChange('idPassportRegNo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter identification number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CIT No *</label>
                    <input
                      type="text"
                      value={formData.citNo || ''}
                      onChange={(e) => handleInputChange('citNo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter CIT number"
                    />
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
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.approved || false}
                        onChange={(e) => handleInputChange('approved', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Approved?</span>
                    </label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Created On</label>
                      <input
                        type="date"
                        value={formData.createdOn || ''}
                        onChange={(e) => handleInputChange('createdOn', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Created By</label>
                      <input
                        type="text"
                        value={formData.createdBy || ''}
                        onChange={(e) => handleInputChange('createdBy', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter creator name"
                      />
                    </div>
                    {formData.clientType === 'Individual' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          value={formData.dateOfBirth || ''}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                    {(formData.clientType === 'Corporate' || formData.clientType === 'SME') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date</label>
                        <input
                          type="date"
                          value={formData.registrationDate || ''}
                          onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {modalType === 'delete' && selectedClient && (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Client</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete <strong>{selectedClient.name}</strong>? This action cannot be undone.
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
                  {modalType === 'add' ? 'Add Client' : 'Save Changes'}
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
          <h1 className="text-xl font-bold text-gray-900">Client List</h1>
          <p className="text-gray-600 mt-1">Manage and view all clients for underwriting</p>
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
                value={selectedClientType}
                onChange={(e) => setSelectedClientType(e.target.value)}
                className="border rounded-md px-3 py-1 text-sm"
              >
                <option value="">All Client Types</option>
                {clientTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded-md px-3 py-1 text-sm"
              >
                <option value="">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>

              <button 
                onClick={() => openModal('add')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <UserPlus className="w-4 h-4" />
                Add Client
              </button>
            </div>
          </div>
        </div>

        {/* Import/Export Section */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulk Operations</h3>
              <p className="text-gray-600">Import or export client data in bulk</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                <Upload className="w-4 h-4" />
                Import Clients
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Export Clients
              </button>
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">ID</th>
                  <th className="px-3 py-2 text-left font-medium">Name</th>
                  <th className="px-3 py-2 text-left font-medium">ID/Reg No</th>
                  <th className="px-3 py-2 text-left font-medium">Email</th>
                  <th className="px-3 py-2 text-left font-medium">Phone</th>
                  <th className="px-3 py-2 text-left font-medium">Type</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">CIT No</th>
                  <th className="px-3 py-2 text-left font-medium">Created</th>
                  <th className="px-3 py-2 text-left font-medium">Approved</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.slice(0, showEntries).map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{client.id}</td>
                    <td className="px-3 py-2 text-gray-900 truncate max-w-32">{client.name}</td>
                    <td className="px-3 py-2 text-gray-500">{client.idPassportRegNo}</td>
                    <td className="px-3 py-2 text-gray-500 truncate max-w-32">{client.email}</td>
                    <td className="px-3 py-2 text-gray-500">{client.phone}</td>
                    <td className="px-3 py-2 text-gray-500">{client.clientType}</td>
                    <td className="px-3 py-2">{getStatusBadge(client.status)}</td>
                    <td className="px-3 py-2 text-gray-500">{client.citNo}</td>
                    <td className="px-3 py-2 text-gray-500">{client.createdOn}</td>
                    <td className="px-3 py-2">{getApprovalBadge(client.approved)}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openModal('view', client)} className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-3 h-3" />
                        </button>
                        <button onClick={() => openModal('edit', client)} className="text-green-600 hover:text-green-900">
                          <Edit className="w-3 h-3" />
                        </button>
                        {!client.approved && (
                          <button onClick={() => handleApprove(client.id)} className="text-green-600 hover:text-green-900" title="Approve">
                            <CheckCircle className="w-3 h-3" />
                          </button>
                        )}
                        <button onClick={() => openModal('delete', client)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-3 py-2 border-t border-gray-200 flex items-center justify-between text-sm">
            <div className="text-gray-700">
              Showing {Math.min(showEntries, filteredClients.length)} of {filteredClients.length}
            </div>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border rounded text-xs hover:bg-gray-50">Prev</button>
              <button className="px-2 py-1 border rounded text-xs bg-blue-600 text-white">1</button>
              <button className="px-2 py-1 border rounded text-xs hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{clientsData.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {clientsData.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {clientsData.filter(c => !c.approved).length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Corporate Clients</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {clientsData.filter(c => c.clientType === 'Corporate').length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal />
    </div>
  );
}