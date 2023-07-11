import { GamePosition } from '../../types';

export interface IResult {
  winnerPosition?: GamePosition | null;
  reward?: number;
}
