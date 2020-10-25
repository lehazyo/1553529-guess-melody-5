import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "../Login/Login";
import Lose from "../Lose/Lose";
import Result from "../Result/Result";
import Welcome from "../Welcome/Welcome";
import PropTypes from "prop-types";
import GameScreen from "../GameScreen/GameScreen";

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
          totalScore++;
        }
      }
    });

    if (!totalScore) {
      mistakesAvailable--;
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
              questions={this.props.questions}
              tracksDisplayed={this.props.tracksDisplayed}
              mistakesCount={this.props.mistakesCount}
              appCallback={this._validateAnswer}
            />
          </Route>
          <Route path="/game-artist">
            <GameScreen
              gameType={`artist`}
              questions={this.props.questions}
              performersCount={this.props.performersCount}
              mistakesCount={this.props.mistakesCount}
              appCallback={this._validateAnswer}
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
  tracksDisplayed: PropTypes.number,
  performersCount: PropTypes.number
};

export default App;
