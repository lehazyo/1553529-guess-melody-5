import React from "react";
import PropTypes from "prop-types";

const Welcome = (props) => {
  const {errorsCount} = props;

  return (
    <section className="welcome">
      <div className="welcome-logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <button className="welcome-button">
        <span className="visually-hidden">Начать игру</span>
      </button>
      <h2 className="welcome-rules-title">Правила игры</h2>
      <p className="welcome-text">Правила просты:</p>
      <ul className="welcome-rules-list">
        <li>Нужно ответить на все вопросы.</li>
        <li>Можно допустить {errorsCount} ошибки.</li>
      </ul>
      <p className="welcome-text">Удачи!</p>
    </section>
  );
};

Welcome.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default Welcome;
