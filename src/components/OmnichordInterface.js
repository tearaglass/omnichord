import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import ChordButtons from './ChordButtons';
import StrumPlate from './StrumPlate';
import RhythmSection from './RhythmSection';
import './OmnichordInterface.css';
import './SynthControls.css';


function OmnichordInterface() {
  const [isReady, setIsReady] = useState(false);
  const synthRef = useRef(null);
  const chorusRef = useRef(null);
  const reverbRef = useRef(null);
  const filterRef = useRef(null);
  const [masterVolume, setMasterVolume] = useState(-10); // Start at -10 decibels
  const [tempo, setTempo] = useState(120); // Start at 120 beats per minute
  const [currentChord, setCurrentChord] = useState(null);
  const [synthSettings, setSynthSettings] = useState({
    oscillatorType: 'triangle8',
    attack: 0.02,
    decay: 0.1,
    sustain: 0.3,
    release: 1,
    filterCutoff: 2000,
    filterResonance: 1,
    chorusMix: 0.5,
    reverbMix: 0.5
  });
  

  const [mode, setMode] = useState('chord'); // 'chord', 'seq', or 'arp'
  const [holdSustain, setHoldSustain] = useState(false);
  const handleChordPress = (chord) => {
    if (currentChord === chord) {
      setCurrentChord(null);
      if (mode === 'arp') {
        stopArpeggiator();
      } else if (synthRef.current) {
        synthRef.current.releaseAll();
      }
    } else {
      setCurrentChord(chord);
      if (mode === 'arp') {
        stopArpeggiator();
        startArpeggiator(chord);
      } else {
        playChord(chord);
      }
    }
  };

  const playChord = (chord) => {
    if (synthRef.current) {
      const chordNotes = getChordNotes(chord);
      if (mode === 'chord' && holdSustain) {
        synthRef.current.triggerAttack(chordNotes);
      } else {
        synthRef.current.triggerAttackRelease(chordNotes, holdSustain ? "4n" : "8n");
      }
      
      
      setCurrentChord(chord);
    }
  };

  const [arpSpeed, setArpSpeed] = useState('8n');
  const arpRef = useRef(null);

  const startArpeggiator = (chord) => {
    if (arpRef.current) {
      arpRef.current.stop();
      arpRef.current.dispose();
    }
    
    const notes = getChordNotes(chord);
    let index = 0;
  
    arpRef.current = new Tone.Loop((time) => {
      if (synthRef.current) {
        synthRef.current.triggerAttackRelease(notes[index], '16n', time);
        index = (index + 1) % notes.length;
      }
    }, arpSpeed).start(0);
  
    // Ensure Tone.Transport is started
    Tone.Transport.start();
  };

const stopArpeggiator = () => {
  if (arpRef.current) {
    arpRef.current.stop();
    arpRef.current.dispose();
    arpRef.current = null;
  }
};

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.set({
        oscillator: { type: synthSettings.oscillatorType },
        envelope: {
          attack: synthSettings.attack,
          decay: synthSettings.decay,
          sustain: synthSettings.sustain,
          release: synthSettings.release
        }
      });
      filterRef.current.frequency.value = synthSettings.filterCutoff;
      filterRef.current.Q.value = synthSettings.filterResonance;
      chorusRef.current.wet.value = synthSettings.chorusMix;
      reverbRef.current.wet.value = synthSettings.reverbMix;
    }
  }, [synthSettings]);

  useEffect(() => {
    const setupAudio = async () => {
      filterRef.current = new Tone.Filter(synthSettings.filterCutoff, "lowpass").toDestination();
      
      synthRef.current = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: synthSettings.oscillatorType
        },
        envelope: {
          attack: synthSettings.attack,
          decay: synthSettings.decay,
          sustain: synthSettings.sustain,
          release: synthSettings.release
        }
      }).connect(filterRef.current);
  
      chorusRef.current = new Tone.Chorus(4, 2.5, synthSettings.chorusMix).start();
      reverbRef.current = new Tone.Reverb({
        decay: 1.5,
        wet: synthSettings.reverbMix
      });
  
      synthRef.current.chain(chorusRef.current, reverbRef.current, Tone.Destination);
  
      setIsReady(true);
    };
  
    setupAudio();
  
    return () => {
      if (synthRef.current) synthRef.current.dispose();
      if (chorusRef.current) chorusRef.current.dispose();
      if (reverbRef.current) reverbRef.current.dispose();
      if (filterRef.current) filterRef.current.dispose();
      // Add this new line for arpeggiator cleanup
      if (arpRef.current) {
        arpRef.current.stop();
        arpRef.current.dispose();
      }
    };
  }, []);



  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = masterVolume;
    }
  }, [masterVolume]);

  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
  }, [tempo]);



  const handleStrum = (position) => {
    if (synthRef.current) {
      const note = Tone.Frequency("C4").transpose(Math.floor(position.y / 5)).toNote();
      const velocity = 1 - (position.x / 300);
      synthRef.current.triggerAttackRelease(note, "8n", undefined, velocity);
    }
  };

  

  const handleModeChange = () => {
    setMode(prevMode => {
      if (prevMode === 'arp') {
        stopArpeggiator();
      }
      if (prevMode === 'chord') return 'seq';
      if (prevMode === 'seq') return 'arp';
      return 'chord';
    });
  };

  const handleHoldSustainChange = () => {
    setHoldSustain(prevHold => !prevHold);
    if (synthRef.current) {
      synthRef.current.releaseAll();
    }
  };

  const getChordNotes = (chord) => {
    const chordMap = {
      'C': ['C4', 'E4', 'G4'],
      'F': ['F4', 'A4', 'C5'],
      'G': ['G4', 'B4', 'D5'],
      'Am': ['A4', 'C5', 'E5'],
      'Dm': ['D4', 'F4', 'A4'],
      'Em': ['E4', 'G4', 'B4'],
    };
    return chordMap[chord] || [];
  };

  const handleSettingChange = (setting, value) => {
    setSynthSettings(prev => ({ ...prev, [setting]: value }));
  };

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="omnichord-interface">
      <div className="mode-controls">
      <button onClick={handleModeChange}>
  Mode: {mode === 'chord' ? 'Chord' : mode === 'seq' ? 'Sequencer' : 'Arpeggiator'}
