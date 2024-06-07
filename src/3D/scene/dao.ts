
import { Engine, Scene, Color4, ArcRotateCamera, Vector3, HemisphericLight, Color3, MeshBuilder, HighlightLayer, PointsCloudSystem, ShaderMaterial, Mesh, NodeMaterial, TransformBlock, NodeMaterialSystemValues, VertexOutputBlock, ScaleBlock, AnimatedInputBlockTypes, VectorSplitterBlock, TrigonometryBlock, TrigonometryBlockOperations, VectorMergerBlock, SubtractBlock, MultiplyBlock, Vector2, OneMinusBlock, DotBlock, AddBlock, DivideBlock, FragmentOutputBlock, Camera, PostProcess, Effect, StandardMaterial, CubeTexture, Texture, HDRCubeTexture, SceneLoader, IsFileURL, GizmoManager, Curve3 } from "@babylonjs/core";
import { SceneManager } from "../scene";
import { LineMeshSysManager } from "./ribbon";
import { vector } from "echarts";

export function daoScene(engine: Engine, canvas: HTMLCanvasElement) {
  let scene = new Scene(engine);
  scene.clearColor = new Color4(0.2, 0.2, 0.2, 1)
  let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
    Vector3.Zero(), scene);
  camera.attachControl(canvas);
  camera.lowerRadiusLimit = 2;
  // let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
  let light2 = new HemisphericLight('light', new Vector3(0, 100, 0), scene);
  // scene.clearColor = Color3.FromHexString("#e5e5e5").toColor4();
  var groundMaterial = new StandardMaterial("groundMaterial", scene);
  // let texture = new Texture("xuanwo.png", scene);
  // groundMaterial.diffuseTexture = texture;
  // setTimeout(() => {
  //   texture.uScale += 0.01;
  // }, 30);
  // var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
  // ground.position.y = -1;
  // ground.material = groundMaterial;
  // const myPaths = [
  // 	[ 	new Vector3(5.0, 0, 0),
  // 		new Vector3(4.5, 1, 0),
  // 		new Vector3(4.0, 2, 0),
  // 		new Vector3(3.5, 3, 0),
  // 		new Vector3(3.0, 4, 0)
  // 	],
  // 	[	new Vector3(0, 0.0, -5),
  // 		new Vector3(0, 0.5, -7),
  // 		new Vector3(0, 1.0, -9),
  // 		new Vector3(0, 1.5, -11),
  // 		new Vector3(0, 2.0, -13)
  // 	],
  // 	[	new Vector3(-5.0, 0, 0),
  // 		new Vector3(-4.5, 1, 0),
  // 		new Vector3(-4.0, 2, 0),
  // 		new Vector3(-3.5, 3, 0),
  // 		new Vector3(-3.0, 4, 0)
  // 	]

  // ];
  // const mesh = MeshBuilder.CreateBox("1", { size: 1 }, scene);
  // mesh.position.y += 10;
  const path: Vector3[][] = []
  for (let i = 1; i < 10; i++) {
    const p1 = new Vector3(1, 0, i - 1);
    const center = new Vector3(0, Math.sqrt(i), i - 1);
    const p2 = new Vector3(-1, 0, i - 1);
    const besaier = Curve3.CreateQuadraticBezier(p1, center, p2, 20);
    const bladePath = besaier.getPoints();
    const backPath = [
      p2,
      new Vector3(-1, -1, i - 1),
      new Vector3(1, -1, i - 1),
    ];
    // bladePath.forEach((point) => {
    //   const mesh = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
    //   mesh.position = point;
    //   console.log(point);
    // })
    // const mesh2 = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
    // mesh2.position = new Vector3(-1, -1, i - 1);
    // const mesh3 = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
    // mesh3.position = new Vector3(1, -1, i - 1);

    path.push(
      [
        new Vector3(1, -1, i - 1),
        ...bladePath,
        new Vector3(-1, -1, i - 1),
        new Vector3(1, -1, i - 1),
        new Vector3(1, -1, i - 1),
      ]
    )
  }
  for (let i = 10; i < 20; i++) {
    const p1 = new Vector3(1, 0, i - 1);
    const center = new Vector3(0, Math.sqrt(20 - i), i - 1);
    const p2 = new Vector3(-1, 0, i - 1);
    const besaier = Curve3.CreateQuadraticBezier(p1, center, p2, 20);
    const bladePath = besaier.getPoints();
    const backPath = [
      p2,
      new Vector3(-1, -1, i - 1),
      new Vector3(1, -1, i - 1),
    ];
    // bladePath.forEach((point) => {
    //   const mesh = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
    //   mesh.position = point;
    //   console.log(point);
    // })
    // const mesh2 = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
    // mesh2.position = new Vector3(-1, -1, i - 1);
    // const mesh3 = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
    // mesh3.position = new Vector3(1, -1, i - 1);
    path.push(
      [
        new Vector3(1, -1, i - 1),
        ...bladePath,
        new Vector3(-1, -1, i - 1),
        new Vector3(1, -1, i - 1),
        new Vector3(1, -1, i - 1),
      ]
    )
  }
  for (let i = 20; i < 30; i++) {
    const p1 = new Vector3(1, 0, i - 1);
    const center = new Vector3(0, Math.sqrt(i), i - 1);
    const p2 = new Vector3(-1, 0, i - 1);
    const besaier = Curve3.CreateQuadraticBezier(p1, center, p2, 20);
    const bladePath = besaier.getPoints();
    const backPath = [
      p2,
      new Vector3(-1, -1, i - 1),
      new Vector3(1, -1, i - 1),
    ];
    // bladePath.forEach((point) => {
    //   const mesh = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
    //   mesh.position = point;
    //   console.log(point);
    // })
    // const mesh2 = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
    // mesh2.position = new Vector3(-1, -1, i - 1);
    // const mesh3 = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
    // mesh3.position = new Vector3(1, -1, i - 1);

    path.push(
      [
        new Vector3(1, -1, i - 1),
        ...bladePath,
        new Vector3(-1, -1, i - 1),
        new Vector3(1, -1, i - 1),
        new Vector3(1, -1, i - 1),
      ]
    )
  }
  let ribbon1 = MeshBuilder.CreateRibbon("ribbon", { pathArray: path, sideOrientation: 2, closePath: true, updatable: true });
  setTimeout(() => {
    for (let i = 30; i < 40; i++) {
      const p1 = new Vector3(1, 0, i - 1);
      const center = new Vector3(0, Math.sqrt(40 - i), i - 1);
      const p2 = new Vector3(-1, 0, i - 1);
      const besaier = Curve3.CreateQuadraticBezier(p1, center, p2, 20);
      const bladePath = besaier.getPoints();
      const backPath = [
        p2,
        new Vector3(-1, -1, i - 1),
        new Vector3(1, -1, i - 1),
      ];
      // bladePath.forEach((point) => {
      //   const mesh = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
      //   mesh.position = point;
      //   console.log(point);
      // })
      // const mesh2 = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
      // mesh2.position = new Vector3(-1, -1, i - 1);
      // const mesh3 = MeshBuilder.CreateBox("1", { size: 0.2 }, scene);
      // mesh3.position = new Vector3(1, -1, i - 1);
      path.push(
        [
          new Vector3(1, -1, i - 1),
          ...bladePath,
          new Vector3(-1, -1, i - 1),
          new Vector3(1, -1, i - 1),
          new Vector3(1, -1, i - 1),
        ]
      )
      ribbon1?.dispose();
      ribbon1 = MeshBuilder.CreateRibbon("ribbon", { pathArray: path, sideOrientation: 2, closePath: true, updatable: true });
    }
  }, 3000);
  // console.log("path:", path)





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
window.scene1.getScene().scene.meshes.forEach((mesh:Mesh)=>
{
  let metadata = manager.getMetadata(mesh);
  if(metadata.__glbUUID){
    mesh.dispose(true)
    mesh.visibility
  }
})
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

