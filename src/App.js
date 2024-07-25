import React, { useState } from 'react';
import * as Tone from 'tone';
import './App.css';
import OmnichordInterface from './components/OmnichordInterface';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = async () => {
    await Tone.start();
    console.log('Audio is ready');
    setIsStarted(true);
  };

  return (
    <div className="App">
      <h1>Omnichord App</h1>
      {!isStarted ? (
        <button onClick={handleStart}>Start Audio</button>
      ) : (
        <OmnichordInterface />
      )}
    </div>
  );
}

export default App;