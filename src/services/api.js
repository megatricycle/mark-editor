import apisauce from 'apisauce';

const create = (baseURL = 'http://192.168.1.13:8000') => {
    const api = apisauce.create({
        baseURL,
        withCredentials: true,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
        },
        timeout: 10000
    });

    return {
        whoami: () => api.get('/session/whoami'),
        login: (username, password) =>
            api.post('/session/login', {
                username,
                password,
                userType: 'provider'
            }),
        logout: () => api.post('/session/logout'),
        getProducts: userId => api.get(`/users/${userId}/products`),
        getProduct: productId => api.get(`/products/${productId}`),
        getManuals: productId => api.get(`/products/${productId}/manuals`),
        getManual: (productId, manualId) => api.get(`/products/${productId}/manuals/${manualId}`),
        signup: (username, password) =>
            api.post(`/users/signup`, {
                username,
                password,
                userType: 'provider'
            }),
        addProduct: (userId, name, descriptionSummary, descriptionDetail, image) => {
            const data = new FormData();

            data.append('name', name);
            data.append('descriptionSummary', descriptionSummary);
            data.append('descriptionDetail', descriptionDetail);
            data.append('image', image);

            return api.post(`/users/${userId}/products`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
        addManual: (productId, name, description) =>
            api.post(`/products/${productId}/manuals`, {
                name,
                summary: description
            }),
        saveManual: (productId, manualId, manual) =>
            api.put(`/products/${productId}/manuals/${manualId}`, manual),
        get: (url) =>
            fetch(url)
    };
};

export default {
    create
};
