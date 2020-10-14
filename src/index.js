import React from 'react';
import App from './components/App/App';
import questions from './mocks/questions.json';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <App
      questions={questions}
      mistakesCount={5}
      tracksDisplayed={4}
    />,
    document.getElementById(`root`)
);
