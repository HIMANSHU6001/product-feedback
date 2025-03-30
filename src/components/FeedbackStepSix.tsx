import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FeedbackStepSixProps {
  onSubmit: () => void;
}

const FeedbackStepSix: React.FC<FeedbackStepSixProps> = ({ onSubmit }) => {
  return (
    <div className="py-4 text-center animate-fade-in">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-20 w-20 text-green-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Thank You For Your Feedback!
      </h2>
      
      <p className="text-gray-600 mb-4">
        Your feedback and demographic information help us improve our product for users like you.
      </p>
      
      <p className="text-gray-600 mb-8">
        We appreciate the time you&apos;ve taken to share your thoughts with us.
      </p>
      
      <button 
        onClick={onSubmit}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105"
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackStepSix;
