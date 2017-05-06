import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './style.css';

class EditorSideBar extends Component {
    render() {
        return (
            <div className="side-bar">
                <div className="top-bar">
                    <div className="product-name-container">
                        <p className="product-name">Product Name</p>
                    </div>
                    <a href="#" className="save-btn">
                        <FontAwesome name="save" size="2x" />
                    </a>
                </div>
                <div className="section-bar">
                    <p className="section-text">Step</p>
                </div>
                <div className="step-container" />
                <div className="section-bar">
                    <p className="section-text">Objects</p>
                </div>
            </div>
        );
    }
}

export default EditorSideBar;
