import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
const { BABYLON } = window;

import EditorSideBar from '../../components/EditorSideBar';
import ObjectsBar from '../../components/ObjectsBar';
import ImageTargetBar from '../../components/ImageTargetBar';
import EditorActions from '../../redux/editor';
import {
    getCurrentStep,
    getCurrentObjects,
    getCurrentImageTarget
} from '../../selectors/editor';
import './style.css';

class Editor extends Component {
    constructor() {
        super();

        this.assets = {};
        this.objects = [];
    }

    loadAsset = asset => {
        const { scene } = this;

        return new Promise(resolve => {
            BABYLON.SceneLoader.ImportMesh(
                '',
                'models/' + asset.name + '/',
                asset.modelFilename,
                scene,
                newMeshes => {
                    newMeshes.forEach(mesh => {
                        mesh.visibility = false;
                    });

                    this.assets[asset.name] = newMeshes.map(mesh =>
                        mesh.clone()
                    );

                    resolve(newMeshes);
                }
            );
        });
    };

    loadMainAssets = () => {
        const { assets } = this.props.editor;
        const { loadAsset } = this;

        // crash bug??
        // const promises = assets.map(asset => loadAsset(asset.name));

        return loadAsset(assets[0]);
    };

    createAsset = (id, asset, pos) => {
        const object = {
            type: asset,
            id
        };

        object.meshes = this.assets[asset].map(mesh => mesh.clone());
        object.meshes.forEach(mesh => {
            mesh.visibility = true;
            mesh.position.x += pos.x;
            mesh.position.y += pos.y;
            mesh.position.z += pos.z;
        });

        this.objects = [...this.objects, object];
    };

    createMainScene = () => {
        const { engine, loadMainAssets } = this;

        this.scene = new BABYLON.Scene(engine);

        const { scene } = this;

        scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

        // load main assets
        return loadMainAssets().then(() => {
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

            BABYLON.Mesh.CreateGround('ground1', 20, 20, 2, scene);

            return Promise.resolve(scene);
        });
    };

    destroyObject = id => {
        const object = this.objects.filter(object => object.id === id)[0];

        this.objects = this.objects.filter(object => object.id !== id);

        object.meshes.forEach(mesh => {
            mesh.dispose();
        });
    };

    initializeEngine = () => {
        const canvas = this.refs.editor;

        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);

        this.createMainScene().then(() => {
            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        });
    };

    componentDidMount() {
        const { initializeEngine } = this;
        const { setProductName } = this.props;

        initializeEngine();

        setProductName('Test');
    }

    componentWillReceiveProps(newProps) {
        const { createAsset, destroyObject } = this;

        const removeObjects = _.differenceBy(
            this.props.objects,
            newProps.objects,
            'id'
        );
        const addObjects = _.differenceBy(
            newProps.objects,
            this.props.objects,
            'id'
        );

        removeObjects.forEach(object => {
            destroyObject(object.id);
        });

        addObjects.forEach(object => {
            createAsset(object.id, object.name, object.pos);
        });
    }

    render() {
        const {
            productName,
            steps,
            currentStepIndex,
            assets
        } = this.props.editor;

        const {
            step,
            objects,
            imageTarget,
            addStep,
            setStepIndex,
            setStepInstruction,
            addObject,
            removeObject,
            setImageTarget
        } = this.props;

        const numberOfSteps = steps.length;

        return (
            <div className="editor-container">
                <EditorSideBar
                    step={step}
                    productName={productName}
                    numberOfSteps={numberOfSteps}
                    currentStepIndex={currentStepIndex}
                    assets={assets}
                    addStep={addStep}
                    setStepIndex={setStepIndex}
                    setStepInstruction={setStepInstruction}
                    addObject={addObject}
                />
                <ObjectsBar objects={objects} removeObject={removeObject} />
                <ImageTargetBar
                    imageTarget={imageTarget}
                    setImageTarget={setImageTarget}
                />
                <canvas ref="editor" className="editor" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        editor: state.editor,
        step: getCurrentStep(state.editor),
        objects: getCurrentObjects(state.editor),
        imageTarget: getCurrentImageTarget(state.editor)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setProductName: productName =>
            dispatch(EditorActions.setProductName(productName)),
        addStep: () => dispatch(EditorActions.addStep()),
        setStepIndex: i => dispatch(EditorActions.setStepIndex(i)),
        setStepInstruction: (i, instruction) =>
            dispatch(EditorActions.setStepInstruction(i, instruction)),
        addObject: (id, name, img, pos) =>
            dispatch(EditorActions.addObject(id, name, img, pos)),
        removeObject: id => dispatch(EditorActions.removeObject(id)),
        setImageTarget: blob => dispatch(EditorActions.setImageTarget(blob))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
