import React from 'react';
import { AlertTriangle, CheckCircle, ChevronDown } from 'lucide-react';

interface AiExplainabilityAccordionProps {
  aiFlags: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const AiExplainabilityAccordion: React.FC<AiExplainabilityAccordionProps> = ({ aiFlags, isOpen, onToggle }) => (
  <div className="mb-6">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <h3 className="font-medium text-gray-900">AI Explainability</h3>
      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>

    {isOpen && (
      <div className="mt-3 p-4 border border-gray-200 rounded-lg">
        {aiFlags.length > 0 ? (
          <div className="space-y-3">
            {aiFlags.map((flag, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-red-800">{flag}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-800">No issues detected</span>
          </div>
        )}
      </div>
    )}
  </div>
);

export default AiExplainabilityAccordion;
