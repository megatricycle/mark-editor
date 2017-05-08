import { createStore, combineReducers } from 'redux';

const configureStore = rootReducer => {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );
};

export default () => {
    const reducers = combineReducers({
        editor: require('./editor').reducer
    });

    return configureStore(reducers);
};
