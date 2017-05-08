import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './style.css';

class ObjectListItem extends Component {
    render() {
        return (
            <div className="ObjectListItem">
                <div className="object-img" />
                <div className="object-name-container">
                    <span className="object-name">
                        Object_Name
                    </span>
                </div>
                <a href="#" className="object-delete">
                    <FontAwesome name="remove" />
                </a>
            </div>
        );
    }
}

export default ObjectListItem;
