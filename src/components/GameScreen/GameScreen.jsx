import React from "react";
import PropTypes from "prop-types";
import DevGameGenre from "../DevGame/DevGameGenre/DevGameGenre";

const GameScreen = (props) => {
  return (
    <DevGameGenre
      questions={props.questions}
      mistakesCount={props.mistakesCount}
      tracksDisplayed={props.tracksDisplayed}
      appCallback={props.appCallback}
    />
  );
};

GameScreen.propTypes = {
  gameType: PropTypes.oneOf([`artist`, `genre`]),
  questions: PropTypes.object,
  mistakesCount: PropTypes.number,
  tracksDisplayed: PropTypes.number,
  appCallback: PropTypes.func
};

export default GameScreen;
