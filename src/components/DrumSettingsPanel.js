import React from 'react';
import * as Tone from 'tone';
import './DrumSettingsPanel.css';

const DrumSettingsPanel = ({ selectedDrum, drumSettings, onSettingChange }) => {
  const renderControl = (setting, label, min, max, step) => (
    <div key={setting} className="drum-setting">
      <label htmlFor={`${selectedDrum}-${setting}`}>{label}:</label>
      <input
        type="range"
        id={`${selectedDrum}-${setting}`}
        min={min}
        max={max}
        step={step}
        value={drumSettings[setting]}
        onChange={(e) => onSettingChange(selectedDrum, setting, Number(e.target.value))}
      />
      <span>{drumSettings[setting].toFixed(2)}</span>
    </div>
  );

  const commonControls = [
    { setting: 'volume', label: 'Volume', min: -60, max: 0, step: 1 },
    { setting: 'pitch', label: 'Pitch', min: -24, max: 24, step: 1 },
  ];

  const synthSpecificControls = {
    kick: [
      { setting: 'frequency', label: 'Frequency', min: 20, max: 200, step: 1 },
      { setting: 'decay', label: 'Decay', min: 0.01, max: 1, step: 0.01 },
    ],
    snare: [
      { setting: 'noise', label: 'Noise', min: 0, max: 1, step: 0.01 },
      { setting: 'decay', label: 'Decay', min: 0.01, max: 0.5, step: 0.01 },
    ],
    hihat: [
      { setting: 'frequency', label: 'Frequency', min: 200, max: 1000, step: 10 },
      { setting: 'decay', label: 'Decay', min: 0.01, max: 0.3, step: 0.01 },
    ],
    crash: [
      { setting: 'frequency', label: 'Frequency', min: 200, max: 1000, step: 10 },
      { setting: 'decay', label: 'Decay', min: 0.1, max: 2, step: 0.1 },
    ],
    ride: [
      { setting: 'frequency', label: 'Frequency', min: 200, max: 1000, step: 10 },
      { setting: 'decay', label: 'Decay', min: 0.1, max: 2, step: 0.1 },
    ],
    openHihat: [
      { setting: 'frequency', label: 'Frequency', min: 200, max: 1000, step: 10 },
      { setting: 'decay', label: 'Decay', min: 0.1, max: 1, step: 0.01 },
    ],
  };

  return (
    <div className="drum-settings-panel">
      <h4>{selectedDrum.charAt(0).toUpperCase() + selectedDrum.slice(1)} Settings</h4>
      {commonControls.map(control => renderControl(control.setting, control.label, control.min, control.max, control.step))}
      {synthSpecificControls[selectedDrum].map(control => renderControl(control.setting, control.label, control.min, control.max, control.step))}
    </div>
  );
};

export default DrumSettingsPanel;