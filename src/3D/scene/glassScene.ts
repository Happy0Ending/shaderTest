import { ArcRotateCamera, BackgroundMaterial, Color3, Color4, CubeTexture, Engine, GlowLayer, HemisphericLight, Mesh, MeshBuilder, MirrorTexture, PBRMaterial, PBRMetallicRoughnessMaterial, Plane, RenderTargetTexture, Scene, SceneLoader, Size, StandardMaterial, Texture, Vector2, Vector3 } from "babylonjs";
import { AdvancedDynamicTexture, ColorPicker, Rectangle, Slider, TextBlock } from "babylonjs-gui";
import { WaterMaterial } from "babylonjs-materials";

export function glassScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);

    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
    let light2 = new HemisphericLight('light', new Vector3(0, 100, 0), scene);

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

    const box2 = MeshBuilder.CreateBox("box", { size: 10 }, scene);
    const box3 = MeshBuilder.CreateSphere("box", { diameter: 10 }, scene);
    box3.position.z  +=30;
    box3.position.y += 20;
    const ground = MeshBuilder.CreateGround("ground", { width: 200, height: 200 }, scene);
    box2.position.y += 20;
    const mat = new BackgroundMaterial("std", scene);
    const mirror = new MirrorTexture("mirror", { width: 200, height: 200 }, scene);
    mirror.blurKernel = 2;
    mirror.mirrorPlane = new Plane(0, -1, 0, 0);
    mirror.renderList?.push(skybox);
    mirror.renderList?.push(box2);
    mirror.renderList?.push(box3);
    mat.reflectionTexture = mirror;
    ground.material = mat;
    const adt =  AdvancedDynamicTexture.CreateFullscreenUI("name");
    let text = new TextBlock("text");
    adt.addControl(text);
    scene.onBeforeRenderObservable.add(()=>{

        text.text = "当前帧率："+scene.getEngine().getFps();
    })
    var water = new WaterMaterial("water", scene);
	water.bumpTexture = new Texture("waterbump.png", scene);
    SceneLoader.ImportMesh("", '', "red.glb", scene, (meshes) => {
        meshes[0].scaling =new Vector3(1000,1000,1000);
        meshes.forEach((mesh) => {
            
            mirror.renderList?.push(mesh);
        })
    })
    return scene
}