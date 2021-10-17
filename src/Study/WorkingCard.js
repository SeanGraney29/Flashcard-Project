import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

function WorkingCard({ cards, currentCard, setCurrentCard, deckId }) {
  const [cardCount, setCardCount] = useState(1);
  const [theFront, setTheFront] = useState(true);
  const history = useHistory();
  const { url } = useRouteMatch();

  const NextCardHandler = () => {
    if (cardCount < cards.length) {
      setTheFront((currentSide) => !currentSide);
      setCurrentCard(cards[cardCount]);
      setCardCount((currentCount) => currentCount + 1);
    } else {
      if (window.confirm("Restart cards?\n\n Click 'cancel' to return to the home page.")) 
      {
        setTheFront((currentSide) => !currentSide);
        setCurrentCard(cards[0]);
        setCardCount(1);
        history.push(url);
      } else {
        history.push("/");
      }
    }
  };

  const flipCardHandler = () => {
    setTheFront((currentSide) => !currentSide);
  };

  if (cards.length < 3) {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in this deck.
        </p>
           <button
      type="button"
      className="btn btn-primary"
      onClick={() => history.push(`/decks/${deckId}/cards/new`)}
       >
      <span className="oi oi-plus" /> Add Cards
    </button>
      </div>
    );
  }

  return (theFront) ? (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardCount} of {cards.length}
          </h5>
          <p className="card-text">{currentCard.front}</p>
          <button type="button" className="btn btn-secondary mr-2" onClick={flipCardHandler}>
          <span class="oi oi-action-redo"></span>Flip
    </button>
        </div>
      </div>
    ) : (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          Card {cardCount} of {cards.length}
        </h5>
        <p className="card-text">{currentCard.back}</p>
        <button type="button" className="btn btn-secondary mr-2" onClick={flipCardHandler}>
        <span class="oi oi-action-undo"></span>Flip
    </button>
    <button type="button" className="btn btn-primary" onClick={NextCardHandler}>
      Next <span class="oi oi-arrow-thick-right"></span>
    </button>
      </div>
    </div>
  );
}

export default WorkingCard;
