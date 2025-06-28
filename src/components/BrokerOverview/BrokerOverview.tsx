import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Cpu, ChevronRight, ChevronDown, Star, Clock } from 'lucide-react';
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
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [expandBrokerInfo, setExpandBrokerInfo] = useState(false);
  const [expandWorkflow, setExpandWorkflow] = useState(false);

  const broker: Broker = {
    ...mockApiData.broker,
    rating: 4.7,
    since: '2021',
    phone: '+1 (555) 123-4567',
    email: 'broker@example.com'
  };

  const workflow: Workflow = mockApiData.workflow;

  const formatApprovalRate = (rate: string) => {
    const percentage = parseFloat(rate);
    if (percentage >= 80) return <span className="text-green-600 font-semibold">{rate}</span>;
    if (percentage >= 60) return <span className="text-blue-600 font-semibold">{rate}</span>;
    if (percentage >= 40) return <span className="text-amber-600 font-semibold">{rate}</span>;
    return <span className="text-red-600 font-semibold">{rate}</span>;
  };

  const renderRatingStars = (rating: number) => (
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

  const handleCallClick = () => alert(`Calling broker at ${broker.phone}`);
  const handleEmailClick = () => alert(`Opening email client to ${broker.email}`);
  const handleChatClick = () => alert('Opening chat window with broker');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 w-full max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 sm:mb-8 gap-4">
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{broker.name}</h2>
            <div className="hidden sm:flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 mt-1">
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

      {/* Responsive Broker Info Accordion */}
      <div className="sm:hidden mb-4">
        <button
          className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-800 mb-2"
          onClick={() => setExpandBrokerInfo(!expandBrokerInfo)}
        >
          Broker Info
          {expandBrokerInfo ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {expandBrokerInfo && (
          <div className="ml-2 space-y-2">
            {broker.rating && renderRatingStars(broker.rating)}
            {broker.since && (
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>Member since {broker.since}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Deals Submitted</p>
          <p className="text-xl font-bold text-gray-900 mt-2">{broker.deals}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-100">
          <p className="text-xs font-medium text-green-600 uppercase tracking-wider">Approval Rate</p>
          <p className="text-xl font-bold mt-2">{formatApprovalRate(broker.approval_rate)}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-100">
          <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">Pending Deals</p>
          <p className="text-xl font-bold text-gray-900 mt-2">${broker.pending}</p>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
        {[{
          icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
          label: 'Call',
          handler: handleCallClick,
        }, {
          icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
          label: 'Email',
          handler: handleEmailClick,
        }, {
          icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
          label: 'Chat',
          handler: handleChatClick,
        }].map(({ icon, label, handler }) => (
          <button
            key={label}
            onClick={handler}
            className="flex-1 min-w-full xs:min-w-[calc(50%-0.5rem)] sm:min-w-[150px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition"
          >
            <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
            <span className="text-sm sm:text-base font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* AI Assistant */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 mb-6 sm:mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">AI Assistant</h3>
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
          <div className="w-10 h-5 sm:w-12 sm:h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-5 sm:peer-checked:after:translate-x-6 after:absolute after:top-[2px] after:left-[2px] sm:after:top-[4px] sm:after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Onboarding Workflow */}
      <div className="sm:hidden mb-4">
        <button
          className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-800 mb-2"
          onClick={() => setExpandWorkflow(!expandWorkflow)}
        >
          Onboarding Progress
          {expandWorkflow ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {expandWorkflow && (
          <>
            <button
              onClick={() => setShowAllSteps(!showAllSteps)}
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center mb-2"
            >
              {showAllSteps ? 'Show less' : 'View all'}
              <ChevronRight className={`w-3 h-3 ml-1 transform transition-transform ${showAllSteps ? 'rotate-90' : ''}`} />
            </button>
            <OnboardingWorkflow steps={showAllSteps ? workflow.steps : workflow.steps.slice(0, 3)} />
          </>
        )}
      </div>

      <div className="hidden sm:block">
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
