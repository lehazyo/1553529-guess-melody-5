import React from "react";
import PropTypes from "prop-types";
import DevGameGenre from "./DevGameGenre/DevGameGenre";
import DevGameArtist from "./DevGameArtist/DevGameArtist";

const DevGame = (props) => {
  if (props.gameType === `artist`) {
    return (
      <DevGameArtist
        questions={props.questions}
        mistakesCount={props.mistakesCount}
        performersCount={3}
      />
    );
  } else if (props.gameType === `genre`) {
    return (
      <DevGameGenre
        questions={props.questions}
        mistakesCount={props.mistakesCount}
        tracksDisplayed={props.tracksDisplayed}
      />
    );
  } else {
    throw new Error(`Unknown gameType`);
  }
};

DevGame.propTypes = {
  gameType: PropTypes.oneOf([`artist`, `genre`]),
};

export default DevGame;
