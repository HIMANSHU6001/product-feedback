import React from "react";

interface FeedbackStepFiveProps {
  additionalComments: string;
  updateFeedback: (key: string, value: string) => void;
}

const FeedbackStepFive: React.FC<FeedbackStepFiveProps> = ({
  additionalComments,
  updateFeedback,
}) => {
  return (
    <div className="py-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Anything else you'd like to share?
      </h2>

      <textarea
        value={additionalComments}
        onChange={(e) => updateFeedback("additionalComments", e.target.value)}
        placeholder="Any other comments or suggestions..."
        maxLength={500}
        className="w-full min-h-[150px] resize-none p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
      />

      <div className="flex justify-end mt-2">
        <p className="text-sm text-gray-500">
          {additionalComments.length}/500 characters
        </p>
      </div>
    </div>
  );
};

export default FeedbackStepFive;
