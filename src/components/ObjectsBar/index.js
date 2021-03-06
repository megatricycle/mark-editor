import React, { Component } from 'react';

import ObjectListItem from '../ObjectListItem';
import './style.css';

class ObjectsBar extends Component {
    render() {
        const {
            objects,
            removeObject,
            selectedObject,
            setSelectedObject
        } = this.props;

        return (
            <div className="objects-bar">
                <div className="section-bar">
                    <p className="section-text">Objects</p>
                </div>
                <div className="objects-container">
                    {objects.map((object, i) => (
                        <ObjectListItem
                            key={i}
                            id={object.id}
                            name={object.name}
                            img={object.img}
                            pos={object.pos}
                            highlighted={object.id === selectedObject}
                            removeObject={removeObject}
                            setSelectedObject={setSelectedObject}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default ObjectsBar;
