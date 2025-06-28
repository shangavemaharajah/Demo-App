import React, { useState } from "react";
import { User, AlertTriangle, CheckCircle, ChevronDown, FileText, Building, Shield, Info, X } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import { mockApiData } from "../../api/mockApiData";

interface Borrower {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  employment: string;
  income: number;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string | null;
  ai_flags: string[];
}

interface BorrowerDetailsMap {
  [key: string]: Borrower | undefined;
}

const borrowerDetails: BorrowerDetailsMap = mockApiData.borrowerDetails;

interface BorrowerDetailsProps {
  borrowerId: string;
}

const BorrowerDetails: React.FC<BorrowerDetailsProps> = ({ borrowerId }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const borrower = borrowerDetails[borrowerId];

  const handleAction = (action: string, type: 'success' | 'error' = 'success') => {
    setNotification({message: `${action}`, type});
    setTimeout(() => setNotification(null), 5000);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatCreditScore = (score: number) => {
    if (score >= 800) return <span className="text-green-600">{score} (Excellent)</span>;
    if (score >= 740) return <span className="text-blue-600">{score} (Very Good)</span>;
    if (score >= 670) return <span className="text-yellow-600">{score} (Good)</span>;
    if (score >= 580) return <span className="text-orange-600">{score} (Fair)</span>;
    return <span className="text-red-600">{score} (Poor)</span>;
  };

  if (!borrower) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
        <div className="text-center py-12 text-gray-400">
          <User className="mx-auto w-12 h-12 mb-4 text-gray-300" />
          <p className="text-gray-500">Select a borrower from the pipeline to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-fit overflow-hidden">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
          notification.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="p-6">
        {/* Header Section */}
        <div className="border-b border-gray-100 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-900">{borrower.name}</h2>
                <StatusBadge status={borrower.status} />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm">
                <a href={`mailto:${borrower.email}`} className="text-blue-800 hover:text-blue-800 flex items-center">
                  <span className="truncate">{borrower.email}</span>
                </a>
                <a href={`tel:${borrower.phone}`} className="text-gray-600 hover:text-gray-800">
                  {borrower.phone}
                </a>
              </div>
              
              <div className="pt-2">
                <p className="text-2xl font-semibold text-gray-900">
                  {formatAmount(borrower.loan_amount)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Loan Amount Requested</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-expanded={isAccordionOpen}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-1.5 rounded-full ${
                borrower.ai_flags.length > 0 
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'
              }`}>
                <Info className="w-4 h-4" />
              </div>
              <h3 className="font-medium text-gray-900">AI Flags</h3>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isAccordionOpen ? "rotate-180" : ""
            }`} />
          </button>

          {isAccordionOpen && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg animate-fade-in">
              {borrower.ai_flags.length > 0 ? (
                <div className="space-y-3">
                  {borrower.ai_flags.map((flag, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-white border border-red-100 rounded-lg shadow-xs"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Potential Risk</p>
                        <p className="text-sm text-red-700 mt-1">{flag}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-white border border-green-100 rounded-lg shadow-xs">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">No risks detected</p>
                    <p className="text-sm text-green-700 mt-1">AI analysis found no concerning patterns</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => handleAction("Documents requested")}
            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <FileText className="w-4 h-4 mr-2" />
            Request Docs
          </button>
          <button
            onClick={() => handleAction("Valuer notified")}
            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Building className="w-4 h-4 mr-2" />
            Valuer
          </button>
          <button
            onClick={() => handleAction("Loan approved", 'success')}
            className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve
          </button>
        </div>

        {/* Loan Summary */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Employment</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{borrower.employment}</dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Income</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{formatAmount(borrower.income)}</dd>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Score</dt>
                <dd className="mt-1 text-sm font-medium">{formatCreditScore(borrower.credit_score)}</dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">Existing Debt</dt>
                <dd className="mt-1 text-sm font-medium text-gray-900">{formatAmount(borrower.existing_loan)}</dd>
              </div>
            </div>
          </div>

          {/* Risk Signal */}
          {borrower.risk_signal && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-amber-100 text-amber-600 rounded-full">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Risk Advisory</h4>
                  <p className="text-sm text-amber-700 mt-1">{borrower.risk_signal}</p>
                </div>
              </div>
            </div>
          )}

          {/* Escalate Button */}
          <button
            onClick={() => handleAction("Case escalated", 'error')}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 shadow-sm"
          >
            <Shield className="w-4 h-4 mr-2" />
            Escalate to Credit Committee
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowerDetails;