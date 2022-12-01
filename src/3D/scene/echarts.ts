
import { Engine, Scene, Color4, ArcRotateCamera, Vector3, HemisphericLight, Color3, MeshBuilder, HighlightLayer, PointsCloudSystem, ShaderMaterial, Mesh, NodeMaterial, TransformBlock, NodeMaterialSystemValues, VertexOutputBlock, ScaleBlock, AnimatedInputBlockTypes, VectorSplitterBlock, TrigonometryBlock, TrigonometryBlockOperations, VectorMergerBlock, SubtractBlock, MultiplyBlock, Vector2, OneMinusBlock, DotBlock, AddBlock, DivideBlock, FragmentOutputBlock, Camera, PostProcess, Effect, StandardMaterial, CubeTexture, Texture, HDRCubeTexture, SceneLoader, IsFileURL, GizmoManager } from "@babylonjs/core";
import { InputBlock } from "@babylonjs/core/Materials/Node/Blocks/Input/inputBlock";
import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";
import { Space } from "ant-design-vue";

import { BUNNY } from "../../store/pointCloud";
import { SceneManager } from "../scene";
import { createNodeMaterial, DataString2, DataString3, nodeMaterial2 } from "./nodeMaterial";
import { LineMeshSysManager } from "./ribbon";


export function lineScene(engine: Engine, canvas: HTMLCanvasElement, root: SceneManager) {
    let scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
    let light2 = new HemisphericLight('light', new Vector3(0, 100, 0), scene);
    scene.clearColor = Color3.FromHexString("#e5e5e5").toColor4();
    var groundMaterial = new StandardMaterial("groundMaterial", scene);
	groundMaterial.diffuseTexture = new Texture("xuanwo.png", scene);

	var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
	ground.position.y = -1;
	ground.material = groundMaterial;
    var skybox = Mesh.CreateBox("skyBox", 500.0, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new HDRCubeTexture("night.hdr", scene, 256, false, true, false, true);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    let lineMesh = new LineMeshSysManager(scene);
    const box = MeshBuilder.CreateBox("box1", { size: 2 }, scene);
    const box2 = MeshBuilder.CreateBox("box1", { size: 2 }, scene);
    box2.position.x = 20;
    const box3 = MeshBuilder.CreateBox("box1", { size: 2 }, scene);
    box3.position.z = 20;
    const box4 = MeshBuilder.CreateBox("box1", { size: 2 }, scene);
    box4.position.x = 20;
    box4.position.z = 20;
    const gizmo = new GizmoManager(scene);
    gizmo.positionGizmoEnabled = true;
    // gizmo.gizmos.positionGizmo?.onDragEndObservable.add(()=>{
    //     root.lineSysManager.updataLines();
    // })
    // scene.onPointerDown = (e,p)=>{
    //     if(p.hit){
    //         gizmo.attachToNode(p.pickedMesh);
    //     }
    // }
    // const fullUI = AdvancedDynamicTexture.CreateFullscreenUI("fullUI",true,scene);

    // for (let index = 0; index < 6000; index++) {
    //     let button = new Button("test"+index);
    //     button.width ="10%";
    //     button.height ="10%";
    //     button.background = "blue";
    //     button.left = Math.random()*500;
    //     button.top = Math.random()*500;
    //     fullUI.addControl(button);
    // }
    // button.onPointerClickObservable.add(()=>{
    //     root.lineSysManager.isMark = true;
    // })
    return scene;
}

function blackPostProgress(scene: Scene, camera: Camera) {


    Effect.ShadersStore["blackFragmentShader"] = `
    #ifdef GL_ES
    precision highp float;
    #endif
    // Samplers
    varying vec2 vUV;
    uniform sampler2D textureSampler;

    // Parameters
    uniform vec2 screenSize;
    uniform float threshold;

    void main(void) 
    {
        
        vec4 baseColor = texture2D(textureSampler,vUV);
        //Red * 0.299 + Green * 0.587 + Blue * 0.114
        float avarage= mix(baseColor.r,baseColor.g,baseColor.b);
        baseColor.r = avarage;
        baseColor.g = avarage;
        baseColor.b = avarage;
        gl_FragColor = baseColor;
        
    }
    `
    const postProcess = new PostProcess("black", "black", ["screenSize", "threshold"], null, 1, camera);

    postProcess.onApply = (effect) => {
        // effect.setFloat2("screenSize", postProcess.width, postProcess.height);
        // effect.setFloat("threshold", 0.30);
        // const texture = new Texture("xuanwo.png", scene);
        // effect.setTexture("textureSampler", texture);
        // effect.setTexture("mainTexture", texture);
        // effect.setFloat2("screenSize", postProcess.width, postProcess.height);
    }
    return postProcess;

}

/**
 * 经纬度转xyz
 * @param longitude 经度
 * @param latitude 纬度
 * @param radius 半径
 */
function lglt2xyz(longitude: number, latitude: number, radius: number) {
    var lg = (longitude) * Math.PI / 180, lt = latitude * Math.PI / 180;
    var y = radius * Math.sin(lt);
    var temp = radius * Math.cos(lt);
    var x = temp * Math.sin(lg);
    var z = temp * Math.cos(lg);
    return { x: x, y: y, z: z }
}
export function XYZ2Vec3(data: string) {
    const vec3List: Vector3[] = []
    const lists = data.split("\n");
    lists.forEach((list, index) => {
        const xyzs = list.split("\t");
        if (xyzs[0]) {
            vec3List.push(Vector3.FromArray([Number(xyzs[0]), Number(xyzs[1]), Number(xyzs[2])]));
        }
    })
    return vec3List;
}
export function XYZ2num(data: string) {
    const numbers: number[] = []
    const lists = data.split("\n");
    lists.forEach((list, index) => {

        const xyzs = list.split("\t");
        xyzs.forEach((x) => {
            if (x) {
                numbers.push(Number(x));
            }
        })
    })
    return numbers;
}

