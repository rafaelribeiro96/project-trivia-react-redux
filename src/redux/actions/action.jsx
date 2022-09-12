export const LOGIN = 'LOGIN';
export const SCORE = 'SCORE';
export const ASSERT = 'ASSERT';
export const SAVELOCALE = 'SAVELOCALE';
export const NEWGAME = 'NEWGAME';

/* export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
} */

export const login = (payload) => ({ type: LOGIN, payload });
export const scoreValue = (payload) => ({ type: SCORE, payload });
export const assertionValue = (payload) => ({ type: ASSERT, payload });
export const saveLocale = (payload) => ({ type: SAVELOCALE, payload });
export const newGame = () => ({ type: NEWGAME });
