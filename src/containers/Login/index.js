import React, { Component } from 'react';
import { Form, Menu, Grid, Segment, Button, Header } from 'semantic-ui-react';

import './style.css';

class Login extends Component {
    render() {
        return (
            <div className="Login">
                <Menu inverted>
                    <Menu.Item position="right">
                        <Form size="mini">
                            <Form.Group widths="equal">
                                <Form.Field
                                    control="input"
                                    placeholder="Username"
                                />
                                <Form.Field
                                    control="input"
                                    placeholder="Password"
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
                                <Form>
                                    <Header>Create an account</Header>
                                    <Form.Input label="Username" />
                                    <Form.Input
                                        label="Password"
                                        type="password"
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

export default Login;
