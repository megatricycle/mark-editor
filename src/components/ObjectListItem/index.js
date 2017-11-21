import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './style.css';

class ObjectListItem extends Component {
    handleRemove = e => {
        e.stopPropagation();

        const { id, removeObject } = this.props;

        removeObject(id);
    };

    handleObjectClick = () => {
        const { setSelectedObject, id } = this.props;

        setSelectedObject(id);
    };

    render() {
        const { name, img, highlighted, pos } = this.props;
        const { handleRemove, handleObjectClick } = this;

        return (
            <div
                className={
                    'ObjectListItem' + (highlighted ? ' highlighted' : '')
                }
                onClick={handleObjectClick}
            >
                <div
                    className="object-img"
                    style={{ backgroundImage: `url(${img})` }}
                />
                <div className="object-name-container">
                    <span className="object-name">
                        {`${name} (${pos.x}, ${pos.y}, ${pos.z})`}
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
