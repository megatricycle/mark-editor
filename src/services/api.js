import apisauce from 'apisauce';

const create = (baseURL = 'http://192.168.1.5:8000') => {
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
        signup: (username, password) =>
            api.post(`/users/signup`, {
                username,
                password,
                userType: 'provider'
            })
    };
};

export default {
    create
};
