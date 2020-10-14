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

  validateAnswer(question, answer) {
    let totalScore = 0;
    let mistakesAvailable = 0;

    for (let i = 0; i < question.tracks.length; i++) {
      if (answer[i]) {
        if (question.tracks[i].genre === question.genre) {
          totalScore++;
        }
      }
    }

    if (!totalScore) {
      mistakesAvailable--;
    }

    return {
      "mistakesAvailable": mistakesAvailable,
      "totalScore": totalScore
    };
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
          <Route path="/game">
            <GameScreen
              questions={this.props.questions}
              tracksDisplayed={this.props.tracksDisplayed}
              mistakesCount={this.props.mistakesCount}
              appCallback={this.validateAnswer}
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
  tracksDisplayed: PropTypes.number
};

export default App;
