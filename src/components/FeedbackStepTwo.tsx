import React from 'react';

interface FeedbackStepTwoProps {
  likedMost: string;
  updateFeedback: (key: string, value: string) => void;
}

const occupations = [
  "Software Developer",
  "Designer",
  "Product Manager",
  "Marketing Professional",
  "Student",
  "Business Owner",
  "Executive",
  "Teacher/Educator",
  "Healthcare Professional",
  "Other"
];

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
  "New Hampshire", "New Jersey", "New Mexico", "New York", 
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
  "West Virginia", "Wisconsin", "Wyoming", "Not in the US"
];

const FeedbackStepTwo: React.FC<FeedbackStepTwoProps> = ({ likedMost, updateFeedback }) => {
  // We're still using likedMost for storing the demographic data as JSON
  // This avoids changing the parent component structure
  
  const demographicData = React.useMemo(() => {
    try {
      return likedMost ? JSON.parse(likedMost) : {
        userType: "",
        occupation: "",
        state: "",
        companySize: ""
      };
    } catch (e) {
      return {
        userType: "",
        occupation: "",
        state: "",
        companySize: ""
      };
    }
  }, [likedMost]);

  const updateDemographicData = (key: string, value: string) => {
    const updatedData = { ...demographicData, [key]: value };
    updateFeedback('likedMost', JSON.stringify(updatedData));
  };

  return (
    <div className="py-4 animate-fade-in space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Tell us a bit about yourself
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Are you providing feedback as:</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="userType" 
                value="individual"
                checked={demographicData.userType === "individual"}
                onChange={() => updateDemographicData('userType', 'individual')}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Individual User</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="radio" 
                name="userType" 
                value="company" 
                checked={demographicData.userType === "company"}
                onChange={() => updateDemographicData('userType', 'company')}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Company Representative</span>
            </label>
          </div>
        </div>

        {demographicData.userType === "company" && (
          <div>
            <label htmlFor="companySize" className="block text-sm font-medium mb-1">Company Size</label>
            <select 
              id="companySize"
              value={demographicData.companySize}
              onChange={(e) => updateDemographicData('companySize', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501+">501+ employees</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium mb-1">Occupation</label>
          <select 
            id="occupation"
            value={demographicData.occupation}
            onChange={(e) => updateDemographicData('occupation', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select your occupation</option>
            {occupations.map((occupation) => (
              <option 
                key={occupation} 
                value={occupation.toLowerCase().replace(/\s+/g, '-')}
              >
                {occupation}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-1">State/Region</label>
          <select 
            id="state"
            value={demographicData.state}
            onChange={(e) => updateDemographicData('state', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select your state</option>
            {states.map((state) => (
              <option 
                key={state} 
                value={state.toLowerCase().replace(/\s+/g, '-')}
              >
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FeedbackStepTwo;
