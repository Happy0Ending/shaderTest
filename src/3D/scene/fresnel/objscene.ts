import { Engine, Scene, ArcRotateCamera, Vector3, MeshBuilder, Color3, HemisphericLight, Texture, StandardMaterial, MultiMaterial, Mesh, GizmoManager, SceneLoader, FresnelParameters, CubeTexture, PointLight, Color4, DirectionalLight, GlowLayer } from "@babylonjs/core";

import "@babylonjs/loaders"
import {  fresnelLoader } from "./objMaterial";

export var OBJScene = function (engine:Engine,canvas:HTMLCanvasElement) {
  var scene = new Scene(engine);
  var camera = new ArcRotateCamera("Camera", 0, 0, 10, Vector3.Zero(), scene);
  var material = new StandardMaterial("kosh", scene);
  var sphere1 = Mesh.CreateSphere("Sphere1", 32, 1, scene);
  scene.clearColor = Color3.Gray().toColor4();
  // var sphere2 = Mesh.CreateSphere("Sphere2", 32, 2, scene);
  // var sphere3 = Mesh.CreateSphere("Sphere3", 32, 3, scene);
  // var sphere4 = Mesh.CreateSphere("Sphere4", 32, 4, scene);
  // var sphere5 = Mesh.CreateSphere("Sphere5", 32, 5, scene);
  // var light = new PointLight("Omni0", new Vector3(-17.6, 18.8, -49.9), scene);
  var light = new DirectionalLight("123",new Vector3(1,-10,1),scene)
  light.intensity = 1;
  light.specular = Color3.Black();
  camera.setPosition(new Vector3(-15, 3, 0));
  camera.attachControl(canvas, true);

  // sphere2.position.z -= 5;
  // sphere3.position.z += 5;
  // sphere4.position.x += 5;
  // sphere5.position.x -= 5;
  // let lay = new  GlowLayer("layers",scene);

  // Sphere1 material
  // material.reflectionTexture = new CubeTexture("textures/TropicalSunnyDay", scene);
  // material.diffuseColor = new Color3(0, 0, 0);
  material.emissiveColor =  Color3.FromHexString("#00A8FF");
  material.linkEmissiveWithDiffuse = true;
  material.alpha = 1;
  // material.specularPower = 16;

  // Fresnel
  // material.reflectionFresnelParameters = new FresnelParameters();
  // material.reflectionFresnelParameters.bias = 0.1;
  let texture = new Texture("tiaowen2.png",scene);
  // material.emissiveTexture = texture;
  // material.linkEmissiveWithDiffuse = true
  texture.vScale = -1;

  material.emissiveFresnelParameters = new FresnelParameters();
  material.emissiveFresnelParameters.bias = 0.35;
  material.emissiveFresnelParameters.power =1;

  material.emissiveFresnelParameters.leftColor = Color3.FromHexString("#00A8FF");
  material.diffuseFresnelParameters = new FresnelParameters();
  material.diffuseFresnelParameters.bias = 0.35;
  material.diffuseFresnelParameters.power =1;

  material.diffuseFresnelParameters.leftColor = Color3.FromHexString("#00A8FF");
  material.emissiveFresnelParameters.rightColor = Color3.FromArray([0.1,0.1,0.1]);

  material.opacityFresnelParameters = new FresnelParameters();
  material.opacityFresnelParameters.power = 0.25;
  material.opacityFresnelParameters.bias = 0.25;
  material.opacityFresnelParameters.leftColor = Color3.FromHexString("#00A8FF");
  material.opacityFresnelParameters.rightColor = Color3.White();

  sphere1.material = material;
 

  // Sphere2 material
  // material = new StandardMaterial("kosh2", scene);
  // material.reflectionTexture =  CubeTexture.CreateFromPrefilteredData("env.dds", scene);
  material.roughness = 100;
  // material.ref
  // material.diffuseColor = new Color3(0, 0, 0);
  // material.emissiveColor = new Color3(0.5, 0.5, 0.5);
  // material.specularPower = 32;

  // Fresnel
  // material.reflectionFresnelParameters = new FresnelParameters();
  // material.reflectionFresnelParameters.bias = 0.1;

  // material.emissiveFresnelParameters = new FresnelParameters();
  // material.emissiveFresnelParameters.bias = 0.5;
  // material.emissiveFresnelParameters.power = 4;
  // material.emissiveFresnelParameters.leftColor = Color3.Green();
  // material.emissiveFresnelParameters.rightColor = Color3.Blue();

  window.scene = scene;
  window.mat = material;
  fresnelLoader("","OBJ/","暖通666.glb",scene);
  // SceneLoader.Append("OBJ/","暖通666.glb",scene,()=>{
  //   scene.meshes.forEach((m)=>{
  //     m.material = material;
  //   })
  //   var sphere2 = Mesh.CreateSphere("Sphere1", 32, 1, scene);
  //   sphere2.position.y +=10;
  //   let texture = new Texture("漫射004.png",scene);
  //   texture.vScale = -1;
  //   let mat = new StandardMaterial("mat",scene);
  //   mat.diffuseTexture =texture;
  //   mat.emissiveTexture =texture;
  //   sphere2.material = mat;
  //   material.emissiveTexture = texture;
  //   scene.meshes.forEach((m)=>{
  //     m.material = material;
  //   })
  // },null,null,".glb")

  // sphere2.material = material;

  // // Sphere3 material
  // material = new StandardMaterial("kosh3", scene);
  // material.diffuseColor = new Color3(0, 0, 0);
  // material.emissiveColor = Color3.White();
  // material.specularPower = 64;
  // material.alpha = 0.2;

  // // Fresnel
  // material.emissiveFresnelParameters = new FresnelParameters();
  // material.emissiveFresnelParameters.bias = 0.2;
  // material.emissiveFresnelParameters.leftColor = Color3.White();
  // material.emissiveFresnelParameters.rightColor = Color3.Black();

  // material.opacityFresnelParameters = new FresnelParameters();
  // material.opacityFresnelParameters.power = 4;
  // material.opacityFresnelParameters.leftColor = Color3.White();
  // material.opacityFresnelParameters.rightColor = Color3.Black();

  // sphere3.material = material;

  // // Sphere4 material
  // material = new StandardMaterial("kosh4", scene);
  // material.diffuseColor = new Color3(0, 0, 0);
  // material.emissiveColor = Color3.White();
  // material.specularPower = 64;

  // // Fresnel
  // material.emissiveFresnelParameters = new FresnelParameters();
  // material.emissiveFresnelParameters.power = 4;
  // material.emissiveFresnelParameters.bias = 0.5;
  // material.emissiveFresnelParameters.leftColor = Color3.White();
  // material.emissiveFresnelParameters.rightColor = Color3.Black();

  // sphere4.material = material;

  // // Sphere5 material
  // material = new StandardMaterial("kosh5", scene);
  // sphere5.material = material;
  // material.diffuseColor = new Color3(0, 0, 0);
  // material.reflectionTexture = new CubeTexture("textures/TropicalSunnyDay", scene);
  // material.reflectionTexture.level = 0.5;
  // material.specularPower = 64;
  // material.emissiveColor = new Color3(0.2, 0.2, 0.2);

  // // Fresnel
  // material.emissiveFresnelParameters = new FresnelParameters();
  // material.emissiveFresnelParameters.bias = 0.4;
  // material.emissiveFresnelParameters.power = 2;
  // material.emissiveFresnelParameters.leftColor = Color3.Black();
  // material.emissiveFresnelParameters.rightColor = Color3.White();


  // Skybox
  // var skybox = Mesh.CreateBox("skyBox", 100.0, scene);
  // var skyboxMaterial = new StandardMaterial("skyBox", scene);
  // skyboxMaterial.backFaceCulling = false;
  // skyboxMaterial.reflectionTexture = new CubeTexture("textures/TropicalSunnyDay", scene);
  // skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  // skyboxMaterial.specularColor = new Color3(0, 0, 0);
  // skyboxMaterial.disableLighting = true;
  // skybox.material = skyboxMaterial;
  // let mat2 = new ObjMaterial("hello world",scene);
  return scene;
}