import React from 'react';
import { AlertCircle, Shield } from 'lucide-react';

interface LoanSummaryCardProps {
  employment: string;
  existingLoan: number;
  creditScore: number;
  sourceOfFunds: string;
  riskSignal: string | null;
  onEscalate: () => void;
}

const formatAmount = (amount: number) => `$${amount.toLocaleString()}`;

const LoanSummaryCard: React.FC<LoanSummaryCardProps> = ({
  employment,
  existingLoan,
  creditScore,
  sourceOfFunds,
  riskSignal,
  onEscalate
}) => (
  <div className="border-t border-gray-200 pt-6">
    <h3 className="font-semibold text-gray-900 mb-4">Loan Summary</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="space-y-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Employment</dt>
          <dd className="mt-1 text-sm text-gray-900">{employment}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Existing Loan</dt>
          <dd className="mt-1 text-sm text-gray-900">{formatAmount(existingLoan)}</dd>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Credit Score</dt>
          <dd className="mt-1 text-sm text-gray-900">{creditScore}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Source of Funds</dt>
          <dd className="mt-1 text-sm text-gray-900">{sourceOfFunds}</dd>
        </div>
      </div>
    </div>

    {riskSignal && (
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Risk Signal</h4>
            <p className="text-sm text-yellow-700 mt-1">{riskSignal}</p>
          </div>
        </div>
      </div>
    )}

    <button
      onClick={onEscalate}
      className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
    >
      <Shield className="w-5 h-5 mr-2" />
      Escalate to Credit Committee
    </button>
  </div>
);

export default LoanSummaryCard;
