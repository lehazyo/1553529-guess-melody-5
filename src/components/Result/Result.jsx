import React from "react";
import PropTypes from "prop-types";

const inclineByCount = (count, singular, plural24, pluralCommon) => {
  const count10 = count % 10;
  const count100 = count % 100;

  if (count100 >= 11 && count100 <= 20) {
    return pluralCommon;
  } else {
    if (count10 === 1) {
      return singular;
    } else {
      if (count10 >= 2 && count10 <= 4) {
        return plural24;
      }
    }
  }
  return pluralCommon;
};

const Result = (props) => {
  return (
    <section className="result">
      <div className="result__logo">
        <img src="/img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">
        Вы ответили правильно на {props.correctAnswersCount} {inclineByCount(props.correctAnswersCount, `вопрос`, `вопроса`, `вопросов`)} и совершили {props.mistakesCount} {inclineByCount(props.mistakesCount, `ошибку`, `ошибки`, `ошибок`)}
      </p>
      <button className="replay" type="button">Сыграть ещё раз</button>
    </section>
  );
};

Result.propTypes = {
  correctAnswersCount: PropTypes.number,
  mistakesCount: PropTypes.number
};

export default Result;
