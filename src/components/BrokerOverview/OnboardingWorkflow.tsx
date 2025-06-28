import React from 'react';

interface OnboardingWorkflowProps {
  steps: string[];
}

const OnboardingWorkflow: React.FC<OnboardingWorkflowProps> = ({ steps }) => (
  <ol className="relative border-l border-gray-300 ml-4">
    {steps.map((step, idx) => {
      const isLast = idx === steps.length - 1;
      return (
        <li key={step} className="mb-10 ml-6">
          <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full ring-8 ring-white text-white font-bold">
            {idx + 1}
          </span>
          <h3 className="font-semibold text-gray-900">{step}</h3>
          {!isLast && (
            <div className="border-l-2 border-black-600 h-12 ml-3"></div>
          )}
        </li>
      );
    })}
  </ol>
);

export default OnboardingWorkflow;
