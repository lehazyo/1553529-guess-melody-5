export const ActionType = {
  INCREASE_MISTAKES_COUNT: `INCREASE_MISTAKES_COUNT`,
  INCREASE_SCORE: `INCREASE_SCORE`,
  GO_TO_NEXT_QUESTION: `GO_TO_NEXT_QUESTION`,
  RESET_GAME: `RESET_GAME`
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
