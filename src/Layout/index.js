import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Study from "../Study/Study"
import CreateDeck from "../Create/CreateDeck"
import Home from "../Home/Home"
import Deck from "../Deck/Deck"
import CreateCard from "../ChangeCards/CreateCard"
import EditDeck from "../EditDeck/EditDeck"
import EditCard from "../ChangeCards/EditCard"

function Layout() {
  return (
    <div className="container">
         <Header />
   <Switch>

   <Route exact path="/">
   <Home />
   </Route>

     <Route path="/decks/:deckId/study">
    <Study />
     </Route>

     <Route path="/decks/new">
     <CreateDeck />
     </Route>

     <Route exact path="/decks/:deckId">
     <Deck />
     </Route>

     <Route path="/decks/:deckId/edit">
     <EditDeck />
     </Route>

     <Route path="/decks/:deckId/cards/new">
     <CreateCard />
     </Route>

     <Route path="/decks/:deckId/cards/:cardId/edit">
     <EditCard />
     </Route>

   <Route>
     <NotFound />
   </Route>

   </Switch>
   </div>
);
}

export default Layout;
