import { GameResult } from '../constants';
import { GamePosition } from '../types';

export enum GameStatus {
  Idle = 'IDLE',
  Started = 'STARTED',
  Matched = 'Matched',
  Ended = 'ENDED',
}

export enum GameAction {
  SetGameStatus = 'SET_GAME_STATUS',
  SetGameStat = 'SET_GAME_STAT',
}

export enum BetAction {
  UpdateBalance = 'UPDATE_BALANCE',
  PlaceBet = 'PLACE_BET',
  UpdateWin = 'UPDATE_WIN',
  BatchAction = 'BATCH_ACTIONS',
  ClearBet = 'CLEAR_BET',
  SetWinnerInfo = 'SET_WINNER_INFO',
}

export type WinnerInfoType = { position: GamePosition | null; reward: number };

export type BetStateType = {
  balance: number;
  bet: Map<GamePosition, number>;
  win: number;
  winnerInfo?: WinnerInfoType;
};

interface IUpdateBet {
  type: BetAction.UpdateBalance | BetAction.UpdateWin;
  payload: { value: number };
}

interface IPlaceBet {
  type: BetAction.PlaceBet;
  payload: {
    newBetForPosition: number;
    position: GamePosition;
  };
}

interface IClearBet {
  type: BetAction.ClearBet;
}

interface ISetWinnerInfo {
  type: BetAction.SetWinnerInfo;
  payload: WinnerInfoType;
}

interface IBatchActions {
  type: 'BATCH_ACTIONS';
  payload: {
    actions: BetActionType[];
  };
}

export type BetActionType =
  | IUpdateBet
  | IPlaceBet
  | IBatchActions
  | IClearBet
  | ISetWinnerInfo;

export type GameStatsType = {
  playerPosition: GamePosition;
  aiPosition: GamePosition;
  result: GameResult;
} | null;

export type GameStateType = {
  status: GameStatus;
  gameStats: GameStatsType;
};

export type GameActionType =
  | {
      type: GameAction.SetGameStat;
      payload: { gameStats: GameStatsType };
    }
  | {
      type: GameAction.SetGameStatus;
      payload: { status: GameStatus };
    };
