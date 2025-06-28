import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Cpu, ChevronRight, Star, Clock } from 'lucide-react';
import OnboardingWorkflow from './OnboardingWorkflow';
import { mockApiData } from '../../api/mockApiData';

interface Broker {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
  rating?: number;
  since?: string;
  phone?: string;
  email?: string;
}

interface Workflow {
  steps: string[];
}

const BrokerOverview: React.FC = () => {
  const [isAiAssistantOn, setIsAiAssistantOn] = useState(true);
  const broker: Broker = {
    ...mockApiData.broker,
    rating: 4.7,
    since: '2021',
    phone: '+1 (555) 123-4567',
    email: 'broker@example.com'
  };
  const workflow: Workflow = mockApiData.workflow;
  const [showAllSteps, setShowAllSteps] = useState(false);

  const formatApprovalRate = (rate: string) => {
    const percentage = parseFloat(rate);
    if (percentage >= 80) return <span className="text-green-600 font-semibold">{rate}</span>;
    if (percentage >= 60) return <span className="text-blue-600 font-semibold">{rate}</span>;
    if (percentage >= 40) return <span className="text-amber-600 font-semibold">{rate}</span>;
    return <span className="text-red-600 font-semibold">{rate}</span>;
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-xs sm:text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Static click handlers
  const handleCallClick = () => {
    alert(`Calling broker at ${broker.phone}`);
  };

  const handleEmailClick = () => {
    alert(`Opening email client to ${broker.email}`);
  };

  const handleChatClick = () => {
    alert('Opening chat window with broker');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 w-full max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 sm:mb-8 gap-4">
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{broker.name}</h2>
            <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 mt-1">
              {broker.rating && renderRatingStars(broker.rating)}
              {broker.since && (
                <div className="flex items-center text-xs sm:text-sm text-gray-500">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span>Member since {broker.since}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 md:p-5 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Deals Submitted</p>
              <p className="text-xl sm:text-xl font-bold text-gray-900 mt-1 sm:mt-2">{broker.deals}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 md:p-5 rounded-xl border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-green-600 uppercase tracking-wider">Approval Rate</p>
              <p className="text-xl sm:text-xl font-bold mt-1 sm:mt-2">{formatApprovalRate(broker.approval_rate)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4 md:p-5 rounded-xl border border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">Pending Deals</p>
              <p className="text-xl sm:text-xl font-bold text-gray-900 mt-1 sm:mt-2">${broker.pending}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
        <button
          onClick={handleCallClick}
          className="flex-1 min-w-full xs:min-w-[calc(50%-0.5rem)] sm:min-w-[150px] flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors duration-200 shadow-xs"
          aria-label="Call Broker"
        >
          <div className="p-1.5 sm:p-2 bg-blue-100 rounded-md sm:rounded-lg">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <span className="text-sm sm:text-base font-medium">Call</span>
        </button>
        <button
          onClick={handleEmailClick}
          className="flex-1 min-w-full xs:min-w-[calc(50%-0.5rem)] sm:min-w-[150px] flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors duration-200 shadow-xs"
          aria-label="Email Broker"
        >
          <div className="p-1.5 sm:p-2 bg-blue-100 rounded-md sm:rounded-lg">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <span className="text-sm sm:text-base font-medium">Email</span>
        </button>
        <button
          onClick={handleChatClick}
          className="flex-1 min-w-full xs:min-w-[calc(50%-0.5rem)] sm:min-w-[150px] flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors duration-200 shadow-xs"
          aria-label="Chat with Broker"
        >
          <div className="p-1.5 sm:p-2 bg-blue-100 rounded-md sm:rounded-lg">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <span className="text-sm sm:text-base font-medium">Chat</span>
        </button>
      </div>

      {/* AI Assistant Toggle */}
      <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 mb-6 sm:mb-8">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="p-2 sm:p-3 bg-blue-100 rounded-lg sm:rounded-xl">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">AI Deal Assistant</h3>
            <p className="text-xs sm:text-sm text-gray-500">Automated analysis and recommendations</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isAiAssistantOn}
            onChange={() => setIsAiAssistantOn(!isAiAssistantOn)}
            className="sr-only peer"
          />
          <div className="w-10 h-5 sm:w-12 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-5 sm:peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] sm:after:top-[4px] sm:after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Onboarding Workflow */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Onboarding Progress</h3>
          <button
  onClick={() => setShowAllSteps(!showAllSteps)}
  className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
>
  {showAllSteps ? "Show less" : "View all"}
  <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transform transition-transform ${showAllSteps ? 'rotate-90' : ''}`} />
</button>

        </div>
<OnboardingWorkflow steps={showAllSteps ? workflow.steps : workflow.steps.slice(0, 3)} />
      </div>
    </div>
  );
};

export default BrokerOverview;