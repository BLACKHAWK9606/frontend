'use client';
import { useState } from 'react';
import { 
  Search,
  Filter,
  Eye,
  Download,
  ChevronDown
} from 'lucide-react';

interface Quote {
  id: string;
  quoteNumber: string;
  revisionNo: string;
  coverFrom: string;
  coverTo: string;
  clientProspect: string;
  productName: string;
  currency: string;
  status: string;
  priceBy: string;
}

export default function QuoteEnquiryPage() {
  const [selectedProspect, setSelectedProspect] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const quotesData: Quote[] = [
    {
      id: '1',
      quoteNumber: 'QT001234',
      revisionNo: '1',
      coverFrom: '01/06/2023',
      coverTo: '31/05/2024',
      clientProspect: 'ABDI ADAN',
      productName: 'Life Insurance',
      currency: 'USD',
      status: 'Active',
      priceBy: 'Abigael.Bundi'
    },
    {
      id: '2',
      quoteNumber: 'QT001235',
      revisionNo: '2',
      coverFrom: '15/06/2023',
      coverTo: '14/06/2024',
      clientProspect: 'ABSA BANK',
      productName: 'Corporate Insurance',
      currency: 'USD',
      status: 'Pending',
      priceBy: 'Clinton.Moranga'
    }
  ];

  const prospects = [
    'ABDI ADAN',
    'Abigael N',
    'ABIGAEL BUNDI',
    'ABSA BANK',
    'ABRAHAM SHITANDI'
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles: { [key: string]: string } = {
      Active: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Expired: "bg-red-100 text-red-800",
      Draft: "bg-gray-100 text-gray-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const filteredQuotes = quotesData.filter(quote =>
    quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.clientProspect.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">Quotes Enquiry</h1>
          <p className="text-gray-600 mt-1">Search and view existing quotes</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <div className="flex flex-wrap gap-3 items-center mb-3">
            <select value={selectedProspect} onChange={(e) => setSelectedProspect(e.target.value)} className="px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-blue-500">
              <option value="">All Prospects</option>
              {prospects.map(prospect => (
                <option key={prospect} value={prospect}>{prospect}</option>
              ))}
            </select>
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-7 pr-3 py-1 border rounded text-sm w-full focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Search</button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Quote No</th>
                  <th className="px-3 py-2 text-left font-medium">Rev</th>
                  <th className="px-3 py-2 text-left font-medium">From</th>
                  <th className="px-3 py-2 text-left font-medium">To</th>
                  <th className="px-3 py-2 text-left font-medium">Client</th>
                  <th className="px-3 py-2 text-left font-medium">Product</th>
                  <th className="px-3 py-2 text-left font-medium">Currency</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Price By</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{quote.quoteNumber}</td>
                    <td className="px-3 py-2 text-gray-500">{quote.revisionNo}</td>
                    <td className="px-3 py-2 text-gray-500">{quote.coverFrom}</td>
                    <td className="px-3 py-2 text-gray-500">{quote.coverTo}</td>
                    <td className="px-3 py-2 text-gray-900">{quote.clientProspect}</td>
                    <td className="px-3 py-2 text-gray-500">{quote.productName}</td>
                    <td className="px-3 py-2 text-gray-500">{quote.currency}</td>
                    <td className="px-3 py-2">{getStatusBadge(quote.status)}</td>
                    <td className="px-3 py-2 text-gray-500 truncate max-w-24">{quote.priceBy}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
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

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between">
          <button className="px-4 py-1 border rounded text-sm text-gray-700 hover:bg-gray-50">Close</button>
          <button className="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Select Client</button>
        </div>
      </div>
    </div>
  );
}