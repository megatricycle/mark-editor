import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    requestProducts: ['userId'],
    setProducts: ['products'],
    selectProduct: ['productId'],
    requestProduct: ['productId'],
    setProduct: ['product'],
    requestManuals: ['productId'],
    requestManual: ['productId', 'manualId'],
    setManuals: ['productId', 'manuals'],
    requestAddProduct: [
        'userId',
        'name',
        'descriptionSummary',
        'descriptionDetail',
        'image'
    ],
    doneAddProduct: null,
    requestAddManual: ['productId', 'name', 'description'],
    doneAddManual: null,
    setManual: ['productId', 'manual'],
    requestProductAndManual: ['productId', 'manualId']
});

export const ProductTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    products: [],
    selectedProduct: null,
    isCreatingProduct: false,
    isCreatingManual: false
});

/* ------------- Reducers ------------- */

export const setProducts = (state, { products }) =>
    state.merge({
        products: products.map(product => ({ ...product, manuals: [] }))
    });

export const selectProduct = (state, { productId }) =>
    state.merge({
        selectedProduct: parseInt(productId, 10)
    });

export const setProduct = (state, { product }) =>
    state.merge({
        products: _.find(state.products, ['id', product.id])
            ? state.products.map(currentProduct => {
                  if (currentProduct.id === product.id) {
                      return product;
                  }

                  return currentProduct;
              })
            : [...state.products, product]
    });

export const setManuals = (state, { productId, manuals }) =>
    state.merge({
        products: state.products.map(product => {
            if (product.id === parseInt(productId, 10)) {
                return {
                    ...product,
                    manuals
                };
            }

            return product;
        })
    });

export const requestAddProduct = state =>
    state.merge({ isCreatingProduct: true });

export const doneAddProduct = state =>
    state.merge({ isCreatingProduct: false });

export const requestAddManual = state =>
    state.merge({ isCreatingManual: true });

export const doneAddManual = state => state.merge({ isCreatingManual: false });

export const setManual = (state, { productId, manual }) => {
    const product = _.find(state.products, ['id', parseInt(productId, 10)]);

    if (product) {
        const updatedProducts = state.products.map(currentProduct => {
            if (currentProduct.id === productId) {
                const currentManual = _.find(currentProduct.manuals, [
                    'id',
                    manual.id
                ]);

                return {
                    ...currentProduct,
                    manuals: currentManual
                        ? currentProduct.manuals.map(
                              currentManualIterate =>
                                  (currentManualIterate.id === manual.id
                                      ? manual
                                      : currentManualIterate)
                          )
                        : [...currentProduct.manuals, manual]
                };
            }

            return currentProduct;
        });

        return state.merge({ products: updatedProducts });
    }

    return state.merge(state);
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_PRODUCTS]: setProducts,
    [Types.SELECT_PRODUCT]: selectProduct,
    [Types.SET_PRODUCT]: setProduct,
    [Types.SET_MANUALS]: setManuals,
    [Types.REQUEST_ADD_PRODUCT]: requestAddProduct,
    [Types.DONE_ADD_PRODUCT]: doneAddProduct,
    [Types.REQUEST_ADD_MANUAL]: requestAddManual,
    [Types.DONE_ADD_MANUAL]: doneAddManual,
    [Types.SET_MANUAL]: setManual
});
