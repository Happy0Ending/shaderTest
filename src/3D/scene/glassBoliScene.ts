import { Engine, Scene, Color4, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, PBRMaterial, CubeTexture, Texture, SceneLoader, ShaderMaterial, AbstractMesh, Effect, Color3, FollowCamera, Mesh, ArcFollowCamera } from "@babylonjs/core";
import { time } from "echarts";

export function boliScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);

    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    let light = new HemisphericLight('light', new Vector3(0, 100, 0), scene);
    light.intensity = 0.5;
    // // Skybox
    // var skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
    // var skyboxMaterial = new StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new CubeTexture("country.env", scene);

    scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("country.env", scene);
    const box = MeshBuilder.CreateBox("box", { size: 4 }, scene);
    const ground = MeshBuilder.CreateGround("ground", { width: 1000, height: 1000 }, scene);
    const mat = new PBRMaterial("123", scene);
    const texture = new Texture("/img/地面网格1.png", scene);
    texture.hasAlpha = true;
    mat.albedoTexture = texture;
    mat.roughness = 1.0;
    mat.metallic = 0.0;
    mat.useAlphaFromAlbedoTexture = true;
    texture.vScale = 10;
    texture.uScale = 10;
    ground.material = mat;



    console.time("load111");
    // console.time("地下一层");
    enum Directioin {
        FORWARD = 0,
        LEFT = 1,
        BACK = 2,
        RIGHT = 3,
        stop = 4,
    }
    const RUNFLAG = {
        FORWARD: false,
        LEFT: false,
        BACK: false,
        RIGHT: false,
    }

    SceneLoader.LoadAssetContainer("/", "wr.glb", scene, (container) => {

        container.addAllToScene();
        let root = container.meshes[0];
        container.meshes[0].scaling.scaleInPlace(3);
        root.rotationQuaternion = null;
        // root.rotation = new Vector3(0,-Math.PI,0);
        let followCamera = new ArcRotateCamera("follow", Math.PI / 2, 0, 10, root.position, scene);
        followCamera.attachControl();

        followCamera.lowerRadiusLimit = 20;
        followCamera.upperRadiusLimit = 50;
        followCamera.upperBetaLimit = Math.PI/2;
        followCamera.lowerBetaLimit = Math.PI/3
        followCamera.targetHost = root;
        let runFlag = 4;
        const setTransform = (type: string, directionStr: Directioin, runStr: string) => {
            if (type == "keydown") {
                scene.animationGroups[0].stop();
                if (!scene.animationGroups[1].isPlaying) {
                    scene.animationGroups[1].start(true);
                }
                runFlag = directionStr;
                let rayDir = Vector3.Normalize(Vector3.FromArray([followCamera.getForwardRay().direction.x, 0, followCamera.getForwardRay().direction.z]));
                root.lookAt(root.position.add(rayDir.scale(-1)));
                root.rotate(new Vector3(0, 1, 0), directionStr * Math.PI * -0.5);
            } else {
                let flag: boolean = RUNFLAG.FORWARD || RUNFLAG.LEFT || RUNFLAG.RIGHT || RUNFLAG.BACK;
                // console.log("是否停止动画", flag)
                if (!flag) {
                    scene.animationGroups[1].stop();
                    scene.animationGroups[0].start();
                    runFlag = 4;
                }
            }
        }

        const setFlag = (type: string, directionStr: string) => {
            if (type == "keydown") {
                (<any>RUNFLAG)[directionStr] = true;
                // Object.keys(RUNFLAG).filter(str => str!=directionStr).forEach((str)=>{
                //     (<any>RUNFLAG)[str] = false;
                // })
            } else {
                (<any>RUNFLAG)[directionStr] = false;
                if(directionStr == "LEFT"||directionStr == "RIGHT"){
                    if(RUNFLAG.FORWARD){
                        setTransform("keydown", Directioin.FORWARD, "FORWARD");
                    }
                    if(RUNFLAG.BACK){
                        setTransform("keydown", Directioin.BACK, "BACK");
                    }
                }
            }
        }


        scene.onKeyboardObservable.add((e, es) => {
            // console.log("eventState",es)
            if (e.event.code) {
                switch (e.event.code) {
                    case "KeyW": setFlag(e.event.type, "FORWARD"); setTransform(e.event.type, Directioin.FORWARD, "FORWARD"); break;
                    case "KeyA": setFlag(e.event.type, "LEFT"); setTransform(e.event.type, Directioin.LEFT, "LEFT"); break;
                    case "KeyS": setFlag(e.event.type, "BACK"); setTransform(e.event.type, Directioin.BACK, "BACK"); break;
                    case "KeyD": setFlag(e.event.type, "RIGHT"); setTransform(e.event.type, Directioin.RIGHT, "RIGHT"); break;
                }
            }
        })
        scene.onBeforeCameraRenderObservable.add(() => {
            switch (runFlag) {
                case Directioin.FORWARD:
                    root.position.addInPlace(Vector3.FromArray([followCamera.getForwardRay().direction.x, 0, followCamera.getForwardRay().direction.z]).scale(0.2));
                    break;
                case Directioin.BACK:
                    root.position.addInPlace(Vector3.FromArray([followCamera.getForwardRay().direction.x, 0, followCamera.getForwardRay().direction.z]).scale(-0.2));
                    break;
                case Directioin.LEFT:
                    root.position.addInPlace(Vector3.FromArray([followCamera.getForwardRay().direction.z, 0, -followCamera.getForwardRay().direction.x]).scale(-0.2));
                    break;
                case Directioin.RIGHT:
                    root.position.addInPlace(Vector3.FromArray([followCamera.getForwardRay().direction.z, 0, -followCamera.getForwardRay().direction.x]).scale(0.2));
                    break;
                default:
                    break;
            }

        })
        // followCamera.target = root.position;
        scene.activeCamera = followCamera;
        // console.time("地下二层");
        // SceneLoader.LoadAssetContainer("地铁model2/", "地下二层.glb", scene, (container1) => {
        //     container1.addAllToScene();
        //     console.timeEnd("地下二层");
        //     // // console.timeEnd("地下二层");
        //     console.time("地铁层");
        //     SceneLoader.LoadAssetContainer("地铁model2/", "地铁层.glb", scene, (container2) => {
        //         container2.addAllToScene();
        //         console.timeEnd("地铁层");
        //         console.timeEnd("load111");
        //     })
        // })
    })






    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;
    // console.time("load");
    // SceneLoader.LoadAssetContainer("/地铁model/","地铁层.glb",scene,(container)=>{
    //     container.addAllToScene();
    //     console.timeEnd("load");
    // 
    return scene
}

