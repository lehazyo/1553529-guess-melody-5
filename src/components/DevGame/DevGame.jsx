import React from "react";
import PropTypes from "prop-types";

const DevGame = (props) => {
  if (props.gameType === `artist`) {
    return (
      <div>По исполнителю</div>
    );
  }
  if (props.gameType === `genre`) {
    return (
      <div>По жанру</div>
    );
  }
  throw new Error(`gameType not specified`);
};

DevGame.propTypes = {
  gameType: PropTypes.oneOf([`artist`, `genre`]),
};

export default DevGame;
