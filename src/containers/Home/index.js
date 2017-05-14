import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import {
    Container,
    Header,
    Button,
    List,
    Image,
    Form,
    Grid,
    Divider,
    Modal
} from 'semantic-ui-react';

import './style.css';

class Home extends Component {
    render() {
        const { push } = this.props.history;

        const addProductModal = (
            <Modal
                trigger={
                    <Button primary content="Add" icon="plus" size="tiny" />
                }
            >
                <Modal.Header>Add a Product</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Form.Input
                                    label="Name"
                                    placeholder="Product name"
                                />
                            </Grid.Column>
                            <Grid.Column className="image-uploader-container">
                                <a href="#" className="image-uploader">
                                    <FontAwesome
                                        name="plus-square-o"
                                        size="3x"
                                    />
                                    <span className="label">
                                        Add Image
                                    </span>
                                </a>
                                <input
                                    type="file"
                                    ref="uploader"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />
                            </Grid.Column>
                        </Grid>
                        <Form.TextArea
                            label="Summary"
                            placeholder="Enter a short description of your product here"
                        />
                        <Form.TextArea
                            label="Detail"
                            placeholder="Enter the details of your product here"
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="Create" icon="plus" primary />
                </Modal.Actions>
            </Modal>
        );

        return (
            <div className="Home">
                <Container text>
                    <Header>Hi, tricycle! Here are your products.</Header>

                    {addProductModal}

                    <Divider />

                    <List selection verticalAlign="middle" divided size="big">
                        <List.Item
                            onClick={() => {
                                push('/home/products/2');
                            }}
                        >
                            <Image avatar src="http://placehold.it/150x150" />
                            <List.Content>
                                <List.Header>Hi</List.Header>
                                <p className="home-subscribers">
                                    <strong>2003</strong> subscribers
                                </p>
                                <p>I'm a subttitle</p>
                            </List.Content>
                        </List.Item>
                    </List>
                </Container>
            </div>
        );
    }
}

export default Home;
