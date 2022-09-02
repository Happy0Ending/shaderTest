import { ArcRotateCamera, Color3, Color4, CubeTexture, Effect, Engine, GlowLayer, HemisphericLight, Mesh, MeshBuilder, PostProcess, Scene, ShaderMaterial, StandardMaterial, Vector3 } from "babylonjs";
import { AdvancedDynamicTexture, ColorPicker, Rectangle, Slider, TextBlock } from "babylonjs-gui";
import { string } from "vue-types";
import { gradientMat } from "../shader";

export function mapScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
    scene.clearColor = Color3.FromHexString("#e5e5e5").toColor4();
    // Skybox
    // var skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
    // var skyboxMaterial = new StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new CubeTexture("country.env", scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;


    const dataString =
        `year,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20,t21,t22,t23,t24,t25,t26,t27,t28,t29,t30,t31
    2017,29,29,28,27,27,26,26,26,26,27,29,29,28,28,29,31,32,33,34,35,35,35,36,37,37,35,35,34,34,33,31
2016,28,28,27,26,26,25,25,25,25,26,27,27,28,28,29,30,31,32,33,34,34,35,36,37,36,34,34,33,33,32,31
2015,27,27,27,26,25,25,25,25,25,25,27,27,27,27,28,29,30,31,32,33,33,34,35,36,35,34,33,32,32,31,30
2014,27,27,27,26,25,25,25,25,25,25,26,26,27,26,27,28,29,30,31,32,32,33,35,35,34,33,32,31,31,30,29
2013,27,27,27,26,25,25,25,25,26,25,27,27,27,27,28,29,30,31,32,33,33,34,35,36,35,34,33,32,32,31,30
2012,28,28,27,26,26,25,25,25,25,26,27,27,28,28,29,30,31,32,33,34,34,35,36,37,36,34,34,33,33,32,31
2011,29,29,28,27,27,26,26,26,26,27,29,29,28,28,29,31,32,33,34,35,35,35,36,37,37,35,35,34,34,33,31
2010,30,30,29,28,28,27,27,27,27,28,30,30,29,29,30,31,32,34,35,36,36,36,37,36,36,35,36,34,33,32,30
2009,31,31,30,29,29,28,28,28,28,29,31,31,30,30,31,32,33,34,35,36,37,37,37,36,35,35,34,33,32,31,29
2008,32,32,31,30,30,29,29,29,29,30,32,32,31,31,32,33,34,35,36,37,37,37,37,37,35,35,34,32,31,30,29
2007,32,32,31,30,30,29,29,29,29,30,32,32,31,31,32,33,34,35,36,37,37,37,37,37,35,35,34,32,31,30,29
2006,30,30,29,28,28,27,27,27,27,28,30,30,29,29,30,31,32,34,35,36,36,36,37,36,36,35,36,34,33,32,30`
    let stringList = CSVdataStringToVector3List(dataString);
    const xList: number[] = [];
    stringList[0].forEach((string) => {
        string.split("t").length > 1 && xList.push(Number(string.split("t")[1]));
    })
    console.log("stringList", stringList);
    const positionList: Vector3[][] = []
    for (let i = 1; i < stringList.length; i++) {//z
        //X
        positionList[i - 1] = [];
        xList.forEach((x) => {
            positionList[i - 1].push(new Vector3(x, Number(stringList[i][x]), i));
        })
    }
    const ribbon = MeshBuilder.CreateRibbon("ribbon", { pathArray: positionList, sideOrientation: 2, updatable: true }, scene)
    ribbon.position.x = 0;
    ribbon.position.z = 0;
    let shaderMat = colorShader("temp", scene);
    ribbon.material = shaderMat;
    camera.setTarget(ribbon);

    return scene
}
export function CSVdataStringToVector3List(data: string) {
    let number = data.split("\n");

    const stringList: string[][] = []

    number.forEach((value) => {
        stringList.push(value.split(","));
    })
    return stringList;
}
export function colorShader(name: string, scene: Scene) {

    Effect.ShadersStore[`${name}VertexShader`] =
        `
     precision highp float;
   //attribute
   attribute vec3 position;
   attribute vec2 uv;
   attribute vec3 normal;
   uniform mat4 worldViewProjection;
   varying vec3 vPosition;
    varying vec2 vUV;
    varying vec3 vNormal;
    void main(void) {
       gl_Position = worldViewProjection*vec4(position,1.0);
       vPosition = position;
       vUV = uv;
       vNormal = normal;
    }
    `

    Effect.ShadersStore[`${name}FragmentShader`] =
        `
        precision highp float;
        varying vec3 vPosition;
        varying vec3 vUV;
        varying vec3 vNormal;
        vec HSVToRGB(float h,float s,float v){
            
        }
        vec3 transformColor(float height){
            // 颜色从deca71变化到deFF71 d:14 e:15 C:13 a:11 
            //颜色变化从25到40;
            // 冷红色：H330 S100 B100
            // 黄 色：H45   S100 B100
            float h = 3.6*height-45.0 ;
            float s = 100 ;
            float v = 100;

            vec3 color;
            
            return color;
        }
        void main(void) {
        vec3 color = transformColor(vPosition.y);
           gl_FragColor = vec4(color,1.0);
        }
    `
    let mat = new ShaderMaterial("shader", scene, {
        vertex: name,
        fragment: name
    }, {
        attributes: ["normal", "position", 'uv'],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
        // needAlphaBlending: true,
        // needAlphaTesting: true
    })
    return mat;
}