import React from 'react';
import App from './components/App/App';
import questions from './mocks/questions.json';
import {reducer} from './reducer.js';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        questions={questions}
        maximumMistakes={5}
        mistakesCount={0}
        performersCount={3}
        tracksDisplayed={4}
      />
    </Provider>,
    document.getElementById(`root`)
);
