import React, { useContext } from 'react';
import Statistic from '../../components/Statistic';
import { BettingContext } from '../../providers/BettingProvider';

import './styles.css';

function Header() {
  const betting = useContext(BettingContext);

  return (
    <header className="header">
      <Statistic
        property="BALANCE"
        value={betting?.bettingState.balance || 0}
      />
      <Statistic
        property="BET"
        value={betting?.bettingState.totalCurrentBet || 0}
      />
      <Statistic property="WIN" value={betting?.bettingState.win || 0} />
    </header>
  );
}

export default Header;
