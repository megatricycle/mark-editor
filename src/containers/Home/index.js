import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {
    Container,
    Header,
    Button,
    List,
    Image as SemanticImage,
    Form,
    Grid,
    Modal
} from 'semantic-ui-react';

import ProductActions from '../../redux/product';
import './style.css';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            image: null
        };
    }

    openFileUploader = () => {
        const { uploader } = this.refs;

        uploader.click();
    };

    handleChangeImagePreview = e => {
        const image = e.target.files[0];

        if (image) {
            const reader = new FileReader();

            reader.onload = e => {
                const { result } = e.target;
                const img = new Image();

                img.src = result;
                img.onload = () => {
                    this.setState({
                        image: result
                    });
                };
            };

            reader.readAsDataURL(image);
        }
    };

    submitAddProductForm = () => {
        const addProductForm = document.getElementById('add-product-form');

        addProductForm.dispatchEvent(new Event('submit'));
    };

    handleAddProduct = e => {
        e.preventDefault();

        // const name = e.target.name.value;
        // const descriptionSummary = e.target.descriptionSummary.value;
        // const descriptionDetail = e.target.descriptionDetail.value;

        // @TODO: api call here
    };

    componentDidMount() {
        const { userId } = this.props.user.user;
        const { requestProducts } = this.props;
        const { uploader } = this.refs;
        const { handleChangeImagePreview } = this;

        requestProducts(userId);

        uploader.onchange = handleChangeImagePreview;
    }

    render() {
        const { push } = this.props.history;
        const { products } = this.props.product;
        const { user } = this.props.user;
        const { image } = this.state;
        const {
            openFileUploader,
            handleAddProduct,
            submitAddProductForm
        } = this;

        const addProductModal = (
            <Modal
                trigger={
                    <Button primary content="Add" icon="plus" size="tiny" />
                }
            >
                <Modal.Header>Add a Product</Modal.Header>
                <Modal.Content>
                    <Form id="add-product-form" onSubmit={handleAddProduct}>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Form.Input
                                    label="Name"
                                    placeholder="Product name"
                                    name="name"
                                />
                            </Grid.Column>
                            <Grid.Column className="image-uploader-container">
                                <a href="#" onClick={openFileUploader}>
                                    {image
                                        ? <div
                                              className="image-uploader-preview"
                                              style={{
                                                  backgroundImage: `url("${image}")`
                                              }}
                                          />
                                        : <div className="image-uploader">
                                              <FontAwesome
                                                  name="plus-square-o"
                                                  size="3x"
                                              />
                                              <span className="label">
                                                  Add Image
                                              </span>
                                          </div>}
                                </a>
                            </Grid.Column>
                        </Grid>
                        <Form.TextArea
                            label="Summary"
                            placeholder="Enter a short description of your product here"
                            name="descriptionSummary"
                        />
                        <Form.TextArea
                            label="Detail"
                            placeholder="Enter the details of your product here"
                            name="descriptionDetail"
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Create"
                        icon="plus"
                        primary
                        onClick={submitAddProductForm}
                    />
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
                    <input
                        type="file"
                        ref="uploader"
                        style={{ display: 'none' }}
                        accept="image/*"
                    />

                    <List selection verticalAlign="middle" divided size="big">
                        {products.map(product => (
                            <List.Item
                                key={product.id}
                                onClick={() => {
                                    push(`/home/products/${product.id}`);
                                }}
                            >
                                <SemanticImage avatar src={product.image} />
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
