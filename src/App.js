import React, { useState } from 'react';
import * as Tone from 'tone';
import Altar from './components/Altar'; // new UI wrapper
import './App.css';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = async () => {
    await Tone.start();
    console.log('🔊 Audio is ready');
    setIsStarted(true);
  };

  return (
    <div className="App bg-black text-white min-h-screen">
      {!isStarted ? (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
          <h1 className="text-3xl text-fuchsia-400 font-mono tracking-wide">~omnichord~</h1>
          <button
            onClick={handleStart}
            className="bg-pink-600 hover:bg-pink-400 text-white px-6 py-2 rounded-md font-mono tracking-wider shadow"
          >
            Cast the first sound
          </button>
        </div>
      ) : (
        <Altar />
      )}
    </div>
  );
}

export default App;