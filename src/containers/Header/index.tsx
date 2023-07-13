import React, { useContext, useMemo } from 'react';
import Statistic from '../../components/Statistic';
import { BettingContext } from '../../providers/BettingProvider';

import './styles.css';

function Header() {
  const betting = useContext(BettingContext);
  const currentTotalBet = useMemo(() => {
    return Array.from(betting?.bettingState.bet.values() || []).reduce(
      (prev, currentBet) => prev + currentBet,
      0
    );
  }, [betting?.bettingState.bet]);

  return (
    <header className="header">
      <Statistic
        property="BALANCE"
        value={betting?.bettingState.balance || 0}
      />
      <Statistic property="BET" value={currentTotalBet} />
      <Statistic property="WIN" value={betting?.bettingState.win || 0} />
    </header>
  );
}

export default Header;
