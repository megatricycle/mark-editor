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
    Divider
} from 'semantic-ui-react';

import './style.css';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            isAddingProduct: false
        };
    }

    handleAddProductClick = () => {
        this.setState({
            isAddingProduct: true
        });
    };

    render() {
        const { isAddingProduct } = this.state;
        const { handleAddProductClick } = this;

        return (
            <div className="Home">
                <Container text>
                    <Header>Your Products</Header>
                    {isAddingProduct
                        ? <Form>
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
                              <Button content="Create" icon="plus" primary />
                          </Form>
                        : <Button
                              primary
                              content="Add"
                              icon="plus"
                              size="tiny"
                              onClick={handleAddProductClick}
                          />}

                    <Divider />

                    <List selection verticalAlign="middle" divided size="big">
                        <List.Item
                            onClick={() => {
                                alert('clicking product');
                            }}
                        >
                            <Image avatar src="http://placehold.it/150x150" />
                            <List.Content>
                                <List.Header>Hi</List.Header>
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
