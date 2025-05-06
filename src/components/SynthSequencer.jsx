// SynthSequencer.jsx
import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

const NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
const STEPS = 16;

const SynthSequencer = () => {
  const [sequence1, setSequence1] = useState(Array(STEPS).fill(null));
  const [sequence2, setSequence2] = useState(Array(STEPS).fill(null));
  const synth1Ref = useRef(null);
  const synth2Ref = useRef(null);

  useEffect(() => {
    synth1Ref.current = new Tone.Synth({ oscillator: { type: 'triangle' } }).toDestination();
    synth2Ref.current = new Tone.Synth({ oscillator: { type: 'sawtooth' } }).toDestination();

    const loop = new Tone.Sequence((time, stepIndex) => {
      const note1 = sequence1[stepIndex];
      const note2 = sequence2[stepIndex];
      if (note1) synth1Ref.current.triggerAttackRelease(note1, '8n', time);
      if (note2) synth2Ref.current.triggerAttackRelease(note2, '8n', time);
    }, Array.from({ length: STEPS }, (_, i) => i), '16n').start(0);

    Tone.Transport.start();
    return () => loop.dispose();
  }, [sequence1, sequence2]);

  const setStepNote = (seqIndex, stepIndex, note) => {
    const setter = seqIndex === 1 ? setSequence1 : setSequence2;
    const prev = seqIndex === 1 ? sequence1 : sequence2;
    const updated = [...prev];
    updated[stepIndex] = note;
    setter(updated);
  };

  const renderRow = (seqIndex, sequence) => (
    <div className="grid grid-cols-16 gap-1 mb-2">
      {sequence.map((note, idx) => (
        <select
          key={idx}
          value={note || ''}
          onChange={(e) => setStepNote(seqIndex, idx, e.target.value || null)}
          className="bg-zinc-800 text-lime-200 text-xs p-1 rounded"
        >
          <option value="">—</option>
          {NOTES.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      ))}
    </div>
  );

  return (
    <div className="bg-black p-4 rounded-xl border border-lime-700 text-white">
      <h2 className="text-lime-300 font-mono text-lg mb-4">Synth Sequencer</h2>
      {renderRow(1, sequence1)}
      {renderRow(2, sequence2)}
    </div>
  );
};

export default SynthSequencer;
