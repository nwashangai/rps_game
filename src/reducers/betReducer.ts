import { Reducer } from 'react';
import { BetAction, BetActionType, BetStateType } from './types';
import { GamePosition } from '../types';

export const betReducer: Reducer<BetStateType, BetActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case BetAction.UpdateBalance:
      return {
        ...state,
        balance: state.balance + action.payload.value,
      };
    case BetAction.PlaceBet:
      const { position, newBetForPosition, totalCurrentBet } = action.payload;
      const bet = new Map<GamePosition, number>(state.bet);
      bet.set(position, newBetForPosition);

      return {
        ...state,
        bet,
        totalCurrentBet,
      };
    case BetAction.UpdateWin:
      return {
        ...state,
        win: state.win + action.payload.value,
      };
    case BetAction.ClearBet:
      return {
        ...state,
        bet: new Map<GamePosition, number>(),
        winnerInfo: undefined,
        totalCurrentBet: 0,
      };
    case BetAction.SetWinnerInfo:
      return {
        ...state,
        winnerInfo: action.payload,
      };
    case BetAction.BatchAction: {
      const { actions } = action.payload;
      let newState = state;

      actions.forEach((singleAction) => {
        newState = betReducer(newState, singleAction);
      });

      return newState;
    }
    default:
      return state;
  }
};

export default betReducer;
