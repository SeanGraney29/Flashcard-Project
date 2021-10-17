import React from "react";

function AddEditCardsForm({ cardFront, cardBack, handleFrontChange, handleBackChange }) {
  
  return (
    <div>
      <div className="form-group">
        <label htmlFor="cardFront">Front</label>
        <textarea
          id="cardFront"
          name="cardFront"
          className="form-control"
          placeholder="Where the questions go"
          rows="3"
          onChange={handleFrontChange}
          value={cardFront}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardBack">Back</label>
        <textarea
          id="cardBack"
          name="cardBack"
          className="form-control"
          placeholder="Where the answers go"
          rows="3"
          onChange={handleBackChange}
          value={cardBack}
        />
      </div>
    </div>
  );
}

export default AddEditCardsForm;