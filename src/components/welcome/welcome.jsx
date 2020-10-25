import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const Welcome = (props) => {
  const {mistakesCount} = props;

  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img src="/img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <Link className="welcome__button welcome__button-genre" to="/game-genre" style={{borderStyle: `solid`, left: `20%`}}>
        <span className="welcome__button-label">Играть по жанру</span>
      </Link>
      <Link className="welcome__button welcome__button-performer" to="/game-artist" style={{borderStyle: `solid`, left: `auto`, right: `30%`}}>
        <span className="welcome__button-label">Играть по исполнителю</span>
      </Link>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>Нужно ответить на все вопросы.</li>
        <li>Можно допустить {mistakesCount} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
};

Welcome.propTypes = {
  mistakesCount: PropTypes.number.isRequired,
};

export default Welcome;
