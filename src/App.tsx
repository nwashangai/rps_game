import React from 'react';
import Header from './containers/Header';
import Game from './containers/Game';
import './App.css';
import { BettingProvider } from './providers';
import { betSettings } from './config';

function App() {
  return (
    <BettingProvider settings={betSettings}>
      <div className="app">
        <Header />
        <Game />
      </div>
    </BettingProvider>
  );
}

export default App;
