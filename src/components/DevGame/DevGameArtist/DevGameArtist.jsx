import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import ArtistAnswer from "../../ArtistAnswer/ArtistAnswer";
import Track from "../../Track/Track";
import MistakesBar from "../../MistakesBar/MistakesBar";

class DevGameArtist extends React.Component {
  constructor(props) {
    super(props);

    this.questions = props.questions;
    this._nextTrack = null;
    this._nextPerformers = [];
    this._performersCount = props.performersCount;
    this._possiblePerformers = this._makePossiblePerformers();

    this.state = {
      currentAnswerIndex: -1,
      mistakesAvailable: props.mistakesCount,
      trackIsPlaying: false
    };

    this._availableTracks = this._shuffleArray(this._makeAvailableTracks());

    this._getNextTrack();
    this._getNextPerformers();
  }

  _nextRound() {
    this._getNextTrack();
    this._getNextPerformers();
  }

  _shuffleArray(a) {
    let j;
    let x;
    let i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  _makeAvailableTracks() {
    return this.questions.tracks.filter((track) => (track.available === undefined || track.available === true));
  }

  _makePossiblePerformers() {
    let possiblePerformers = {};
    this.questions.tracks.forEach((track) => {
      if (track.performer !== undefined && possiblePerformers[track.performer] === undefined) {
        possiblePerformers[track.performer] = true;
      }
    });
    return possiblePerformers;
  }

  _getNextTrack() {
    this.props.onUserAnswer();

    this._nextTrack = this._availableTracks[0];
    this._availableTracks.shift();
  }

  _getNextPerformers() {
    const currentPerformer = this._nextTrack.performer;

    let wrongPerformers = Object.assign({}, this._possiblePerformers);
    delete wrongPerformers[currentPerformer];

    wrongPerformers = Object.keys(wrongPerformers);
    wrongPerformers = this._shuffleArray(wrongPerformers);

    wrongPerformers = wrongPerformers.slice(0, (this._performersCount - 1));

    wrongPerformers.push(currentPerformer);

    wrongPerformers = this._shuffleArray(wrongPerformers);

    this._nextPerformers = wrongPerformers;
  }

  _renderPerformersAnswers() {
    return this._nextPerformers.map((artistName, i) => {
      return (
        <ArtistAnswer
          key={i}
          answerId={i}
          artistName={artistName}
          onClick={this._setAnswer.bind(this, i)}
        />
      );
    });
  }

  _setAnswer(answerIndex) {
    this.setState({
      currentAnswerIndex: answerIndex
    });
  }

  _handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (formData.get(`answer`) === this._nextTrack.performer) {
      this.props.increaseScore(1);
    } else {
      this.props.increaseMistakes();
    }

    this._nextRound();

    e.target.reset();
  }

  render() {
    if (this._nextTrack === undefined) {
      return (
        <Redirect to="/result" />
      );
    }

    return (
      <section className="game game--artist">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle
              className="timer__line"
              cx="390"
              cy="390"
              r="370"
              style={{
                filter: `url(#blur)`,
                transform: `rotate(-90deg) scaleY(-1)`,
                transformOrigin: `center`
              }}
            />
          </svg>

          <MistakesBar
            maximumMistakes={this.props.maximumMistakes}
            mistakesCount={this.props.mistakesCount}
          />
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто издаёт эти звуки?</h2>
          <p className="">Раунд: {this.props.round} / Очки: {this.props.score}</p>
          <div className="game__track">
            <Track
              track={this._nextTrack}
              isPlaying={this.state.trackIsPlaying}
              onPlayButtonClick={() => {
                this.setState({
                  trackIsPlaying: (this.state.trackIsPlaying) ? false : true
                });
              }}
            />
          </div>

          <form
            className="game__artist"
            onSubmit={this._handleSubmit.bind(this)}
            style={{
              flexDirection: `column`,
              marginTop: `50px`
            }}
          >
            <div className="artists__wrapper" style={{
              display: `flex`,
              justifyContent: `space-between`
            }}>
              {this._renderPerformersAnswers()}
            </div>

            <button
              className="game__submit button"
              type="submit"
              disabled={(this.state.currentAnswerIndex === -1)}
            >
              Ответить
            </button>
          </form>
        </section>

        <style>{`
          .artist__input:checked + .artist__name .artist__picture {
            box-shadow: 0 0 20px #f00;
          }
        `}</style>
      </section>
    );
  }
}

DevGameArtist.propTypes = {
  questions: PropTypes.object,
  performersCount: PropTypes.number,
  maximumMistakes: PropTypes.number,
  mistakesCount: PropTypes.number,
  onUserAnswer: PropTypes.func,
  increaseScore: PropTypes.func,
  increaseMistakes: PropTypes.func,
  round: PropTypes.number,
  score: PropTypes.number
};

export default DevGameArtist;
