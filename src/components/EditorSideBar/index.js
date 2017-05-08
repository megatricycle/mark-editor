import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import Model from '../Model';
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
                <div className="step-container">
                    <div className="steps">
                        {Array.apply(null, { length: 6 }).map((x, i) => (
                            <button className="step-button" key={i}>
                                {i + 1}
                            </button>
                        ))}
                        <button className="step-button">+</button>
                    </div>
                    <div>
                        <input type="text" className="instructions-text" />
                    </div>
                </div>
                <div className="section-bar">
                    <p className="section-text">Models</p>
                </div>
                <div className="models-container">
                    {Array.apply(null, { length: 15 }).map((x, i) => (
                        <Model key={i} />
                    ))}
                </div>
            </div>
        );
    }
}

export default EditorSideBar;
