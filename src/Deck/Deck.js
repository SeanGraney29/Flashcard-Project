import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import ErrorMessage from "../ErrorMessage/ErrorMessage"

function Deck() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function deckGetter() {
            const abortController = new AbortController();
            try {
                const deckResponse = await readDeck( deckId, abortController.signal );
                setDeck(deckResponse);
                setCards(deckResponse.cards);
            } catch (error) { console.error(ErrorMessage(error)) };
            return () => { abortController.abort() };
        }
        deckGetter();
    }, []);
  
    const warning = `Delete?\n\n You will not be able to recover it` 

    async function handleEditDeck() { history.push(`/decks/${deckId}/edit`) };
    async function handleStudy() { history.push(`/decks/${deckId}/study`) };
    async function handleAddCard() { history.push(`/decks/${deckId}/cards/new`) };
    async function handleEditCard(card) { history.push(`/decks/${deckId}/cards/${card.id}/edit`) };
    async function handleDeleteDeck(deck) {
      if ( window.confirm(warning)) 
      { const abortController = new AbortController();
          try {
              history.push("/");
              return await deleteDeck(deck.id, abortController.signal);
          } catch (error) { console.error(ErrorMessage(error)) };
          return () => { abortController.abort() };
      }}
      async function handleDeleteCard(card) {
        if ( window.confirm(warning))
         { const abortController = new AbortController();
            try {
                history.go(0);
                return await deleteCard(card.id, abortController.signal);
              } catch (error) { console.error(ErrorMessage(error)) };
              return () => { abortController.abort() };
        }}

    if (cards.length > 0) { return (
            <div>
               <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"/> Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {deck.name} </li>
      </ol>
    </nav>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{deck.name}</h2>
                        <p>{deck.description}</p>
                        <button onClick={() => handleEditDeck()} className="btn btn-secondary mx-1">
                        Edit </button>
                        <button onClick={() => handleStudy()} className="btn btn-primary mx-1">
                        <span className="oi oi-book" /> Study
                        </button>
                        <button onClick={() => handleAddCard()} className="btn btn-primary mx-1">
                      <span className="oi oi-plus" /> Add Cards
                        </button>
                        <button
                            onClick={() => handleDeleteDeck(deck)}
                            className="btn btn-danger mx-1 float-right"
                        > <span className="oi oi-trash" />
                        </button>
                    </div>
                </div>
                <h3>Cards</h3>
                {cards.map((card) => { return (
                        <div className="card-deck" key={card.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">{card.front}</div>
                                        <div className="col">{card.back}</div>
                                    </div>
                                    <div className="container row " style={{ display: "flex", justifyContent: "flex-end"  }}>
                                        <button onClick={() => handleEditCard(card) } className="btn btn-secondary mx-1">
                                      Edit </button>
                                        <button onClick={() => handleDeleteCard(card) } className="btn btn-danger mx-1">
                                            <span className="oi oi-trash" />  </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
            </div>
        );
    } else {
        return <div></div>;
    }
}

export default Deck