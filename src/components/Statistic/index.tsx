import React from 'react';
import { IStatistic } from './types';

import './styles.css';

function Statistic({ property, value }: IStatistic) {
  return (
    <div className="statistic">
      <span className="statistic-property">{property}: </span>
      <span className="statistic-value">{value}</span>
    </div>
  );
}

export default Statistic;
