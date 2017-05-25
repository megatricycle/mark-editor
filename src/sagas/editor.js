import { call, put } from 'redux-saga/effects';
import EditorActions from '../redux/editor';
import { store } from '../';

export function getImagesBase64(api, { imageURLs }) {
    imageURLs = imageURLs.asMutable();

    const requests = imageURLs.map(imageURL =>
        api.get(imageURL).then(res => res.blob())
    );

    Promise.all(requests)
        .then(blobs => {
            return Promise.all(blobs.map(blob => convertToBase64(blob)));
        })
        .then(base64Images => {
            store.dispatch(EditorActions.setImageTargets(base64Images));
        });
}

export function* saveManual(api, { productId, manualId, manual }) {
    const response = yield call(api.saveManual, productId, manualId, manual);

    if (response.ok) {
        yield put(EditorActions.doneSaveManual());
    } else {
        // @TODO: error handling
    }
}

function convertToBase64(blob) {
    return new Promise(resolve => {
        const reader = new FileReader();

        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const img = new Image();

            img.src = reader.result;

            img.onload = () => {
                const dimensions = {
                    width: img.naturalWidth,
                    height: img.naturalHeight
                };

                resolve({
                    blob: reader.result,
                    dimensions
                });
            };
        };
    });
}
