import React from 'react';

import './styles.css';
import { IResult } from './types';

function Result({ winnerChoice, reward }: IResult) {
  return (
    <div className="result">
      <span
        className={`result-winner-choice result-choice-${winnerChoice.toLowerCase()}`}
      >
        {winnerChoice} WON
      </span>
      <div className="result-status-wrapper">
        <span>YOU {reward ? 'WIN' : 'LOST'}</span>{' '}
        {reward && <span className="result-reward">{reward.toFixed(2)}</span>}
      </div>
    </div>
  );
}

export default Result;
