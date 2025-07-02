import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OnboardStep3() {
  const navigate = useNavigate();
  const location = useLocation();

  const step1Data = location.state?.step1Data;
  const step2Data = location.state?.step2Data;

  const [finalData, setFinalData] = useState({
    bio: "",
  });

  const handleChange = (e) => {
    setFinalData({...finalData, [e.target.name]: e.target.value});
  };

  const handleBack = () => {
    navigate("/onboard/step2", { state: { step1Data, step2Data } });
  };

  const handleSubmit = () => {
    // Here you can combine all data and send it to backend
    const allData = {
      ...step1Data,
      ...step2Data,
      ...finalData,
    };

    // Example POST request:
    fetch("http://localhost:4000/api/user/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(allData),
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        alert("Onboarding completed!");
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
        alert("Failed to complete onboarding");
      }
    })
    .catch(() => alert("Error submitting data"));
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Step 3: Final Details</h2>
      <textarea
        name="bio"
        placeholder="Tell us about yourself"
        value={finalData.bio}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
        rows={4}
      />
      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="bg-green-600 text-white p-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
