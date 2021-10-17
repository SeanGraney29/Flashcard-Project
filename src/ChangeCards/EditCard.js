import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./AddEditCardsForm";

function EditCard() {
  const [deck, setDeck] = useState({});
  const [preExistingCard, setPreExistingCard] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  const deckId = useParams().deckId;
  const cardId = useParams().cardId;
  const history = useHistory();

  useEffect(() => {
    async function deckGetter() {
      const response = readDeck(deckId);
      const deckFromAPI = await response;
      setDeck(deckFromAPI);
    }

    async function cardGetter() {
      const response = readCard(cardId);
      const cardFromAPI = await response;
      setPreExistingCard(cardFromAPI);
      setCardFront(cardFromAPI.front);
      setCardBack(cardFromAPI.back);
    }
    deckGetter();
    cardGetter();
  }, [deckId, cardId]);

  const handleFrontChange = (event) => setCardFront(event.target.value);
  const handleBackChange = (event) => setCardBack(event.target.value);
  const handleEditCard = (event) => {
    event.preventDefault();
    updateCard({ ...preExistingCard, front: cardFront, back: cardBack })
      .then((updatedCard) => history.push(`/decks/${updatedCard.deckId}`));
  };

  return (
    <div>
         <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <span className="oi oi-home" /> Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>Deck: {deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Card {cardId} </li>
      </ol>
    </nav>
      <h1>Edit Card</h1>

      <form onSubmit={handleEditCard}>
        <CardForm
          cardFront={cardFront}
          handleCardFrontChange={handleFrontChange}
          cardBack={cardBack}
          handleCardBackChange={handleBackChange}
        />
           <button  type="button" className="btn btn-secondary mx-2" onClick={() => history.push(`/decks/${deckId}`)}>
             Cancel </button>
        <button type="submit" className="btn btn-primary">
          Submit </button>
      </form>
    </div>
  );
}

export default EditCard;