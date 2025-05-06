// Altar.jsx
import React, { useState } from 'react';
import OscillatorPanel from './components/OscillatorPanel';
import SamplerPanel from './components/SamplerPanel';
import * as Tone from 'tone';
import TransportPanel from './components/TransportPanel';

const Altar = () => {
  const [osc1Settings, setOsc1Settings] = useState({});
  const [osc2Settings, setOsc2Settings] = useState({});
  const [samplePlayer, setSamplePlayer] = useState(null);

  const updateOscillator = (oscNum, settings) => {
    if (oscNum === 1) setOsc1Settings(settings);
    if (oscNum === 2) setOsc2Settings(settings);
  };

  const handleSampleChange = (url) => {
    if (samplePlayer) {
      samplePlayer.dispose();
    }
    const player = new Tone.Player(url).toDestination();
    player.autostart = false;
    setSamplePlayer(player);
  };

  const triggerSample = () => {
    if (samplePlayer) {
      samplePlayer.start();
    }
  };

  return (
    <div className="p-6 space-y-6 bg-zinc-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-fuchsia-500 font-mono">🜃 Omnichord Altar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OscillatorPanel oscId={1} onChange={(settings) => updateOscillator(1, settings)} />
        <OscillatorPanel oscId={2} onChange={(settings) => updateOscillator(2, settings)} />
      </div>

      <SamplerPanel onSampleChange={handleSampleChange} />

      <TransportPanel />

      <button
        onClick={triggerSample}
        className="mt-4 bg-purple-700 hover:bg-purple-600 transition px-4 py-2 rounded shadow font-mono text-sm"
      >
        ✴ Play Sample ✴
      </button>
    </div>
  );
};

export default Altar;
