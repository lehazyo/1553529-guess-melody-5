import React from "react";
import PropTypes from "prop-types";

class DevGameArtist extends React.Component {
  constructor(props) {
    super(props);

    this.questions = props.questions;

    this.state = {
      score: 0,
      rounds: 0
    };
  }

  render() {
    return null;
  }
}

DevGameArtist.propTypes = {
  questions: PropTypes.object
};
