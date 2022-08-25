import { ArcRotateCamera, Color3, Color4, CubeTexture, Engine, GlowLayer, HemisphericLight, MeshBuilder, PBRMaterial, PBRMetallicRoughnessMaterial, Scene, Texture, Vector3 } from "babylonjs";
import { AdvancedDynamicTexture, ColorPicker, Rectangle, Slider, TextBlock } from "babylonjs-gui";
import { gradientMat } from "../shader";

export function pbrScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);
   
    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
    let light2 = new HemisphericLight('light', new Vector3(0, 100, 0), scene);
    const box2 = MeshBuilder.CreateBox("Box2");
    box2.position.z += 8
    box2.material = null;
    const mat = new PBRMaterial("pbrMat",scene);
    // mat.roughness =1;
    mat.metallic = 1;
    mat.albedoColor =  Color3.Red();
    box2.material = mat;
    mat.clearCoat.isEnabled = true;
    mat.environmentBRDFTexture = new Texture("env.env",scene);
    const sphere = MeshBuilder.CreateSphere("sphere",{segments:8});
    mat.clearCoat.isEnabled = true
    sphere.material = mat;
    sphere.position.z = 20;
    

    // const adTexture = AdvancedDynamicTexture.CreateFullscreenUI("gradientMat", true, scene);
    // const color = new ColorPicker("ColorPick");
    // color.width = "20%";
    // color.height = "20%";
    // color.left = "-40%";
    // color.top = "30%";
    // const ref = {
    //     color:"#2c59a0",
    //     alphaK :0.15
    // }
    // color.value = Color3.FromHexString(ref.color);
    // color.onValueChangedObservable.add((Color3) => {
    //     mat.setColor3("mainColor", Color3);
    //     ref.color = Color3.toHexString();
    //     text.text = "当前设置的颜色为："+ref.color+",透明度参数为："+ref.alphaK;
    // })

    // const slider = new Slider("slider");
    // slider.maximum = 1.0;
    // slider.minimum = 0;
    // slider.step = 0.05;
    // slider.color = "white";
    // slider.width = "10%";
    // slider.height = "2%";
    // slider.left = "-40%";
    // slider.value = ref.alphaK;
  
    // const text = new TextBlock("text","当前设置的颜色为："+ref.color+",透明度参数为："+ref.alphaK);
    // slider.onValueChangedObservable.add((eventdata) => {
    //     mat.setFloat("alphaK",eventdata)
    //     ref.alphaK = eventdata;
    //     text.text = "当前设置的颜色为："+ref.color+",透明度参数为："+ref.alphaK;
    // })
    // adTexture.addControl(slider);
    // adTexture.addControl(color);
    // const rectangle = new Rectangle("rec");
    // rectangle.color = "white";
    // rectangle.adaptWidthToChildren = true;
    // rectangle.height = '5%'
    // rectangle.left = "-30%";
    // rectangle.top = "45%"
    // adTexture.addControl(rectangle);
   
    // rectangle.addControl(text);
    return scene
}