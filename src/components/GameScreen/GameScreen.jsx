import React from "react";
import PropTypes from "prop-types";
import DevGameGenre from "../DevGame/DevGameGenre/DevGameGenre";
import DevGameArtist from "../DevGame/DevGameArtist/DevGameArtist";

const GameScreen = (props) => {
  if (props.gameType === `genre`) {
    return (
      <DevGameGenre
        questions={props.questions}
        mistakesCount={props.mistakesCount}
        tracksDisplayed={props.tracksDisplayed}
        appCallback={props.appCallback}
      />
    );
  } else if (props.gameType === `artist`) {
    return (
      <DevGameArtist
        questions={props.questions}
        mistakesCount={props.mistakesCount}
        performersCount={props.performersCount}
        appCallback={props.appCallback}
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
  tracksDisplayed: PropTypes.number,
  appCallback: PropTypes.func
};

export default GameScreen;
