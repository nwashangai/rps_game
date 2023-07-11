import React, { createContext, useEffect, useReducer } from 'react';
import {
  BettingContextType,
  IBettingProvider,
  UpdateBetStatsType,
} from './types';
import { BetStateType } from '../../reducers/types';
import { betReducer, BetAction } from '../../reducers';
import { GamePosition } from '../../types';
import { GameResult } from '../../constants';
import { getReward } from '../../helpers/getReward';

const initialBetState: BetStateType = {
  balance: 0,
  bet: new Map(),
  totalCurrentBet: 0,
  win: 0,
};

const BettingContext = createContext<BettingContextType | undefined>(undefined);

const BettingProvider: React.FC<IBettingProvider> = ({
  children,
  settings,
}) => {
  const [bettingState, dispatch] = useReducer(betReducer, initialBetState);

  useEffect(() => {
    dispatch({
      type: BetAction.UpdateBalance,
      payload: { value: settings.initialBalance },
    });

    return () =>
      dispatch({
        type: BetAction.UpdateBalance,
        payload: { value: -settings.initialBalance },
      });
  }, []);

  const placeBetOn = (position: GamePosition): void => {
    const haveEnoughBalance = bettingState.balance >= settings.betRate;
    const currentBetOnPosition = bettingState.bet.get(position) || 0;

    if (
      haveEnoughBalance &&
      (currentBetOnPosition || bettingState.bet.size < 2)
    ) {
      dispatch({
        type: BetAction.BatchAction,
        payload: {
          actions: [
            {
              type: BetAction.UpdateBalance,
              payload: { value: -settings.betRate },
            },
            {
              type: BetAction.PlaceBet,
              payload: {
                position,
                newBetForPosition: currentBetOnPosition + settings.betRate,
                totalCurrentBet:
                  bettingState.totalCurrentBet + settings.betRate,
              },
            },
          ],
        },
      });
    }
  };

  const updateBetStats: UpdateBetStatsType = ({
    result,
    playerPosition,
    aiPosition,
  }) => {
    const size = bettingState.bet.size;
    const bet = bettingState.bet.get(playerPosition) || 0;

    if (result === GameResult.Win) {
      const reward = getReward(bet, settings.winningRates[size - 1]);

      dispatch({
        type: 'BATCH_ACTIONS',
        payload: {
          actions: [
            {
              type: BetAction.UpdateBalance,
              payload: { value: reward },
            },
            {
              type: BetAction.UpdateWin,
              payload: { value: reward },
            },
            {
              type: BetAction.SetWinnerInfo,
              payload: { reward, position: playerPosition },
            },
          ],
        },
      });
    } else if (result === GameResult.Tie) {
      dispatch({
        type: 'BATCH_ACTIONS',
        payload: {
          actions: [
            {
              type: BetAction.UpdateBalance,
              payload: { value: bet },
            },
            {
              type: BetAction.SetWinnerInfo,
              payload: { reward: 0, position: null },
            },
          ],
        },
      });
    } else {
      dispatch({
        type: BetAction.SetWinnerInfo,
        payload: { reward: 0, position: aiPosition },
      });
    }
  };

  const clearBet = () => {
    dispatch({
      type: BetAction.ClearBet,
    });
  };

  return (
    <BettingContext.Provider
      value={{
        bettingState,
        dispatch,
        placeBetOn,
        updateBetStats,
        clearBet,
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};

export { BettingProvider, BettingContext };
