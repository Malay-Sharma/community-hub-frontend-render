
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OnboardStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const step1Data = location.state?.step1Data;

  const [formData, setFormData] = useState({
    favoriteColor: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleNext = () => {
    // Pass accumulated data along
    navigate("/onboard/step3", { state: { step1Data, step2Data: formData } });
  };

  const handleBack = () => {
    navigate("/onboard/step1", { state: { step1Data } });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Step 2: Preferences</h2>
      <input
        type="text"
        name="favoriteColor"
        placeholder="Favorite Color"
        value={formData.favoriteColor}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />
      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
