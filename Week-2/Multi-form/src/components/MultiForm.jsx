import { useState } from "react";
import StepOne from "./Step-1";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import "../assets/styles/form.css"

function MultiForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // for Step 1
    firstName: "",
    lastName: "",
    email: "",

    // for Step 2
    occupation: "",
    university: "",
    companyName: "",
    graduationYear: "",
    jobTitle: "",

    // for Step 3
    interests: [],
    newsletter: false,
    comments: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInterestsCahange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form Submitted");
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      occupation: "",
      university: "",
      companyName: "",
      graduationYear: "",
      jobTitle: "",
      interests: [],
      newsletter: false,
      comments: "",
    });
    setStep(1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email;
      case 2:
        if (!formData.occupation) return false;
        if (formData.occupation == "sstudent" && !formData.university)
          return false;
        if (formData.occupation == "professional" && !formData.companyName)
          return false;
        return true;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne formData={formData} handleInputChange={handleInputChange} />
        );
      case 2:
        return (
          <StepTwo formData={formData} handleInputChange={handleInputChange} />
        );
      case 3:
        return (
          <StepThree
            formData={formData}
            handleInputChange={handleInputChange}
            handleInterestsCahange={handleInterestsCahange}
          />
        );
      case 4:
        return <StepFour formData={formData} />;
      default:
        return (
          <StepOne formData={formData} handleInputChange={handleInputChange} />
        );
    }
  };

  return (
    <>
      <div className="multi-step-form">
        <div className="form-container">
          <div className="form-header">
            <h1>Multi-Step Form</h1>
            <div className="progress-bar">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`progress-step ${
                    step === stepNumber ? "active" : ""
                  } ${step > stepNumber ? "completed" : ""}`}
                >
                  <div className="step-number">{stepNumber}</div>
                  <div className="step-label">
                    {stepNumber === 1 && "Personal"}
                    {stepNumber === 2 && "Professional"}
                    {stepNumber === 3 && "Additional"}
                    {stepNumber === 4 && "Preview"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="form-navigation">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                  disabled={!isStepValid()}
                >
                  Next
                </button>
              ) : (
                <div className="final-actions">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-secondary"
                  >
                    Back to edit
                  </button>
                  <button type="submit" className="btn btn-success">
                    Submit form
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-outline"
                  >
                    Start over
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MultiForm
