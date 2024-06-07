import { Engine, Scene, ArcRotateCamera, Vector3, MeshBuilder, Color3, HemisphericLight, Texture, StandardMaterial, MultiMaterial, Mesh, GizmoManager, SceneLoader, FresnelParameters, CubeTexture, PointLight, Color4, DirectionalLight, GlowLayer, PositionGizmo } from "@babylonjs/core";

import "@babylonjs/loaders"
import { TubeManager } from "./tubeManager";

export var tubeScene = function (engine:Engine,canvas:HTMLCanvasElement) {
  var scene = new Scene(engine);
  var camera = new ArcRotateCamera("Camera", 0, 0, 10, Vector3.Zero(), scene);
  // var startSphere = Mesh.CreateSphere("Sphere1", 32, 1, scene);
  scene.clearColor = Color3.Gray().toColor4();
  // var sphere2 = Mesh.CreateSphere("Sphere2", 32, 2, scene);
  // var sphere3 = Mesh.CreateSphere("Sphere3", 32, 3, scene);
  // var sphere4 = Mesh.CreateSphere("Sphere4", 32, 4, scene);
  // var sphere5 = Mesh.CreateSphere("Sphere5", 32, 5, scene);
  // var light = new PointLight("Omni0", new Vector3(-17.6, 18.8, -49.9), scene);
  // let gizmo = new GizmoManager(scene);
  // gizmo.positionGizmoEnabled = true;
  // gizmo.attachToMesh(startSphere);
  // scene.onKeyboardObservable.add((e)=>{
  //   console.log(e)
  //   if(e.event.key==="c"&&e.type===2){
      
  //     var sphere = Mesh.CreateSphere("Sphere1", 32, 1, scene);

  //     sphere.position = startSphere.getAbsolutePosition().clone();
  //   }
    
  // })
  var light = new DirectionalLight("123",new Vector3(1,-10,1),scene)
  light.intensity = 1;
  light.specular = Color3.Black();
  camera.setPosition(new Vector3(-15, 3, 0));
  // camera.setTarget(sphere1)
  camera.attachControl(canvas, true);
  new TubeManager(scene)
  return scene;
}