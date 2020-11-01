import {ActionType} from "./action.js";
import {extend} from "./utils.js";

const gameDefaults = {
  mistakesCount: 0,
  round: 0,
  score: 0
};

const reducer = (state = gameDefaults, action) => {
  switch (action.type) {
    case ActionType.INCREASE_MISTAKES_COUNT:
      return extend(state, {
        mistakesCount: state.mistakesCount + action.payload,
      });

    case ActionType.INCREASE_SCORE:
      return extend(state, {
        score: state.score + action.payload,
      });

    case ActionType.GO_TO_NEXT_QUESTION:
      return extend(state, {
        round: state.round + action.payload,
      });

    case ActionType.RESET_GAME:
      return extend({}, gameDefaults);
  }

  return state;
};

export {reducer};
