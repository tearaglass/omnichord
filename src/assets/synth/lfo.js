import * as Tone from 'tone';
import { applyPortalDelay } from '../effects/portalDelay';
import { applyBitcrush } from '../effects/bitcrush';
import { shimmer } from '../effects/shimmer';
import { initLFO } from './lfo';

const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: 'triangle' },
  envelope: {
    attack: 0.05,
    decay: 0.2,
    sustain: 0.3,
    release: 1.2
  }
});

const filter = new Tone.Filter(800, 'lowpass');
synth.connect(filter);
filter.connect(Tone.Destination);

// LFO modulates filter frequency
initLFO(filter.frequency);

const effectMap = {
  shimmer,
  portalDelay: () => applyPortalDelay(synth),
  bitcrush: () => applyBitcrush(synth)
};

export const playNote = (note, duration = '8n') => {
  synth.triggerAttackRelease(note, duration);
};

export const applyEffect = (effectName) => {
  if (effectMap[effectName]) {
    effectMap[effectName]();
  }
};