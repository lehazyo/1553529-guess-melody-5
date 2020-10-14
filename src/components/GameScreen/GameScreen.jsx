import React from "react";
import PropTypes from "prop-types";
import DevGameGenre from "../DevGame/DevGameGenre/DevGameGenre";

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DevGameGenre
        questions={this.props.questions}
        mistakesCount={this.props.mistakesCount}
        tracksDisplayed={this.props.tracksDisplayed}
        appCallback={this.props.appCallback}
      />
    );
  }
}

GameScreen.propTypes = {
  gameType: PropTypes.oneOf([`artist`, `genre`]),
  questions: PropTypes.object,
  mistakesCount: PropTypes.number,
  tracksDisplayed: PropTypes.number,
  appCallback: PropTypes.func
};

export default GameScreen;
