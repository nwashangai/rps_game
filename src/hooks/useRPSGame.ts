import { useReducer } from 'react';
import {
  GameAction,
  GameStateType,
  GameStatus,
  gameReducer,
} from '../reducers';
import { checkBetResult, runRPSMatch } from '../helpers';
import { GamePosition } from '../types';
import { GameResult } from '../constants';

const initialGameState: GameStateType = {
  status: GameStatus.Idle,
  gameStats: null,
};

export const useRPSGame = (
  playerSelectedPositions: Map<GamePosition, number>
) => {
  const [rpsState, dispatch] = useReducer(gameReducer, initialGameState);

  const playGame = async (): Promise<void> => {
    dispatch({
      type: GameAction.SetGameStatus,
      payload: { status: GameStatus.Started },
    });

    const aiPosition = await runRPSMatch();
    const size = playerSelectedPositions.size;
    let losePosition: GamePosition | undefined;

    for (const [position] of playerSelectedPositions) {
      const result = checkBetResult(position, aiPosition);
      const isWinner = result === GameResult.Win;
      const isTie = result === GameResult.Tie && size === 1;

      if (isWinner || isTie) {
        dispatch({
          type: GameAction.SetGameStat,
          payload: {
            gameStats: {
              result,
              aiPosition,
              playerPosition: position,
            },
          },
        });

        return;
      } else if (result === GameResult.Lose) {
        losePosition = position;
      }
    }

    dispatch({
      type: GameAction.SetGameStat,
      payload: {
        gameStats: {
          result: GameResult.Lose,
          aiPosition,
          playerPosition: losePosition!,
        },
      },
    });
  };

  const endGame = (): void => {
    dispatch({
      type: GameAction.SetGameStatus,
      payload: { status: GameStatus.Ended },
    });
  };

  const resetGame = (): void =>
    dispatch({
      type: GameAction.SetGameStatus,
      payload: { status: GameStatus.Idle },
    });

  return {
    status: rpsState.status,
    gameStats: rpsState.gameStats,
    playGame,
    endGame,
    resetGame,
  };
};
