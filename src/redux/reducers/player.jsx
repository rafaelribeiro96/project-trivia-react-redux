import { ASSERT, LOGIN, NEWGAME, SAVELOCALE, SCORE } from '../actions/action';

const INICIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  locale: [],
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
  case SAVELOCALE:
    return {
      ...state,
      locale: [...state.locale, action.payload],
    };
  case NEWGAME:
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
