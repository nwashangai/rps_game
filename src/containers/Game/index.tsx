import React from 'react';
import Match from '../../components/Match';
import Result from '../../components/Result';
import GameOption from '../../components/GameOption';
import Button from '../../components/Button';
import { GameOptions } from '../../types';

import './styles.css';

function Game() {
  const [player, computer]: GameOptions[] = ['ROCK', 'PAPER'];
  const options: { bet?: number; text: GameOptions }[] = [
    { bet: 500, text: 'ROCK' },
    { bet: 2500, text: 'PAPER' },
    { text: 'SCISSORS' },
  ];
  const winner = 'PAPER';
  return (
    <div className="game">
      <div className="game-status">
        <Match player1Choice={player} player2Choice={computer} />
        {/* <Result winnerChoice="PAPER" reward={1000} /> */}
      </div>
      <div className="game-options-container">
        <h4 className="game-options-title">PICK YOUR POSITIONS</h4>
        <div className="game-options">
          {options.map((option, index) => (
            <GameOption
              key={`game-options-${index}`}
              text={option.text}
              bet={option.bet}
              isActive={option.text === winner}
            />
          ))}
        </div>
      </div>
      <div className="game-button-container">
        <Button title="PLAY" />
      </div>
    </div>
  );
}

export default Game;
