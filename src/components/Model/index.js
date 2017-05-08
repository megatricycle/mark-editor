import React, { Component } from 'react';
import uuid from 'uuid/v4';
const { BABYLON } = window;

import './style.css';

class Model extends Component {
    handleClick = () => {
        const { name, img, addObject } = this.props;

        const initialPosition = new BABYLON.Vector3(0, 0, 0);

        addObject(uuid(), name, img, initialPosition);
    };

    render() {
        const { img } = this.props;
        const { handleClick } = this;

        return (
            <a href="#" onClick={handleClick}>
                <div
                    className="model"
                    style={{ backgroundImage: `url(${img})` }}
                />
            </a>
        );
    }
}

export default Model;
