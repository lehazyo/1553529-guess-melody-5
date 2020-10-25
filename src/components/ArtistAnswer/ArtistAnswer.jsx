import React from "react";
import PropTypes from "prop-types";

const ArtistAnswer = (props) => {
  return (
    <React.Fragment>
      <div className="artist">
        <input
          className="artist__input visually-hidden"
          type="radio"
          name="answer"
          value={props.artistName}
          id={`answer-${props.answerId}`}
          onClick={props.onClick}
        />
        <label className="artist__name" htmlFor={`answer-${props.answerId}`}>
          <img className="artist__picture" src="/img/placeholder.png" alt={props.artistName} />
          <span className="artist__name-label">{props.artistName}</span>
        </label>
      </div>
    </React.Fragment>
  );
};

ArtistAnswer.propTypes = {
  artistName: PropTypes.string.isRequired,
  answerId: PropTypes.number,
  onClick: PropTypes.func
};

export default ArtistAnswer;
