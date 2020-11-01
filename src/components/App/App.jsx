import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "../Login/Login";
import Lose from "../Lose/Lose";
import Result from "../Result/Result";
import Welcome from "../Welcome/Welcome";
import PropTypes from "prop-types";
import GameScreen from "../GameScreen/GameScreen";
import {ActionCreator} from "../../action.js";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  _validateAnswer(question, answer) {
    let totalScore = 0;
    let mistakesAvailable = 0;

    question.tracks.forEach((track, index) => {
      if (answer[index]) {
        if (track.genre === question.genre) {
          this.props.store.dispatch({
            type: ActionCreator.increaseScore
          });
        }
      }
    });

    if (!totalScore) {
      this.props.store.dispatch({
        type: ActionCreator.increaseMistakes
      });
    }

    return {mistakesAvailable, totalScore};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Welcome
              mistakesCount={this.props.mistakesCount}
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
              mistakesCount={this.props.mistakesCount}
              maximumMistakes={this.props.maximumMistakes}
              questions={this.props.questions}
              tracksDisplayed={this.props.tracksDisplayed}
            />
          </Route>
          <Route path="/game-artist">
            <GameScreen
              gameType={`artist`}
              mistakesCount={this.props.mistakesCount}
              maximumMistakes={this.props.maximumMistakes}
              questions={this.props.questions}
              performersCount={this.props.performersCount}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  questions: PropTypes.object,
  mistakesCount: PropTypes.number,
  maximumMistakes: PropTypes.number,
  tracksDisplayed: PropTypes.number,
  performersCount: PropTypes.number,
  store: PropTypes.object
};

export default App;
