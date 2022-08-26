import { ArcRotateCamera, BackgroundMaterial, Color3, Color4, CubeTexture, Engine, GlowLayer, HemisphericLight, Mesh, MeshBuilder, MirrorTexture, PBRMaterial, PBRMetallicRoughnessMaterial, Plane, RenderTargetTexture, Scene, SceneLoader, ShaderMaterial, Size, StandardMaterial, Texture, Vector2, Vector3 } from "babylonjs";
import { AdvancedDynamicTexture, ColorPicker, Rectangle, Slider, TextBlock } from "babylonjs-gui";
import { WaterMaterial } from "babylonjs-materials";

export function boliScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);

    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
    let light2 = new HemisphericLight('light', new Vector3(0, 100, 0), scene);

    // // Skybox
    // var skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
    // var skyboxMaterial = new StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new CubeTexture("country.env", scene);

    // scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("country.env",scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;

    const box2 = MeshBuilder.CreateBox("box", { size: 10 }, scene);
    const box3 = MeshBuilder.CreateSphere("box", { diameter: 10 }, scene);
    box3.position.z += 30;
    box3.position.y += 20;
    box2.position.y += 20;
    const mat = new StandardMaterial("name",scene);
    box2.material = mat;
    box3.material = mat;
    if(box3.material){
        const mat2 = box3.material as PBRMaterial|StandardMaterial;
        mat2.reflectionTexture = scene.environmentTexture;
        box3.visibility = 0.6;
    }

    SceneLoader.ImportMesh("", '', "red.glb", scene, (meshes) => {
        meshes[0].scaling = new Vector3(1000,1000,1000);
        meshes.forEach((mesh) => {
            if (mesh.material) {
                const pbr = mesh.material as PBRMaterial;
                pbr.reflectionTexture = CubeTexture.CreateFromPrefilteredData("country.env",scene);
                mesh.visibility = 0.5;
            }
        })
    })
    return scene
}