import { playNote, applyEffect } from '../synth/engine';
import { startDrone, stopDrone } from '../synth/drone';
import { loadRitual } from '../rituals/loadRitual';
import store from './store'; // assumes you have Redux or similar
import { setRitual } from './actions';

export const castRitual = async (name) => {
  const ritual = await loadRitual(`/src/rituals/${name}.json`);
  store.dispatch(setRitual(ritual));

  if (ritual.rootNote) playNote(ritual.rootNote, '1n');
  if (ritual.effects && Array.isArray(ritual.effects)) {
    ritual.effects.forEach(effect => applyEffect(effect));
  }
  if (ritual.drone) startDrone(ritual.rootNote || 'C2');
};

export const stopAll = () => {
  stopDrone();
};

export const cycleMode = () => {
  const modes = ['DriftMode', 'FractureMode', 'SparkMode'];
  const current = store.getState().mode || 'DriftMode';
  const idx = (modes.indexOf(current) + 1) % modes.length;
  store.dispatch({ type: 'mode/set', payload: modes[idx] });
};

export const activateEffect = (fxName) => {
  applyEffect(fxName);
};