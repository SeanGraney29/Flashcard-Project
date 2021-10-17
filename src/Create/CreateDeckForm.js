import React, { useState }  from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeckForm() {

  const history = useHistory();
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  const handleCreateDeckSubmit = (event) => {
    event.preventDefault();
    createDeck({ name: deckName, description: deckDescription })
      .then((newDeck) => history.push(`/decks/${newDeck.id}`));
  };

  const handleNameChange = (event) => setDeckName(event.target.value);
  const handleDescriptionChange = (event) => setDeckDescription(event.target.value);

    return (
      <form onSubmit={handleCreateDeckSubmit}>
      <div className="form-group">
        <label htmlFor="deckName">Name</label>
        <input
          id="deckName"
          type="text"
          name="deckName"
          className="form-control"
          placeholder="Deck Name"
          onChange={handleNameChange}
          value={deckName}
          required={true}
        />
      </div>
      <div className="form-group">
        <label htmlFor="deckDescription">Description</label>
        <textarea
          id="deckDescription"
          name="deckDescription"
          className="form-control"
          placeholder="Brief description of deck"
          rows="4"
          onChange={handleDescriptionChange}
          value={deckDescription}
          required={true}
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary mx-2"
        onClick={() => history.push("/")}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    )
};

export default CreateDeckForm;