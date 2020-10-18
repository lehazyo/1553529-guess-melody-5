import React from "react";
import PropTypes from "prop-types";

const Track = (props) => {
  return (
    <React.Fragment key={props.track.id}>
      <div className="track">
        <button className="track__button track__button--play" type="button"></button>
        <div className="track__status">
          {props.track.performer} - {props.track.title}
          <audio
            src={props.track.src}
          />
        </div>
        <div className="game__answer">
          <input
            className="game__input visually-hidden"
            type="checkbox"
            name={`answer-` + props.index}
            id={`answer-` + props.index}
          />
          <label className="game__check" htmlFor={`answer-${props.index}`}>Отметить</label>
        </div>
      </div>
    </React.Fragment>
  );
};

Track.propTypes = {
  track: PropTypes.object,
  index: PropTypes.number
};

export default Track;
