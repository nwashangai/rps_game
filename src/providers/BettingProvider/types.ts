import { GameResult } from '../../constants';
import { BetActionType, BetStateType } from '../../reducers/types';
import { GamePosition, BetSettingsType } from '../../types';

export type BettingContextType = {
  bettingState: BetStateType;
  dispatch: React.Dispatch<BetActionType>;
  placeBetOn: (postion: GamePosition) => void;
  updateBetStats: UpdateBetStatsType;
  clearBet: () => void;
};

export interface IBettingProvider {
  children: React.ReactNode;
  settings: BetSettingsType;
}

type UpdateBetStatsParams = {
  result: GameResult;
  playerPosition: GamePosition;
  aiPosition: GamePosition;
};

export type UpdateBetStatsType = ({
  result,
  playerPosition,
  aiPosition,
}: UpdateBetStatsParams) => void;
