import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function deckGetter() {
      const response = readDeck(deckId);
      const deckFromAPI = await response;
      setDeckName(deckFromAPI.name);
      setDeckDescription(deckFromAPI.description);
    }
    deckGetter();
  }, [deckId]);

  const handleNameChange = (event) => setDeckName(event.target.value);
  const handleDescriptionChange = (event) => setDeckDescription(event.target.value);
  const handleDeckSubmit = (event) => {
    event.preventDefault();
    updateDeck({ id: deckId, name: deckName, description: deckDescription})
    .then((updatedDeck) => history.push(`/decks/${updatedDeck.id}`));
  };

  return (
    <div>
         <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"/> Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deckName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Deck </li>
      </ol>
    </nav>
      <h1>Edit Deck</h1>

      <form onSubmit={handleDeckSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            id="deckName"
            type="text"
            name="deckName"
            className="form-control"
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
            rows="5"
            onChange={handleDescriptionChange}
            value={deckDescription}
            required={true}
          />
        </div>
        <button
        type="button"
        className="btn btn-secondary mx-2"
        onClick={() => history.push(`/decks/${deckId}`)}
      > Cancel  </button>
        <button type="submit" className="btn btn-primary">
          Submit </button>
      </form>

    </div>
  );
}

export default EditDeck;