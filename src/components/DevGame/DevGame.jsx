import React from "react";

const DevGame = (props) => {
  if (props.gameType == "artist") {
    return (
      <div>По исполнителю</div>
    );
  }
  if (props.gameType == "genre") {
    return (
      <div>По жанру</div>
    );
  };
};

export default DevGame;
