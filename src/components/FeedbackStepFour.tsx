import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

interface EmotionOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface FeedbackStepFourProps {
  visualFeedback: string;
  updateFeedback: (key: string, value: string) => void;
}

const FeedbackStepFour: React.FC<FeedbackStepFourProps> = ({ visualFeedback, updateFeedback }) => {
  const emotions: EmotionOption[] = [
    {
      id: "happy",
      name: "Great",
      icon: <Smile className="h-12 w-12 md:h-16 md:w-16" />
    },
    {
      id: "neutral",
      name: "Okay",
      icon: <Meh className="h-12 w-12 md:h-16 md:w-16" />
    },
    {
      id: "sad",
      name: "Poor",
      icon: <Frown className="h-12 w-12 md:h-16 md:w-16" />
    }
  ];

  return (
    <div className="py-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        How did the product look to you?
      </h2>
      
      <div className="flex justify-center items-center gap-6 md:gap-10">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => updateFeedback('visualFeedback', emotion.id)}
            className="flex flex-col items-center transition-all duration-300"
          >
            <div className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
              visualFeedback === emotion.id
                ? 'text-blue-500 bg-blue-100'
                : 'text-gray-400 hover:text-gray-600'
            }`}>
              {emotion.icon}
            </div>
            <span className={`mt-2 font-medium ${
              visualFeedback === emotion.id ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {emotion.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedbackStepFour;
