import React from "react";
import PropTypes from "prop-types";

const MistakesBar = (props) => {
  let mistakes = [];
  for (let i = 0; i < props.maximumMistakes; i++) {
    mistakes.unshift(<div
      key={i}
      className={(props.mistakesCount - 1 >= i) ? `wrong` : `correct`}
      style={{opacity: (props.mistakesCount - 1 >= i ? `1` : `0.1`)}}
    />);
  }

  return (
    <div className="game__mistakes">
      {mistakes}
    </div>
  );
};

MistakesBar.propTypes = {
  maximumMistakes: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired
};

export default MistakesBar;
