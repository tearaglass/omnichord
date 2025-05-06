const shimmer = new Tone.PingPongDelay("8n", 0.5)
  .connect(new Tone.PitchShift({ pitch: 7 }))
  .connect(new Tone.Reverb(6))
  .toDestination();