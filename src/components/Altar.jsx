import React, { useState } from 'react';
import GlyphPad from './GlyphPad';
import RitualSelector from './ModalRitual';
import SigilButton from './SigilButton';
import DriftMode from '../assets/modes/driftmode';
import FractureMode from '../assets/modes/FractureMode';
import { playNote, applyEffect } from '../synth/engine';
import { startDrone, stopDrone } from '../synth/drone';
import { castRitual } from '../state/spellbook';

const Altar = () => {
  const [ritualOpen, setRitualOpen] = useState(false);
  const [mode, setMode] = useState('DriftMode');
  const [drone, setDrone] = useState(false);
  const [fx, setFx] = useState({
    shimmer: false,
    portalDelay: false,
    bitcrush: false
  });

  const toggleFX = (name) => {
    applyEffect(name);
    setFx(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleDrone = () => {
    if (!drone) startDrone();
    else stopDrone();
    setDrone(!drone);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6 space-y-6">
      <h1 className="text-4xl tracking-wider text-fuchsia-400 mb-2">🜃 OMNICHORD</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h2 className="text-pink-300 mb-2">🌀 GlyphPad</h2>
          <GlyphPad />
        </div>

        <div className="space-y-3">
          <div>
            <h2 className="text-pink-300">🎚 FX Chain</h2>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(fx).map(fxName => (
                <SigilButton key={fxName} onClick={() => toggleFX(fxName)}>
                  {fx[fxName] ? `✅ ${fxName}` : `⚪ ${fxName}`}
                </SigilButton>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-pink-300">🎛 Mode</h2>
            {mode === 'DriftMode' && <DriftMode />}
            {mode === 'FractureMode' && <FractureMode />}
            <SigilButton onClick={() => setMode(mode === 'DriftMode' ? 'FractureMode' : 'DriftMode')}>
              Switch Mode
            </SigilButton>
          </div>

          <div>
            <h2 className="text-pink-300">🕯 Drone</h2>
            <SigilButton onClick={toggleDrone}>
              {drone ? '⏹ Stop Drone' : '▶ Start Drone'}
            </SigilButton>
          </div>

          <div>
            <h2 className="text-pink-300">🔮 Rituals</h2>
            <SigilButton onClick={() => castRitual('dawn')}>☀️ Cast Dawn</SigilButton>
            <SigilButton onClick={() => castRitual('dusk')}>🌙 Cast Dusk</SigilButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Altar;