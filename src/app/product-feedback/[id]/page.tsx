"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import FeedbackStepOne from "@/components/FeedbackStepOne";
import FeedbackStepTwo from "@/components/FeedbackStepTwo";
import FeedbackStepThree from "@/components/FeedbackStepThree";
import FeedbackStepFour from "@/components/FeedbackStepFour";
import FeedbackStepFive from "@/components/FeedbackStepFive";
import FeedbackStepSix from "@/components/FeedbackStepSix";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    likedMost: "",
    standoutFeature: "",
    visualFeedback: "",
    additionalComments: "",
  });

  const totalSteps = 6;

  useEffect(() => {
    // Fetch the product details using the product ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        if (data.success) {
          setProductName(data.product.productName);
        } else {
          console.error("Failed to fetch product:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFeedback = (key: string, value: string | number) => {
    setFeedbackData({ ...feedbackData, [key]: value });
  };

  const handleSubmit = () => {
    console.log("Feedback submitted:", feedbackData);

    // Show toast notification using plain JS
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in";
    toast.textContent = "Thank you for your valuable feedback!";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-300");
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FeedbackStepOne
            rating={feedbackData.rating}
            updateFeedback={updateFeedback}
          />
        );
      case 2:
        return (
          <FeedbackStepTwo
            likedMost={feedbackData.likedMost}
            updateFeedback={updateFeedback}
          />
        );
      case 3:
        return (
          <FeedbackStepThree
            standoutFeature={feedbackData.standoutFeature}
            updateFeedback={updateFeedback}
          />
        );
      case 4:
        return (
          <FeedbackStepFour
            visualFeedback={feedbackData.visualFeedback}
            updateFeedback={updateFeedback}
          />
        );
      case 5:
        return (
          <FeedbackStepFive
            additionalComments={feedbackData.additionalComments}
            updateFeedback={updateFeedback}
          />
        );
      case 6:
        return <FeedbackStepSix onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Product Feedback - {productName ? productName : "Loading..."}
          </h1>
          <p className="text-gray-600">
            We value your opinion! Please tell us what you think.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01] border border-gray-100">
          <div className="p-6">
            <div className="flex justify-between mb-6">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full flex-1 mx-1 ${
                    index + 1 <= currentStep ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {renderStep()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
              )}

              <div className="flex-1"></div>

              {currentStep < totalSteps && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-2 transition-colors duration-200"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;