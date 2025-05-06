import * as Tone from 'tone';

const sampler = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    D4: "Ds4.mp3",
    F4: "Fs4.mp3",
    A4: "A4.mp3"
  },
  release: 1,
  baseUrl: "/samples/"
}).toDestination();

export const playSample = (note = 'C4') => {
  sampler.triggerAttack(note);
};