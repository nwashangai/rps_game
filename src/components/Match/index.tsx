import React from 'react';
import { IMatch } from './types';

import './styles.css';

function Match({ player1Choice, player2Choice }: IMatch) {
  return (
    <div className="match">
      <span className="match-choice">{player1Choice}</span>
      <span className="match-vs">vs</span>
      <span className="match-choice">{player2Choice}</span>
    </div>
  );
}

export default Match;
