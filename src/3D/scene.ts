import { AbstractMesh, ArcRotateCamera, Color3, Color4, Engine, GlowLayer, HemisphericLight, MeshBuilder, Scene, SceneLoader, Texture, Vector3 } from "babylonjs";
import { outLineAlphaByMesh } from "./shader";
import 'babylonjs-loaders'
import { Ishader } from "./shaderType";
import { setValue } from "./setValue";
import { IEdges, IGlInfo, IshaderMatInfo } from "./IProperty";
import { IOptions } from "./Ioptions";
import { IType, SceneType } from "./IType";
import { gradientMatScene } from "./scene/grientScene";
import { wireFrameScene } from "./scene/wireFrame";
import { pbrScene } from "./scene/pbrScene";
import { reflectScene } from "./scene/reflectScene";
import { glassScene } from "./scene/glassScene";
import { boliScene } from "./scene/glassBoliScene";
export class SceneManager {
    public engine: Engine;
    public activeScene: Scene;
    public matList: Ishader[];
    public gl: GlowLayer | null = null;
    public glScene: Scene;
    public gradientScene: Scene;
    public wireFrameScene: Scene;
    public pbrScene: Scene;
    public reflectScene: Scene;
    public glassScene: Scene;
    public boliScene:Scene;
    constructor(canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas);
        this.matList = [];
        this.glScene = this.createScene(this.engine, canvas);
        this.gradientScene = gradientMatScene(this.engine, canvas);
        this.activeScene = this.glScene;
        this.wireFrameScene = wireFrameScene(this.engine, canvas);
        this.pbrScene = pbrScene(this.engine, canvas);
        this.reflectScene = reflectScene(this.engine, canvas);
        this.glassScene = glassScene(this.engine, canvas);
        this.boliScene = boliScene(this.engine,canvas);
        this.engine.runRenderLoop(() => {
            this.activeScene.render();
        })
    }
    createScene(engine: Engine, canvas: HTMLCanvasElement) {
        let scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 1)
        let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
            Vector3.Zero(), scene);
        camera.attachControl(canvas);
        let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
        let light2 = new HemisphericLight('light', new Vector3(0, 100, 0), scene);
        let gl = new GlowLayer("gl", scene);
        gl.blurKernelSize = 32;
        this.gl = gl;
        SceneLoader.ImportMesh('', '', "2222.glb", scene, (meshes, an, bb, cc) => {
            meshes.forEach((mesh) => {
                if (mesh.name.includes("Shield")) {
                    mesh.dispose();
                }
            })


            meshes.forEach((mesh) => {
                // mesh.enableEdgesRendering()
                let color = Color3.FromHexString("#91f6fe");
                mesh.enableEdgesRendering();
                mesh.edgesColor = Color4.FromColor3(color, 1);
                let shader = outLineAlphaByMesh(scene, mesh, color, 1);

                const mat2 = shader.mat;
                this.matList.push(shader);
                mesh.material = mat2;
                gl.referenceMeshToUseItsOwnMaterial(mesh);
                // mesh instanceof Mesh &&hl.addMesh(mesh,Color3.FromHexString("#91f6fe"),true);
            })
        })
        const box = MeshBuilder.CreateSphere("box", { diameter: 4 });
        box.position.y = 10;
        const mat1 = outLineAlphaByMesh(scene, box, Color3.FromHexString("#91f6fe"), 1);
        box.material = mat1.mat;
        this.matList.push(mat1);
        this.gl.referenceMeshToUseItsOwnMaterial(box);

        // const box2 = MeshBuilder.CreateBox("Box2");
        // box2.position.z  += 8
        // box2.material = null;
        // const mat  = gradientMat(scene,box2);
        // box2.material = mat;
        // box2.enableEdgesRendering();
        // box2.edgesColor = Color4.FromHexString("#2c59a0");
        // box2.edgesWidth = 2;
        // const sphere = MeshBuilder.CreateSphere("sphere");
        // // const mat2 = outLineAlphaByMesh(scene, sphere, Color3.FromHexString("#91f6fe"), 1);
        // sphere.material = mat;
        // // this.matList.push(mat2);
        // sphere.position.z = 20;


        // scene.debugLayer.show();
        // scene.onPointerDown = () => {
        //     result = scene.pick(scene.pointerX, scene.pointerY, (mesh => !mesh.name.includes("root")));
        //     if (result?.pickedMesh) {
        //         console.log(result?.pickedMesh.name)
        //     }
        // }
        // let box = MeshBuilder.CreatePlane("box",{size:10});
        // let box2 = MeshBuilder.CreatePlane("box",{size:10});
        // box2.position.x +=5;
        // createHtmlMesh(box,this.engine.getRenderingCanvas() as HTMLCanvasElement,"https://www.huya.com");
        // setTimeout(() => {
        //     // createHtmlMesh(box2,this.engine.getRenderingCanvas() as HTMLCanvasElement,"https://www.huya.com");
        // }, 3000);
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
        console.log(this.matList);
        this.matList.forEach((IShader) => {
            console.log('123');
            let options: IOptions = {
                type: IType.shaderMaterial,
                target: IShader.mat,
                value: property
            }
            setValue(options);
        })
    }

    changeMeshEdge(property: IEdges) {
        let options = {
            type: IType.meshEdge,
            target: this.glScene.meshes,
            value: property
        }
        setValue(options);
    }

    changeGlOption(property: IGlInfo) {
        let options: IOptions = {
            type: IType.glowLayer,
            target: this.gl,
            value: property
        }
        setValue(options);
    }


    arrayBufferToBase64Img = (buffer: Uint8Array) => {

        let str = "";
        buffer.forEach((bit) => {
            str += String.fromCharCode(bit);
        })


        return window.btoa(str);
    }

    selectScene(type: SceneType) {
        switch (type) {
            case SceneType.glScene:
                this.activeScene = this.glScene
                break;
            case SceneType.grientScene:
                this.activeScene = this.gradientScene
                break;
            case SceneType.wireFrameScene:
                this.activeScene = this.wireFrameScene;
                break;
            case SceneType.pbrScene:
                this.activeScene = this.pbrScene;
                break;
            case SceneType.reflectScene:
                this.activeScene = this.reflectScene;
                break;
            case SceneType.glassScene:
                this.activeScene = this.glassScene;
            case SceneType.boliScene:
                this.activeScene = this.boliScene;
                break;
        }
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