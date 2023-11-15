import { Matrix, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { MeshTile } from "./tianiles";


export class TileManager {
  private _updateMeshTiles: IMeshTileParams[] = [];
  // private _diposeMeshTiles: MeshTile[] = [];
  public scene: Scene;
  private _meshTiles: (MeshTile | undefined)[] = [];
  private mapSize = {
    height: 640,
    width: 1280,
  };
  constructor(scene: Scene) {
    this.scene = scene
    this.initGis()
    let aa: any[] = []
    let isLoaded = false;
    scene.onPointerUp = (e, p) => {
      // console.log("mesh.length",scene.activeCamera?.islength);
      // if(scene.activeCamera!._activeMeshes.length>10){
      //   return
      // }

      // const tilemeshes = scene.meshes.filter((mesh) => mesh.name.includes("tile"));

      // tilemeshes.forEach((mesh)=>{
      //   // console.log("in",scene.activeCamera?.isInFrustum(mesh,true))
      //   // console.log("length", tilemeshes.length);
      // })
      if (isLoaded) {
        return;
      }
      isLoaded = true;
      console.log("e", e.button);
      let screenMesh = this._meshTiles.filter((tile) => {
        if (!tile) {
          return false
        } else {

          let a = this.vec3ToScreenXY(Vector3.FromArray(tile.boudingBoxCenter));
          if (a.x < 0 || a.y < 0) {
            return false
          } else {
            return true
          }
        }
      })
      if(screenMesh.length>5){
        return 
      }
      screenMesh.forEach((tile) => {
        console.log("tileMesh", tile!.lodMeshes[0].uniqueId)
        if (tile) {
          // let a = this.vec3ToScreenXY(Vector3.FromArray(tile.boudingBoxCenter));

          // console.log("x,y", a);
          console.log("pickedmeshId", p!.pickedMesh?.uniqueId)
          aa.push(tile);
          // let distance = Vector3.Distance(Vector3.FromArray(tile.boudingBoxCenter), scene.activeCamera!.position);
          // if (distance) {
          // console.time("_level")
          // let _level = Math.floor(0.28125 * Math.pow(10, -6) * distance ** 2 - 4.5 * Math.pow(10, -3) * distance + 15)
          // console.timeEnd("_level")
          let _level: number = 0;
          if (e.button == 0) {
            _level = tile._originLevel + 1
          } else if
            (e.button == 2) {
            _level = tile._originLevel - 1
          }

          let level = Math.abs(_level - tile._originLevel);
          // console.log("level", _level);
          // console.log("level orilevel", level, tile._originLevel)

          if (_level > tile._originLevel) {
            for (let i = 0; i < 2 ** (_level - tile._originLevel); i++) {
              for (let j = 0; j < 2 ** (_level - tile._originLevel); j++) {
                let ci = 2 ** (_level - tile._originLevel) * tile.parentI + i;
                let cj = 2 ** (_level - tile._originLevel) * tile.parentJ + j;
                this._updateMeshTiles.push(
                  {
                    col: ci!,
                    row: cj!,
                    level: _level
                  }
                )
              }
            }
          } else if (_level < tile._originLevel) {
            this._updateMeshTiles.push(
              {
                col: Math.floor((tile._ci!) / 2 ** (level)),
                row: Math.floor(tile._cj! / (2 ** (level))),
                level: _level
              }
            )
          }
        }
        // }
      })
      // console.log(this._updateMeshTiles);
      this.updateMeshTiles(() => {

        isLoaded = false;
        aa.forEach((tile) => {
          tile.dispose();
        })
        this._meshTiles = this._meshTiles.filter((d) => d!.lodMeshes.length > 0)
        console.log("new mesh tiles:", this._meshTiles)
        aa.length = 0;
      });

    }
  }

  vec3ToScreenXY = (vector: Vector3) => {

    let engine = this.scene.getEngine();
    var coordinates = Vector3.Project(
      vector,
      Matrix.Identity(),
      this.scene.getTransformMatrix(),
      this.scene.activeCamera!.viewport.toGlobal(
        engine.getRenderWidth(),
        engine.getRenderHeight()
      )
    );
    return {
      x: coordinates.x,
      y: coordinates.y,
    };
  }
  initGis = () => {
    const level = 1
    const meshSize = this.mapSize.height;
    MeshTile.Mesh = MeshBuilder.CreateGround("ground", { width: 640, height: 640 }, this.scene);
    MeshTile.Mesh.position.x += meshSize / 2;
    MeshTile.Mesh.position.z -= meshSize / 2;
    MeshTile.Mesh.bakeCurrentTransformIntoVertices();
    MeshTile.Mesh.visibility = 0;
    MeshTile.Mesh.isPickable = false;
    MeshTile.meshSize = meshSize;
    // MeshTile.Mesh.isPickable = false;
    MeshTile.Mesh.position.x = -640
    MeshTile.Mesh.position.z = 320
    for (let i = 0; i < (2 ** level); i++) {
      for (let j = 0; j < (2 ** (level - 1)); j++) {
        // const offset = (meshSize / (2 ** (level - 1)))

        const meshTile = new MeshTile(i, j, level);
        // console.log(meshTile._ci,meshTile._cj)
        meshTile.loadLOD();
        this._meshTiles.push(meshTile);
      }
    }

  }

  pushUpdate = (tileParams: IMeshTileParams) => {
    this._updateMeshTiles.push(tileParams)
  }

  clearUpdate = () => {
    this._updateMeshTiles.length = 0;
  }

  // pushDispose = (tile: MeshTile) => {
  //   this._diposeMeshTiles.push(tile)
  // }

  // clearDispose = () => {
  //   this._diposeMeshTiles.length = 0;
  // }

  updateMeshTiles = (onEnd: () => void) => {
    this._updateMeshTiles = Array.from(new Set(this._updateMeshTiles));
    this.circleCreate(0, this._updateMeshTiles.length, this._updateMeshTiles, 50, () => {
      console.log("生成新的tile完毕")
      onEnd()
      this._updateMeshTiles.length = 0;
    })
  }

  // diposeMeshTiles = () => {
  //   this._diposeMeshTiles.forEach((tile) => {
  //     tile.dispose()
  //   })
  // }
  circleCreate = (start: number, end: number, updates: IMeshTileParams[], step: number, onsuccess?: any) => {
    if (start >= end) {
      onsuccess();
      return
    }
    let temp = start + step > end ? end : start + step;
    console.log("circleCreate")
    const a = new Promise((resolve) => {
      let timeout = setTimeout(() => {
        for (let i = start; i < temp; i++) {
          // console.log()
          let papms = updates[i]
          // console.log("parms", i, updates[i])
          let meshtile = new MeshTile(papms.col, papms.row, papms.level);
          meshtile.loadLOD();
          this._meshTiles.push(meshtile);
        }
        clearTimeout(timeout);
        resolve("")
      }, 200);
    })
    a.then(() => {
      this.circleCreate(temp, end, updates, step, onsuccess)
    })
  }
}

export interface IMeshTileParams {
  col: number,
  row: number,
  level: number,
}