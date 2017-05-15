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
    componentWillMount() {
        const { productId } = this.props.match.params;
        const { selectProduct, requestProduct } = this.props;

        requestProduct(productId);
        selectProduct(productId);
    }

    render() {
        const { push } = this.props.history;
        const { selectedProduct: product } = this.props;

        if (!product) {
            return <div />;
        }

        const addManualModal = (
            <Modal
                trigger={
                    <Button primary content="Add" icon="plus" size="tiny" />
                }
            >
                <Modal.Header>Add a Manual</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input label="Title" placeholder="Manual Title" />
                        <Form.TextArea
                            label="Description"
                            placeholder="Manual Description"
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary>Submit</Button>
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
                                    backgroundImage: `url(http://placehold.it/150x150)`
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

const mapStateToProps = state => {
    return {
        selectedProduct: getSelectedProduct(state.product)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestProduct: productId =>
            dispatch(ProductActions.requestProduct(productId)),
        selectProduct: productId =>
            dispatch(ProductActions.selectProduct(productId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
