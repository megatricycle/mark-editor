import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import UserActions from '../../redux/user';
import Home from '../Home';
import Product from '../Product';
import './style.css';

class HomeWrapper extends Component {
    checkUser = isLoggedIn => {
        const { push } = this.props.history;

        if (!isLoggedIn) {
            push('/');
        }
    };

    componentWillMount() {
        const { isLoggedIn } = this.props.user;
        const { checkUser } = this;

        checkUser(isLoggedIn);
    }

    componentWillReceiveProps(newProps) {
        const { isLoggedIn } = newProps.user;
        const { checkUser } = this;

        checkUser(isLoggedIn);
    }

    render() {
        const { push } = this.props.history;
        const basePath = this.props.match.path;
        const { logout } = this.props;

        return (
            <div className="HomeWrapper">
                <Menu inverted className="navbar">
                    <Menu.Item
                        onClick={() => {
                            push('/home');
                        }}
                    >
                        MARK
                    </Menu.Item>
                    <Menu.Item position="right" onClick={logout}>
                        Log out
                    </Menu.Item>
                </Menu>
                <div className="home-content">
                    <Route exact path={`${basePath}`} component={Home} />
                    <Route
                        exact
                        path={`${basePath}/products/:productId`}
                        component={Product}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(UserActions.requestLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
