import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from '../../redux';
import Editor from '../Editor';
import './style.css';

const store = createStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Editor />
                </div>
            </Provider>
        );
    }
}

export default App;
