// action types
export const SET_RITUAL = 'ritual/set';
export const SET_MODE = 'mode/set';
export const TOGGLE_DRONE = 'drone/toggle';
export const TOGGLE_EFFECT = 'fx/toggle';
export const LOG_EVENT = 'log/event';

// action creators
export const setRitual = (ritual) => ({
  type: SET_RITUAL,
  payload: ritual
});

export const setMode = (modeName) => ({
  type: SET_MODE,
  payload: modeName
});

export const toggleDrone = () => ({
  type: TOGGLE_DRONE
});

export const toggleEffect = (effectName) => ({
  type: TOGGLE_EFFECT,
  payload: effectName
});

export const logEvent = (msg) => ({
  type: LOG_EVENT,
  payload: {
    message: msg,
    timestamp: Date.now()
  }
});