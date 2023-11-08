import { Camera, Color3, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

export class MeshTile {
  public position: { x: number, z: number };
  public boudingBoxCenter: number[];
  public lodMeshes: Mesh[];
  static Mesh: Mesh;
  private _lodLevel: number = 1;
  private scene: Scene;
  public parentI: number;
  public parentJ: number
  constructor(position: number[], col: number, row: number, offset: number) {
    this.position = { x: position[0], z: position[1] };
    this.boudingBoxCenter = [this.position.x + offset, 0, this.position.z - offset];
    // console.log(mesh.name)
    // this.mesh = mesh;
    // this.mesh.renderingGroupId = 1;
    // this.mesh.visibility = 0;

    this.lodMeshes = [];
    this.scene = MeshTile.Mesh!.getScene();
    this.parentI = col;
    this.parentJ = row;
    console.log("prent i j", this.parentI, this.parentJ);
  }

  loadLOD = () => {
    const lodLevel = this.getLodLevel();
    // console.log("lodLevel", lodLevel);
    if (lodLevel - this._lodLevel == 0) {
      return;
    } else {
      console.log("new tiles")
      console.log("loadLOD")
      this.lodMeshes.forEach((mesh) => {
        mesh.dispose(true, true);
        mesh.material?.dispose(true, true);
      })
      this.lodMeshes.length = 0;
      const originMesh = MeshTile.Mesh as Mesh;
      // MeshTile.InitMeshPovit(originMesh);
      const size = 160;
      for (let i = 0; i < 2 ** lodLevel; i++) {
        let a = setTimeout(() => {
          for (let j = 0; j < 2 ** lodLevel; j++) {
            if (this._lodLevel == lodLevel) {
              let lodmesh = originMesh.clone();
              // let offset = lodmesh.getBoundingInfo().boundingBox.extendSizeWorld.x;
              lodmesh.visibility = 1;
              lodmesh.isVisible = true
              // lodmesh.position.x += offset
              // lodmesh.position.z -=
              lodmesh.position = Vector3.Zero();
              lodmesh.scaling.x = 1 / (2 ** lodLevel);
              lodmesh.scaling.z = 1 / (2 ** lodLevel);
              lodmesh.position.x = this.position.x + size / (2 ** lodLevel) * (i);
              lodmesh.position.z = this.position.z - size / (2 ** lodLevel) * (j);
              // lodmesh.position.y += 60;
              this.lodMeshes.push(lodmesh)
              let mat = new StandardMaterial("123", this.scene);
              lodmesh.material = mat;
              // let ci: number = this.parentI;
              // let cj: number = this.parentJ;
              // if (lodLevel) {
              let ci = 2 ** (lodLevel) * this.parentI + i;
              // let cj = 2 * this.parentJ + j;
              let cj = 2 ** (lodLevel) * this.parentJ + j;
              // }
              let img = this.getPic(ci, cj, 3 + lodLevel);
              // console.log("ci,cj", ci, cj)
              const texture = new Texture(img.map, this.scene);
              mat.diffuseTexture = texture;
              mat.backFaceCulling = false;
              console.log("这是第几个新建", i * 2 ** lodLevel + j)

            }
          }
          clearTimeout(a);
        }, 50 * i);


        // }
      }
      this._lodLevel = lodLevel;
    }
  }
  getPic = (col: number, row: number, level: number) => {
    // const city  =`http://t0.tianditu.gov.cn/DataServer?x=${col}&y=${row}&l=${level}&T=cva_w&tk=68d166cfe304fa077ff035bed00edc37`
    // console.log("i","j",col, row)
    return {
      // city:city,
      map: `/map/${level}/${col}-${row}.png`
    }
  }

  getLodLevel = () => {
    const distance = Math.pow(Vector3.Distance(Vector3.FromArray(this.boudingBoxCenter), (<Camera>this.scene.activeCamera).position), 1);
    let dd = Math.floor(distance / 200) > 3 ? 3 : Math.floor(distance / 200)
    let lodLevel = 3 - dd;
    // console.log("d", distance);
    // let lodLevel = 0;
    // console.log("lodLevel", lodLevel);
    return lodLevel;
  }

  // static InitMeshPovit = (mesh: Mesh) => {
  //   mesh.position.x += 8;
  //   mesh.position.z += 8;
  //   mesh.bakeCurrentTransformIntoVertices();
  // }
  dispose = () => {
    this.lodMesh.length = 0;
    // console.log
    // this.mesh = null;
  }

}