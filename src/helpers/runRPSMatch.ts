import { POSITIONS } from '../constants';
import { GamePosition } from '../types';

export const runRPSMatch = async (): Promise<GamePosition> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getRandomNumber(POSITIONS));
    }, 3000);
  });
};

const getRandomNumber = <T>(items: T[]) => {
  const milliseconds = new Date().getMilliseconds();
  const randomIndex = Math.floor((milliseconds * items.length) / 1000);
  return items[randomIndex];
};

export default runRPSMatch;
