import { Camera, Color3, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

export class MeshTile {
  public mesh: Mesh | null;
  public lodMeshes: Mesh[];
  private _lodLevel: number = 0;
  private scene: Scene;
  public parentI: number;
  public parentJ: number
  constructor(mesh: Mesh, col: number, row: number) {
    // console.log(mesh.name)
    this.mesh = mesh;
    this.mesh.visibility = 0;
    this.lodMeshes = [];
    this.scene = mesh.getScene();
    this.parentI = col;
    this.parentJ = row;
    console.log("prent i j", this.parentI, this.parentJ);
  }

  loadLOD = () => {
    const lodLevel = this.getLodLevel();
    // console.log("lodLevel", lodLevel);
    // if (lodLevel == this._lodLevel) {
    //   return;
    // }
    this._lodLevel = lodLevel;
    this.lodMeshes.forEach((mesh) => {
      mesh.dispose();
    })
    const originMesh = this.mesh as Mesh;
    // MeshTile.InitMeshPovit(originMesh);
    const size = 160;
    for (let i = 0; i < 2 ** lodLevel; i++) {
      new Promise((resolve) => {
        let a = setTimeout(() => {
          for (let j = 0; j < 2 ** lodLevel; j++) {
            if (this._lodLevel == lodLevel) {
              let lodmesh = originMesh.clone();
              // let offset = lodmesh.getBoundingInfo().boundingBox.extendSizeWorld.x;
              lodmesh.visibility = 1;
              // lodmesh.position.x += offset
              // lodmesh.position.z -=
              lodmesh.position = Vector3.Zero();
              lodmesh.scaling.x = 1 / (2 ** lodLevel);
              lodmesh.scaling.z = 1 / (2 ** lodLevel);
              lodmesh.position.x = originMesh.position.x + size/(2 ** lodLevel) * (i);
              lodmesh.position.z = originMesh.position.z - size/(2 ** lodLevel) * (j);
              lodmesh.position.y += 60;
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
              console.log("ci,cj", ci, cj)
              const texture = new Texture(img.map, this.scene);
              mat.diffuseTexture = texture;

            }
          }
          clearTimeout(a);
          resolve("123")
        }, 50);
      })

    }
  }
  getPic = (col: number, row: number, level: number) => {
    // const city  =`http://t0.tianditu.gov.cn/DataServer?x=${col}&y=${row}&l=${level}&T=cva_w&tk=68d166cfe304fa077ff035bed00edc37`
    // console.log("i","j",col, row)
    return {
      // city:city,
      map: `https://t2.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL=${col}&TILEROW=${row}&TILEMATRIX=${level}&tk=68d166cfe304fa077ff035bed00edc37`
    }
  }

  getLodLevel = () => {
    const distance = Math.pow(Vector3.Distance((<Mesh>this.mesh).position, (<Camera>this.scene.activeCamera).position), 1);
    // let lodLevel = (3 - (Math.floor(distance / 50)) > 3 ? 3 : Math.floor(distance / 50));
    let lodLevel = 2;
    console.log("lodLevel", lodLevel);
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
    this.mesh = null;
  }

}