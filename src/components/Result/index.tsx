import React from 'react';
import { IResult } from './types';

import './styles.css';

function Result({ winnerPosition, reward }: IResult) {
  const renderWinnerPosition = () => {
    const positionClass = winnerPosition
      ? `result-position-${winnerPosition.toLowerCase()}`
      : 'result-position-tie';

    return (
      <span className={`result-winner-position ${positionClass}`}>
        {winnerPosition ? `${winnerPosition} WON` : 'A TIE'}
      </span>
    );
  };

  const renderStatusWrapper = () => {
    if (winnerPosition && reward) {
      return (
        <div className="result-status-wrapper">
          <span>YOU WIN</span>
          <span className="result-reward">{reward.toFixed(2)}</span>
        </div>
      );
    } else if (winnerPosition) {
      return (
        <div className="result-status-wrapper">
          <span>YOU LOST</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="result">
      {renderWinnerPosition()}
      {renderStatusWrapper()}
    </div>
  );
}

export default Result;
