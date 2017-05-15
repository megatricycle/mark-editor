import { call, put } from 'redux-saga/effects';
import AppActions from '../redux/app';
import UserActions from '../redux/user';

export function* whoami(api) {
    const response = yield call(api.whoami);

    if (response.ok) {
        const user = response.data;

        if (user.id) {
            yield put(UserActions.login(user.username, user.id));
        } else {
            yield put(UserActions.clearUser());
        }

        yield put(AppActions.startApp());
    }
}

export function* login(api, { username, password }) {
    const response = yield call(api.login, username, password);

    if (response.ok) {
        const { username, id } = response.data;

        yield put(UserActions.login(username, id));
    } else {
        const { error } = response.data;

        if (error.status === 401) {
            // @TODO: handle login error
        }
    }
}

export function* logout(api) {
    const response = yield call(api.logout);

    if (response.ok) {
        yield put(UserActions.clearUser());
    } else {
        // const { error } = response.data;
        // @TODO: handle login error
    }
}
