import React from 'react';
import { playNote } from '../synth/engine';
import { randomNote } from '../utils/randomizer';

const grid = [
  ['C3', 'D3', 'E3'],
  ['F3', 'G3', 'A3'],
  ['B3', 'C4', 'D4']
];

const GlyphPad = () => {
  const handleTrigger = (note) => {
    playNote(note, '8n');
    // add visual sigil pulse here later
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-900 rounded-lg shadow-inner border border-fuchsia-800">
      {grid.flat().map((note, idx) => (
        <button
          key={idx}
          onClick={() => handleTrigger(note)}
          className="bg-fuchsia-700 hover:bg-fuchsia-500 active:scale-95 transition transform text-white py-4 px-6 font-mono rounded text-sm tracking-widest border border-fuchsia-400"
        >
          {note}
        </button>
      ))}

      {/* Chaos trigger (random) */}
      <button
        onClick={() => handleTrigger(randomNote())}
        className="col-span-3 mt-3 bg-rose-700 hover:bg-rose-500 py-2 rounded shadow-md text-xs tracking-wider font-mono"
      >
        Cast Random
      </button>
    </div>
  );
};

export default GlyphPad;