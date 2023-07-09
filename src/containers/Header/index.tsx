import React from 'react';
import Statistic from '../../components/Statistic';

import './styles.css';

function Header() {
  const data = [
    { property: 'BALANCE', value: 5000 },
    { property: 'BET', value: 0 },
    { property: 'WIN', value: 0 },
  ];
  return (
    <header className="header">
      {data.map((statistic, index) => (
        <Statistic
          key={`statistic-${index}`}
          property={statistic.property}
          value={statistic.value}
        />
      ))}
    </header>
  );
}

export default Header;
