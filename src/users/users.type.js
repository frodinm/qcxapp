import { createAction } from 'util';

export const USER_AUTH = createAction('USER_AUTH');
export const USER_SIGNOUT = createAction('USER_SIGNOUT');
export const USER_SETPIN = createAction('USER_SETPIN');
export const USER_SET_TEMP_PIN = createAction('USER_SET_TEMP_PIN');
export const USER_SET_FIRST_TIME = createAction('USER_SET_FIRST_TIME');