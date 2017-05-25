import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';

import { UserTypes } from '../redux/user';
import { ProductTypes } from '../redux/product';
import { EditorTypes } from '../redux/editor';

import { whoami, login, logout, signup } from './user';
import {
    getProducts,
    getProduct,
    getManuals,
    getManual,
    addProduct,
    addManual,
    getProductAndManual
} from './product';
import { getImagesBase64, saveManual } from './editor';

const api = API.create();

export default function* root() {
    yield all([
        takeLatest(UserTypes.REQUEST_WHO_AM_I, whoami, api),
        takeLatest(UserTypes.REQUEST_LOGIN, login, api),
        takeLatest(UserTypes.REQUEST_LOGOUT, logout, api),
        takeLatest(ProductTypes.REQUEST_PRODUCTS, getProducts, api),
        takeLatest(ProductTypes.REQUEST_PRODUCT, getProduct, api),
        takeLatest(ProductTypes.REQUEST_MANUALS, getManuals, api),
        takeLatest(ProductTypes.REQUEST_MANUAL, getManual, api),
        takeLatest(UserTypes.REQUEST_SIGNUP, signup, api),
        takeLatest(ProductTypes.REQUEST_ADD_PRODUCT, addProduct, api),
        takeLatest(ProductTypes.REQUEST_ADD_MANUAL, addManual, api),
        takeLatest(
            ProductTypes.REQUEST_PRODUCT_AND_MANUAL,
            getProductAndManual,
            api
        ),
        takeLatest(
            EditorTypes.REQUEST_FETCH_IMAGES_BASE64,
            getImagesBase64,
            api
        ),
        takeLatest(EditorTypes.REQUEST_SAVE_MANUAL, saveManual, api)
    ]);
}
