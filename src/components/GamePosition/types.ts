import { GamePosition } from '../../types';

export interface IGamePosition {
  text: GamePosition;
  isActive: boolean;
  bet?: number;
  isDisabled?: boolean;
  onClick?: (postion: GamePosition) => void;
}
