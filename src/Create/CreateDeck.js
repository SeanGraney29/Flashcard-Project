import React from "react";
import { Link } from "react-router-dom";
import CreateDeckForm from "../Create/CreateDeckForm"

function CreateDeck() {

  return (
    <div>
          <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"/> Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Create Deck
        </li>
      </ol>
    </nav>
      <h1>Create Deck</h1>
      <CreateDeckForm />
    </div>
  );
}

export default CreateDeck;