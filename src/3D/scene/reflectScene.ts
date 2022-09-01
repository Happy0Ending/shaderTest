import { ArcRotateCamera, Color3, Color4, CubeTexture, Engine, GlowLayer, HemisphericLight, Mesh, MeshBuilder, PBRMaterial, PBRMetallicRoughnessMaterial, Scene, SceneLoader, StandardMaterial, Texture, Vector2, Vector3 } from "babylonjs";
import { AdvancedDynamicTexture, ColorPicker, Rectangle, Slider, TextBlock } from "babylonjs-gui";
import { WaterMaterial } from "babylonjs-materials";
import { ca } from "element-plus/es/locale";

export function reflectScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);
   
    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
    let light2 = new HemisphericLight('light', new Vector3(0, 100, 0), scene);
    camera.upperRadiusLimit = 400;
   // Skybox
	var skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new CubeTexture("country.env", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
	skyboxMaterial.specularColor = new Color3(0, 0, 0);
	skyboxMaterial.disableLighting = true;
	skybox.material = skyboxMaterial;
		
	// Ground
	var groundMaterial = new StandardMaterial("groundMaterial", scene);
	groundMaterial.diffuseTexture = new Texture("xuanwo.png", scene);
	
	
	var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
	ground.position.y = -1;
	ground.material = groundMaterial;
		
	// Water
	var waterMesh = Mesh.CreateGround("waterMesh", 512, 512, 32, scene, false);
	
	var water = new WaterMaterial("water", scene);
	water.bumpTexture = new Texture("waterbump.png", scene);
    SceneLoader.ImportMesh("", '', "red.glb", scene, (meshes) => {
        meshes[0].scaling =new Vector3(1000,1000,1000);
        meshes.forEach((mesh) => {
            
            water.addToRenderList(mesh);
        })
    })
	// Water properties
	// water.windForce = 2;
	// water.waveHeight = 1;
	// water.windDirection = new Vector2(1, -1);
	water.waterColor = new Color3(0.0, 0.1, 0.0);
	// water.colorBlendFactor = 0.3;
	// water.bumpHeight = 1;
	water.waveLength = 0.1;
    let t = 0;
	scene.onBeforeRenderObservable.add(()=>{
        t+=0.01;
        water.bumpHeight = Math.abs(Math.sin(t))
        // water.waveHeight = Math.abs(Math.cos(t))
    })
	// Add skybox and ground to the reflection and refraction
	water.addToRenderList(skybox);
	
	// water.addToRenderList(ground);
	
	// Assign the water material
	waterMesh.material = water;
    return scene
}