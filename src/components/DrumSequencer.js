import React, { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import './DrumSequencer.css';

const STEPS = 16;
const INSTRUMENTS = ['Kick', 'Snare', 'HiHat', 'Crash', 'Ride', 'OpenHiHat'];

const DrumSequencer = ({ isPlaying, onPlayToggle, onTriggerSound }) => {
  const [sequence, setSequence] = useState(
    INSTRUMENTS.map(() => Array(STEPS).fill(false))
  );
  const [currentStep, setCurrentStep] = useState(0);

  const safeStop = useCallback((toneObject) => {
    if (toneObject && typeof toneObject.stop === 'function') {
      try {
        toneObject.stop(0);
      } catch (error) {
        console.warn('Error stopping Tone.js object:', error);
      }
    }
  }, []);

  useEffect(() => {
    let loop = null;

    const createLoop = () => {
      return new Tone.Sequence(
        (time, step) => {
          setCurrentStep(step);
          sequence.forEach((track, index) => {
            if (track[step]) {
              onTriggerSound(INSTRUMENTS[index]);
            }
          });
        },
        [...Array(STEPS).keys()],
        '16n'
      );
    };

    if (isPlaying) {
      Tone.Transport.start();
      loop = createLoop();
      loop.start(0);
    } else {
      safeStop(Tone.Transport);
      if (loop) {
        safeStop(loop);
      }
    }

    return () => {
      if (loop) {
        safeStop(loop);
        loop.dispose();
      }
    };
  }, [isPlaying, sequence, onTriggerSound, safeStop]);

  const toggleStep = (instrumentIndex, stepIndex) => {
    setSequence(prevSequence => {
      const newSequence = [...prevSequence];
      newSequence[instrumentIndex] = [...newSequence[instrumentIndex]];
      newSequence[instrumentIndex][stepIndex] = !newSequence[instrumentIndex][stepIndex];
      return newSequence;
    });
  };

  const clearSequence = () => {
    setSequence(INSTRUMENTS.map(() => Array(STEPS).fill(false)));
  };

  return (
    <div className="drum-sequencer">
      {sequence.map((track, instrumentIndex) => (
        <div key={instrumentIndex} className="sequencer-row">
          <div className="instrument-name">{INSTRUMENTS[instrumentIndex]}</div>
          <div className="sequencer-cells">
            {track.map((isActive, stepIndex) => (
              <button
                key={stepIndex}
                className={`sequencer-cell ${isActive ? 'active' : ''} ${
                  stepIndex === currentStep ? 'current' : ''
                }`}
                onClick={() => toggleStep(instrumentIndex, stepIndex)}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="sequencer-controls">
        <button className="play-button" onClick={onPlayToggle}>
          {isPlaying ? 'Stop' : 'Play'}
        </button>
        <button className="clear-button" onClick={clearSequence}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default DrumSequencer;