import React from "react";
import PropTypes from "prop-types";
import DevGameGenre from "./DevGameGenre/DevGameGenre";
import DevGameArtist from "./DevGameArtist/DevGameArtist";

const DevGame = (props) => {
  if (props.gameType === `artist`) {
    return (
      <DevGameArtist />
    );
  }
  if (props.gameType === `genre`) {
    return (
      <DevGameGenre
        questions={props.questions}
        mistakesCount={props.mistakesCount}
        tracksDisplayed={props.tracksDisplayed}
      />
    );
  }
  throw new Error(`gameType not specified`);
};

DevGame.propTypes = {
  gameType: PropTypes.oneOf([`artist`, `genre`]),
};

export default DevGame;
