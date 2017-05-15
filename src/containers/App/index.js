import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import { history } from '../../redux';
import UserActions from '../../redux/user';
import Editor from '../Editor';
import Login from '../Login';
import HomeWrapper from '../HomeWrapper';
import './style.css';

class App extends Component {
    componentDidMount() {
        const { requestWhoAmI } = this.props;

        requestWhoAmI();
    }

    render() {
        const { isStarted } = this.props.app;

        return isStarted
            ? <ConnectedRouter history={history}>
                  <div>
                      <Route exact path="/" component={Login} />
                      <Route path="/home" component={HomeWrapper} />
                      <Route
                          path="/products/:productId/manuals/:manualId/edit"
                          component={Editor}
                      />
                  </div>
              </ConnectedRouter>
            : <div />;
    }
}

const mapStateToProps = state => {
    return {
        app: state.app
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestWhoAmI: () => dispatch(UserActions.requestWhoAmI())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
