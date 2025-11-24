'use client';
import { useState } from 'react';
import { 
  Save,
  FileText,
  User,
  Shield,
  CreditCard,
  Package
} from 'lucide-react';

interface QuoteForm {
  clientType: string;
  privacy: string;
  securityGroup: string;
  paymentMode: string;
  invoiceUser: string;
  loadsMax: string;
  type: string;
  product: string;
  contract: string;
  insuredClient: string;
  provider: string;
}

export default function NewQuotePage() {
  const [formData, setFormData] = useState<QuoteForm>({
    clientType: '',
    privacy: '',
    securityGroup: '',
    paymentMode: '',
    invoiceUser: '',
    loadsMax: '',
    type: '',
    product: '',
    contract: '',
    insuredClient: '',
    provider: ''
  });

  const handleInputChange = (field: keyof QuoteForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote data:', formData);
    alert('Quote created successfully!');
  };

  const questionGroups = [
    {
      icon: User,
      title: 'Client Information',
      questions: [
        { id: 'clientType', label: 'Select Client Type' },
        { id: 'privacy', label: 'Select Privacy' },
        { id: 'securityGroup', label: 'Select Security Group' }
      ]
    },
    {
      icon: CreditCard,
      title: 'Payment Details',
      questions: [
        { id: 'paymentMode', label: 'Select Payment Mode' },
        { id: 'invoiceUser', label: 'Select Invoice User' },
        { id: 'loadsMax', label: 'Select Loads Max' }
      ]
    },
    {
      icon: Package,
      title: 'Product Details',
      questions: [
        { id: 'type', label: 'Select Type' },
        { id: 'product', label: 'Select Product' },
        { id: 'contract', label: 'Select Contract' }
      ]
    },
    {
      icon: Shield,
      title: 'Insurance Details',
      questions: [
        { id: 'insuredClient', label: 'Select Insured Client' },
        { id: 'provider', label: 'Select Provider' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">New Quote</h1>
          <p className="text-gray-600 mt-1">Create a new insurance quote</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {questionGroups.map((group, groupIndex) => {
              const Icon = group.icon;
              return (
                <div key={groupIndex} className="bg-white rounded-lg shadow border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">{group.title}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {group.questions.map((question, questionIndex) => (
                      <div key={question.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {question.label}
                        </label>
                        <select
                          value={formData[question.id as keyof QuoteForm]}
                          onChange={(e) => handleInputChange(question.id as keyof QuoteForm, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select an option</option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 bg-white rounded-lg shadow border p-6">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
                Create Quote
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}