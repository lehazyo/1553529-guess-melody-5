import React from "react";
import PropTypes from "prop-types";
import DevGameGenre from "../DevGame/DevGameGenre/DevGameGenre";
import DevGameArtist from "../DevGame/DevGameArtist/DevGameArtist";
import {ActionCreator} from "../../action";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const GameScreen = (props) => {
  if (props.mistakesCount >= props.maximumMistakes) {
    props.resetGame();
    return (
      <Redirect to="/lose" />
    );
  }

  const {
    questions,
    score,
    round,
    onUserAnswer,
    mistakesCount,
    maximumMistakes,
    resetGame,
    increaseScore,
    increaseMistakes
  } = props;

  if (props.gameType === `genre`) {
    return (
      <DevGameGenre
        questions={questions}
        round={round}
        score={score}
        mistakesCount={mistakesCount}
        maximumMistakes={maximumMistakes}
        resetGame={resetGame}
        increaseScore={increaseScore}
        increaseMistakes={increaseMistakes}
        onUserAnswer={onUserAnswer}
        tracksDisplayed={props.tracksDisplayed}
      />
    );
  } else if (props.gameType === `artist`) {
    return (
      <DevGameArtist
        questions={questions}
        round={round}
        score={score}
        mistakesCount={mistakesCount}
        maximumMistakes={maximumMistakes}
        resetGame={resetGame}
        increaseScore={increaseScore}
        increaseMistakes={increaseMistakes}
        onUserAnswer={onUserAnswer}
        performersCount={props.performersCount}
      />
    );
  } else {
    throw new Error(`Unknown game type`);
  }
};

GameScreen.propTypes = {
  gameType: PropTypes.oneOf([`artist`, `genre`]),
  questions: PropTypes.object,
  mistakesCount: PropTypes.number,
  maximumMistakes: PropTypes.number,
  tracksDisplayed: PropTypes.number,
  appCallback: PropTypes.func
};

const mapStateToProps = (state) => ({
  round: state.round,
  score: state.score,
  mistakesCount: state.mistakesCount
});

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
  increaseMistakes() {
    dispatch(ActionCreator.increaseMistakes());
  },
  increaseScore(score) {
    dispatch(ActionCreator.increaseScore(score));
  },
  onUserAnswer() {
    dispatch(ActionCreator.goToNextQuestion());
  }
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
