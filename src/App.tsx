import React, { useState } from 'react';
import { Send, FileCheck, AlertCircle, Globe, Heart } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  justification: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  countryCode: '+1',
  phoneNumber: '',
  justification: '',
};

const countryCodes = [
  { code: '+1', name: 'United States/Canada' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+33', name: 'France' },
  { code: '+49', name: 'Germany' },
  { code: '+34', name: 'Spain' },
  { code: '+39', name: 'Italy' },
  { code: '+81', name: 'Japan' },
  { code: '+86', name: 'China' },
  { code: '+91', name: 'India' },
  { code: '+7', name: 'Russia' },
  { code: '+55', name: 'Brazil' },
  { code: '+52', name: 'Mexico' },
];

function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setStatus('success');
      setFormData(initialFormData);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-700 px-8 py-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-blue-100" />
                <h1 className="text-3xl font-bold text-white">Global Refuge</h1>
              </div>
              <p className="text-blue-100 mt-2">Humanitarian Aid Request Form</p>
            </div>
            <Heart className="w-12 h-12 text-red-400" />
          </div>

          <div className="p-8 bg-blue-50">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Request Information</h2>
              <p className="text-gray-600 mb-6">Please provide detailed information about your aid request. All fields are required.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                      minLength={5}
                      maxLength={100}
                      pattern="^[a-zA-Z\s]{5,100}$"
                      title="Please enter at least two words, letters and spaces only"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <select
                          id="countryCode"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        >
                          {countryCodes.map(country => (
                            <option key={country.code} value={country.code}>
                              {country.name} ({country.code})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                          pattern="[0-9]{6,15}"
                          title="Please enter a valid phone number (6-15 digits)"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="justification" className="block text-sm font-medium text-gray-700">
                      Request Details
                    </label>
                    <textarea
                      id="justification"
                      name="justification"
                      value={formData.justification}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Please describe your situation and the type of aid you are requesting..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                      minLength={100}
                      maxLength={1000}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.justification.length}/1000 characters
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    {status === 'error' && (
                      <div className="flex items-center text-red-600">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <span>{errorMessage}</span>
                      </div>
                    )}
                    {status === 'success' && (
                      <div className="flex items-center text-green-600">
                        <FileCheck className="w-5 h-5 mr-2" />
                        <span>Request submitted successfully</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Submitting...
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;