// GlobalControlBar.jsx
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

const GlobalControlBar = () => {
  const [bpm, setBpm] = useState(120);
  const [swing, setSwing] = useState(0);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    Tone.Transport.swing = swing;
  }, [swing]);

  useEffect(() => {
    Tone.Destination.volume.value = volume;
  }, [volume]);

  return (
    <div className="bg-zinc-900 border border-indigo-700 p-4 rounded-xl flex flex-col gap-3">
      <h3 className="text-indigo-300 font-mono text-sm mb-1">Global Controls</h3>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono text-indigo-200">
          Tempo: {bpm} BPM
          <input
            type="range"
            min="40"
            max="200"
            step="1"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value))}
            className="w-full"
          />
        </label>

        <label className="text-xs font-mono text-indigo-200">
          Swing: {(swing * 100).toFixed(0)}%
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={swing}
            onChange={(e) => setSwing(parseFloat(e.target.value))}
            className="w-full"
          />
        </label>

        <label className="text-xs font-mono text-indigo-200">
          Master Volume: {volume} dB
          <input
            type="range"
            min="-60"
            max="0"
            step="1"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
    </div>
  );
};

export default GlobalControlBar;
