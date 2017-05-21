import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Menu, Grid, Segment, Button, Header } from 'semantic-ui-react';

import UserActions from '../../redux/user';
import './style.css';

class Login extends Component {
    handleLoginSubmit = e => {
        const { requestLogin } = this.props;

        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        requestLogin(username, password);
    };

    handleSignupSubmit = e => {
        const { requestSignup } = this.props;

        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        requestSignup(username, password);
    };

    checkUser = isLoggedIn => {
        const { push } = this.props.history;

        if (isLoggedIn) {
            push('/home');
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
        const { handleLoginSubmit, handleSignupSubmit } = this;

        return (
            <div className="Login">
                <Menu inverted>
                    <Menu.Item position="right">
                        <Form size="mini" onSubmit={handleLoginSubmit}>
                            <Form.Group widths="equal">
                                <Form.Field
                                    control="input"
                                    placeholder="Username"
                                    name="username"
                                />
                                <Form.Field
                                    control="input"
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                />
                                <Form.Button content="Log in" size="mini" />
                            </Form.Group>
                        </Form>
                    </Menu.Item>
                </Menu>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8} className="login-description">
                            <p className="login-title">
                                Some catchy line here.
                            </p>
                            <p className="login-subtitle">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet ut aliquam perferendis porro ullam laudantium ex doloremque sunt accusamus, veritatis.
                            </p>
                        </Grid.Column>
                        <Grid.Column width={8} className="sign-up-container">
                            <Segment raised>
                                <Form onSubmit={handleSignupSubmit}>
                                    <Header>Create a provider account</Header>
                                    <Form.Input
                                        label="Username"
                                        name="username"
                                    />
                                    <Form.Input
                                        label="Password"
                                        type="password"
                                        name="password"
                                    />
                                    <Button type="submit" primary fluid>
                                        Sign up
                                    </Button>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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
        requestLogin: (username, password) =>
            dispatch(UserActions.requestLogin(username, password)),
        requestSignup: (username, password) =>
            dispatch(UserActions.requestSignup(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
