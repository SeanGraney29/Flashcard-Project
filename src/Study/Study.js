import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import WorkingCard from "./WorkingCard";

function Study() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const response = readDeck(deckId);
      const deckFromAPI = await response;
      setDeck(deckFromAPI);
      setCards(deckFromAPI.cards);
      setCurrentCard(deckFromAPI.cards[0]);
    }
    loadDeck();
  }, [deckId]);

  return (
    <div>
          <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"/> Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Study
        </li>
      </ol>
    </nav>
      
      <h1>Study: {deck.name}</h1>

      <WorkingCard cards={cards} currentCard={currentCard} setCurrentCard={setCurrentCard} deckId={deckId}/>
    </div>
  );
}

export default Study;