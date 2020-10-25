import React from "react";
import PropTypes from "prop-types";
import {Link, Redirect} from "react-router-dom";
import Track from "../../Track/Track";

class DevGameGenre extends React.Component {
  constructor(props) {
    super(props);

    const answerSlots = new Array(props.tracksDisplayed).fill(false);

    this.questions = props.questions;
    this.tracksDisplayed = props.tracksDisplayed;
    this.currentRound = 0;

    this._getNextQuestion();

    this.state = {
      score: 0,
      mistakesAvailable: props.mistakesCount,
      answers: answerSlots,
      playingId: 0
    };
  }

  _getNextQuestion() {
    let correctCount = 1 + Math.round(Math.random() * (this.tracksDisplayed - 1));

    let availableGenres = this._getAvailableGenres();
    let selectedGenre = availableGenres[Math.floor(Math.random() * availableGenres.length)];
    let availableGenreTracks = this._getAvailableGenreTracks(selectedGenre);
    availableGenreTracks = this._shuffleArray(availableGenreTracks);

    let correctTracks = this._getCorrectTracks(correctCount, availableGenreTracks);
    if (correctTracks.length === 0) {
      this.nextQuestion = null;
      return false;
    }

    if (correctTracks.length >= this.tracksDisplayed) {
      if (typeof this.nextQuestion === `undefined`) {
        this.nextQuestion = {
          genre: selectedGenre
        };
      }
      this.nextQuestion.tracks = correctTracks;
      return true;
    }

    let questionTracks = correctTracks;

    let remainingWrongQuestionsCount = this.tracksDisplayed - correctTracks.length;
    let wrongTracks = this._getWrongTracks(selectedGenre);
    wrongTracks = this._shuffleArray(wrongTracks);

    for (let j = 0; j < remainingWrongQuestionsCount; j++) {
      let wrongTrackId = wrongTracks[j].id;
      questionTracks.push(wrongTracks[j]);
      for (let k = 0; k < this.questions.tracks.length; k++) {
        if (this.questions.tracks[k].id === wrongTrackId) {
          this.questions.tracks[k].available = false;
          break;
        }
      }
    }

    this.nextQuestion = {
      tracks: questionTracks,
      genre: selectedGenre
    };

    this.currentRound++;

    return true;
  }

  _getCorrectTracks(correctCount, availableGenreTracks) {
    let correctTracks = [];

    for (let i = 0; i < correctCount; i++) {
      if (typeof availableGenreTracks[i] === `undefined`) {
        break;
      }
      let track = availableGenreTracks[i];
      correctTracks.push(track);
      let trackId = track.id;
      for (let j = 0; j < this.questions.tracks.length; j++) {
        if (this.questions.tracks[j].id === trackId) {
          this.questions.tracks[j].available = false;
          break;
        }
      }
    }

    return correctTracks;
  }

  _getWrongTracks(selectedGenre) {
    let availableWrongTracks = [];
    for (let i = 0; i < this.questions.tracks.length; i++) {
      if (this.questions.tracks[i].genre === selectedGenre) {
        continue;
      }
      availableWrongTracks.push(this.questions.tracks[i]);
    }
    return availableWrongTracks;
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

  _getAvailableGenreTracks(selectedGenre) {
    let availableGenreTracks = [];

    for (let i = 0; i < this.questions.tracks.length; i++) {
      let track = this.questions.tracks[i];
      if (typeof track.available !== `undefined` && !track.available) {
        continue;
      }
      if (track.genre === selectedGenre) {
        availableGenreTracks.push(track);
      }
    }
    return availableGenreTracks;
  }

  _renderMistakes() {
    let mistakesComponent = [];
    for (let i = 0; i < this.state.mistakesAvailable; i++) {
      mistakesComponent.push(<div key={i} className="wrong" />);
    }
    return mistakesComponent;
  }

  /**
   * Renders tracks elements due to their quantity
   * @return {Array}
   */
  _renderTracks() {
    let tracksArray = [];
    for (let i = 0; i < this.props.tracksDisplayed; i++) {
      let track = this.nextQuestion.tracks[i];
      tracksArray.push(<Track
        key={track.id}
        track={track}
        index={i}
        isPlaying={(track.id === this.state.playingId)}
        onPlayButtonClick={() => {
          this.setState({
            playingId: (this.state.playingId === track.id) ? 0 : track.id
          });
        }}
        hasRadiobuttons={true}
      />);
    }
    return tracksArray;
  }

  /**
   * Gets genres that have tracks that were not used in game yet
   * @return {boolean}
   */
  _getAvailableGenres() {
    let genreKeys = Object.keys(this.questions.genres);
    let remainingGenres = [];
    let availableGenres = [];
    for (let i = 0; i < genreKeys.length; i++) {
      if (!this.questions.genres[genreKeys[i]].noMoreTracks) {
        remainingGenres.push(genreKeys[i]);
      }
    }

    // we cannot run game in there are less than two genres
    if (remainingGenres.length < 2) {
      this.nextQuestion = null;
      return false;
    }

    for (let i = 0; i < remainingGenres.length; i++) {
      let currentGenre = remainingGenres[i];
      let noMoreTracks = true;
      for (let j = 0; j < this.questions.tracks.length; j++) {
        if (this.questions.tracks[j].genre === currentGenre) {
          noMoreTracks = false;
          break;
        }
      }
      if (noMoreTracks) {
        this.questions.genres[currentGenre].noMoreTracks = true;
      } else {
        availableGenres.push(currentGenre);
      }
    }

    return availableGenres;
  }

  _getGenreName() {
    let genreId = this.nextQuestion.genre;
    return this.questions.genres[genreId].display_name;
  }

  _handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const answersAsArray = [];
    for (let i = 0; i < this.tracksDisplayed; i++) {
      answersAsArray.push(formData.get(`answer-` + i) === `on`);
    }

    this.setState({
      answers: answersAsArray
    }, () => {
      this._checkAnswers();
    });

    e.target.reset();
  }

  _checkAnswers() {
    let answerInfo = this.props.appCallback(this.nextQuestion, this.state.answers);

    this.setState({
      mistakesAvailable: this.state.mistakesAvailable + answerInfo.mistakesAvailable,
      score: (this.state.score + answerInfo.totalScore)
    });

    this._getNextQuestion();
  }

  render() {
    if (this.nextQuestion === null) {
      return <Redirect to="/result" />;
    }

    return (
      <section className="game game--genre">
        <header className="game__header">
          <Link className="game__back" to="/">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="/img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </Link>

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

          <div className="game__mistakes">
            {this._renderMistakes()}
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите треки в жанре: {this._getGenreName()}</h2>
          <div>Раунд {this.currentRound} / Очки: {this.state.score}</div>
          <form className="game__tracks" onSubmit={this._handleSubmit.bind(this)}>
            {this._renderTracks()}

            <button
              className="game__submit button"
              type="submit"
            >
              Ответить
            </button>
          </form>
        </section>
      </section>
    );
  }
}

DevGameGenre.propTypes = {
  questions: PropTypes.object,
  tracksDisplayed: PropTypes.number,
  mistakesCount: PropTypes.number,
  appCallback: PropTypes.func
};

export default DevGameGenre;
