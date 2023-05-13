import React from 'react';
import { CardGrid } from './components/CardGrid';
import { Score } from './components/Score';
import { EndGame } from './components/EndGame';

function App() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Score />
      <CardGrid />
      <EndGame />
    </div>
  );
}

export default App;
