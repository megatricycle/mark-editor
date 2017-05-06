import React, { Component } from 'react';
const { BABYLON } = window;

import EditorSideBar from '../EditorSideBar';
import ObjectsBar from '../ObjectsBar';
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
        this.initializeEngine();
    }

    render() {
        return (
            <div className="editor-container">
                <EditorSideBar />
                <ObjectsBar />
                <canvas ref="editor" className="editor" />
            </div>
        );
    }
}

export default Editor;
