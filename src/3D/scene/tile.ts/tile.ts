import { Camera, Color3, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

export class MeshTile {
  public mesh: Mesh | null;
  public lodMeshes: Mesh[];
  private _lodLevel: number = 0;
  private scene: Scene;
  
  constructor(mesh: Mesh) {
    console.log(mesh.name)
    this.mesh = mesh;
    this.lodMeshes = [];
    this.scene = mesh.getScene();
  }

  loadLOD = () => {
    const lodLevel = this.getLodLevel();
    if (lodLevel == this._lodLevel) {
      return;
    }
    this._lodLevel = lodLevel;
    this.lodMeshes.forEach((mesh) => {
      mesh.dispose();
    })
    const originMesh = this.mesh as Mesh;
    // MeshTile.InitMeshPovit(originMesh);
    const size = 16;
    for (let i = 0; i < Math.pow(2, lodLevel); i++) {
      new Promise((resolve) => {
        let a = setTimeout(() => {
          let mat = new StandardMaterial("123",this.scene);
          mat.diffuseColor = Color3.Random();
          for (let j = 0; j < Math.pow(2, lodLevel); j++) {
            if (this._lodLevel == lodLevel) {
              let lodmesh = originMesh.clone();
              lodmesh.visibility = 1;
              lodmesh.position = Vector3.Zero();
              lodmesh.scaling.x  = 1/Math.pow(2, lodLevel);
              lodmesh.scaling.z  = 1/Math.pow(2, lodLevel);
              lodmesh.position.x = originMesh.getAbsolutePosition().x + size * i/Math.pow(2, lodLevel);
              lodmesh.position.z = originMesh.getAbsolutePosition().z + size * j/Math.pow(2, lodLevel);
              this.lodMeshes.push(lodmesh)
              lodmesh.material = mat;
            }
          }
          clearTimeout(a);
          resolve("123")
        }, 50);
      })

    }
  }

  getLodLevel = () => {
    const distance = Math.pow(Vector3.Distance((<Mesh>this.mesh).position, (<Camera>this.scene.activeCamera).position),1);
    return 5-Math.floor(distance /10)>0?5-Math.floor(distance /10):0;
  }

  static InitMeshPovit = (mesh: Mesh) => {
    mesh.position.x += 8;
    mesh.position.z += 8;
    mesh.bakeCurrentTransformIntoVertices();
  }
  dispose = () => {
    this.lodMesh.length = 0;
    this.mesh = null;
  }

}