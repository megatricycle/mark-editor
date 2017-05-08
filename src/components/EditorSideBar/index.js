import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import Model from '../Model';
import './style.css';

class EditorSideBar extends Component {
    handleClickStepButton = i => {
        const { currentStepIndex, setStepIndex } = this.props;

        if (currentStepIndex !== i) {
            setStepIndex(i);
        }
    };

    handleInstructionChange = e => {
        const { setStepInstruction, currentStepIndex } = this.props;
        const instruction = e.target.value;

        setStepInstruction(currentStepIndex, instruction);
    };

    render() {
        const {
            productName,
            numberOfSteps,
            currentStepIndex,
            addStep,
            step
        } = this.props;

        const { handleClickStepButton, handleInstructionChange } = this;

        return (
            <div className="side-bar">
                <div className="top-bar">
                    <div className="product-name-container">
                        <p className="product-name">{productName}</p>
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
                        {Array.apply(null, {
                            length: numberOfSteps
                        }).map((x, i) => (
                            <button
                                className={
                                    'step-button ' +
                                        (currentStepIndex === i
                                            ? 'active'
                                            : 'inactive')
                                }
                                key={i}
                                onClick={() => {
                                    handleClickStepButton(i);
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="step-button active"
                            onClick={addStep}
                        >
                            +
                        </button>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="instructions-text"
                            value={step.instruction}
                            onChange={handleInstructionChange}
                        />
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
