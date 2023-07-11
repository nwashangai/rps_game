import React from 'react';
import { IGamePosition } from './types';

import './styles.css';

function GamePosition({
  text,
  bet,
  isActive,
  onClick,
  isDisabled,
}: IGamePosition) {
  const positionClassName = `game-position game-position-${text.toLowerCase()}${
    isActive ? ' active' : ''
  }${isDisabled ? ' disabled' : ''}`;

  const handleClick = () => {
    if (onClick) {
      onClick(text);
    }
  };

  const renderBet = () => {
    if (!bet) {
      return null;
    }

    return (
      <div className="game-position-bet">
        <span>{bet}</span>
      </div>
    );
  };

  return (
    <div className={positionClassName} onClick={handleClick}>
      {renderBet()}
      <span>{text}</span>
    </div>
  );
}

export default GamePosition;
