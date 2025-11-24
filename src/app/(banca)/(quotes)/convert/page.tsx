'use client';
import { useState } from 'react';
import { 
  RefreshCw,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Download
} from 'lucide-react';

interface ConvertibleQuote {
  id: string;
  quoteNumber: string;
  product: string;
  insuranceCompany: string;
  coverFrom: string;
  coverTo: string;
  client: string;
  currency: string;
  converted: boolean;
  policyNo: string;
}

export default function ConvertQuotesPage() {
  const [quotationNo, setQuotationNo] = useState('');
  const [inputSelection, setInputSelection] = useState('');
  const [outputSelection, setOutputSelection] = useState('');
  const [productSelection, setProductSelection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const quotesData: ConvertibleQuote[] = [
    {
      id: '1',
      quoteNumber: 'QT001234',
      product: 'Life Insurance',
      insuranceCompany: 'ABSA Insurance',
      coverFrom: '01/06/2023',
      coverTo: '31/05/2024',
      client: 'ABDI ADAN',
      currency: 'USD',
      converted: true,
      policyNo: 'POL001234'
    },
    {
      id: '2',
      quoteNumber: 'QT001235',
      product: 'Corporate Insurance',
      insuranceCompany: 'ABSA Insurance',
      coverFrom: '15/06/2023',
      coverTo: '14/06/2024',
      client: 'ABSA BANK',
      currency: 'USD',
      converted: false,
      policyNo: '-'
    }
  ];

  const getConversionBadge = (converted: boolean) => {
    return converted ? (
      <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
        <CheckCircle className="w-3 h-3" />
        Yes
      </span>
    ) : (
      <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
        <XCircle className="w-3 h-3" />
        No
      </span>
    );
  };

  const filteredQuotes = quotesData.filter(quote =>
    quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConvert = (quoteId: string) => {
    console.log('Converting quote:', quoteId);
    alert(`Quote ${quoteId} converted successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <RefreshCw className="w-6 h-6 text-green-600" />
            <h1 className="text-xl font-bold text-gray-900">Convert Quotes</h1>
          </div>
          <p className="text-gray-600">Convert insurance quotes to policies</p>
        </div>

        {/* Conversion Controls */}
        <div className="bg-white rounded-lg shadow border p-3 mb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <input type="text" value={quotationNo} onChange={(e) => setQuotationNo(e.target.value)} placeholder="Quotation No" className="px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-blue-500" />
            <select value={inputSelection} onChange={(e) => setInputSelection(e.target.value)} className="px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-blue-500">
              <option value="">Input</option>
              <option value="input1">Input 1</option>
            </select>
            <select value={outputSelection} onChange={(e) => setOutputSelection(e.target.value)} className="px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-blue-500">
              <option value="">Output</option>
              <option value="output1">Output 1</option>
            </select>
            <select value={productSelection} onChange={(e) => setProductSelection(e.target.value)} className="px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-blue-500">
              <option value="">Product</option>
              <option value="life">Life Insurance</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
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
                  <th className="px-3 py-2 text-left font-medium">Product</th>
                  <th className="px-3 py-2 text-left font-medium">Company</th>
                  <th className="px-3 py-2 text-left font-medium">From</th>
                  <th className="px-3 py-2 text-left font-medium">To</th>
                  <th className="px-3 py-2 text-left font-medium">Client</th>
                  <th className="px-3 py-2 text-left font-medium">Currency</th>
                  <th className="px-3 py-2 text-left font-medium">Converted</th>
                  <th className="px-3 py-2 text-left font-medium">Policy No</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{quote.quoteNumber}</td>
                    <td className="px-3 py-2 text-gray-500">{quote.product}</td>
                    <td className="px-3 py-2 text-gray-500 truncate max-w-24">{quote.insuranceCompany}</td>
                    <td className="px-3 py-2 text-gray-500">{quote.coverFrom}</td>
                    <td className="px-3 py-2 text-gray-500">{quote.coverTo}</td>
                    <td className="px-3 py-2 text-gray-900">{quote.client}</td>
                    <td className="px-3 py-2 text-gray-500">{quote.currency}</td>
                    <td className="px-3 py-2">{getConversionBadge(quote.converted)}</td>
                    <td className="px-3 py-2 text-gray-500">{quote.policyNo}</td>
                    <td className="px-3 py-2">
                      {!quote.converted ? (
                        <button onClick={() => handleConvert(quote.id)} className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                          <RefreshCw className="w-3 h-3" />Convert
                        </button>
                      ) : (
                        <button className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                          <Download className="w-3 h-3" />Download
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}