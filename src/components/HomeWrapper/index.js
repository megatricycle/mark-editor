import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Route } from 'react-router';

import Home from '../../containers/Home';
import Product from '../../containers/Product';
import './style.css';

class HomeWrapper extends Component {
    render() {
        const { push } = this.props.history;
        const basePath = this.props.match.path;

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
                    <Menu.Item
                        position="right"
                        onClick={() => {
                            alert('logout');
                        }}
                    >
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

export default HomeWrapper;
