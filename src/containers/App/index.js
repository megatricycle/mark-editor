import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import createStore, { history } from '../../redux';
import Editor from '../Editor';
import Login from '../Login';
import HomeWrapper from '../../components/HomeWrapper';
import './style.css';

const store = createStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Route exact path="/" component={Login} />
                        <Route path="/home" component={HomeWrapper} />
                        <Route
                            path="/products/:productId/manuals/:manualId/edit"
                            component={Editor}
                        />
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
