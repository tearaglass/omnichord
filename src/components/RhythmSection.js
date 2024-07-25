import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import './RhythmSection.css';

function RhythmSection() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPattern, setCurrentPattern] = useState('Basic Beat');
    const [volumes, setVolumes] = useState({
      kick: 0,
      snare: 0,
      hihat: 0,
      crash: 0,
      ride: 0,
      openHihat: 0
    });
  
    const kickRef = useRef(null);
    const snareRef = useRef(null);
    const hihatRef = useRef(null);
    const crashRef = useRef(null);
    const rideRef = useRef(null);
    const openHihatRef = useRef(null);
    const loopRef = useRef(null);
  
    const rhythmPatterns = {
      'Basic Beat': '4n',
      'Waltz': '3n',
      'Bossa Nova': '8n',
      'Rock/4 on the Floor': '4n',
      'Funk': '16n',
      'Jungle/Drum & Bass': '8n.',
      'Tribal': '3n.',
      'Electronic/Dance': '8n',
      'Hip-Hop': '4n.', 
      'House': '8n',
      'Breakbeat': '16n'
    };
  
    useEffect(() => {
      // Create drum sounds
      kickRef.current = new Tone.MembraneSynth().toDestination();
      snareRef.current = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
      }).toDestination();
      hihatRef.current = new Tone.MetalSynth({
        frequency: 200,
        envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      }).toDestination();
      crashRef.current = new Tone.MetalSynth({
        frequency: 500,
        envelope: { attack: 0.1, decay: 1, release: 0.5 },
        harmonicity: 3.1,
        modulationIndex: 16,
        resonance: 4000,
        octaves: 1
      }).toDestination();
      rideRef.current = new Tone.MetalSynth({
        frequency: 300,
        envelope: { attack: 0.05, decay: 0.5, release: 0.3 },
        harmonicity: 5.1,
        modulationIndex: 24,
        resonance: 4000,
        octaves: 1.2
      }).toDestination();
      openHihatRef.current = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.5, sustain: 0.1, release: 0.2 }
      }).toDestination();
  
      return () => {
        if (kickRef.current) kickRef.current.dispose();
        if (snareRef.current) snareRef.current.dispose();
        if (hihatRef.current) hihatRef.current.dispose();
        if (crashRef.current) crashRef.current.dispose();
        if (rideRef.current) rideRef.current.dispose();
        if (openHihatRef.current) openHihatRef.current.dispose();
        if (loopRef.current) loopRef.current.dispose();
      };
    }, []);
  
    useEffect(() => {
      // Update volumes
      if (kickRef.current) kickRef.current.volume.value = volumes.kick;
      if (snareRef.current) snareRef.current.volume.value = volumes.snare;
      if (hihatRef.current) hihatRef.current.volume.value = volumes.hihat;
      if (crashRef.current) crashRef.current.volume.value = volumes.crash;
      if (rideRef.current) rideRef.current.volume.value = volumes.ride;
      if (openHihatRef.current) openHihatRef.current.volume.value = volumes.openHihat;
    }, [volumes]);
  
    const togglePlay = () => {
      if (!isPlaying) {
        Tone.Transport.start();
        loopRef.current = new Tone.Loop((time) => {
          switch (currentPattern) {
            case 'Basic Beat':
              kickRef.current.triggerAttackRelease('C2', '8n', time);
              snareRef.current.triggerAttackRelease('16n', time + 0.25);
              hihatRef.current.triggerAttackRelease('32n', time + 0.125);
              break;
            case 'Waltz':
              kickRef.current.triggerAttackRelease('C2', '8n', time);
              snareRef.current.triggerAttackRelease('8n', time + 0.5);
              hihatRef.current.triggerAttackRelease('8n', time + 0.25, 0.25);
              break;
            case 'Bossa Nova':
              kickRef.current.triggerAttackRelease('C2', '16n', time);
              snareRef.current.triggerAttackRelease('16n', time + 0.5);
              hihatRef.current.triggerAttackRelease('16n', time + 0.25, 0.25);
              break;
            case 'Rock/4 on the Floor':
              kickRef.current.triggerAttackRelease('C2', '8n', time);
              snareRef.current.triggerAttackRelease('8n', time + 0.5);
              hihatRef.current.triggerAttackRelease('8n', time + 0.25, 0.25);
              break;
            case 'Funk':
              kickRef.current.triggerAttackRelease('C2', '16n', time);
              snareRef.current.triggerAttackRelease('16n', time + 0.5);
              hihatRef.current.triggerAttackRelease('32n', time + 0.25, 0.25);
              break;
            case 'Jungle/Drum & Bass':
              kickRef.current.triggerAttackRelease('C2', '8n.', time);
              snareRef.current.triggerAttackRelease('8n.', time + 0.5);
              hihatRef.current.triggerAttackRelease('16n', time + 0.25, 0.25);
              break;
            case 'Tribal':
              kickRef.current.triggerAttackRelease('C2', '3n.', time);
              snareRef.current.triggerAttackRelease('3n.', time + 1);
              hihatRef.current.triggerAttackRelease('3n.', time + 0.5, 0.5);
              break;
            case 'Electronic/Dance':
              kickRef.current.triggerAttackRelease('C2', '8n', time);
              snareRef.current.triggerAttackRelease('8n', time + 0.5);
              hihatRef.current.triggerAttackRelease('8n', time + 0.25, 0.25);
              break;
            case 'Hip-Hop':
              kickRef.current.triggerAttackRelease('C2', '4n.', time);
              snareRef.current.triggerAttackRelease('4n.', time + 0.5);
              hihatRef.current.triggerAttackRelease('8n', time + 0.25, 0.25);
              break;
            case 'House':
              kickRef.current.triggerAttackRelease('C2', '8n', time);
              snareRef.current.triggerAttackRelease('8n', time + 0.5);
              hihatRef.current.triggerAttackRelease('8n', time + 0.25, 0.25);
              break;
            case 'Breakbeat':
              kickRef.current.triggerAttackRelease('C2', '16n', time);
              snareRef.current.triggerAttackRelease('16n', time + 0.5);
              hihatRef.current.triggerAttackRelease('16n', time + 0.25, 0.25);
              break;
            default:
              break;
          }
        }, rhythmPatterns[currentPattern]).start(0);
      } else {
        Tone.Transport.stop();
        if (loopRef.current) loopRef.current.stop();
      }
      setIsPlaying(!isPlaying);
    };
  
    const changePattern = (pattern) => {
      setCurrentPattern(pattern);
      if (loopRef.current) {
        loopRef.current.interval = rhythmPatterns[pattern];
      }
    };
  
    const handleVolumeChange = (drum, value) => {
      setVolumes(prev => ({ ...prev, [drum]: value }));
    };
  
    return (
      <div className="rhythm-section">
        <h3>Rhythm Section</h3>
        <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Play'} Rhythm</button>
        <select value={currentPattern} onChange={(e) => changePattern(e.target.value)}>
          {Object.keys(rhythmPatterns).map(pattern => (
            <option key={pattern} value={pattern}>{pattern}</option>
          ))}
        </select>
        <div className="volume-controls">
          <div>
            <label>Kick Volume:</label>
            <input
              type="range"
              min="-60"
              max="0"
              value={volumes.kick}
              onChange={(e) => handleVolumeChange('kick', Number(e.target.value))}
            />
          </div>
          <div>
  <label>Snare Volume:</label>
  <input
    type="range"
    min="-60"
    max="0"
    value={volumes.snare}
    onChange={(e) => handleVolumeChange('snare', Number(e.target.value))}
  />
</div>
<div>
  <label>Hi-hat Volume:</label>
  <input
    type="range"
    min="-60"
    max="0"
    value={volumes.hihat}
    onChange={(e) => handleVolumeChange('hihat', Number(e.target.value))}
  />
</div>
          <div>
            <label>Crash Volume:</label>
            <input
              type="range"
              min="-60"
              max="0"
              value={volumes.crash}
              onChange={(e) => handleVolumeChange('crash', Number(e.target.value))}
            />
          </div>
          <div>
            <label>Ride Volume:</label>
            <input
              type="range"
              min="-60"
              max="0"
              value={volumes.ride}
              onChange={(e) => handleVolumeChange('ride', Number(e.target.value))}
            />
          </div>
          <div>
            <label>Open Hi-hat Volume:</label>
            <input
              type="range"
              min="-60"
              max="0"
              value={volumes.openHihat}
              onChange={(e) => handleVolumeChange('openHihat', Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    );
  }
  
  export default RhythmSection;