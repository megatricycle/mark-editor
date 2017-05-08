import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './style.css';

class ImageTargetBar extends Component {
    render() {
        return (
            <div className="ImageTargetBar">
                <div className="section-bar">
                    <p className="section-text">Image Target</p>
                </div>
                <div className="image-target-container">
                    <a href="#" className="add-image-target">
                        <FontAwesome name="plus-square-o" size="3x" />
                    </a>
                </div>
            </div>
        );
    }
}

export default ImageTargetBar;
