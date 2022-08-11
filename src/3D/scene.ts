import { AbstractMesh, ArcRotateCamera, Color3, Color4, Engine, GizmoManager, GlowLayer, HemisphericLight, HighlightLayer, Matrix, MeshBuilder, Scene, SceneLoader, Texture, Vector3 } from "babylonjs";
import { outLineAlphaByMesh } from "./shader";
import 'babylonjs-loaders'
import { Ishader } from "./shaderType";
import { setValueMeshEdge, setValueShaderMaterial } from "./setValue";
import { IEdges, IshaderMatInfo } from "./IProperty";
import { IOptions } from "./Ioptions";
import { IType } from "./IType";
import { AdvancedDynamicTexture, TextBlock } from "babylonjs-gui";
import { createHtmlMesh } from "./GUI/CSS3DRender";
export class SceneManager {
    public engine: Engine;
    public activeScene: Scene;
    public matList: Ishader[];
    public scene: Scene;
    constructor(canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas);
        this.scene = this.createScene(this.engine, canvas);
        this.activeScene = this.scene;
        this.matList = [];
        this.engine.runRenderLoop(() => {
            this.activeScene.render();
        })
    }
    createScene(engine: Engine, canvas: HTMLCanvasElement) {
        let scene = new Scene(engine);
        scene.clearColor = new Color4(0.1, 0.2, 0.8, 1)
        let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
            Vector3.Zero(), scene);
        camera.attachControl(canvas);
        let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
        let light2 = new HemisphericLight('light', new Vector3(0, 100, 0), scene);
        // let gl = new GlowLayer("gl", scene);
        // gl.blurKernelSize = 32;
        // SceneLoader.ImportMesh('', '', "2222.glb", scene, (meshes, an, bb, cc) => {
        //     meshes.forEach((mesh) => {
        //         if (mesh.name.includes("Shield")) {
        //             mesh.dispose();
        //         }
        //     })


        //     meshes.forEach((mesh) => {
        //         // mesh.enableEdgesRendering()
        //         let color = Color3.FromHexString("#91f6fe");
        //         mesh.enableEdgesRendering();
        //         mesh.edgesColor = Color4.FromColor3(color, 1);
        //         let shader = outLineAlphaByMesh(scene, mesh, color, 1);



        //         const mat2 = shader.mat;
        //         this.matList.push(shader);
        //         mesh.material = mat2;
        //         gl.referenceMeshToUseItsOwnMaterial(mesh);
        //         // mesh instanceof Mesh &&hl.addMesh(mesh,Color3.FromHexString("#91f6fe"),true);
        //     })
        // })
        scene.onNewMeshAddedObservable.add(() => {
            console.log("hello!");
        })
        scene.onMeshImportedObservable.add(() => {

        })

        // let gizmo = new GizmoManager(scene);
        // gizmo.positionGizmoEnabled = true;
        let result;
        // scene.debugLayer.show();
        // scene.onPointerDown = () => {
        //     result = scene.pick(scene.pointerX, scene.pointerY, (mesh => !mesh.name.includes("root")));
        //     if (result?.pickedMesh) {
        //         console.log(result?.pickedMesh.name)
        //     }
        // }
        let box = MeshBuilder.CreatePlane("box",{size:10});
        let box2 = MeshBuilder.CreatePlane("box",{size:10});
        box2.position.x +=5;
        createHtmlMesh(box,this.engine.getRenderingCanvas() as HTMLCanvasElement,"https://www.huya.com");
        setTimeout(() => {
            // createHtmlMesh(box2,this.engine.getRenderingCanvas() as HTMLCanvasElement,"https://www.huya.com");
        }, 3000);
        return scene
    }
    getBoundingBoxInfo(nodes: AbstractMesh[]) {
        let min: Vector3 = Vector3.Zero();
        let max: Vector3 = Vector3.Zero();

        nodes.forEach((node) => {
            let minimumWorld: Vector3, maximumWorld: Vector3;
            const mesh = node;
            const boundingBox = mesh.getBoundingInfo().boundingBox;
            minimumWorld = boundingBox.minimumWorld;
            maximumWorld = boundingBox.maximumWorld;
            min = Vector3.Minimize(min, minimumWorld).clone();
            max = Vector3.Maximize(max, maximumWorld).clone();
        });


        return { max, min, center: Vector3.Center(min, max) };
    }
    dispose() {
        this.engine.dispose();
        this.activeScene.dispose();
    }
    changeShaderMat(property: IshaderMatInfo) {

        this.matList.forEach((IShader) => {
            let options: IOptions = {
                type: IType.shaderMaterial,
                target: IShader.mat,
                value: property
            }
            this.setValue(options);
        })
    }

    changeMeshEdge(property: IEdges) {
        let options = {
            type: IType.meshEdge,
            target: this.scene.meshes,
            value: property
        }
        this.setValue(options);

    }

    setValue(options: IOptions) {
        switch (options.type) {
            case IType.meshEdge:
                return setValueMeshEdge(options.target, options.value);
            case IType.shaderMaterial:
                return setValueShaderMaterial(options.target, options.value);
        }

    }
    arrayBufferToBase64Img = (buffer: Uint8Array) => {

        let str = "";
        buffer.forEach((bit) => {
            str += String.fromCharCode(bit);
        })


        return window.btoa(str);
    }
    /**
 * uint8array转Base64
 * @param callback Function 获取转换结果e.target.result后执行的回调函数
 */

    base64ToUint8Array(base64String: string) {
        let padding = '='.repeat((4 - base64String.length % 4) % 4);
        let base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        let rawData = atob(base64);
        let outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    previewSomeTwoTexture(oldTexture: Texture, newTexture: Texture) {
        // newTexture.wrapV = oldTexture.wrapV;
        // newTexture.wrapU = oldTexture.wrapU;
        // newTexture.wrapR = oldTexture.wrapR;
        // newTexture.level = oldTexture.level;
        // newTexture.invertZ = oldTexture.invertZ;
        // newTexture.hasAlpha = oldTexture.hasAlpha;
        newTexture.metadata = oldTexture.metadata;
        newTexture.wAng = oldTexture.wAng - Math.PI;
        newTexture.vAng = oldTexture.vAng - Math.PI;
        // newTexture.uAng = oldTexture.uAng
        // newTexture.uOffset = oldTexture.uOffset;
        // newTexture.vOffset = oldTexture.vOffset;
    }
}