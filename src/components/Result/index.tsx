import React from 'react';

import './styles.css';
import { IResult } from './types';

function Result({ winnerPositon, reward }: IResult) {
  return (
    <div className="result">
      <span
        className={`result-winner-position result-position-${
          winnerPositon?.toLowerCase() || 'tie'
        }`}
      >
        {winnerPositon ? `${winnerPositon} WON` : 'A TIE'}
      </span>
      {winnerPositon && (
        <div className="result-status-wrapper">
          <span>YOU {reward ? 'WIN' : 'LOST'}</span>{' '}
          {!!reward && (
            <span className="result-reward">{reward.toFixed(2)}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default Result;
