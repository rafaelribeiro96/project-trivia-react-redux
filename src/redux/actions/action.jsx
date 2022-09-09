export const LOGIN = 'LOGIN';

/* export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
} */

export const login = (payload) => ({ type: LOGIN, payload });
