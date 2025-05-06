export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  export const randomNote = () => {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const octaves = [2, 3, 4, 5];
    const n = notes[Math.floor(Math.random() * notes.length)];
    const o = octaves[Math.floor(Math.random() * octaves.length)];
    return `${n}${o}`;
  };
  
  export const randomChord = () => {
    const roots = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const qualities = ['maj', 'min', 'dim', 'sus4'];
    return `${roots[Math.floor(Math.random() * roots.length)]}${qualities[Math.floor(Math.random() * qualities.length)]}`;
  };
  
  export const randomMode = () => {
    const modes = ['DriftMode', 'FractureMode', 'SparkMode'];
    return modes[Math.floor(Math.random() * modes.length)];
  };