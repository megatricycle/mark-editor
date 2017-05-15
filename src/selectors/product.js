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
