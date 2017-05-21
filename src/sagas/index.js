import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';

import { UserTypes } from '../redux/user';
import { ProductTypes } from '../redux/product';

import { whoami, login, logout, signup } from './user';
import { getProducts, getProduct, getManuals, addProduct } from './product';

const api = API.create();

export default function* root() {
    yield all([
        takeLatest(UserTypes.REQUEST_WHO_AM_I, whoami, api),
        takeLatest(UserTypes.REQUEST_LOGIN, login, api),
        takeLatest(UserTypes.REQUEST_LOGOUT, logout, api),
        takeLatest(ProductTypes.REQUEST_PRODUCTS, getProducts, api),
        takeLatest(ProductTypes.REQUEST_PRODUCT, getProduct, api),
        takeLatest(ProductTypes.REQUEST_MANUALS, getManuals, api),
        takeLatest(UserTypes.REQUEST_SIGNUP, signup, api),
        takeLatest(ProductTypes.REQUEST_ADD_PRODUCT, addProduct, api)
    ]);
}
