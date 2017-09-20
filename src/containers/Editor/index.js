import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
const { BABYLON } = window;

import EditorSideBar from '../../components/EditorSideBar';
import ObjectsBar from '../../components/ObjectsBar';
import ImageTargetBar from '../../components/ImageTargetBar';
import EditorActions from '../../redux/editor';
import ProductActions from '../../redux/product';
import {
    getCurrentStep,
    getCurrentObjects,
    getCurrentImageTarget,
    getSelectedObject
} from '../../selectors/editor';
import { getManual } from '../../selectors/product';
import './style.css';

const MANIPULATORS_SPREAD = 1;

class Editor extends Component {
    init = () => {
        this.assets = {};
        this.objects = [];
        this.imageTarget = null;
        this.manipulators = null;
        this.ground = null;
        this.manipulatorHelper = null;
    };

    loadAsset = asset => {
        const { scene } = this;

        return new Promise(resolve => {
            BABYLON.SceneLoader.ImportMesh(
                '',
                '/models/' + asset.name + '/',
                asset.modelFilename,
                scene,
                newMeshes => {
                    newMeshes.forEach((mesh, i) => {
                        mesh.visibility = false;
                        mesh.isPickable = false;
                        mesh.id = 'baseAsset/' + asset.name + '/' + i;
                        mesh.name = 'baseAsset/' + asset.name + '/' + i;
                    });

                    this.assets[asset.name] = newMeshes;

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
        const { clearManipulator } = this;

        clearManipulator();

        const object = {
            type: asset,
            id
        };

        object.position = pos;

        object.meshes = this.assets[asset].map(mesh => mesh.clone());

        object.meshes[0].position.x += pos.x;
        object.meshes[0].position.y += pos.y;
        object.meshes[0].position.z += pos.z;

        object.meshes.forEach((mesh, i) => {
            mesh.visibility = true;
            mesh.isPickable = true;
            mesh.metadata = { id, type: 'object' };
            mesh.name = id + i;
            mesh.id = id + i;
        });

        this.objects = [...this.objects, object];
    };

    moveObject = (id, pos) => {
        const object = this.objects.filter(o => o.id === id)[0];

        object.position = pos;

        object.meshes[0].position.x += pos.x - object.meshes[0].position.x;
        object.meshes[0].position.y += pos.y - object.meshes[0].position.y;
        object.meshes[0].position.z += pos.z - object.meshes[0].position.z;

        if (this.manipulators) {
            this.manipulators.position = pos;
        }
    };

    createMainScene = () => {
        const { engine, loadMainAssets } = this;

        this.scene = new BABYLON.Scene(engine);

        const { scene } = this;

        scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

        // load main assets
        return loadMainAssets().then(() => {
            this.camera = new BABYLON.ArcRotateCamera(
                'camera1',
                0,
                0,
                0,
                new BABYLON.Vector3(0, 0, 0),
                scene
            );

            const { camera } = this;

            camera.setPosition(new BABYLON.Vector3(0, 15, -20));
            camera.attachControl(this.canvas, false, false);
            camera.upperBetaLimit = 1.2;
            camera.lowerRadiusLimit = 5;
            camera.upperRadiusLimit = camera.radius * 2;

            const light = new BABYLON.HemisphericLight(
                'light1',
                new BABYLON.Vector3(0, 1, 0),
                scene
            );

            light.intensity = 1;

            this.ground = BABYLON.Mesh.CreateGround(
                'ground1',
                30,
                30,
                2,
                scene
            );

            const { ground } = this;

            ground.isPickable = false;

            ground.material = new BABYLON.StandardMaterial(
                'groundTexture',
                scene
            );
            ground.material.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);
            ground.material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);

            return Promise.resolve(scene);
        });
    };

    destroyObject = id => {
        const object = this.objects.filter(object => object.id === id)[0];

        if (!object) {
            return;
        }

        this.objects = this.objects.filter(object => object.id !== id);

        object.meshes.forEach(mesh => {
            mesh.dispose();
        });
    };

    createManipulatorHelpers = axis => {
        const { scene } = this;
        const selectedObjectId = this.props.editor.selectedObject;
        const selectedObject = this.objects.filter(
            o => o.id === selectedObjectId
        )[0];

        this.manipulatorHelper = new BABYLON.Mesh.CreatePlane(
            'manipulatorHelper',
            1000,
            scene
        );

        if (axis === 'x' || axis === 'z') {
            this.manipulatorHelper.rotation = new BABYLON.Vector3(
                Math.PI / 2,
                0,
                0
            );
        } else if (axis === 'y') {
            this.manipulatorHelper.billboardMode =
                BABYLON.Mesh.BILLBOARDMODE_ALL;
        }

        this.manipulatorHelper.position = new BABYLON.Vector3(
            selectedObject.position.x,
            selectedObject.position.y,
            selectedObject.position.z
        );

        this.manipulatorHelper.visibility = false;
    };

    clearManipulatorHelpers = () => {
        if (this.manipulatorHelper) {
            this.manipulatorHelper.dispose();
            this.manipulatorHelper = null;
        }
    };

    createManipulator = selectedObject => {
        const { scene, clearManipulator } = this;

        clearManipulator();

        this.manipulators = BABYLON.Mesh.CreateBox(
            'manipulator_parent',
            0.5,
            scene
        );

        // make the mesh invisible since this will just be a parent node
        this.manipulators.isVisible = false;
        this.manipulators.position = selectedObject.pos;

        const x = BABYLON.MeshBuilder.CreateCylinder(
            'manipulator_x',
            { height: 0.5, diameterBottom: 0.25, diameterTop: 0 },
            scene
        );

        x.metadata = { type: 'manipulator', axis: 'x' };
        x.parent = this.manipulators;
        x.material = new BABYLON.StandardMaterial(
            'manipulator_x_material',
            scene
        );
        x.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        x.renderingGroupId = 1;
        x.position = new BABYLON.Vector3(MANIPULATORS_SPREAD, 0, 0);
        x.rotation = new BABYLON.Vector3(0, 0, -Math.PI / 2);

        const y = BABYLON.MeshBuilder.CreateCylinder(
            'manipulator_y',
            { height: 0.5, diameterBottom: 0.25, diameterTop: 0 },
            scene
        );

        y.metadata = { type: 'manipulator', axis: 'y' };
        y.parent = this.manipulators;
        y.material = new BABYLON.StandardMaterial(
            'manipulator_y_material',
            scene
        );
        y.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        y.renderingGroupId = 1;
        y.position = new BABYLON.Vector3(0, MANIPULATORS_SPREAD, 0);

        const z = BABYLON.MeshBuilder.CreateCylinder(
            'manipulator_z',
            { height: 0.5, diameterBottom: 0.25, diameterTop: 0 },
            scene
        );

        z.metadata = { type: 'manipulator', axis: 'z' };
        z.parent = this.manipulators;
        z.material = new BABYLON.StandardMaterial(
            'manipulator_z_material',
            scene
        );
        z.material.diffuseColor = new BABYLON.Color3(0, 0, 1);
        z.renderingGroupId = 1;
        z.position = new BABYLON.Vector3(0, 0, MANIPULATORS_SPREAD);
        z.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    };

    clearManipulator = () => {
        if (this.manipulators) {
            this.manipulators.getChildMeshes(false).forEach(mesh => {
                mesh.dispose();
            });

            this.manipulators.dispose();
            this.manipulators = null;
        }
    };

    initializeEngine = () => {
        const {
            mergeManualToEditor,
            requestFetchImagesBase64,
            selectedManual
        } = this.props;
        const canvas = this.refs.editor;

        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);

        this.createMainScene().then(() => {
            mergeManualToEditor(selectedManual);
            requestFetchImagesBase64(
                selectedManual.steps.map(step => step.imageTarget)
            );

            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        });
    };

    createImageTarget = (blob, dimensions) => {
        const { scene } = this;

        this.imageTarget = BABYLON.Mesh.CreatePlane('imageTarget', 25, scene);

        this.imageTarget.isPickable = false;

        // scale width
        this.imageTarget.scaling.x = dimensions.width > dimensions.height
            ? 1
            : dimensions.width / dimensions.height;

        // scale height
        this.imageTarget.scaling.y = dimensions.height > dimensions.width
            ? 1
            : dimensions.height / dimensions.width;

        this.imageTarget.material = new BABYLON.StandardMaterial(
            'imageTargetTexture',
            scene
        );
        this.imageTarget.material.ambientTexture = new BABYLON.Texture(
            'data:imageTarget',
            scene,
            false,
            true,
            BABYLON.Texture.BILINEAR_SAMPLINGMODE,
            null,
            null,
            blob,
            true
        );
        this.imageTarget.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        this.imageTarget.material.specularColor = new BABYLON.Color3(0, 0, 0);

        this.imageTarget.position = new BABYLON.Vector3(0, 0.01, 0);
        this.imageTarget.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    };

    clearImageTarget = () => {
        this.imageTarget.material.ambientTexture.dispose();
        this.imageTarget.material.dispose();
        this.imageTarget.dispose();
        this.imageTarget = null;
    };

    save = () => {
        const { steps, imageTargets, objects } = this.props.editor;
        const { productId, manualId } = this.props.match.params;
        const { requestSaveManual } = this.props;

        const manual = {
            steps: _.zipWith(
                steps,
                imageTargets,
                objects,
                (step, imageTarget, stepObjects) => ({
                    instruction: step.instruction,
                    imageTarget: !imageTarget ? imageTarget : imageTarget.blob,
                    objects: stepObjects
                })
            ).map((step, i) => ({
                ...step,
                index: i,
                objects: step.objects.asMutable().map(object => ({
                    type: object.name,
                    x: object.pos.x,
                    y: object.pos.y,
                    z: object.pos.z
                }))
            }))
        };

        requestSaveManual(productId, manualId, manual);
    };

    onCanvasMount = () => {
        const {
            initializeEngine,
            createManipulatorHelpers,
            clearManipulatorHelpers
        } = this;
        const { setProductName, setSelectedObject } = this.props;
        const { editor } = this.refs;

        initializeEngine();

        setProductName('Test');

        editor.addEventListener('click', () => {
            const { scene } = this;

            const pick = scene.pick(scene.pointerX, scene.pointerY);

            if (
                pick.hit &&
                pick.pickedMesh.metadata &&
                pick.pickedMesh.metadata.type === 'object'
            ) {
                const { id } = pick.pickedMesh.metadata;

                if (id !== this.props.editor.selectedObject) {
                    setSelectedObject(id);
                }
            } else if (
                this.props.editor.selectedObject &&
                !(pick.hit &&
                    pick.pickedMesh.metadata &&
                    pick.pickedMesh.metadata.type === 'manipulator')
            ) {
                setSelectedObject(null);
            }
        });

        let clicked = false, axis = null;

        editor.addEventListener('mousedown', () => {
            const { scene } = this;

            const pick = scene.pick(scene.pointerX, scene.pointerY);

            if (
                pick.hit &&
                pick.pickedMesh.metadata &&
                pick.pickedMesh.metadata.type === 'manipulator'
            ) {
                clicked = true;

                axis = pick.pickedMesh.metadata.axis;

                this.camera.detachControl(this.canvas);

                createManipulatorHelpers(axis);
            }
        });

        editor.addEventListener('mousemove', () => {
            if (clicked) {
                const { scene } = this;
                const { selectedObject, updateObjectPosition } = this.props;

                const pick = scene.pick(scene.pointerX, scene.pointerY);

                const { pickedPoint } = pick;

                if (pickedPoint) {
                    if (axis === 'x') {
                        const newX = pickedPoint.x - MANIPULATORS_SPREAD;

                        updateObjectPosition(selectedObject.id, {
                            ...selectedObject.pos,
                            x: newX
                        });
                    }
                    if (axis === 'y') {
                        const newY = pickedPoint.y - MANIPULATORS_SPREAD;

                        updateObjectPosition(selectedObject.id, {
                            ...selectedObject.pos,
                            y: newY
                        });
                    }
                    if (axis === 'z') {
                        const newZ = pickedPoint.z - MANIPULATORS_SPREAD;

                        updateObjectPosition(selectedObject.id, {
                            ...selectedObject.pos,
                            z: newZ
                        });
                    }
                }
            }
        });

        editor.addEventListener('mouseup', () => {
            if (clicked) {
                clicked = false;

                clearManipulatorHelpers();

                this.camera.attachControl(this.canvas, null, null);
            }
        });
    };

    componentWillMount() {
        const { reset } = this.props;
        const { init } = this;

        reset();
        init();
    }

    componentWillReceiveProps(newProps) {
        const { isStarted } = this.props.editor;

        if (!isStarted) {
            const { selectedManual: oldSelectedManual, start } = this.props;
            const { selectedManual: newSelectedManual } = newProps;

            if (oldSelectedManual === null && newSelectedManual) {
                start();
            }

            return;
        }

        const { isSaved } = newProps.editor;

        if (isSaved) {
            const { push } = this.props.history;
            const { productId } = this.props.match.params;

            push(`/home/products/${productId}`);
        }

        // add/remove objects
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

        // image targets
        const { createImageTarget, clearImageTarget, imageTarget } = this;

        if (this.props.imageTarget !== newProps.imageTarget) {
            if (imageTarget) {
                clearImageTarget();
            }

            if (newProps.imageTarget) {
                createImageTarget(
                    newProps.imageTarget.blob,
                    newProps.imageTarget.dimensions
                );
            }
        }

        // manipulators
        const { createManipulator, clearManipulator } = this;

        if (
            newProps.editor.selectedObject &&
            this.props.editor.selectedObject !== newProps.editor.selectedObject
        ) {
            const { selectedObject } = newProps;

            createManipulator(selectedObject);
        } else if (
            newProps.editor.selectedObject === null &&
            this.props.editor.selectedObject
        ) {
            clearManipulator();
        }

        // update positions
        const differences = this.props.editor.objects.map((step, i) =>
            step
                .map(object => {
                    const pair = _.find(newProps.editor.objects[i], [
                        'id',
                        object.id
                    ]);

                    if (pair && !_.isEqual(object.pos, pair.pos)) {
                        return {
                            ...object,
                            pos: pair.pos
                        };
                    } else {
                        return null;
                    }
                })
                .filter(object => object !== null)
        );

        const differencesFlattened = _.flatten(differences);

        const { moveObject } = this;

        differencesFlattened.forEach(object => {
            moveObject(object.id, object.pos);
        });
    }

    componentDidMount() {
        const { selectedProduct, start, requestProductAndManual } = this.props;
        const { productId, manualId } = this.props.match.params;

        if (!selectedProduct) {
            requestProductAndManual(productId, manualId);
        } else {
            start();
        }
    }

    componentDidUpdate(prevProps) {
        const { isStarted: oldIsStarted } = prevProps.editor;
        const { isStarted: newIsStarted } = this.props.editor;
        const { onCanvasMount } = this;

        if (!oldIsStarted && newIsStarted) {
            onCanvasMount();
        }
    }

    render() {
        const {
            isStarted,
            productName,
            steps,
            currentStepIndex,
            assets,
            selectedObject
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
            setImageTarget,
            setSelectedObject
        } = this.props;

        const { save } = this;

        const numberOfSteps = steps.length;

        return isStarted
            ? <div className="editor-container">
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
                      save={save}
                  />
                  <ObjectsBar
                      objects={objects}
                      removeObject={removeObject}
                      selectedObject={selectedObject}
                      setSelectedObject={setSelectedObject}
                  />
                  <ImageTargetBar
                      imageTarget={imageTarget}
                      setImageTarget={setImageTarget}
                      currentStepIndex={currentStepIndex}
                  />
                  <canvas ref="editor" className="editor" />
              </div>
            : <div>Loading spinner</div>;
    }
}

const mapStateToProps = (state, props) => {
    const { editor, product } = state;
    const { productId, manualId } = props.match.params;

    return {
        editor: editor,
        step: getCurrentStep(editor),
        objects: getCurrentObjects(editor),
        imageTarget: getCurrentImageTarget(editor),
        selectedObject: getSelectedObject(editor),
        selectedProduct: null,
        selectedManual: getManual(
            product.products,
            parseInt(productId, 10),
            parseInt(manualId, 10)
        )
    };
};

const mapDispatchToProps = dispatch => {
    return {
        start: () => dispatch(EditorActions.start()),
        reset: () => dispatch(EditorActions.reset()),
        setProductName: productName =>
            dispatch(EditorActions.setProductName(productName)),
        addStep: () => dispatch(EditorActions.addStep()),
        setStepIndex: i => dispatch(EditorActions.setStepIndex(i)),
        setStepInstruction: (i, instruction) =>
            dispatch(EditorActions.setStepInstruction(i, instruction)),
        addObject: (id, name, img, pos) =>
            dispatch(EditorActions.addObject(id, name, img, pos)),
        removeObject: id => dispatch(EditorActions.removeObject(id)),
        setImageTarget: (stepIndex, blob, dimensions) =>
            dispatch(EditorActions.setImageTarget(stepIndex, blob, dimensions)),
        setSelectedObject: id => dispatch(EditorActions.setSelectedObject(id)),
        updateObjectPosition: (id, pos) =>
            dispatch(EditorActions.updateObjectPosition(id, pos)),
        requestProductAndManual: (productId, manualId) =>
            dispatch(
                ProductActions.requestProductAndManual(productId, manualId)
            ),
        mergeManualToEditor: manual =>
            dispatch(EditorActions.mergeManualToEditor(manual)),
        requestFetchImagesBase64: imageURLs =>
            dispatch(EditorActions.requestFetchImagesBase64(imageURLs)),
        requestSaveManual: (productId, manualId, manual) =>
            dispatch(
                EditorActions.requestSaveManual(productId, manualId, manual)
            )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