export function createShaderMaterial(mesh: AbstractMesh) {
    const scene = mesh.getScene();
    Effect.ShadersStore["heatMapV"] =

        `precision highp float;
       //attribute
       attribute vec3 position;
       attribute vec2 uv;
       attribute vec3 normal;
       //uniform
       uniform mat4 worldViewProjection;
       //varying
       varying vec3 vPosition;
       varying vec2 vUV;
       void main(void) {
          gl_Position = worldViewProjection*vec4(position,1.0);
          vPosition = position;
          vUV = uv;
       }`;
    Effect.ShadersStore["heatMapF"] =
        ` precision highp float;
       varying vec3 vPosition;
       uniform float distance;
       uniform vec3 changeColor;
       uniform vec3 center;
       uniform float pow;
       float distanceTwoVec3(vec3 p1,vec3 p2){
          float d = sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)+(p1.z-p2.z)*(p1.z-p2.z));
          return d;
       }
       void main(void) {
      
          gl_FragColor = vec4(0,0,1.0,1.0);
       }`;
    let mat = new ShaderMaterial(
        mesh.name,
        scene,
        {
            vertex: "heatMapV",
            fragment: "heatMapF",
        },
        {
            attributes: ["normals", "position", "uv"],
            uniforms: [
                "world",
                "worldView",
                "worldViewProjection",
                "view",
                "projection",
            ],
            needAlphaBlending: true,
            needAlphaTesting: true,
        }
    );
    mat.name = "shader" + mesh.name;

    return mat;
}