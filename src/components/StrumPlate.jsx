// StrumPlate.jsx
import React, { useState } from 'react';
import * as Tone from 'tone';

const StrumPlate = ({ root = 'C4' }) => {
  const [synthType, setSynthType] = useState('sine');

  const handleStrum = async () => {
    await Tone.start();
    const now = Tone.now();

    const scaleMap = {
  C4: ['C4', 'E4', 'G4', 'B4'],
  D4: ['D4', 'F#4', 'A4', 'C5'],
  E4: ['E4', 'G#4', 'B4', 'D5'],
  F4: ['F4', 'A4', 'C5', 'E5'],
  G4: ['G4', 'B4', 'D5', 'F#5'],
  A4: ['A4', 'C#5', 'E5', 'G5'],
  B4: ['B4', 'D#5', 'F#5', 'A5']
};

    const notes = scaleMap[root] || scaleMap['C4'];

    if (synthType === 'sine') {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.set({ oscillator: { type: 'sine' } });
      notes.forEach((note, i) => {
        synth.triggerAttackRelease(note, '8n', now + i * 0.05);
      });
    } else if (synthType === 'pluck') {
      const synth = new Tone.PluckSynth().toDestination();
      notes.forEach((note, i) => {
        synth.triggerAttack(note, now + i * 0.05);
      });
    }
  };

  return (
    <div className="bg-zinc-900 p-4 border border-teal-700 rounded-xl space-y-3">
      <h3 className="text-teal-300 font-mono text-sm">Strum Plate</h3>

      <div className="flex gap-2 mb-2">
        <button
          className={`px-3 py-1 rounded text-xs font-mono transition ${
            synthType === 'sine' ? 'bg-teal-600 text-white' : 'bg-zinc-800 text-teal-300'
          }`}
          onClick={() => setSynthType('sine')}
        >
          Sine
        </button>
        <button
          className={`px-3 py-1 rounded text-xs font-mono transition ${
            synthType === 'pluck' ? 'bg-teal-600 text-white' : 'bg-zinc-800 text-teal-300'
          }`}
          onClick={() => setSynthType('pluck')}
        >
          Plucked
        </button>
      </div>

      <button
        onClick={handleStrum}
        className="w-full px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded font-mono text-xs"
      >
        ✶ Strum ✶
      </button>
    </div>
  );
};

export default StrumPlate;
