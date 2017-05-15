import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';

export const history = createHistory();

const middleware = routerMiddleware(history);

const configureStore = (rootReducer, rootSaga) => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(middleware),
            applyMiddleware(sagaMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
};

export default () => {
    const reducers = combineReducers({
        app: require('./app').reducer,
        editor: require('./editor').reducer,
        user: require('./user').reducer,
        router: routerReducer
    });

    return configureStore(reducers, rootSaga);
};
