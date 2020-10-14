import React from "react";
import PropTypes from "prop-types";

class DevGameArtist extends React.Component {
  constructor(props) {
    super(props);

    this.questions = props.questions;

    this.state = {
      "score": 0, // очки
      "rounds": 0 // общее число вопросов
    };
  }

  render() {
    return (
      <div />
    );
  }
}

DevGameArtist.propTypes = {
  questions: PropTypes.object
};
