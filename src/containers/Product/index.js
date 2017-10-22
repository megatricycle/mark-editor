import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Grid,
    Header,
    List,
    Button,
    Modal,
    Form
} from 'semantic-ui-react';

import { getSelectedProduct } from '../../selectors/product';
import ProductActions from '../../redux/product';
import './style.css';

class Product extends Component {
    constructor() {
        super();

        this.state = {
            addManualModalOpen: false
        };
    }

    handleOpenAddManualModal = () => {
        this.setState({ addManualModalOpen: true });
    };

    handleCloseAddManualModal = () => {
        this.setState({ addManualModalOpen: false });
    };

    submitAddManualForm = () => {
        const addManualForm = document.getElementById('add-manual-form');

        addManualForm.dispatchEvent(new Event('submit'));
    };

    handleAddManual = e => {
        const { requestAddManual } = this.props;
        const { id: productId } = this.props.selectedProduct;

        e.preventDefault();

        const name = e.target.name.value;
        const description = e.target.description.value;

        requestAddManual(productId, name, description);
    };

    componentWillReceiveProps(newProps) {
        const { handleCloseAddManualModal } = this;
        const prevCreatingManual = this.props.product.isCreatingManual;
        const newCreatingManual = newProps.product.isCreatingManual;

        // @TODO: check for error
        if (prevCreatingManual && !newCreatingManual) {
            handleCloseAddManualModal();
            document.getElementById('add-manual-form').reset();
        }
    }

    componentWillMount() {
        const { productId } = this.props.match.params;
        const { selectProduct, requestProduct } = this.props;

        requestProduct(productId);
        selectProduct(productId);
    }

    render() {
        const { push } = this.props.history;
        const { selectedProduct: product } = this.props;
        const { addManualModalOpen } = this.state;
        const {
            handleOpenAddManualModal,
            handleCloseAddManualModal,
            submitAddManualForm,
            handleAddManual
        } = this;

        if (!product) {
            return <div />;
        }

        const addManualModal = (
            <Modal
                trigger={
                    <Button
                        primary
                        content="Add"
                        icon="plus"
                        size="tiny"
                        onClick={handleOpenAddManualModal}
                    />
                }
                open={addManualModalOpen}
                onClose={handleCloseAddManualModal}
            >
                <Modal.Header>Add a Manual</Modal.Header>
                <Modal.Content>
                    <Form id="add-manual-form" onSubmit={handleAddManual}>
                        <Form.Input
                            label="Title"
                            placeholder="Manual Title"
                            name="name"
                        />
                        <Form.TextArea
                            label="Description"
                            placeholder="Manual Description"
                            name="description"
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={submitAddManualForm}>
                        Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        );

        return (
            <div className="Product">
                <Container text>
                    <Grid columns="equal">
                        <Grid.Column width={4}>
                            <div
                                className="product-img"
                                style={{
                                    backgroundImage: `url(${product.image})`
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Header>
                                {product.name}
                            </Header>
                            <p>
                                <strong>{product.subscribersCount}</strong>
                                {' '}
                                subscriber
                                {product.subscribersCount === 1 ? '' : 's'}
                            </p>
                            <p>{product.descriptionSummary}</p>
                            <p className="product-description">
                                {product.descriptionDetail}
                            </p>
                        </Grid.Column>
                    </Grid>
                    <Header>
                        Manuals
                    </Header>
                    {addManualModal}
                    <List selection verticalAlign="middle" size="big">
                        {product.manuals &&
                            product.manuals.map(manual => (
                                <List.Item
                                    key={manual.id}
                                    onClick={() => {
                                        push(
                                            `/products/${product.id}/manuals/${manual.id}/edit`
                                        );
                                    }}
                                >
                                    <List.Icon name="circle thin" />
                                    <List.Content>
                                        <List.Header>
                                            {manual.name}
                                        </List.Header>
                                    </List.Content>
                                </List.Item>
                            ))}
                    </List>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { productId } = props.match.params;

    return {
        selectedProduct: getSelectedProduct(
            state.product.products,
            parseInt(productId, 10)
        ),
        product: state.product
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestProduct: productId =>
            dispatch(ProductActions.requestProduct(productId)),
        selectProduct: productId =>
            dispatch(ProductActions.selectProduct(productId)),
        requestAddManual: (productId, name, description) =>
            dispatch(
                ProductActions.requestAddManual(productId, name, description)
            )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
