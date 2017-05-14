import React, { Component } from 'react';
import {
    Container,
    Grid,
    Header,
    List,
    Button,
    Modal,
    Form
} from 'semantic-ui-react';

import './style.css';

class Product extends Component {
    render() {
        const { push } = this.props.history;

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
                                Product Name
                            </Header>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <p className="product-description">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum non eveniet omnis beatae quibusdam rem sed ex sit nesciunt recusandae nostrum eum laudantium atque ab qui, assumenda animi quasi a inventore culpa doloremque. Dolorum aperiam, reiciendis eaque ipsum natus, aut eveniet et quo corrupti ullam delectus culpa. Explicabo in error ratione corrupti soluta hic repudiandae voluptas. Excepturi amet quaerat voluptate error animi blanditiis delectus provident! Dolorum, suscipit! Et reiciendis doloremque sapiente est facilis earum officia consequatur, itaque, nesciunt ducimus maxime nobis quidem. Nemo distinctio, dignissimos officia ipsam deserunt velit voluptatum consectetur perferendis, voluptates aliquam quidem, fuga modi quod obcaecati ipsum architecto enim! Voluptates eos, ducimus animi ex quia, officiis aut! Error, deleniti architecto esse dolor libero dolores quis suscipit praesentium, labore, earum minima a, doloremque repellendus eaque aut dolorum voluptatem fuga accusantium iure deserunt eligendi molestiae quaerat. Dolorem mollitia perspiciatis est neque alias perferendis provident unde numquam sit repudiandae, quae quam autem, sequi labore deleniti ullam vel, facilis. Accusamus, quo vitae pariatur, incidunt quam cumque est laborum, qui, ad illum sapiente perferendis voluptatum. Temporibus quaerat eveniet consectetur quisquam porro dignissimos voluptates ratione nemo veritatis beatae sequi hic pariatur reiciendis nisi molestias iusto atque, ea necessitatibus, deleniti distinctio. Voluptatum, consequatur, modi.
                            </p>
                        </Grid.Column>
                    </Grid>
                    <Header>
                        Manuals
                    </Header>
                    {addManualModal}
                    <List selection verticalAlign="middle" size="big">
                        <List.Item
                            onClick={() => {
                                push('/products/2/manuals/2/edit');
                            }}
                        >
                            <List.Icon name="circle thin" />
                            <List.Content>
                                <List.Header>
                                    Setting up the container
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    </List>
                </Container>
            </div>
        );
    }
}

export default Product;
