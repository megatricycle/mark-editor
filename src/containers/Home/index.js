import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {
    Container,
    Header,
    Button,
    List,
    Image,
    Form,
    Grid,
    Modal
} from 'semantic-ui-react';

import ProductActions from '../../redux/product';
import './style.css';

class Home extends Component {
    componentDidMount() {
        const { userId } = this.props.user.user;
        const { requestProducts } = this.props;

        requestProducts(userId);
    }

    render() {
        const { push } = this.props.history;
        const { products } = this.props.product;
        const { user } = this.props.user;

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
                    <Header>
                        Hi, {user.username}! Here are your products.
                    </Header>

                    {addProductModal}

                    <List selection verticalAlign="middle" divided size="big">
                        {products.map(product => (
                            <List.Item
                                key={product.id}
                                onClick={() => {
                                    push(`/home/products/${product.id}`);
                                }}
                            >
                                <Image
                                    avatar
                                    src="http://placehold.it/150x150"
                                />
                                <List.Content>
                                    <List.Header>{product.name}</List.Header>
                                    <p className="home-subscribers">
                                        <strong>
                                            {product.subscribersCount}
                                        </strong>
                                        {' '}
                                        subscriber
                                        {product.subscribersCount === 1
                                            ? ''
                                            : 's'}
                                    </p>
                                    <p>{product.descriptionSummary}</p>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        product: state.product
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestProducts: userId =>
            dispatch(ProductActions.requestProducts(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
