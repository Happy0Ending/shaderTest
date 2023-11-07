import { Engine, Scene, ArcRotateCamera, Vector3, MeshBuilder, Color3, HemisphericLight, Texture, StandardMaterial, MultiMaterial, Mesh, GizmoManager } from "@babylonjs/core";
import { MeshTile } from "./tile.ts/tile";

export function createTianMap(engine: Engine, canvas: HTMLCanvasElement) {

  var scene = new Scene(engine);

  // Create a rotating camera
  var camera = new ArcRotateCamera("Camera", 4.8, 0.5, 100, Vector3.Zero(), scene);
  window.scene = scene;
  // Attach it to handle user inputs (keyboard, mouse, touch)
  camera.attachControl(canvas, false);
  camera.minZ = 0.001;
  camera.wheelPrecision = 0.1;



  const xAixs = MeshBuilder.CreateLines("x", {
    points: [
      new Vector3(0, 0, 0),
      new Vector3(1000, 0, 0)
    ], colors: [Color3.Red().toColor4(), Color3.Red().toColor4()]
  })
  xAixs.renderingGroupId = 2;


  let gizmo = new GizmoManager(scene);
  gizmo.positionGizmoEnabled = true;
 
  // camera.lowerBetaLimit = Math.PI/2;
  // camera.upperBetaLimit = 0;
  camera.panningAxis = new Vector3(10, 0, 10)
  const zAixs = MeshBuilder.CreateLines("z", {
    points: [
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 1000)
    ], colors: [Color3.Blue().toColor4(), Color3.Blue().toColor4()]
  })
  zAixs.renderingGroupId = 2;
  // Add a light
  var light = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
  light.specular = Color3.Black();
  // var multimat = new MultiMaterial("multi", scene);
  // var zoom = 9;
  function createTileMesh(imgUrl: { map: string }, mesh: Mesh) {

    const texture = new Texture(imgUrl.map, scene);

    const mat = new StandardMaterial("mat", scene);
    mat.diffuseTexture = texture;
    mat.backFaceCulling = false;
    // mat.emissiveTexture = texture;
    // &x=843&y=388&z=10
    mesh.material = mat;
  }
  const level = 3;
  const meshSize = 160;
  const everysize = meshSize / (2 ** (level - 3));
  console.log("everysize",everysize)
  const meshTiles: MeshTile[] = [];
  for (let i = 0; i < (2 ** level); i++) {
    for (let j = 0; j < (2 ** (level - 1)); j++) {
      // let img = getPic(i, j, level);
      var ground = MeshBuilder.CreateGround("ground", { width: everysize, height: everysize }, scene);
      ground.position.x += everysize / 2;
      ground.position.z -= everysize / 2;
      ground.bakeCurrentTransformIntoVertices();
      ground.position.x = -4*meshSize + (i) * everysize;
      ground.position.z = 2*meshSize - (j) * everysize;
      const meshTile = new MeshTile(ground,i,j);
      meshTiles.push(meshTile);
      // createTileMesh(img,ground);
    }
  }
  console.log("length",meshTiles.length)
  meshTiles.forEach((m)=>{
    m?.loadLOD();
  })
  // scene.onBeforeRenderObservable.add(()=>{
  //   camera.position.y = 10;
  // })
  // let level = 3;
  //当前窗口显示的范围
  // tianditu经纬度的切片地图范围为[-180,-90,180,90]
  // let minX = -180;
  // let maxX = 180;
  // let minY = -90;
  // let maxY = 90;
  // `https://t2.tianditu.gov.c
  // n/img_c/wmts?SERVICE=WMTS&REQUEST=
  // GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT
  // =tiles&TILECOL=0
  // &TILEROW=0&TILEMATRIX=1&tk=68d166cfe304fa077ff035bed00edc37`
  const initResolution = 360 / 512;
  function getPic(col: number, row: number, level: number) {
    // const city  =`http://t0.tianditu.gov.cn/DataServer?x=${col}&y=${row}&l=${level}&T=cva_w&tk=68d166cfe304fa077ff035bed00edc37`
    console.log(col, row)
    return {
      // city:city,
      map: `https://t2.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL=${col}&TILEROW=${row}&TILEMATRIX=${level}&tk=68d166cfe304fa077ff035bed00edc37`
    }
  }
  // `https://t2.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL=1&TILEROW=0&TILEMATRIX=1&tk=68d166cfe304fa077ff035bed00edc37`

  // const pic1 = ""
  // const minCol = ((minX - (-180)) / (initResolution / 2 ^ (level - 1))) / 256;
  // const minRow = -1 * ((maxY - 90) / (initResolution / 2 ^ (level - 1)) + 0.5) / 256;

  // const maxCol = ((maxX - (-180)) / (initResolution / 2 ^ (level - 1)) + 0.5) / 256;
  // const maxRow = -1 * ((minY - 90) / (initResolution / 2 ^ (level - 1))) / 256;
  // console.log(minCol,minRow,maxCol,maxRow)
  console.log("tianMap", (2 ** (level)), (2 ** (level - 1)))
  scene.onBeforeRenderObservable.add(() => {
    // if (meshTiles[0]) {
    //   console.log(meshTiles[0].getLodLevel());
    //   meshTiles[0].loadLOD();
    // }
    // meshTiles.forEach((m)=>{
    //   m?.loadLOD();
    // })
  })


  return scene;

}