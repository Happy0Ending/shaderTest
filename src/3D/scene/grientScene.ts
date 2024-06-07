
import { Engine, Scene, Color4, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Color3, SceneLoader, StandardMaterial, PointLight, BoundingBoxGizmo, Mesh, TransformNode } from "@babylonjs/core";

import { Slider } from "ant-design-vue";
import { ColorPicker } from "element-ui";
import { gradientMat } from "../shader";
import "@babylonjs/loaders"
import { BJSlonlat2Vector3, fromDegrees, vec3TolonLat } from "./gis";
const sceneLon = 116.454059;
const sceneLat = 39.919901;
export function gradientMatScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    // let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
    let light = new HemisphericLight('light', new Vector3(0, 0, 0), scene);
    light.intensity = 0.5;
    // const box2 = MeshBuilder.CreateBox("Box2");
    // box2.position.z += 8
    // box2.material = null;
    // const mat = gradientMat(scene, box2.name, box2);
    // box2.material = mat;
    // box2.enableEdgesRendering();
    // box2.edgesColor = Color4.FromHexString("#2c59a0");
    // box2.edgesWidth = 2;
    // const sphere = MeshBuilder.CreateSphere("sphere");
    // // const mat2 = outLineAlphaByMesh(scene, sphere, Color3.FromHexString("#91f6fe"), 1);
    // sphere.material = mat;
    // // this.matList.push(mat2);
    // sphere.position.z = 20;

   fetch("./geojson.json").then((res) => {
        res.json().then((dataJson: {
            features: {
                property: { h: number },
                geometry: {
                    type: "Polygon" | "",
                    coordinates: latlon[][]
                }
            }[]
        }) => {
            dataJson.features.forEach((f) => {
                f.geometry.coordinates.forEach((latlons) => {
                    const path: Vector3[] = []
                    latlons.forEach((latlon) => {
                        path.push(LonLatToVector3(latlon[0], latlon[1],scene));
                    })
                    let ribbon = MeshBuilder.CreateLines("123", { points: path}, scene)
                })
            })
        })
    })



    return scene
}
  /**
   * 
   * @param lon 经度
   * @param lat 纬度
   * @param height 高度
   * @param ellipsoid 曲率弥补
   */
  function LonLatToVector3(lon: number, lat: number,scene:Scene, height?: number, ellipsoid?:
    {
      radiiSquared: { x: number, y: number, z: number }
    }
  ) {
    
    
    let p0 = fromDegrees(sceneLon, sceneLat, height, ellipsoid);
    let p3 = fromDegrees(sceneLon, sceneLat, 30000, ellipsoid);
    
    let p1 = fromDegrees(lon, lat, height, ellipsoid);
    let node1 = new TransformNode("BASE", scene);
    node1.lookAt(p3.subtract(p0));
    node1.addRotation(Math.PI/2,0,0);
    let node2 = new TransformNode("BASE2", scene);
    node2.position = p1;
    node2.setParent(node1);
    let node3 = new TransformNode("BASE3", scene);
    node3.position = p0.clone();
    node3.setParent(node1);
    let p = node2.position.clone().subtract(node3.position.clone());
    p.y = Math.random();
    [node1,node2,node3].forEach(node=>node.dispose());
   
    return p;
  }
  /**
   * 
   * @param vec 当前位置的坐标
   * @param height 地面高度
   * @param ellipsoid 椭球 这里使用cesium的ellipsoid弥补
   * @returns 
   */
  function vecToLonlat(vec:Vector3,scene:Scene,height?:number,ellipsoid?:
    {
      radiiSquared: { x: number, y: number, z: number }
    }){
    let p0 = fromDegrees(sceneLon, sceneLat, height, ellipsoid);
    let p3 = fromDegrees(sceneLon, sceneLat, 30000, ellipsoid);
    let node1 = new TransformNode("BASE", scene);
    node1.lookAt(p3.subtract(p0));
    node1.addRotation(Math.PI/2,0,0);
    let node2 = new TransformNode("BASE2", scene);
    let node3 = new TransformNode("BASE3", scene);
    node3.setAbsolutePosition(p0.clone());
    node3.setParent(node1);
    let p1 = node3.position.add(vec);
    node2.setParent(node1);
    node2.position = p1;
    let pp = node2.getAbsolutePosition().clone();
    [node1,node2,node3].forEach(node=>node.dispose());
    return vec3TolonLat(pp);
  }



type latlon = [
    number, number
]