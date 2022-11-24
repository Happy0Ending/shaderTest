import { Engine, Scene, Color4, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, PBRMaterial, CubeTexture, Texture } from "@babylonjs/core";

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

    scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("country.env",scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;
    const box = MeshBuilder.CreateSphere("123",{diameter:2},scene);
    const mat = new PBRMaterial("123",scene);
    mat.metallic = 0.2;
    mat.roughness = 0.5;
    // mat.albedoTexture = new Texture("jianbian.png",scene);
    mat.emissiveTexture = new Texture("tiaowenH.png",scene);
    box.material = mat;
    return scene
}