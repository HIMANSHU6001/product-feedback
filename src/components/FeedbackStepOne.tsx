import React from 'react';
import { Star } from 'lucide-react';

interface FeedbackStepOneProps {
  rating: number;
  updateFeedback: (key: string, value: number) => void;
}

const FeedbackStepOne: React.FC<FeedbackStepOneProps> = ({ rating, updateFeedback }) => {
  return (
    <div className="py-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        How would you rate your overall experience with our product?
      </h2>
      
      <div className="flex justify-center items-center gap-2 md:gap-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => updateFeedback('rating', star)}
            className={`transition-all duration-300 transform hover:scale-110 focus:outline-none ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={`w-10 h-10 md:w-12 md:h-12 ${
                star <= rating ? 'fill-yellow-400 stroke-yellow-400' : 'fill-none stroke-current'
              }`}
            />
          </button>
        ))}
      </div>
      
      <p className="text-center mt-4 text-gray-600">
        {rating === 0 
          ? "Select a rating" 
          : rating === 1 
            ? "Poor" 
            : rating === 2 
              ? "Fair" 
              : rating === 3 
                ? "Good" 
                : rating === 4 
                  ? "Very Good" 
                  : "Excellent"}
      </p>
    </div>
  );
};

export default FeedbackStepOne;
