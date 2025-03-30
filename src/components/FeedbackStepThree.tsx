import React from 'react';
import { Paintbrush, Gauge, Settings } from 'lucide-react';

interface FeatureOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface FeedbackStepThreeProps {
  standoutFeature: string;
  updateFeedback: (key: string, value: string) => void;
}

const FeedbackStepThree: React.FC<FeedbackStepThreeProps> = ({ standoutFeature, updateFeedback }) => {
  const features: FeatureOption[] = [
    {
      id: "design",
      name: "Design",
      icon: <Paintbrush className="h-8 w-8 mb-2" />
    },
    {
      id: "performance",
      name: "Performance",
      icon: <Gauge className="h-8 w-8 mb-2" />
    },
    {
      id: "easeOfUse",
      name: "Ease of Use",
      icon: <Settings className="h-8 w-8 mb-2" />
    }
  ];

  return (
    <div className="py-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Which feature stood out to you?
      </h2>
      
      <div className="grid grid-cols-3 gap-4">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => updateFeedback('standoutFeature', feature.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ${
              standoutFeature === feature.id
                ? 'bg-blue-100 border-2 border-blue-500 text-blue-700'
                : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
            }`}
          >
            {feature.icon}
            <span className="font-medium">{feature.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedbackStepThree;
