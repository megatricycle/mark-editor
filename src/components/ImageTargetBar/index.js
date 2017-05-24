import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './style.css';

class ImageTargetBar extends Component {
    openFileUploader = () => {
        const { uploader } = this.refs;

        uploader.click();
    };

    handleChangeImageTarget = e => {
        const { setImageTarget, currentStepIndex } = this.props;

        const image = e.target.files[0];

        if (image) {
            const reader = new FileReader();

            reader.onload = e => {
                const { result } = e.target;
                const img = new Image();

                img.src = result;
                img.onload = () => {
                    const dimensions = {
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    };

                    setImageTarget(currentStepIndex, result, dimensions);
                };
            };

            reader.readAsDataURL(image);
        }
    };

    componentDidMount() {
        const { uploader } = this.refs;
        const { handleChangeImageTarget } = this;

        uploader.onchange = handleChangeImageTarget;
    }

    render() {
        const { openFileUploader } = this;
        const { imageTarget } = this.props;

        return (
            <div className="ImageTargetBar">
                <div className="section-bar">
                    <p className="section-text">Image Target</p>
                </div>
                <div className="image-target-container">
                    <a
                        href="#"
                        className="add-image-target"
                        onClick={openFileUploader}
                    >
                        {imageTarget
                            ? <div
                                  className="image-target"
                                  style={{
                                      backgroundImage: `url("${imageTarget.blob}")`
                                  }}
                              />
                            : <FontAwesome name="plus-square-o" size="3x" />}
                    </a>
                    <input
                        type="file"
                        ref="uploader"
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                </div>
            </div>
        );
    }
}

export default ImageTargetBar;
