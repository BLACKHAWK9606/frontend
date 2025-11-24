'use client';
import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter,
  Plus,
  Eye,
  Edit,
  ChevronDown,
  Download,
  Upload,
  Check
} from 'lucide-react';

interface Prospect {
  id: string;
  name: string;
  phone: string;
  prospectType: string;
  dateOfBirth: string;
  status: string;
  category: string;
  branch: string;
  comment: string;
  createdBy: string;
}

type ModalType = 'view' | 'edit' | 'add' | null;

export default function ProspectsPage() {
  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [formData, setFormData] = useState<Partial<Prospect> | null>(null);

  const prospectsData: Prospect[] = [
    {
      id: 'PRS/00048/150525',
      name: 'ABDI ADAN',
      phone: '795300888',
      prospectType: 'INDIVIDUAL',
      dateOfBirth: '31/12/1948',
      status: 'Active',
      category: 'Hot',
      branch: '',
      comment: '',
      createdBy: 'Abigael.Bundi@absa.africa'
    },
    {
      id: 'PRS/00038',
      name: 'Abigael N',
      phone: '792846951',
      prospectType: 'STAFF',
      dateOfBirth: '21/03/2001',
      status: 'Active',
      category: 'Hot',
      branch: 'DIGO BRANCH',
      comment: '',
      createdBy: 'Abigael.Bundi@absa.africa'
    },
    {
      id: 'PRS/00041',
      name: 'ABIGAEL BUNDI',
      phone: '792597621',
      prospectType: 'INDIVIDUAL',
      dateOfBirth: '07/01/1986',
      status: 'Active',
      category: 'Hot',
      branch: 'AVON BRANCH',
      comment: '',
      createdBy: 'Abigael.Bundi@absa.africa'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles: { [key: string]: string } = {
      Active: "bg-green-100 text-green-800",
      Hot: "bg-red-100 text-red-800",
      Cold: "bg-blue-100 text-blue-800",
      Warm: "bg-yellow-100 text-yellow-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const filteredProspects = prospectsData.filter(prospect =>
    prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.phone.includes(searchTerm) ||
    prospect.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setModalType('add');
    setFormData({
      name: '',
      phone: '',
      prospectType: 'INDIVIDUAL',
      dateOfBirth: '',
      status: 'Active',
      category: 'Hot',
      branch: '',
      comment: '',
      createdBy: 'user@example.com'
    });
    setIsModalOpen(true);
  };

  const openViewModal = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setModalType('view');
    setIsModalOpen(true);
  };

  const openEditModal = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setFormData({ ...prospect });
    setModalType('edit');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedProspect(null);
    setFormData(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving prospect:', formData);
    closeModal();
  };

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
      <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4" onClick={closeModal}>
        <div className="bg-white rounded-lg w-full max-w-4xl shadow-lg transform transition-all duration-200" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center p-6 bg-blue-600 border-b rounded-t-lg">
            <h3 className="text-lg font-semibold text-white">
              {modalType === 'view' ? 'Prospect Details' : modalType === 'edit' ? 'Edit Prospect' : 'Add New Prospect'}
            </h3>
            <button onClick={closeModal} className="text-white hover:text-gray-200 text-xl" aria-label="Close modal">✕</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {modalType === 'view' && selectedProspect && (
                <div className="grid grid-cols-2 gap-6">
                  <div><strong>ID:</strong> {selectedProspect.id}</div>
                  <div><strong>Name:</strong> {selectedProspect.name}</div>
                  <div><strong>Phone:</strong> {selectedProspect.phone}</div>
                  <div><strong>Type:</strong> {selectedProspect.prospectType}</div>
                  <div><strong>Date of Birth:</strong> {selectedProspect.dateOfBirth}</div>
                  <div><strong>Status:</strong> {getStatusBadge(selectedProspect.status)}</div>
                  <div><strong>Category:</strong> {getStatusBadge(selectedProspect.category)}</div>
                  <div><strong>Branch:</strong> {selectedProspect.branch || '-'}</div>
                  <div className="col-span-2"><strong>Created By:</strong> {selectedProspect.createdBy}</div>
                </div>
              )}

              {(modalType === 'edit' || modalType === 'add') && formData && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input type="text" name="phone" value={formData.phone || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prospect Type *</label>
                      <select name="prospectType" value={formData.prospectType || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required>
                        <option value="INDIVIDUAL">Individual</option>
                        <option value="STAFF">Staff</option>
                        <option value="CORPORATE">Corporate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                      <select name="status" value={formData.status || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select name="category" value={formData.category || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required>
                        <option value="Hot">Hot</option>
                        <option value="Warm">Warm</option>
                        <option value="Cold">Cold</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                      <input type="text" name="branch" value={formData.branch || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                      <textarea name="comment" value={formData.comment || ''} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">Cancel</button>
              {(modalType === 'edit' || modalType === 'add') && (
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                  {modalType === 'add' ? 'Add Prospect' : 'Save Changes'}
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
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">Prospects List</h1>
          <p className="text-gray-600 mt-1">Manage and view all prospects</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="flex items-center gap-3">
              <select value={showEntries} onChange={(e) => setShowEntries(Number(e.target.value))} className="border rounded px-2 py-1 text-sm">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <button className="flex items-center gap-1 px-2 py-1 border rounded text-sm hover:bg-gray-50">
                <Download className="w-3 h-3" />Export
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-7 pr-3 py-1 border rounded text-sm w-48 focus:ring-1 focus:ring-blue-500" />
              </div>
              <button onClick={openAddModal} className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                <Plus className="w-3 h-3" />Add
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">ID</th>
                  <th className="px-3 py-2 text-left font-medium">Name</th>
                  <th className="px-3 py-2 text-left font-medium">Phone</th>
                  <th className="px-3 py-2 text-left font-medium">Type</th>
                  <th className="px-3 py-2 text-left font-medium">DOB</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Category</th>
                  <th className="px-3 py-2 text-left font-medium">Branch</th>
                  <th className="px-3 py-2 text-left font-medium">Created By</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProspects.slice(0, showEntries).map((prospect) => (
                  <tr key={prospect.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{prospect.id}</td>
                    <td className="px-3 py-2 text-gray-900">{prospect.name}</td>
                    <td className="px-3 py-2 text-gray-500">{prospect.phone}</td>
                    <td className="px-3 py-2 text-gray-500">{prospect.prospectType}</td>
                    <td className="px-3 py-2 text-gray-500">{prospect.dateOfBirth}</td>
                    <td className="px-3 py-2">{getStatusBadge(prospect.status)}</td>
                    <td className="px-3 py-2">{getStatusBadge(prospect.category)}</td>
                    <td className="px-3 py-2 text-gray-500">{prospect.branch || '-'}</td>
                    <td className="px-3 py-2 text-gray-500 truncate max-w-32">{prospect.createdBy}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openViewModal(prospect)} className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-3 h-3" />
                        </button>
                        <button onClick={() => openEditModal(prospect)} className="text-green-600 hover:text-green-900">
                          <Edit className="w-3 h-3" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Check className="w-3 h-3" />
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
              Showing {Math.min(showEntries, filteredProspects.length)} of {filteredProspects.length}
            </div>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border rounded text-xs hover:bg-gray-50">Prev</button>
              <button className="px-2 py-1 border rounded text-xs bg-blue-600 text-white">1</button>
              <button className="px-2 py-1 border rounded text-xs hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
      
      <Modal />
    </div>
  );
}