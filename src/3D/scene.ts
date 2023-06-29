
import { AbstractMesh, ArcRotateCamera, Color3, Color4, Engine, GlowLayer, HemisphericLight, HtmlElementTexture, MeshBuilder, PBRMaterial, Scene, SceneLoader, Space, Texture, Vector3 } from "@babylonjs/core";
import { outLineAlphaByMesh } from "./shader";
import '@babylonjs/loaders'
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
import { textureScene } from "./scene/textureScene";
import { mapScene } from "./scene/mapScene";
import { Breadcrumb } from "ant-design-vue";
import { lineScene } from "./scene/lineScene";
import { LineSysManager } from "./lineSystem/lineSystemManager";
import { ChartsManager } from "./scene/charts";
import { prefabScene } from "./scene/prefabScene";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { Plane } from "@babylonjs/core/Maths/math.plane";
import { PBRBaseMaterial } from "@babylonjs/core/Materials/PBR/pbrBaseMaterial";
import { createCharts } from "./echarts";
import axios from "axios";
import { createHtmlMesh } from "./CSS3dRender";
import { createCharts2 } from "./charts/charts2";
import { createCharts3 } from "./charts/charts3";
import { createCharts4 } from "./charts/charts4";
import { ppScene } from "./scene/perferance";
export class SceneManager {
    public engine: Engine;
    public activeScene: Scene;
    public matList: Ishader[];
    public gl: GlowLayer | null = null;
    // public glScene: Scene;
    // public gradientScene: Scene;
    // public wireFrameScene: Scene;
    // public pbrScene: Scene;
    // public reflectScene: Scene;
    // public glassScene: Scene;
    public boliScene: Scene;
    public lineSysManager: LineSysManager;
    public mapScene: Scene;
    constructor(canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas);
        this.matList = [];
        // let scene = this.createScene(this.engine, canvas);
        // // this.glScene = textureScene(this.engine, canvas);
        // this.gradientScene = gradientMatScene(this.engine, canvas);
        // this.wireFrameScene = wireFrameScene(this.engine, canvas);
        // this.pbrScene = pbrScene(this.engine, canvas);
        // this.reflectScene = reflectScene(this.engine, canvas);
        // this.glassScene = glassScene(this.engine, canvas);

        this.boliScene = ppScene(this.engine, canvas);
        // this.mapScene = reflectScene(this.engine,canvas);
        this.activeScene = this.boliScene;

        this.engine.runRenderLoop(() => {
            this.activeScene.render();
        })
        // this.lineSysManager = new LineSysManager(this);
        // let a = new ChartsManager(this);
    }
    createScene(engine: Engine, canvas: HTMLCanvasElement) {
        let scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 1)
        let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
            Vector3.Zero(), scene);
        camera.attachControl(canvas);
        let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
        scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("country.env", scene);
        const plane = MeshBuilder.CreatePlane("plane", { size: 16 }, scene);
        const plane2 = MeshBuilder.CreatePlane("plane", { size: 16 }, scene);
        plane2.position.z = 16;

        plane.visibility = 1;
        const mat = new PBRMaterial("mat", scene);
        mat.metallic = 0;
        mat.roughness = 1.0;
        mat.albedoColor = Color3.White();
        plane.material = mat;
        this.initChartsPlane(plane)

        const mat2 = new PBRMaterial("mat", scene);
        mat2.metallic = 0;
        mat2.roughness = 1.0;
        mat2.albedoColor = Color3.Blue();
        plane2.material = mat2;

        var chartDom = document.getElementById('charts1') as HTMLCanvasElement;
        createCharts2();
        createCharts3();
        createCharts4();
        // createCharts5()
        const domCanvas = document.getElementById("chartsDiv");
        if (domCanvas) {
           const a =  createHtmlMesh(plane, canvas, domCanvas);
           window.a =a ;
        }
        // const domCanvas2 = document.getElementById("charts3");
        // if (domCanvas2) {
        //     createHtmlMesh(plane2, canvas, domCanvas2);
        // }

        // createHtmlMesh(plane,canvas,domCanvas)
        // let string1 = domCanvas.toDataURL();
        // let file1 = this.base64ImgtoFile(string1);
        // let imageURL = window.webkitURL.createObjectURL(file1) || window.URL.createObjectURL(file1);
        // let texture2 = new Texture(imageURL, scene);
        // mat.albedoTextur

        return scene
    }
    initChartsPlane(plane:AbstractMesh){
        const pivot = plane.getBoundingInfo().boundingBox.vectorsWorld[6];
        plane.setPivotPoint(pivot,Space.WORLD);
    }
    base64ImgtoFile(dataurl: any, filename = 'file') {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const suffix = mime.split('/')[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {
            type: mime
        })
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