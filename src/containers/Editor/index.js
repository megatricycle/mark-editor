import React, { Component } from 'react';
import { connect } from 'react-redux';
const { BABYLON } = window;

import EditorSideBar from '../../components/EditorSideBar';
import ObjectsBar from '../../components/ObjectsBar';
import ImageTargetBar from '../../components/ImageTargetBar';
import EditorActions from '../../redux/editor';
import { getCurrentStep } from '../../selectors/editor';
import './style.css';

class Editor extends Component {
    createMainScene = () => {
        const { engine } = this;

        const scene = new BABYLON.Scene(engine);

        scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

        const camera = new BABYLON.ArcRotateCamera(
            'camera1',
            1,
            1,
            25,
            new BABYLON.Vector3(0, 5, -10),
            scene
        );

        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, false, true);

        const light = new BABYLON.HemisphericLight(
            'light1',
            new BABYLON.Vector3(0, 1, 0),
            scene
        );

        light.intensity = 0.5;

        const sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
        sphere.position.y = 1;

        BABYLON.Mesh.CreateGround('ground1', 20, 20, 2, scene);

        return scene;
    };

    initializeEngine = () => {
        const canvas = this.refs.editor;

        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);

        this.scene = this.createMainScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    };

    componentDidMount() {
        const { initializeEngine } = this;
        const { setProductName } = this.props;

        initializeEngine();

        setProductName('Test');
    }

    render() {
        const { productName, steps, currentStepIndex } = this.props.editor;
        const { step, addStep, setStepIndex, setStepInstruction } = this.props;
        const numberOfSteps = steps.length;

        return (
            <div className="editor-container">
                <EditorSideBar
                    step={step}
                    productName={productName}
                    numberOfSteps={numberOfSteps}
                    currentStepIndex={currentStepIndex}
                    addStep={addStep}
                    setStepIndex={setStepIndex}
                    setStepInstruction={setStepInstruction}
                />
                <ObjectsBar />
                <ImageTargetBar />
                <canvas ref="editor" className="editor" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        editor: state.editor,
        step: getCurrentStep(state.editor)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setProductName: productName =>
            dispatch(EditorActions.setProductName(productName)),
        addStep: () => dispatch(EditorActions.addStep()),
        setStepIndex: i => dispatch(EditorActions.setStepIndex(i)),
        setStepInstruction: (i, instruction) =>
            dispatch(EditorActions.setStepInstruction(i, instruction))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
