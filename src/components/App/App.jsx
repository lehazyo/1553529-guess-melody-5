import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "../Login/Login";
import Lose from "../Lose/Lose";
import Result from "../Result/Result";
import Welcome from "../Welcome/Welcome";
import PropTypes from "prop-types";
import GameScreen from "../GameScreen/GameScreen";

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Welcome
            mistakesCount={props.mistakesCount}
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
        <Route path="/game-genre">
          <GameScreen
            gameType={`genre`}
            mistakesCount={props.mistakesCount}
            maximumMistakes={props.maximumMistakes}
            questions={props.questions}
            tracksDisplayed={props.tracksDisplayed}
          />
        </Route>
        <Route path="/game-artist">
          <GameScreen
            gameType={`artist`}
            mistakesCount={props.mistakesCount}
            maximumMistakes={props.maximumMistakes}
            questions={props.questions}
            performersCount={props.performersCount}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  questions: PropTypes.object,
  mistakesCount: PropTypes.number,
  maximumMistakes: PropTypes.number,
  tracksDisplayed: PropTypes.number,
  performersCount: PropTypes.number
};

export default App;
