import { call, put } from 'redux-saga/effects';
import EditorActions from '../redux/editor';

export function* saveManual(api, { productId, manualId, manual }) {
    const response = yield call(api.saveManual, productId, manualId, manual);

    if (response.ok) {
        yield put(EditorActions.doneSaveManual());
    } else {
        // @TODO: error handling
    }
}
