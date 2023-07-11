import { GamePosition } from '../../types';

export interface IResult {
  winnerPositon?: GamePosition | null;
  reward?: number;
}