</button>
        <button onClick={handleHoldSustainChange}>
          Hold/Sustain: {holdSustain ? 'On' : 'Off'}
        </button>
      </div>
      <ChordButtons onChordPress={handleChordPress} currentChord={currentChord} />

      <StrumPlate onStrum={handleStrum} />
      <RhythmSection />
      <div className="synth-controls">
        <h3>Synth Settings</h3>
        <div className="control-group">
          <label>Oscillator Type: </label>
          <select 
            value={synthSettings.oscillatorType} 
            onChange={(e) => handleSettingChange('oscillatorType', e.target.value)}
          >
            <option value="triangle8">Triangle</option>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
          </select>
        </div>
        <div className="control-group">
          <label>Attack: </label>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.01" 
            value={synthSettings.attack} 
            onChange={(e) => handleSettingChange('attack', parseFloat(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Decay: </label>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.01" 
            value={synthSettings.decay} 
            onChange={(e) => handleSettingChange('decay', parseFloat(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Sustain: </label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={synthSettings.sustain} 
            onChange={(e) => handleSettingChange('sustain', parseFloat(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Release: </label>
          <input 
            type="range" 
            min="0" 
            max="5" 
            step="0.01" 
            value={synthSettings.release} 
            onChange={(e) => handleSettingChange('release', parseFloat(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Filter Cutoff: </label>
          <input 
            type="range" 
            min="50" 
            max="5000" 
            step="1" 
            value={synthSettings.filterCutoff} 
            onChange={(e) => handleSettingChange('filterCutoff', parseInt(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Filter Resonance: </label>
          <input 
            type="range" 
            min="0" 
            max="20" 
            step="0.1" 
            value={synthSettings.filterResonance} 
            onChange={(e) => handleSettingChange('filterResonance', parseFloat(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Chorus Mix: </label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={synthSettings.chorusMix} 
            onChange={(e) => handleSettingChange('chorusMix', parseFloat(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Reverb Mix: </label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={synthSettings.reverbMix} 
            onChange={(e) => handleSettingChange('reverbMix', parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="master-controls">
  <div>
    <label>Volume: </label>
    <input 
      type="range" 
      min="-60" 
      max="0" 
      value={masterVolume} 
      onChange={(e) => setMasterVolume(Number(e.target.value))}
    />
    <span>{masterVolume} dB</span>
  </div>
  <div>
    <label>Tempo: </label>
    <input 
      type="range" 
      min="60" 
      max="240" 
      value={tempo} 
      onChange={(e) => setTempo(Number(e.target.value))}
    />
    <span>{tempo} BPM</span>
  </div>
</div>

    </div>
  );
}

export default OmnichordInterface;