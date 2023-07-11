import React, { useContext, useEffect } from 'react';
import Match from '../../components/Match';
import Result from '../../components/Result';
import GameOption from '../../components/GamePosition';
import Button from '../../components/Button';
import { BettingContext } from '../../providers/BettingProvider';
import { POSITIONS } from '../../constants';
import { useRPSGame } from '../../hooks';
import { GameStatus } from '../../reducers';

import './styles.css';

function Game() {
  const betting = useContext(BettingContext);
  const { status, gameStats, playGame, endGame, resetGame } = useRPSGame(
    betting?.bettingState.bet || new Map()
  );
  const balance = betting?.bettingState.balance || 0;
  const isMaxPositionsSelected = (betting?.bettingState.bet.size || 0) > 1;
  const winnerPositon = betting?.bettingState.winnerInfo?.position;
  const reward = betting?.bettingState.winnerInfo?.reward;
  const haveEnoughBalance = balance >= 500;

  useEffect(() => {
    if (gameStats) {
      setTimeout(() => {
        if (betting?.updateBetStats && gameStats) {
          betting?.updateBetStats({ ...gameStats });
          endGame();
        }
      }, 3000);
    }
  }, [gameStats]);

  const clear = () => {
    betting?.clearBet();
    resetGame();
  };

  return (
    <div className="game">
      <div className="game-status">
        {status === GameStatus.Started && (
          <div className="game-status-loader">
            <div className="loader"></div>
            <span>RUNNING</span>
          </div>
        )}
        {status === GameStatus.Matched && gameStats && (
          <Match
            player1Choice={gameStats.aiPosition}
            player2Choice={gameStats.playerPosition}
          />
        )}
        {status === GameStatus.Ended && (
          <Result winnerPositon={winnerPositon} reward={reward} />
        )}
      </div>
      <div className="game-positions-container">
        {status === GameStatus.Idle && (
          <h4 className="game-positions-title">PICK YOUR POSITIONS</h4>
        )}
        <div className="game-positions">
          {POSITIONS.map((position, index) => {
            const canSelectMorePosition =
              !isMaxPositionsSelected ||
              betting?.bettingState.bet.has(position);

            return (
              <GameOption
                key={`game-positions-${index}`}
                text={position}
                bet={betting?.bettingState.bet.get(position)}
                isActive={winnerPositon === position}
                isDisabled={
                  !haveEnoughBalance ||
                  !canSelectMorePosition ||
                  status !== GameStatus.Idle
                }
                onClick={betting?.placeBetOn}
              />
            );
          })}
        </div>
      </div>
      <div className="game-button-container">
        {status === GameStatus.Ended ? (
          <Button title="CLEAR" onClick={clear} />
        ) : (
          <Button
            title="PLAY"
            disabled={
              betting?.bettingState.bet.size === 0 || status !== GameStatus.Idle
            }
            onClick={playGame}
          />
        )}
      </div>
    </div>
  );
}

export default Game;
