// Altar.jsx
import React, { useEffect, useState } from 'react';
import OscillatorPanel from './components/OscillatorPanel';
import SamplerPanel from './components/SamplerPanel';
import TransportPanel from './components/TransportPanel';
import FXRack from './components/FXRack';
import Oscilloscope from './components/Oscilloscope';
import SynthSequencer from './components/SynthSequencer';
import GlobalControlBar from './components/GlobalControlBar';
import * as Tone from 'tone';

const Altar = () => {
  const [osc1Settings, setOsc1Settings] = useState({ waveform: 'sine', detune: 0, octave: 0 });
  const [osc2Settings, setOsc2Settings] = useState({ waveform: 'sine', detune: 0, octave: 0 });
  const [samplePlayer, setSamplePlayer] = useState(null);
  const [osc1, setOsc1] = useState(null);
  const [osc2, setOsc2] = useState(null);

  useEffect(() => {
    const o1 = new Tone.Oscillator({
      type: osc1Settings.waveform,
      frequency: 440 * Math.pow(2, osc1Settings.octave),
      detune: osc1Settings.detune
    }).start();
    const o2 = new Tone.Oscillator({
      type: osc2Settings.waveform,
      frequency: 220 * Math.pow(2, osc2Settings.octave),
      detune: osc2Settings.detune
    }).start();
    o1.toDestination();
    o2.toDestination();
    setOsc1(o1);
    setOsc2(o2);
    return () => {
      o1.dispose();
      o2.dispose();
    };
  }, [osc1Settings, osc2Settings]);

  const updateOscillator = (oscNum, settings) => {
    if (oscNum === 1) setOsc1Settings(settings);
    if (oscNum === 2) setOsc2Settings(settings);
  };

  const handleSampleChange = (url) => {
    if (samplePlayer) samplePlayer.dispose();
    const player = new Tone.Player(url).toDestination();
    player.autostart = false;
    setSamplePlayer(player);
  };

  const triggerSample = () => {
    if (samplePlayer) samplePlayer.start();
  };

  const testDrumPlayers = {
    Kick: new Tone.Player('/assets/samples/kick.wav').toDestination(),
    Snare: new Tone.Player('/assets/samples/snare.wav').toDestination(),
    Hat: new Tone.Player('/assets/samples/hat.wav').toDestination(),
    FX: new Tone.Player('/assets/samples/fx.wav').toDestination()
  };

  return (
    <div className="p-6 space-y-6 bg-zinc-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-fuchsia-500 font-mono">🜃 Omnichord Altar</h1>

      <GlobalControlBar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OscillatorPanel oscId={1} onChange={(settings) => updateOscillator(1, settings)} />
        <OscillatorPanel oscId={2} onChange={(settings) => updateOscillator(2, settings)} />
      </div>

      <Oscilloscope osc1={osc1} osc2={osc2} />
      <SynthSequencer osc1={osc1} osc2={osc2} />
      <SamplerPanel onSampleChange={handleSampleChange} />
      <TransportPanel />
      <FXRack input={null} perChannel={testDrumPlayers} />

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