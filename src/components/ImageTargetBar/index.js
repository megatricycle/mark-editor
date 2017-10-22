import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';

import './style.css';

class ImageTargetBar extends Component {
    state = {
        modalIsOpen: false
    };

    openModal = () => {
        this.setState({
            modalIsOpen: true
        });
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    };

    openFileUploader = () => {
        const { uploader } = this.refs;

        uploader.click();
    };

    handleChangeImageTarget = e => {
        const { closeModal } = this;
        const { productId, requestUploadImageTarget } = this.props;

        const uploader = e.target;

        const image = uploader.files[0];

        if (image) {
            requestUploadImageTarget(productId, image);

            closeModal();
        }
    };

    handleSelectImageTarget = url => {
        const { closeModal } = this;
        const { setImageTarget } = this.props;

        setImageTarget(url);

        closeModal();
    };

    componentDidMount() {
        const { uploader } = this.refs;
        const { handleChangeImageTarget } = this;
        uploader.onchange = handleChangeImageTarget;
    }

    SelectTargetButton = () => {
        const { imageTarget } = this.props;
        const { openModal } = this;

        return (
            <a href="#" className="add-image-target" onClick={openModal}>
                {imageTarget
                    ? <div
                          className="image-target"
                          style={{
                              backgroundImage: `url("${imageTarget.url}")`
                          }}
                      />
                    : <FontAwesome name="plus-square-o" size="3x" />}
            </a>
        );
    };

    ImageTargetBaseButton = ({ image, action }) => {
        return (
            <a href="#" onClick={action}>
                <div className="image-target-button">
                    {image
                        ? <div
                              className="image-target-image"
                              style={{ backgroundImage: `url('${image}')` }}
                          />
                        : <div className="add-image-container">
                              <div>
                                  <FontAwesome name="picture-o" size="4x" />
                              </div>
                              <div className="add-image-text-container">
                                  Add Image
                              </div>
                          </div>}
                </div>
            </a>
        );
    };

    ImageTargetButton = ({ url }) => {
        const { ImageTargetBaseButton, handleSelectImageTarget } = this;

        return (
            <ImageTargetBaseButton
                image={url}
                action={() => {
                    handleSelectImageTarget(url);
                }}
            />
        );
    };

    AddImageTargetButton = () => {
        const { ImageTargetBaseButton, openFileUploader } = this;

        return <ImageTargetBaseButton action={openFileUploader} />;
    };

    SelectTargetModal = () => {
        const { ImageTargetButton, AddImageTargetButton } = this;
        const { modalIsOpen } = this.state;
        const { imageTargets } = this.props;

        return (
            <Modal basic open={modalIsOpen}>
                <Modal.Header>Select Image Target</Modal.Header>
                <Modal.Content>
                    <div className="image-targets-container">
                        {imageTargets.map((imageTarget, i) => (
                            <ImageTargetButton key={i} url={imageTarget.url} />
                        ))}
                        <AddImageTargetButton />
                    </div>
                </Modal.Content>
            </Modal>
        );
    };

    render() {
        const { SelectTargetModal, SelectTargetButton } = this;

        return (
            <div className="ImageTargetBar">
                <div className="section-bar">
                    <p className="section-text">Image Target</p>
                </div>
                <div className="image-target-container">
                    <SelectTargetButton />
                    <SelectTargetModal />
                    <input
                        type="file"
                        ref="uploader"
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
        );
    }
}

export default ImageTargetBar;
