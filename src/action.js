export const ActionType = {
  INCREASE_MISTAKES_COUNT: `a`,
  INCREASE_SCORE: `b`,
  GO_TO_NEXT_QUESTION: `c`,
  RESET_GAME: `d`
};

export const ActionCreator = {
  increaseMistakes: () => ({
    type: ActionType.INCREASE_MISTAKES_COUNT,
    payload: 1
  }),
  increaseScore: (payload) => ({
    type: ActionType.INCREASE_SCORE,
    payload
  }),
  goToNextQuestion: () => ({
    type: ActionType.GO_TO_NEXT_QUESTION,
    payload: 1
  }),
  resetGame: () => ({
    type: ActionType.RESET_GAME
  })
};
