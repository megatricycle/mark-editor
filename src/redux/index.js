import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

export const history = createHistory();

const middleware = routerMiddleware(history);

const configureStore = rootReducer => {
    return createStore(
        rootReducer,
        compose(
            applyMiddleware(middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
};

export default () => {
    const reducers = combineReducers({
        editor: require('./editor').reducer,
        router: routerReducer
    });

    return configureStore(reducers);
};
