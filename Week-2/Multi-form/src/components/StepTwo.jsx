import React from 'react'
import "../assets/styles/step-2.css"
export default function StepTwo({formData, handleInputChange}) {
    const occupations = [
    { value: '', label: 'Select Occupation' },
    { value: 'student', label: 'Student' },
    { value: 'professional', label: 'Professional' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <>
     <div className="step-content">
      <h2>Professional Details</h2>
      <div className="form-group">
        <label htmlFor="occupation">Occupation *</label>
        <select
          id="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          required
        >
          {occupations.map(occupation => (
            <option key={occupation.value} value={occupation.value}>
              {occupation.label}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional Fields based on Occupation */}
      {formData.occupation === 'student' && (
        <div className="conditional-fields">
          <div className="form-group">
            <label htmlFor="university">University *</label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="graduationYear">Expected Graduation Year</label>
            <input
              type="number"
              id="graduationYear"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleInputChange}
              min="2024"
              max="2030"
            />
          </div>
        </div>
      )}

      {formData.occupation === 'professional' && (
        <div className="conditional-fields">
          <div className="form-group">
            <label htmlFor="companyName">Company Name *</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      {formData.occupation === 'other' && (
        <div className="conditional-fields">
          <div className="form-group">
            <label htmlFor="comments">Tell us about your occupation</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              rows="3"
              placeholder="Please describe your occupation..."
            />
          </div>
        </div>
      )}
    </div>
    </>
  )
}
