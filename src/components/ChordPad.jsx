// ChordPad.jsx
import React from 'react';

const circleOfFifths = [
  'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#',
  'Ab', 'Eb', 'Bb', 'F'
];

const chordTypes = ['maj', 'min', '7', 'm7'];

const ChordPad = ({ onTrigger }) => {
  return (
    <div className="bg-zinc-900 border border-fuchsia-800 p-4 rounded-xl space-y-4">
      <h3 className="text-fuchsia-300 font-mono text-sm mb-2">Circle of Fifths Chord Pad</h3>
      <div className="grid grid-cols-4 gap-2">
        {circleOfFifths.map((note) => (
          <div key={note} className="space-y-1">
            {chordTypes.map((type) => (
              <button
                key={type}
                onClick={() => onTrigger(note, type)}
                className="w-full px-2 py-1 bg-fuchsia-700 text-white rounded hover:bg-fuchsia-600 text-xs font-mono"
              >
                {note}{type}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChordPad;
