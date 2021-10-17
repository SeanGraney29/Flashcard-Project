import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage"

function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
      async function deckGetter() {
          const abortController = new AbortController();
          try {
              const deckResponse = await listDecks(abortController.signal);
              setDecks(deckResponse);
          } catch (error) {console.error(ErrorMessage, error)};
          return () =>  abortController.abort(); };
      deckGetter();
  }, []);

  async function handleDelete(deck) {
      if (window.confirm("\nThis deck will no longer be accessible. \n\nAre you sure you want to delete it?"))
       { history.push("/"); return await deleteDeck(deck.id) }
  }

  return (
      <div className="container">
          <Link className="btn btn-secondary mb-2" to="/decks/new">
          <span className="oi oi-plus" /> Create Deck
          </Link>
          <div className="card-deck">
              {decks.map((deck) => {
                  return (
                      <div className="card" key={deck.id}
                      >
                          <div className="card-body">
                          <section className="row">
                          <section className="col">
                              <div className="card-title">
                                 <h5> {`${deck.name}`}</h5>
                              </div>
                              </section>
                              <section className="col">
                              <div className="card-subtitle text-muted " style={{ textAlign: "right" }}>
                                 <div> {`${deck.cards.length} cards`} </div>
                              </div>
                              </section>
                              </section>
                              <div className="card-text">
                                  {`${deck.description}`}
                              </div>
                              <Link
                                  className="btn btn-secondary mt-3"
                                  to={`/decks/${deck.id}`}
                              ><span className="oi oi-eye" />
                                View
                              </Link>
                              <Link
                                  className="btn btn-primary mt-3 mx-1"
                                  to={`/decks/${deck.id}/study`}
                              ><span className="oi oi-book" />
                                 Study
                              </Link>
                              <button
                                  type="button"
                                  className="btn btn-danger mt-3 float-right"
                                  onClick={() => handleDelete(deck)}
                              ><span className="oi oi-trash" />
                              </button>
                          </div>
                      </div>
                  )})}
          </div>
      </div>
  );
}

export default Home;
