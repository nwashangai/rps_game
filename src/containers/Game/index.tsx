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
    Array.from((betting?.bettingState.bet || new Map()).keys())
  );
  const balance = betting?.bettingState.balance || 0;
  const isMaxPositionsSelected = (betting?.bettingState.bet.size || 0) > 1;
  const winnerPosition = betting?.bettingState.winnerInfo?.position;
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

  const renderGameStatus = () => {
    if (status === GameStatus.Started) {
      return (
        <div className="game-status-loader">
          <div className="loader"></div>
          <span>RUNNING</span>
        </div>
      );
    } else if (status === GameStatus.Matched && gameStats) {
      return (
        <Match
          player1Choice={gameStats.aiPosition}
          player2Choice={gameStats.playerPosition}
        />
      );
    } else if (status === GameStatus.Ended) {
      return <Result winnerPosition={winnerPosition} reward={reward} />;
    }
    return null;
  };

  const renderPositions = () => {
    return (
      <>
        {status === GameStatus.Idle && (
          <h4 className="game-positions-title">PICK YOUR POSITIONS</h4>
        )}
        <div className="game-positions">
          {POSITIONS.map((position, index) => {
            const canSelectMorePosition =
              !isMaxPositionsSelected ||
              betting?.bettingState.bet.has(position);
            const isDisabled =
              !haveEnoughBalance ||
              !canSelectMorePosition ||
              status !== GameStatus.Idle;

            return (
              <GameOption
                key={`game-positions-${index}`}
                text={position}
                bet={betting?.bettingState.bet.get(position)}
                isActive={winnerPosition === position}
                isDisabled={isDisabled}
                onClick={betting?.placeBetOn}
              />
            );
          })}
        </div>
      </>
    );
  };

  const renderGameButton = () => {
    if (status === GameStatus.Ended) {
      return <Button title="CLEAR" onClick={clear} />;
    } else {
      const isDisabled =
        betting?.bettingState.bet.size === 0 || status !== GameStatus.Idle;

      return <Button title="PLAY" disabled={isDisabled} onClick={playGame} />;
    }
  };

  return (
    <div className="game">
      <div className="game-status">{renderGameStatus()}</div>
      <div className="game-positions-container">{renderPositions()}</div>
      <div className="game-button-container">{renderGameButton()}</div>
    </div>
  );
}

export default Game;
