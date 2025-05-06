import {
    SET_RITUAL,
    SET_MODE,
    TOGGLE_DRONE,
    TOGGLE_EFFECT,
    LOG_EVENT
  } from './actions';
  
  const initialState = {
    ritual: null,
    mode: 'DriftMode',
    droneActive: false,
    effects: {
      shimmer: false,
      portalDelay: false,
      bitcrush: false
    },
    log: []
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_RITUAL:
        return {
          ...state,
          ritual: action.payload,
          mode: action.payload.mode || state.mode,
          droneActive: action.payload.drone || false,
          effects: (action.payload.effects || []).reduce((acc, fx) => {
            acc[fx] = true;
            return acc;
          }, {})
        };
  
      case SET_MODE:
        return {
          ...state,
          mode: action.payload
        };
  
      case TOGGLE_DRONE:
        return {
          ...state,
          droneActive: !state.droneActive
        };
  
      case TOGGLE_EFFECT:
        return {
          ...state,
          effects: {
            ...state.effects,
            [action.payload]: !state.effects[action.payload]
          }
        };
  
      case LOG_EVENT:
        return {
          ...state,
          log: [
            {
              text: action.payload.message,
              time: action.payload.timestamp
            },
            ...state.log
          ].slice(0, 50) // keep only recent 50
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;