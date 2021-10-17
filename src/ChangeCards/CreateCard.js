import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import AddEditCardsForm from "./AddEditCardsForm";
import { readDeck, createCard } from "../utils/api/index";

function CreateCard() {
  const [deck, setDeck] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const deckId = useParams().deckId;
  const history = useHistory();

  useEffect(() => {
    async function deckGetter() {
      const response = readDeck(deckId);
      const deckFromAPI = await response;
      setDeck(deckFromAPI);
    }
    deckGetter();
  }, [deckId]);

  const handleFrontChange = (event) => setCardFront(event.target.value);
  const handleBackChange = (event) => setCardBack(event.target.value);
  const handleSavingCard = (event) => {
    event.preventDefault();
    createCard(deckId, { front: cardFront, back: cardBack });
    setCardFront("");
    setCardBack("");
  };

 return (deck.name) ?
 ( <div>
            <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"/> Home</Link>
        </li>
        <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Add Card </li>
      </ol>
    </nav>
        <h2>{deck.name}: Add Card</h2>
  
        <form onSubmit={handleSavingCard}>
          <AddEditCardsForm
            cardFront={cardFront}
            handleCardFrontChange={handleFrontChange}
            cardBack={cardBack}
            handleCardBackChange={handleBackChange}
          /> <button type="button" className="btn btn-secondary mx-2" onClick={() => history.push(`/decks/${deckId}`)} > 
          Done </button>
          <button type="submit" className="btn btn-primary">
            Save </button>
        </form>
      </div>
    ) : "Loading...";
}

export default CreateCard;