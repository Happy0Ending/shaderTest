import { Engine, Scene, Color4, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, AxesViewer } from "@babylonjs/core";
import { MeshTile } from "./tile.ts/tile";
import axios from "axios";



export function tileScene(engine: Engine, canvas: HTMLCanvasElement) {
  let scene = new Scene(engine);
  scene.clearColor = new Color4(0, 0, 0, 1)
  let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
    Vector3.Zero(), scene);
  camera.attachControl(canvas);
  camera.lowerRadiusLimit = 2;
  camera.radius = 100
  // let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
  let light2 = new HemisphericLight('light', new Vector3(0, 100, 0), scene);
  // scene.s
  light2.intensity = 0.5
  const size = 16
  new AxesViewer(scene, 10);

  const TileMeshes: MeshTile[] = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      let originMesh = MeshBuilder.CreateGround("origin" + (i * 4 + j), { width: size, height: size }, scene);
      originMesh.metadata = {};
      MeshTile.InitMeshPovit(originMesh);
      originMesh.visibility = 0;
      originMesh.position.x += size * i;
      originMesh.position.z += size * j;
      const meshTile = new MeshTile(originMesh);
      TileMeshes.push(meshTile);
    }
  }
  // fetch("https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}")


  // const createBox = MeshBuilder.CreateBox("origin", { width: size, height: size }, scene);
  // for (let index = 0; index < 5; index++) {
  //   const lodMesh = originMesh.clone("lod1"+index);
  //   lodMesh.position.x = index; 
  //   originMesh.addLODLevel(200,lodMesh);
  // }
  // for (let i = 0; i < 16; i++) {
  //   for (let j = 0; j < 16; j++) {
  //     let ground = MeshBuilder.CreateGround("tile" + i * 16 + j, { width: size, height: size }, scene);

  //     if (!ground.metadata) {
  //       ground.metadata = {}
  //     }
  //     ground.metadata.size = size;
  //     ground.name = "tile" + i * 16 + j;
  //     ground.position.x += size * 0.5;
  //     ground.position.z += size * 0.5;
  //     ground.bakeCurrentTransformIntoVertices();
  //     ground.position = new Vector3(i * size, 0, j * size);
  //   }
  // }

  window.scene = scene;
  fetch("https://webst04.is.autonavi.com/appmaptile?style=6&x=1&y=3&z=2", { method: 'get' }).then((data) => {
    console.log(data);
    data.text().then((aa) => {
      console.log(aa)
    });
  })
  // axios.post("https://webst01.is.autonavi.com/appmaptile?style=7&x={5}&y={6}&z={7}").then((data)=>{
  //   console.log(data);
  // })
  scene.onBeforeCameraRenderObservable.add(() => {
    // scene.meshes.forEach((mesh)=>{
    //   if(camera.getActiveMeshes())
    // })
    TileMeshes.forEach((TileMesh) => {
      TileMesh.loadLOD();
    })
    // TileMeshes[0].loadLOD();            
  });
  // onMou

  return scene
}