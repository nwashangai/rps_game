import { Reducer } from 'react';
import { GameAction, GameActionType, GameStateType, GameStatus } from './types';

export const gameReducer: Reducer<GameStateType, GameActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case GameAction.SetGameStatus:
      return { ...state, status: action.payload.status };
    case GameAction.SetGameStat:
      return {
        ...state,
        gameStats: action.payload.gameStats,
        status: GameStatus.Matched,
      };
    default:
      return state;
  }
};

export default gameReducer;
