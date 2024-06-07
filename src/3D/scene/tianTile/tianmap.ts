import { Engine, Scene, ArcRotateCamera, Vector3, MeshBuilder, Color3, HemisphericLight, Texture, StandardMaterial, MultiMaterial, Mesh, GizmoManager } from "@babylonjs/core";
import { MeshTile } from "./tianiles";
import { TileManager } from "./tileManager";

export function createTianTileMap(engine: Engine, canvas: HTMLCanvasElement) {

  var scene = new Scene(engine);

  // Create a rotating camera
  var camera = new ArcRotateCamera("Camera", 4.8, 0.5, 100, Vector3.Zero(), scene);
  camera.wheelDeltaPercentage = 0.1;

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

  const box = MeshBuilder.CreateSphere("123", { diameter: 10 }, scene);
  box.position = new Vector3(-640, 50, 320);
  let gizmo = new GizmoManager(scene);
  gizmo.positionGizmoEnabled = true;
  // new Vector3(0, 0, 0)
  // camera.lowerBetaLimit = Math.PI/2;
  // camera.upperBetaLimit = 0;
  camera.panningAxis = new Vector3(10, 50, 10)
  camera.position = new Vector3(0,8000,0);
  camera.radius = 8000;
  
  const zAixs = MeshBuilder.CreateLines("z", {
    points: [
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 1000)
    ], colors: [Color3.Blue().toColor4(), Color3.Blue().toColor4()]
  })
  zAixs.getBoundingInfo().boundingBox.vectors

  zAixs.renderingGroupId = 2;
  // Add a light
  var light = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
  light.specular = Color3.Black();
  const tileManager = new TileManager(scene);
  return scene;
}