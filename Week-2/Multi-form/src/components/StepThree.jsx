import React from 'react'
import "../assets/styles/step-3.css"

export default function StepThree({formData, handleInputChange, handleInterestsCahange}) {
    const interests = [
    'Technology',
    'Science',
    'Arts',
    'Sports',
    'Travel',
    'Food',
    'Music',
    'Reading'
  ];
  return (
    <>
     <div className="step-content">
      <h2>Additional Information</h2>
      <div className="form-group">
        <label>Interests</label>
        <div className="interests-grid">
          {interests.map(interest => (
            <label key={interest} className="interest-checkbox">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestsCahange(interest)}
              />
              <span>{interest}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleInputChange}
          />
          Subscribe to our newsletter
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="additionalComments">Additional Comments</label>
        <textarea
          id="additionalComments"
          name="comments"
          value={formData.comments}
          onChange={handleInputChange}
          rows="4"
          placeholder="Any additional comments..."
        />
      </div>
    </div>
    
    </>
  )
}
