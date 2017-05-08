import React, { Component } from 'react';

import ObjectListItem from '../ObjectListItem';
import './style.css';

class ObjectsBar extends Component {
    render() {
        return (
            <div className="objects-bar">
                <div className="section-bar">
                    <p className="section-text">Objects</p>
                </div>
                <div className="objects-container">
                    {Array.apply(null, { length: 15 }).map((x, i) => (
                        <ObjectListItem key={i} />
                    ))}
                </div>
            </div>
        );
    }
}

export default ObjectsBar;
