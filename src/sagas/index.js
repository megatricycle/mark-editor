import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';

import { UserTypes } from '../redux/user';

import { whoami, login, logout } from './user';

const api = API.create();

export default function* root() {
    yield all([
        takeLatest(UserTypes.REQUEST_WHO_AM_I, whoami, api),
        takeLatest(UserTypes.REQUEST_LOGIN, login, api),
        takeLatest(UserTypes.REQUEST_LOGOUT, logout, api)
    ]);
}
