import React from "react";
import PropTypes from "prop-types";
import {Link, Redirect} from "react-router-dom";

class DevGameGenre extends React.Component {
  constructor(props) {
    super(props);

    let answerSlots = [];
    for (let i = 0; i < props.tracksDisplayed; i++) {
      answerSlots.push(false);
    }

    this.questions = props.questions;
    this.tracksDisplayed = props.tracksDisplayed;
    this.currentRound = 0;

    this.getNextQuestion();

    this.state = {
      "score": 0, // очки
      "mistakesAvailable": props.mistakesCount, // доступные ошибки
      "answers": answerSlots
    };
  }

  getNextQuestion() {
    let correctCount = 1 + Math.round(Math.random() * (this.tracksDisplayed - 1));

    let availableGenres = this.getAvailableGenres();
    let selectedGenre = availableGenres[Math.floor(Math.random() * availableGenres.length)];
    let availableGenreTracks = this.getAvailableGenreTracks(selectedGenre);
    availableGenreTracks = this.shuffleArray(availableGenreTracks);

    let correctTracks = this.getCorrectTracks(correctCount, availableGenreTracks);
    if (correctTracks.length === 0) {
      this.nextQuestion = null;
      return false;
    }

    if (correctTracks.length >= this.tracksDisplayed) {
      if (typeof this.nextQuestion === `undefined`) {
        this.nextQuestion = {
          "genre": selectedGenre
        };
      }
      this.nextQuestion.tracks = correctTracks;
      return true;
    }

    let questionTracks = correctTracks;

    let remainingWrongQuestionsCount = this.tracksDisplayed - correctTracks.length;
    let wrongTracks = this.getWrongTracks(selectedGenre);
    wrongTracks = this.shuffleArray(wrongTracks);

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
      "tracks": questionTracks,
      "genre": selectedGenre
    };

    this.currentRound++;

    return true;
  }

  getCorrectTracks(correctCount, availableGenreTracks) {
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

  getWrongTracks(selectedGenre) {
    let availableWrongTracks = [];
    for (let i = 0; i < this.questions.tracks.length; i++) {
      if (this.questions.tracks[i].genre === selectedGenre) {
        continue;
      }
      availableWrongTracks.push(this.questions.tracks[i]);
    }
    return availableWrongTracks;
  }

  shuffleArray(a) {
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

  getAvailableGenreTracks(selectedGenre) {
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

  renderMistakes() {
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
  renderTracks() {
    let tracksArray = [];
    for (let i = 0; i < this.props.tracksDisplayed; i++) {
      tracksArray.push(this.renderSingleTrack(i));
    }
    return tracksArray;
  }

  /**
   * Renders single track element
   * @param {number} index
   * @return {React.Fragment}
   */
  renderSingleTrack(index) {
    let track = this.nextQuestion.tracks[index];

    return (
      <React.Fragment key={index}>
        <div className="track">
          <button className="track__button track__button--play" type="button"></button>
          <div className="track__status">
            {track.performer} - {track.title}
            <audio
              src={track.src}
            />
          </div>
          <div className="game__answer">
            <input
              className="game__input visually-hidden"
              type="checkbox"
              name={`answer-` + index}
              id={`answer-` + index}
            />
            <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
          </div>
        </div>
      </React.Fragment>
    );
  }

  /**
   * Gets genres that have tracks that were not used in game yet
   * @return {boolean}
   */
  getAvailableGenres() {
    let genreKeys = Object.keys(this.questions.genres);
    let remainingGenres = [];
    let availableGenres = [];
    for (let i = 0; i < genreKeys.length; i++) {
      if (typeof this.questions.genres[genreKeys[i]].noMoreTracks === `undefined`) {
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

  getGenreName() {
    let genreId = this.nextQuestion.genre;
    return this.questions.genres[genreId].display_name;
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const answersAsArray = [];
    for (let i = 0; i < this.tracksDisplayed; i++) {
      answersAsArray.push(formData.get(`answer-` + i) === `on`);
    }

    this.setState({
      "answers": answersAsArray
    }, () => {
      this.checkAnswers();
    });

    e.target.reset();
  }

  checkAnswers() {
    let answerInfo = this.props.appCallback(this.nextQuestion, this.state.answers);

    this.setState({
      "mistakesAvailable": this.state.mistakesAvailable + answerInfo.mistakesAvailable,
      "score": (this.state.score + answerInfo.totalScore)
    });

    this.getNextQuestion();
  }

  render() {
    if (this.nextQuestion === null) {
      return <Redirect to="/" />;
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
            {this.renderMistakes()}
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите треки в жанре: {this.getGenreName()}</h2>
          <div>Раунд {this.currentRound} / Очки: {this.state.score}</div>
          <form className="game__tracks" onSubmit={this.handleSubmit.bind(this)}>
            {this.renderTracks()}

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
