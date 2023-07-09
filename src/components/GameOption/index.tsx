import React from 'react';
import { IGameOption } from './types';

import './styles.css';

function GameOption({ text, bet, isActive }: IGameOption) {
  return (
    <div
      className={`game-option game-option-${text.toLowerCase()} ${
        isActive && 'active'
      }`}
    >
      <div className={`game-option-bet ${!bet && 'hidden'}`}>
        <span>{bet}</span>
      </div>
      <span>{text}</span>
    </div>
  );
}

export default GameOption;
