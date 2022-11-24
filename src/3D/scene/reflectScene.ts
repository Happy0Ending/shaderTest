import {
	AnimationGroup, ArcRotateCamera, Color3, Color4, CubeTexture, DirectionalLight, Engine,
	GizmoManager,
	GlowLayer, HemisphericLight, Mesh, MeshBuilder, NodeMaterial, Nullable, PBRMaterial, PBRMetallicRoughnessMaterial,
	RenderTargetTexture,
	Scene, SceneLoader, ShadowGenerator, StandardMaterial, Texture, TransformNode, Vector2, Vector3, VolumetricLightScatteringPostProcess
} from "@babylonjs/core";
import { AdvancedDynamicTexture, ColorPicker, Rectangle, Slider, TextBlock } from "@babylonjs/gui";
import { WaterMaterial } from "@babylonjs/materials";
import { ca } from "element-plus/es/locale";
import { createShaderMaterial } from "./shader";

export function reflectScene(engine: Engine, canvas: HTMLCanvasElement) {
	let scene = new Scene(engine);

	scene.clearColor = new Color4(0, 0, 0, 1)
	let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
		Vector3.Zero(), scene);
	camera.attachControl(canvas);
	camera.lowerRadiusLimit = 2;
	let light = new DirectionalLight('light', new Vector3(10, -10, 0), scene);
	// let shadowGenerator = new ShadowGenerator(1024,light);
	// shadowGenerator.bias = 0.00001;
	// shadowGenerator.normalBias = 0.01;
	// shadowGenerator.normalBias = 0.02;
	// // light.shadowMaxZ = 100;
	// // light.shadowMinZ = 10;
	// // shadowGenerator.useContactHardeningShadow = true;
	// // shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
	// shadowGenerator.setDarkness(0.5);
	// Skybox
	// var skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
	// var skyboxMaterial = new StandardMaterial("skyBox", scene);
	// skyboxMaterial.backFaceCulling = false;
	// skyboxMaterial.reflectionTexture = new CubeTexture("country.env", scene);
	// skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
	// skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
	// skyboxMaterial.specularColor = new Color3(0, 0, 0);
	// skyboxMaterial.disableLighting = true;
	// skybox.material = skyboxMaterial;
	// const adt = AdvancedDynamicTexture.CreateFullscreenUI("123",true,scene);
	// const text = new TextBlock("123","helloWorld!");

	// adt.addControl(text);
	// Ground
	var groundMaterial = new StandardMaterial("groundMaterial", scene);
	groundMaterial.diffuseTexture = new Texture("xuanwo.png", scene);

	var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
	ground.position.y = -1;
	ground.material = groundMaterial;
	ground.receiveShadows = true;
	let sg = new ShadowGenerator(1024, light);
	sg.blurBoxOffset = 4;
	sg.bias = 0.001;
	sg.normalBias = 0.002;
	// sg.blurKernel = 4;
	// sg.useContactHardeningShadow = true;
	sg.useBlurExponentialShadowMap = true;

	// sg.useBlurCloseExponentialShadowMap = true;
	// sg.usePercentageCloserFiltering = true;
	// sg.usePoissonSampling = true;
	sg.useOpacityTextureForTransparentShadow = true;
	sg.setDarkness(0.5);
	sg.enableSoftTransparentShadow = true;
	sg.transparencyShadow = true;
	scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("env.env", scene);
	// sg.transparencyShadow = true;
	const testBox = MeshBuilder.CreateBox("box", { size: 4 }, scene);
	const pbrMat = new PBRMaterial("name", scene);
	pbrMat.roughness = 0.5;
	pbrMat.metallic = 0.5;
	// pbrMat.albedoTexture = new Texture("jianbian.png",scene);
	// pbrMat.albedoTexture = new Texture("tiaoWen.png",scene);
	pbrMat.emissiveTexture = new Texture("tiaoWen.png", scene);
	// pbrMat.emissiveColor = Color3.Yellow();
	pbrMat.emissiveIntensity = 2;
	testBox.material = pbrMat;

	SceneLoader.ImportMesh("", "", "shanghai.glb", scene, () => {
		let mesh = scene.getMeshById("CITY_UNTRIANGULATED");
		if(mesh){
			mesh.material = createShaderMaterial(mesh,scene);
			mesh.enableEdgesRendering();
			mesh.edgesWidth = 80;
			mesh.edgesColor =  Color4.FromHexString("#00a8f3");
			// var godrays = new VolumetricLightScatteringPostProcess('godrays', 1.0, camera, mesh as Mesh, 50, Texture.BILINEAR_SAMPLINGMODE, engine, false);
			// // alert("gr.mesh name: " + godrays.mesh.name);
	
			// // no particles in this demo, so we leave this false
			// // godrays._volumetricLightScatteringRTT.renderParticles = true;
	
			// // some advanced godrays settings for you to play-with
			// godrays.exposure = 0.2;
			// godrays.decay = 0.5;
			// godrays.weight = 0.58767;
			// godrays.density = 0.56;
			// const gl = new GlowLayer("123",scene);
			// gl.intensity = 0.5
			// gl.referenceMeshToUseItsOwnMaterial(mesh);
			// gl.mainTexture.scale(0.1)
			
		}
	})
	// Water
	// var waterMesh = Mesh.CreateGround("waterMesh", 512, 512, 32, scene, false);
	const gizmo = new GizmoManager(scene);
	gizmo.positionGizmoEnabled = true;
	// const result = SceneLoader.ImportMeshAsync("", '', "dizuo111002.glb", scene);
	// result.then((Iresult) => {
		
	// 	const oldRoot = Iresult.meshes[0];
	// 	console.log("456");
	// 	Iresult.meshes.forEach((mesh) => {
	// 		mesh.receiveShadows = true;
	// 		sg.addShadowCaster(mesh);
	// 	})
	// 	// shadow1.addShadowCaster(newRoot);
	// })
	/*
	result: comes from ImportMeshAsync of the only-animation file (that despite its name also import animations)
	_targetMesh: target mesh (obviously) we're attaching the animation to
	*/


	// water.waterColor = new Color3(0.0, 0.1, 0.0);
	// water.waveLength = 0.1;
	// let t = 0;
	// scene.onBeforeRenderObservable.add(()=>{
	//     t+=0.01;
	//     water.bumpHeight = Math.abs(Math.sin(t))
	//     // water.waveHeight = Math.abs(Math.cos(t))
	// })
	// // Add skybox and ground to the reflection and refraction
	// water.addToRenderList(skybox);
	// // water.addToRenderList(ground);
	// // Assign the water material
	// waterMesh.material = water;
	return scene
}