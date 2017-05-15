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
    setManuals: ['productId', 'manuals']
});

export const ProductTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    products: [],
    selectedProduct: null
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_PRODUCTS]: setProducts,
    [Types.SELECT_PRODUCT]: selectProduct,
    [Types.SET_PRODUCT]: setProduct,
    [Types.SET_MANUALS]: setManuals
});
