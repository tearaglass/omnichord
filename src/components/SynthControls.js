import React from 'react';
import './SynthControls.css';

function SynthControls({ synthSettings, onSettingChange }) {
  return (
    <div className="synth-controls">
      <h3>Synth Settings</h3>
      <div className="control-group">
        <label>Oscillator Type: </label>
        <select 
          value={synthSettings.oscillatorType} 
          onChange={(e) => onSettingChange('oscillatorType', e.target.value)}
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
          onChange={(e) => onSettingChange('attack', parseFloat(e.target.value))}
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
          onChange={(e) => onSettingChange('decay', parseFloat(e.target.value))}
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
          onChange={(e) => onSettingChange('sustain', parseFloat(e.target.value))}
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
          onChange={(e) => onSettingChange('release', parseFloat(e.target.value))}
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
          onChange={(e) => onSettingChange('filterCutoff', parseInt(e.target.value))}
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
          onChange={(e) => onSettingChange('filterResonance', parseFloat(e.target.value))}
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
          onChange={(e) => onSettingChange('chorusMix', parseFloat(e.target.value))}
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
          onChange={(e) => onSettingChange('reverbMix', parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

export default SynthControls;