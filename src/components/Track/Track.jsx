import React from "react";
import PropTypes from "prop-types";
import Audioplayer from "../Audioplayer/Audioplayer";

const Track = (props) => {
  return (
    <React.Fragment key={props.track.id}>
      <div className="track">
        <Audioplayer
          track={props.track}
          isPlaying={props.isPlaying}
          onPlayButtonClick={props.onPlayButtonClick}
        />
        <div className="track__status">
          {props.track.performer} - {props.track.title}
        </div>
        {props.hasRadiobuttons && (
          <div className="game__answer">
            <input
              className="game__input visually-hidden"
              type="checkbox"
              name={`answer-` + props.index}
              id={`answer-` + props.index}
            />
            <label className="game__check" htmlFor={`answer-${props.index}`}>Отметить</label>
          </div>
        ) }
      </div>
    </React.Fragment>
  );
};

Track.propTypes = {
  track: PropTypes.object,
  index: PropTypes.number,
  isPlaying: PropTypes.bool,
  onPlayButtonClick: PropTypes.func,
  hasRadiobuttons: PropTypes.bool
};

export default Track;
