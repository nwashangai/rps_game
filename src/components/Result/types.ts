import { GameOptions } from '../../types';

export interface IResult {
  winnerChoice: GameOptions;
  reward: number | null;
}
