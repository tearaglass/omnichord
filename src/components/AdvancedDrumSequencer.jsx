// AdvancedDrumSequencer.jsx
import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

const DRUMS = ['Kick', 'Snare', 'CHH', 'OHH', 'Crash', 'Ride', 'Perc'];
const STEPS = 16;

const AdvancedDrumSequencer = () => {
  const [sequence, setSequence] = useState(
    DRUMS.reduce((acc, drum) => {
      acc[drum] = Array(STEPS).fill().map(() => ({ active: false, velocity: 0.8, probability: 1.0 }));
      return acc;
    }, {})
  );

  const players = useRef(
    Object.fromEntries(
      DRUMS.map((drum) => [
        drum,
        new Tone.Player(`/assets/samples/${drum.toLowerCase()}.wav`).toDestination()
      ])
    )
  );

  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const loop = new Tone.Loop((time) => {
      DRUMS.forEach((drum) => {
        const step = sequence[drum][stepIndex];
        if (step.active && Math.random() < step.probability) {
          players.current[drum].volume.value = Tone.gainToDb(step.velocity);
          players.current[drum].start(time);
        }
      });
      setStepIndex((prev) => (prev + 1) % STEPS);
    }, '16n').start(0);

    Tone.Transport.start();
    return () => loop.dispose();
  }, [sequence, stepIndex]);

  const toggleStep = (drum, index) => {
    setSequence((prev) => {
      const newStep = { ...prev[drum][index], active: !prev[drum][index].active };
      const updated = [...prev[drum]];
      updated[index] = newStep;
      return { ...prev, [drum]: updated };
    });
  };

  const changeParam = (drum, index, param, value) => {
    setSequence((prev) => {
      const updated = [...prev[drum]];
      updated[index] = { ...updated[index], [param]: value };
      return { ...prev, [drum]: updated };
    });
  };

  return (
    <div className="bg-black p-4 rounded-xl border border-teal-700 text-white">
      <h2 className="text-teal-300 font-mono text-lg mb-4">Advanced Drum Sequencer</h2>
      {DRUMS.map((drum) => (
        <div key={drum} className="mb-4">
          <div className="text-xs text-teal-500 mb-1">{drum}</div>
          <div className="grid grid-cols-16 gap-1 mb-2">
            {sequence[drum].map((step, idx) => (
              <button
                key={idx}
                onClick={() => toggleStep(drum, idx)}
                className={`w-6 h-6 text-xs rounded-sm transition ${
                  step.active ? 'bg-teal-600' : 'bg-zinc-800 border border-zinc-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-16 gap-1 mb-1">
            {sequence[drum].map((step, idx) => (
              <input
                key={`v-${idx}`}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={step.velocity}
                onChange={(e) => changeParam(drum, idx, 'velocity', parseFloat(e.target.value))}
                className="w-6 h-2"
              />
            ))}
          </div>
          <div className="grid grid-cols-16 gap-1">
            {sequence[drum].map((step, idx) => (
              <input
                key={`p-${idx}`}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={step.probability}
                onChange={(e) => changeParam(drum, idx, 'probability', parseFloat(e.target.value))}
                className="w-6 h-2"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvancedDrumSequencer;
