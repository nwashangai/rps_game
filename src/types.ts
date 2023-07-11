export type GamePosition = 'ROCK' | 'PAPER' | 'SCISSORS';
export type BetSettingsType = {
  initialBalance: number;
  winningRates: number[];
  betRate: number;
};
export interface RPSGameType {
  winner: GamePosition;
  loser: GamePosition;
}
