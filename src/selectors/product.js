import { createSelector } from 'reselect';

export const getSelectedProduct = (products, productId) =>
    createSelector([products => products], products => {
        return products.filter(product => product.id === productId)[0];
    })(products);

export const getManual = (products, productId, manualId) =>
    createSelector([products => products], products => {
        const productArray = products.filter(
            product => product.id === productId
        );

        if (productArray.length === 0) {
            return null;
        }

        const manualArray = productArray[0].manuals.filter(
            manual => manual.id === manualId
        );

        if (manualArray.length === 0) {
            return null;
        }

        return manualArray[0];
    })(products);

export const getImageTargets = (products, productId) =>
    createSelector([products => products], products => {
        const productArray = products.filter(
            product => product.id === productId
        );

        if (productArray.length === 0) {
            return null;
        }

        return productArray[0].imageTargets;
    })(products);
