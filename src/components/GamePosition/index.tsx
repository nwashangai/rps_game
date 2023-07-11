import React from 'react';
import { IGamePosition } from './types';

import './styles.css';

function GameOption({
  text,
  bet,
  isActive,
  onClick,
  isDisabled,
}: IGamePosition) {
  return (
    <div
      className={`game-position game-position-${text.toLowerCase()}${
        isActive ? ' active' : ''
      }${isDisabled ? ' disabled' : ''}`}
      onClick={() => (onClick ? onClick(text) : null)}
    >
      <div className={`game-position-bet ${!bet && 'hidden'}`}>
        <span>{bet}</span>
      </div>
      <span>{text}</span>
    </div>
  );
}

export default GameOption;
