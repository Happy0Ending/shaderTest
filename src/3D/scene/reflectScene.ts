import { AnimationGroup, ArcRotateCamera, Color3, Color4, CubeTexture, Engine, 
	GlowLayer, HemisphericLight, Mesh, MeshBuilder, Nullable, PBRMaterial, PBRMetallicRoughnessMaterial, 
	Scene, SceneLoader, StandardMaterial, Texture, TransformNode, Vector2, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, ColorPicker, Rectangle, Slider, TextBlock } from "@babylonjs/gui";
import { WaterMaterial } from "@babylonjs/materials";
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
	skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
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
	// var waterMesh = Mesh.CreateGround("waterMesh", 512, 512, 32, scene, false);
	
	var water = new WaterMaterial("water", scene);
	water.bumpTexture = new Texture("waterbump.png", scene);
    const result = SceneLoader.ImportMeshAsync("",'', "woman.glb", scene);
	result.then((Iresult)=>{
		

		const newSket = Iresult.skeletons[0].clone("");
		const oldRoot = Iresult.meshes[0];
		const newRoot = Iresult.meshes[0].clone("",null);
		if(newRoot){
			newRoot.position.z +=10;
			const newNodes = [...newRoot.getChildMeshes(),...newRoot.getChildTransformNodes()]
			const oldNodes = [...oldRoot.getChildMeshes(),...oldRoot.getChildTransformNodes()]
			newRoot.getChildMeshes().forEach((mesh)=>{
				console.log(mesh.animations);
			})
			
		
			newRoot.getChildMeshes().forEach((mesh,index)=>{
				const old = Iresult.meshes[index].skeleton;
				if(old){
					// console.log("newSket",newSket);
					const sket1 = old.clone("123","123");
					mesh.skeleton  = sket1;
					console.log(old.serialize())
					console.log(mesh.skeleton.serialize())

					// scene.beginDirectAnimation(newRoot,newSket,0,300,true);

				}
			})
			Iresult.animationGroups.forEach((ag)=>{
				const newGroup = new AnimationGroup("123",scene);
				for (var {target, animation} of ag.targetedAnimations) {
					// console.log(target.name,target)
					// console.log(oldNodes)
					let oldIndex = oldNodes.findIndex((mesh)=>mesh.name==target.name);
					const ani = newGroup.addTargetedAnimation(animation, newNodes[oldIndex]);
				}

				// console.log("newGroup",newGroup)
				// console.log(ag);
				ag.stop();
				ag.dispose();
				// newGroup.start();
				let i = 0;
				const tnode:Nullable<TransformNode>[] = [];
				newNodes.forEach((node)=>{
					if(node instanceof Mesh){
						node.skeleton?.bones.forEach((bone)=>{
							if(!(tnode.includes(bone.getTransformNode()))){
								tnode.push(bone.getTransformNode());
							}
						})
					}
				})
				console.log("tnode",tnode)
				let newAg = ag.clone("",(oldTarget)=>{
					
				},true)
				newAg.start();
				// let a = ag.serialize();
				// console.log(JSON.stringify(a))
				// let b = newGroup.serialize();
				// console.log(JSON.stringify(b))
				// newGroup.start(true);
				// setTimeout(() => {
					
				// }, 3000);
			})
			
		}
	})
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