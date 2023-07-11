import { GameResult, RPS_GAME_MAP } from '../constants';
import { GamePosition } from '../types';

export const checkBetResult = (
  playerPosition: GamePosition,
  aiPosition: GamePosition
): GameResult => {
  if (playerPosition === aiPosition) {
    return GameResult.Tie;
  } else if (RPS_GAME_MAP.get(playerPosition)?.loser === aiPosition) {
    return GameResult.Win;
  }

  return GameResult.Lose;
};

export default checkBetResult;
