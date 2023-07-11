import { GamePosition, RPSGameType } from './types';

export const RPS_GAME_MAP = new Map<GamePosition, RPSGameType>([
  ['ROCK', { winner: 'PAPER', loser: 'SCISSORS' }],
  ['PAPER', { winner: 'SCISSORS', loser: 'ROCK' }],
  ['SCISSORS', { winner: 'ROCK', loser: 'PAPER' }],
]);

export const POSITIONS: GamePosition[] = ['ROCK', 'PAPER', 'SCISSORS'];
export enum GameResult {
  Win = 'WIN',
  Tie = 'TIE',
  Lose = 'LOSE',
}
