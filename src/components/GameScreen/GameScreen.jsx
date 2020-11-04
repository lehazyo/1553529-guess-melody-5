import React from "react";
import PropTypes from "prop-types";
import DevGameGenre from "../DevGame/DevGameGenre/DevGameGenre";
import DevGameArtist from "../DevGame/DevGameArtist/DevGameArtist";
import {Redirect} from "react-router-dom";

const GameScreen = (props) => {
  if (props.mistakesCount >= props.maximumMistakes) {
    props.resetGame();
    return (
      <Redirect to="/lose" />
    );
  }

  const {questions, maximumMistakes} = props;

  if (props.gameType === `genre`) {
    return (
      <DevGameGenre
        questions={questions}
        maximumMistakes={maximumMistakes}
        tracksDisplayed={props.tracksDisplayed}
      />
    );
  } else if (props.gameType === `artist`) {
    return (
      <DevGameArtist
        questions={questions}
        maximumMistakes={maximumMistakes}
        performersCount={props.performersCount}
      />
    );
  } else {
    throw new Error(`Unknown game type`);
  }
};

GameScreen.propTypes = {
  gameType: PropTypes.oneOf([`artist`, `genre`]),
  questions: PropTypes.object,
  mistakesCount: PropTypes.number,
  maximumMistakes: PropTypes.number,
  tracksDisplayed: PropTypes.number,
  appCallback: PropTypes.func
};

export default GameScreen;
