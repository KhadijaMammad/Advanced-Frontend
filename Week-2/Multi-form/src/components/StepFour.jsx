import React from 'react'
import "../assets/styles/step-4.css"

export default function StepFour({formData}) {
  return (
    <>
      <div className="step-content">
      <h2>Preview Your Information</h2>
      <div className="preview-container">
        <div className="preview-section">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
        </div>

        <div className="preview-section">
          <h3>Professional Details</h3>
          <p><strong>Occupation:</strong> {formData.occupation}</p>
          {formData.occupation === 'student' && (
            <>
              <p><strong>University:</strong> {formData.university}</p>
              <p><strong>Graduation Year:</strong> {formData.graduationYear}</p>
            </>
          )}
          {formData.occupation === 'professional' && (
            <>
              <p><strong>Company:</strong> {formData.companyName}</p>
              <p><strong>Job Title:</strong> {formData.jobTitle}</p>
            </>
          )}
          {formData.occupation === 'other' && formData.comments && (
            <p><strong>Occupation Details:</strong> {formData.comments}</p>
          )}
        </div>

        <div className="preview-section">
          <h3>Additional Information</h3>
          <p><strong>Interests:</strong> {formData.interests.join(', ') || 'None'}</p>
          <p><strong>Newsletter:</strong> {formData.newsletter ? 'Subscribed' : 'Not Subscribed'}</p>
          {formData.comments && (
            <p><strong>Comments:</strong> {formData.comments}</p>
          )}
        </div>
      </div>
    </div>
    
    
    </>
  )
}
