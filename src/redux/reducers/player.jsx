import { ASSERT, LOGIN, SCORE } from '../actions/action';

const INICIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  case SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case ASSERT:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
