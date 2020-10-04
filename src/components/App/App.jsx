import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DevGame from "../DevGame/DevGame";
import Login from "../Login/Login";
import Lose from "../Lose/Lose";
import Result from "../Result/Result";
import Welcome from "../Welcome/Welcome";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Welcome 
            errorsCount={4}
          />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/result">
          <Result 
            correctAnswersCount={1 + Math.round(Math.random() * 1000)}
            mistakesCount={1 + Math.round(Math.random() * 1000)}
          />
        </Route>
        <Route path="/lose">
          <Lose />
        </Route>
        <Route path="/dev-artist">
          <DevGame 
            gameType="artist"
          />
        </Route>
        <Route path="/dev-genre">
          <DevGame
            gameType="genre"
          />
        </Route>
      </Switch>
    </BrowserRouter>
  )
};
