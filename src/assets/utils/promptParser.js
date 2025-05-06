export const parsePrompt = (text) => {
    const input = text.toLowerCase();
  
    const ritual = {
      rootNote: 'C3',
      effects: [],
      mode: 'DriftMode',
      drone: false
    };
  
    // Root note override
    const noteMatch = input.match(/[a-g]#?[0-9]/i);
    if (noteMatch) ritual.rootNote = noteMatch[0].toUpperCase();
  
    // Mode detection
    if (input.includes('fracture')) ritual.mode = 'FractureMode';
    else if (input.includes('spark')) ritual.mode = 'SparkMode';
    else if (input.includes('drift')) ritual.mode = 'DriftMode';
  
    // FX triggers
    if (input.includes('shimmer')) ritual.effects.push('shimmer');
    if (input.includes('bitcrush')) ritual.effects.push('bitcrush');
    if (input.includes('portal')) ritual.effects.push('portalDelay');
  
    // Drone toggle
    if (input.includes('drone')) ritual.drone = true;
  
    return ritual;
  };