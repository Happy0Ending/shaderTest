import { Engine, Scene, ArcRotateCamera, Vector3, MeshBuilder, Color3, HemisphericLight, Texture, StandardMaterial, MultiMaterial, Mesh, GizmoManager } from "@babylonjs/core";
import { MeshTile } from "./tile.ts/tile";

export function createTianMap(engine: Engine, canvas: HTMLCanvasElement) {

  var scene = new Scene(engine);

  // Create a rotating camera
  var camera = new ArcRotateCamera("Camera", 4.8, 0.5, 100, Vector3.Zero(), scene);
  camera.wheelDeltaPercentage = 0.1;
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
  scene.onPointerDown = (e, p) => {
    if (p.hit) {
      console.log(p.pickedPoint);
    }
  }
  const box = MeshBuilder.CreateSphere("123", { diameter: 10 }, scene);
  box.position = new Vector3(-640, 50, 320);
  // let gizmo = new GizmoManager(scene);
  // gizmo.positionGizmoEnabled = true;

  // camera.lowerBetaLimit = Math.PI/2;
  // camera.upperBetaLimit = 0;
  camera.panningAxis = new Vector3(10, 50, 10)
  camera.radius = 800;
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
  light.intensity = 0.5;
  // var multimat = new MultiMaterial("multi", scene);
  // var zoom = 9;
  function getPic(col: number, row: number, level: number) {
    // const city = `http://t0.tianditu.gov.cn/DataServer?x=${col}&y=${row}&l=${level}&T=ibo_c&tk=68d166cfe304fa077ff035bed00edc37`
    // console.log(col, row)
    // const a = "https://t0.tianditu.gov.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=tk"
    // var imgURL2 ="http://t0.tianditu.gov.cn/ibo_c/wmts?" +     "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
    // `&TILEMATRIX=${level}&TILEROW=${row}&TILECOL=${col}` +
    // `&tk=68d166cfe304fa077ff035bed00edc37`;//

    return {
      // city:city,
      city: `/biaozhu/${level}/${col}-${row}.png`,
      map: `/map/${level}/${col}-${row}.png`
    }
  }
  function createTileMesh(imgUrl: { map: string, city?: string }, mesh: Mesh) {

    const texture = new Texture(imgUrl.map, scene);
    const texture2 = new Texture(imgUrl.map!, scene);
    texture2.hasAlpha = true;
    texture2.getAlphaFromRGB = true;
    texture2.gammaSpace = true;
    // texture2.

    // texture2.hasAlpha = true
    // texture.getAlphaFromRGB = true;
    // texture2.getAlphaFromRGB = true;
    // texture2.hasAlpha = true;
    console.time("createStandard!")
    const mat = new StandardMaterial("mat", scene);
    console.timeEnd("createStandard!")
    mat.diffuseTexture = texture2;
    // mat.emissiveTexture = texture2;
    // mat.useEmissiveAsIllumination = true;
    // mat.linkEmissiveWithDiffuse = true;
    // mat.lightmapTexture = texture2;
    // // mat.useAlphaFromDiffuseTexture = false
    // mat.useEmissiveAsIllumination = false;
    // mat.useLightmapAsShadowmap = true;
    // mat.use
    // mat.separateCullingPass = true;
    // mat.backFaceCulling = false;
    // mat.useLightmapAsShadowmap = true 
    // &x=843&y=388&z=10
    mesh.material = mat;
    return mat;
  }
  const level = 3;
  const meshSize = 160;
  const everysize = meshSize / (2 ** (level - 3));
  console.log("everysize", everysize)
  const meshTiles: MeshTile[] = [];
  const originPost = {
    x: -640,
    z: 320,
    lat: -180,
    lon: 90,
  }
  const bj = {
    lat: 115,
    lon: 39
  }
  const dlat = bj.lat - originPost.lat
  const dlon = bj.lon - originPost.lon

  const bj1 = MeshBuilder.CreateLines("z", {
    points: [
      new Vector3(-640, 50, 320).add(new Vector3(dlat, 0, dlon).scale(640 / 180)),
      new Vector3(-640, 500, 320).add(new Vector3(dlat, 0, dlon).scale(640 / 180))
    ], colors: [Color3.Random().toColor4(), Color3.Random().toColor4()]
  })

  // bj1.position = new Vector3(-640,50,320).add(new Vector3(dlat,0,dlon).scale(640/180));

  MeshTile.Mesh = MeshBuilder.CreateGround("ground", { width: everysize, height: everysize }, scene);

  MeshTile.Mesh.position.x += everysize / 2;
  MeshTile.Mesh.position.z -= everysize / 2;
  MeshTile.Mesh.bakeCurrentTransformIntoVertices();
  MeshTile.Mesh.visibility = 0;
  MeshTile.meshSize = 160;
  for (let i = 0; i < (2 ** level); i++) {
    // let a = setTimeout(() => { 
    for (let j = 0; j < (2 ** (level - 1)); j++) {
      let meshes = []
      let img = getPic(i, j, level);
      var ground = MeshBuilder.CreateGround("ground", { width: everysize, height: everysize }, scene);
      ground.position.x += everysize / 2;
      meshes.push(ground);
      ground.position.z -= everysize / 2;
      ground.bakeCurrentTransformIntoVertices();
      ground.position.x = -4 * meshSize + (i) * everysize;
      ground.position.z = 2 * meshSize - (j) * everysize;
      // console.log(ground.position.asArray());
      // const meshTile = new MeshTile([-4 * meshSize + (i) * everysize, 2 * meshSize - (j) * everysize], i, j, MeshTile.meshSize/(2**level));
      // meshTiles.push(meshTile);
      createTileMesh(img, ground);
      // Mesh.MergeMeshes(meshes,true,undefined,undefined,false,true);
    }
    //   clearTimeout(a);
    // }, i*100);
  }
  console.log("meshTiles", meshTiles)
  // console.log("length",meshTiles.length)
  // meshTiles.forEach((m)=>{
  //   m?.loadLOD();
  // })
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


  meshTiles.forEach((m) => {
    m?.loadLOD();
  })
  // `https://t2.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL=1&TILEROW=0&TILEMATRIX=1&tk=68d166cfe304fa077ff035bed00edc37`

  // const pic1 = ""
  // const minCol = ((minX - (-180)) / (initResolution / 2 ^ (level - 1))) / 256;
  // const minRow = -1 * ((maxY - 90) / (initResolution / 2 ^ (level - 1)) + 0.5) / 256;

  // const maxCol = ((maxX - (-180)) / (initResolution / 2 ^ (level - 1)) + 0.5) / 256;
  // const maxRow = -1 * ((minY - 90) / (initResolution / 2 ^ (level - 1))) / 256;
  // console.log(minCol,minRow,maxCol,maxRow)
  console.log("tianMap", (2 ** (level)), (2 ** (level - 1)))
  // camera.onViewMatrixChangedObservable.add(() => {
  //   // if(camera.)
  //   // Vector3
  //   console.log("camera view");
  //   meshTiles.forEach((m) => {
  //     m?.loadLOD();
  //   })
  // })
  // scene.onBeforeRenderObservable.add(() => {
  //   // if (meshTiles[0]) {
  //   //   console.log(meshTiles[0].getLodLevel());
  //   //   meshTiles[0].loadLOD();
  //   // }

  //   meshTiles.forEach((m) => {
  //     m?.loadLOD();
  //   })

  // })


  return scene;

}