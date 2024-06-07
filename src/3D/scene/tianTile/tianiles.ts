import { Camera, Color3, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

export class MeshTile {
  public position: { x: number, z: number };
  public boudingBoxCenter: number[];
  public lodMeshes: Mesh[];
  static Mesh: Mesh;
  static meshSize: number
  private scene: Scene;
  public parentI: number;
  public parentJ: number;
  public _ci: number | undefined;
  public _cj: number | undefined;
  public _originLevel: number;
  public offset: number;
  public size: number[];


  constructor(col: number, row: number, level: number) {
    const offset = (MeshTile.meshSize / (2 ** (level - 1)))
    const position = [-MeshTile.meshSize + (col) * offset, MeshTile.meshSize * 0.5 - (row) * offset]
    this.offset = offset;
    this.size = position.map((value) => value + offset);

    this.position = { x: position[0], z: position[1] };
    this.boudingBoxCenter = [this.position.x + MeshTile.meshSize / (2 ** level), 0, this.position.z - MeshTile.meshSize / (2 ** level)];
    // console.log(mesh.name)
    // this.mesh = mesh;
    // this.mesh.renderingGroupId = 1;
    // this.mesh.visibility = 0;
    this._originLevel = level;
    this.lodMeshes = [];
    this.scene = MeshTile.Mesh!.getScene();
    this.parentI = col;
    this.parentJ = row;
    // console.log("prent i j", this.parentI, this.parentJ);
  }

  serializeTile() {
    let mesh = this.lodMeshes[0];
    let position = mesh.getAbsolutePosition().clone().asArray();
    let sizeLocal = mesh.getBoundingInfo().boundingBox.maximumWorld.subtract(mesh.getBoundingInfo().boundingBox.minimumWorld).asArray();
    let size = [position[0] + sizeLocal[0], position[1] + sizeLocal[1], position[2] + sizeLocal[2]];
    let center = mesh.getBoundingInfo().boundingBox.centerWorld.clone().asArray();
    return {
      position,
      size,
      center
    }
  }

  isTileIn(tile: MeshTile) {
    let tileA = this.serializeTile();
    let tileB = tile.serializeTile();
    let flag = false;
    if (tileB.center[0] > tileA.position[0]) {
      if (tileB.center[0] < tileA.size[0]) {
        if (tileB.center[2] > tileA.position[2]) {
          if (tileB.center[2] < tileA.size[2]) {
            flag = true;
          }
        }
      }
    }
    // if (tile.boudingBoxCenter[0] > this.position.x) {
    //   if (tile.boudingBoxCenter[0] < this.size[0]) {
    //     if (tile.boudingBoxCenter[2] > this.position.z) {
    //       if (tile.boudingBoxCenter[2] < this.size[1]) {
    //         flag = true;
    //       }
    //     }
    //   }
    // }
    return flag;
  }

  loadLOD = () => {
    // const lodLevel = this.getLodLevel();
    // console.log("lodLevel", lodLevel);

    // console.log("new tiles")
    // console.log("loadLOD")
    // this.lodMeshes.forEach((mesh) => {
    //   mesh.dispose(true, true);
    //   mesh.material?.dispose(true, true);
    // })
    // this.lodMeshes.length = 0;
    const originMesh = MeshTile.Mesh as Mesh;
    // MeshTile.InitMeshPovit(originMesh);
    const size = MeshTile.meshSize;

    let lodmesh = originMesh.clone("tileMesh");
    // let offset = lodmesh.getBoundingInfo().boundingBox.extendSizeWorld.x;
    lodmesh.visibility = 1;
    lodmesh.isVisible = true
    lodmesh.isPickable = true;
    // lodmesh.position.x += offset
    // lodmesh.position.z -=
    lodmesh.position = Vector3.Zero();
    lodmesh.scaling.x = 1 / (2 ** (this._originLevel - 1));
    lodmesh.scaling.z = 1 / (2 ** (this._originLevel - 1));
    const offset = MeshTile.meshSize / (2 ** (this._originLevel - 1))
    lodmesh.position.x = this.position.x + offset * (0);
    lodmesh.position.z = this.position.z - offset * (0);
    // lodmesh.position.y += 60;
    this.lodMeshes.push(lodmesh)
    let mat = new StandardMaterial("123", this.scene);
    lodmesh.material = mat;
    // let ci: number = this.parentI;
    // let cj: number = this.parentJ;
    // if (lodLevel) {

    this._ci = this.parentI;
    this._cj = this.parentJ
    // }
    let img = this.getPic(this._ci, this._cj, this._originLevel);
    // console.log("ci,cj", ci, cj)
    const texture = new Texture(img.map, this.scene);
    mat.diffuseTexture = texture;
    mat.backFaceCulling = false;
    // console.log("这是第几个新建", i * 2 ** this._originLevel + j)

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
    // const distance = Math.pow(Vector3.Distance(Vector3.FromArray(this.boudingBoxCenter), (<Camera>this.scene.activeCamera).position), 1);
    // let dd = Math.floor(distance / 200) > 3 ? 3 : Math.floor(distance / 200)
    // let lodLevel = 3 - dd;
    // console.log("d", distance);
    let lodLevel = 1;
    // console.log("lodLevel", lodLevel);
    return lodLevel;
  }

  // static InitMeshPovit = (mesh: Mesh) => {
  //   mesh.position.x += 8;
  //   mesh.position.z += 8;
  //   mesh.bakeCurrentTransformIntoVertices();
  // }
  dispose = () => {
    this.lodMeshes.forEach((mesh) => {
      mesh.dispose(true, true)
    })
    this.lodMeshes.length = 0;
    // console.log
    // this.mesh = null;
  }

}