import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import './RhythmSection.css';
import DrumSequencer from './DrumSequencer';
import DrumSettingsPanel from './DrumSettingsPanel';

function RhythmSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDrum, setSelectedDrum] = useState('kick');
  const [drumSettings, setDrumSettings] = useState({
    kick: { volume: 0, pitch: 0, frequency: 100, decay: 0.5 },
    snare: { volume: 0, pitch: 0, noise: 0.5, decay: 0.2 },
    hihat: { volume: 0, pitch: 0, frequency: 500, decay: 0.1 },
    crash: { volume: 0, pitch: 0, frequency: 600, decay: 1 },
    ride: { volume: 0, pitch: 0, frequency: 400, decay: 0.8 },
    openHihat: { volume: 0, pitch: 0, frequency: 700, decay: 0.3 },
  });

  const instrumentRefs = useRef({
    kick: null,
    snare: null,
    hihat: null,
    crash: null,
    ride: null,
    openHihat: null
  });

  const safeDispose = useCallback((toneObject) => {
    if (toneObject && typeof toneObject.dispose === 'function') {
      try {
        toneObject.dispose();
      } catch (error) {
        console.warn('Error disposing Tone.js object:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Create drum sounds
    instrumentRefs.current.kick = new Tone.MembraneSynth().toDestination();
    instrumentRefs.current.snare = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
    }).toDestination();
    instrumentRefs.current.hihat = new Tone.MetalSynth().toDestination();
    instrumentRefs.current.crash = new Tone.MetalSynth().toDestination();
    instrumentRefs.current.ride = new Tone.MetalSynth().toDestination();
    instrumentRefs.current.openHihat = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.001, decay: 0.5, sustain: 0.1, release: 0.2 }
    }).toDestination();

    return () => {
      Object.values(instrumentRefs.current).forEach(safeDispose);
    };
  }, [safeDispose]);

  useEffect(() => {
    // Update instrument settings
    Object.entries(drumSettings).forEach(([instrument, settings]) => {
      if (instrumentRefs.current[instrument]) {
        instrumentRefs.current[instrument].volume.value = settings.volume;
        if (instrument === 'kick' || instrument === 'hihat' || instrument === 'crash' || instrument === 'ride') {
          instrumentRefs.current[instrument].frequency.value = settings.frequency;
        }
        if (instrument === 'snare' || instrument === 'openHihat') {
          instrumentRefs.current[instrument].noise.type = settings.noise > 0.5 ? 'white' : 'pink';
        }
        instrumentRefs.current[instrument].envelope.decay = settings.decay;
      }
    });
  }, [drumSettings]);

  const handleSettingChange = (instrument, setting, value) => {
    setDrumSettings(prevSettings => ({
      ...prevSettings,
      [instrument]: {
        ...prevSettings[instrument],
        [setting]: value
      }
    }));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const triggerDrumSound = (instrument) => {
    const lowercaseInstrument = instrument.toLowerCase();
    if (instrumentRefs.current[lowercaseInstrument]) {
      const pitch = drumSettings[lowercaseInstrument].pitch;
      if (lowercaseInstrument === 'kick') {
        instrumentRefs.current[lowercaseInstrument].triggerAttackRelease(Tone.Frequency('C2').transpose(pitch), '8n');
      } else {
        instrumentRefs.current[lowercaseInstrument].triggerAttackRelease('8n');
      }
    }
  };

  return (
    <div className="rhythm-section">
      <h3>Rhythm Section</h3>
      <div className="sequencer-container">
        <DrumSequencer 
          isPlaying={isPlaying} 
          onPlayToggle={togglePlay} 
          onTriggerSound={triggerDrumSound}
        />
      </div>
      <div className="drum-controls">
        <select 
          value={selectedDrum} 
          onChange={(e) => setSelectedDrum(e.target.value)}
          className="drum-selector"
        >
          {Object.keys(drumSettings).map(drum => (
            <option key={drum} value={drum}>
              {drum.charAt(0).toUpperCase() + drum.slice(1)}
            </option>
          ))}
        </select>
        <DrumSettingsPanel
          selectedDrum={selectedDrum}
          drumSettings={drumSettings[selectedDrum]}
          onSettingChange={handleSettingChange}
        />
      </div>
    </div>
  );
}

export default RhythmSection;