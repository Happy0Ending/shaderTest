import { AbstractMesh, Curve3, GizmoManager, Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { test } from "./DIV";
import ReactDOM from "react-dom";

// import { test,title } from "./DIV";
export class TubeManager {
  public scene: Scene;
  private _pointList: AbstractMesh[] = [];
  constructor(scene: Scene) {
    this.scene = scene;

    var startSphere = Mesh.CreateSphere("Sphere1", 32, 1, scene);

    let gizmo = new GizmoManager(scene);
    gizmo.positionGizmoEnabled = true;
    gizmo.attachToMesh(startSphere);
    // gizmo.onAttachedToMeshObservable.add((mesh) => {
    //   if (!mesh) return
    //   if (this._pointList?.length < 1) {
    //     this._pointList.push(mesh);
    //   }
    // })
    let isCreating = false;
    gizmo.gizmos.positionGizmo?.xGizmo.dragBehavior.onDragObservable.add(() => {
      if (!isCreating) {
        isCreating = true
        this.onDrag();
        isCreating = false
      }
    })
    gizmo.gizmos.positionGizmo?.yGizmo.dragBehavior.onDragObservable.add(() => {
      if (!isCreating) {
        isCreating = true
        this.onDrag();
        isCreating = false
      }
    })
    gizmo.gizmos.positionGizmo?.zGizmo.dragBehavior.onDragObservable.add(() => {
      if (!isCreating) {
        isCreating = true
        this.onDrag();
        isCreating = false
      }
    })

    scene.onKeyboardObservable.add((e) => {

      if (e.event.key === "c" && e.type === 2) {
        var sphere = Mesh.CreateSphere("Sphere1", 32, 0.2, scene);
        this._pointList.push(sphere);
        sphere.position = startSphere.getAbsolutePosition().clone();
        sphere.renderingGroupId = 2;
        this.createTube();
      }

    })

    this.initDomUI();
  }

  initStart = () => {
    if (this._pointList.length > 0) {
      this._pointList.length = 0;
    }
    var startSphere = Mesh.CreateSphere("startSphere", 32, 1, this.scene);
    // startSphere.renderingGroupId = 1;
    this._pointList.push(startSphere);
  }

  createTube = () => {
    let vectors: Vector3[] = [];
    this._pointList.forEach((point) => {
      vectors.push(point.getAbsolutePosition().clone());
    })
    // Curve3.CreateQuadraticBezier(origin, control, destination, nb_of_points)
    let pathVec = smoothedPoints(vectors)
    this.scene.getMeshByName("123")?.dispose();
    if(vectors.length>1){
      MeshBuilder.CreateTube("123", { path: pathVec, radius: 0.2, sideOrientation: 2 })
    }
    // this._pointList.length = 0;
  }

  initDomUI = () => {
    let canvas = this.scene.getEngine().getRenderingCanvas();
    if (!canvas) return;
    // let div = document.createElement("div");
    // div.id = "domUI"
    // div.style.position = "absolute";
    // div.style.top = "5%";
    // div.style.left = "5%";
    // const button1 = document.createElement("button");
    // button1.innerText = "生成";
    // div.append(button1);

    // button1.onclick = () => {
    //   this.createTube();

    // }
    ReactDOM.render(test(),canvas.parentElement)
   
    // const button1 = document.createElement("button");

    // canvas.parentElement?.append(div)
    // canvas.parentElement?.appendChild(div);
  }

  dispose = () => {
    this._pointList.forEach((mesh) => {
      mesh.dispose();
    })
  }

  onDrag = () => {
    // if (this._pointList.length) {
    //   this.createTube();
    // }
  }
  

}

function smoothedPoints(vectors:Vector3[]){
  let retVec3:Vector3[] = [];
  console.log("old vec3",vectors)
  if(vectors.length<2){
    return vectors;
  }
  // let firstCur = new Curve3([vectors[0]]);
  retVec3.push(vectors[0]);

  for (let index = 1; index < vectors.length-1; index++) {
    let p0 = vectors[index-1];
    let p1 = vectors[index];
    let p2 = vectors[index+1];
    let p01 = p0.add(p1.subtract(p0).scale(0.9));
    let p12 = p1.add(p2.subtract(p1).scale(0.1));
    let pCurve = Curve3.CreateQuadraticBezier(p01,p1,p12,10);
    pCurve.getPoints().forEach((point)=>{
      retVec3.push(point);
    })
    // temp = curve.getPoints()[curve.getPoints().length-1];
  }
  retVec3.push(vectors[vectors.length-1]);
  console.log("new vec3",retVec3)
  return retVec3;
}
// function smoothBezierCurve(points:[]) {  
//   const n = points.length;  
//   const smoothedPoints = [];  
  
//   for (let i = 0; i < n - 1; i++) {  
//     const p0 = points[i];  
//     const p1 = points[i + 1];  
//     const c0 = [p0[0] + (p1[0] - p0[0]) / 3, p0[1] + (p1[1] - p0[1]) / 3,p0[2]+(p1[2] - p0[2]) / 3];  
//     const c1 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2,(p0[2] + p1[2]) / 2];  
//     const c2 = [p1[0] + (p0[0] - p1[0]) / 3, p1[1] + (p0[1] - p1[1]) / 3,p1[2] + (p0[2] - p1[2]) / 3];  
//     const p = calculateBezierPoint(c0, c1, c2, p0, p1);  
//     smoothedPoints.push(p);  
//   }  
  
//   return smoothedPoints;  
// }  
  
// function calculateBezierPoint(c0, c1, c2, p0, p1) {  
//   const t = 0.5; // t用于控制平滑程度，可以根据需要调整  
//   return [  
//     (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * c0[0] + t * t * c1[0],  
//     (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * c0[1] + t * t * c1[1],  
//   ];  
// }