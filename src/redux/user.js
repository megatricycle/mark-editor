import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    requestWhoAmI: null,
    requestLogin: ['username', 'password'],
    requestSignup: ['username', 'password'],
    login: ['username', 'userId'],
    requestLogout: null,
    clearUser: null
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isLoggedIn: false,
    user: {}
});

/* ------------- Reducers ------------- */

export const login = (state, { username, userId }) =>
    state.merge({
        isLoggedIn: true,
        user: {
            userId,
            username
        }
    });

export const clearUser = state =>
    state.merge({
        isLoggedIn: false,
        user: {}
    });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN]: login,
    [Types.CLEAR_USER]: clearUser
});
