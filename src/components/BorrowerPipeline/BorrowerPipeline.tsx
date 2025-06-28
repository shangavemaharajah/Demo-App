import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './../../components/ui/tabs';
import StatusBadge from '../common/StatusBadge';
import { mockApiData } from '../../api/mockApiData';

interface BorrowerPipelineProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeBorrower: string;
  setActiveBorrower: (id: string) => void;
  searchTerm: string;
}

const BorrowerPipeline: React.FC<BorrowerPipelineProps> = ({
  activeTab,
  setActiveTab,
  activeBorrower,
  setActiveBorrower,
  searchTerm
}) => {
  const [isRadioActive, setIsRadioActive] = useState(true);

  const tabs = [
    { key: 'new', label: 'New', data: mockApiData.pipeline.new },
    { key: 'in_review', label: 'In Review', data: mockApiData.pipeline.in_review },
    { key: 'approved', label: 'Approved', data: mockApiData.pipeline.approved }
  ];

  const filteredData = tabs.find(tab => tab.key === activeTab)?.data.filter(borrower =>
    borrower.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatAmount = (amount: number) => `$${amount.toLocaleString()}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-fit p-4 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Borrower Pipeline</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4 sm:mb-6">
        <TabsList className="grid grid-cols-3 w-full gap-1 sm:gap-2">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.key} 
              value={tab.key}
              className="data-[state=active]:bg-black-50 data-[state=active]:text-blue-800 data-[state=active]:border-b-2 data-[state=active]:border-blue-900 py-1 sm:py-2 text-xs sm:text-sm"
            >
              <span className="flex flex-col items-center">
                <span>{tab.label}</span>
                <span className="text-xs font-normal mt-0 sm:mt-1">{tab.data.length}</span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-2 sm:space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-1 sm:pr-2">
        {filteredData.map((borrower) => (
          <div
            key={borrower.id}
            onClick={() => setActiveBorrower(borrower.id)}
            className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
              activeBorrower === borrower.id
                ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-2 sm:gap-0">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base">{borrower.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0 sm:mt-1">{borrower.loan_type}</p>
              </div>
              <div className="text-left sm:text-right ml-0 sm:ml-4">
                <p className="font-semibold text-gray-900 whitespace-nowrap text-sm sm:text-base">
                  {formatAmount(borrower.amount)}
                </p>
                <div className="mt-1 sm:mt-2">
                  <StatusBadge status={borrower.status} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="text-center py-8 sm:py-12 text-gray-400">
            <svg
              className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-600">
              {searchTerm ? 'No matching borrowers found' : 'No borrowers in this category'}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search term' : 'Check back later or try another tab'}
            </p>
          </div>
        )}
      </div>

      {/* Toggle switch */}
      <div className="flex justify-end items-center mt-4 sm:mt-6">
        <label className="inline-flex items-center space-x-1 sm:space-x-2 cursor-pointer">
          <div className="relative inline-block w-8 sm:w-10 mr-1 sm:mr-2 align-middle select-none">
            <input
              type="checkbox"
              checked={isRadioActive}
              onChange={() => setIsRadioActive(!isRadioActive)}
              className="sr-only peer"
            />
            <div className="w-8 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </div>
          <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
            F-SANATISED ACTIVE
          </span>
        </label>
      </div>
    </div>
  );
};

export default BorrowerPipeline;