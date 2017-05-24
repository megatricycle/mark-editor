import { createSelector } from 'reselect';

export const getSelectedProduct = createSelector(
    [products => products.products, products => products.selectedProduct],
    (products, selectedProduct) => {
        if (!selectedProduct) {
            return null;
        }

        return products.filter(product => product.id === selectedProduct)[0];
    }
);

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
