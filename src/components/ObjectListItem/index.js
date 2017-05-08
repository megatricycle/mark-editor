import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './style.css';

class ObjectListItem extends Component {
    handleRemove = () => {
        const { id, removeObject } = this.props;

        removeObject(id);
    };

    render() {
        const { name, img } = this.props;
        const { handleRemove } = this;

        return (
            <div className="ObjectListItem">
                <div
                    className="object-img"
                    style={{ backgroundImage: `url(${img})` }}
                />
                <div className="object-name-container">
                    <span className="object-name">
                        {name}
                    </span>
                </div>
                <a href="#" className="object-delete" onClick={handleRemove}>
                    <FontAwesome name="remove" />
                </a>
            </div>
        );
    }
}

export default ObjectListItem;
