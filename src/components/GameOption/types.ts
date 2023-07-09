import { GameOptions } from '../../types';

export interface IGameOption {
  text: GameOptions;
  isActive: boolean;
  bet?: number;
}
