import { Matrix, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { MeshTile } from "./tianiles";


export class TileManager {
  private _updateMeshTiles: string[] = [];
  // private _diposeMeshTiles: MeshTile[] = [];
  public scene: Scene;
  private _meshTiles: (MeshTile | undefined)[] = [];
  private _isLoading = false;
  private _lastUpdataList: number = 8;
  private _lodLevel = 1;
  private mapSize = {
    height: 640,
    width: 1280,
  };
  // private _renderCanvas:HTMLCanvasElement;
  
  constructor(scene: Scene) {
  

    this.scene = scene;
    this.initGis();
    window._meshTiles = this._meshTiles;
    (<HTMLCanvasElement>scene.getEngine().getRenderingCanvas()).onwheel = (p: any) => {
      console.log(p.wheelDeltaY,this._isLoading);
      if (!this._isLoading) {
        this._isLoading = true
        if (p.wheelDeltaY > 0) {
          console.log("下钻")
          // this.updateTiles(true);
          this.zoomIn()
        } else if (p.wheelDeltaY < 0) {
          console.log("后退");
          
          this.zoomOut();
          // this.updateTiles(false);
        }
      }
    }

    // scene.onPointerUp = (e, p) => {
    //   // console.log("mesh.length",scene.activeCamera?.islength);
    //   // if(scene.activeCamera!._activeMeshes.length>10){
    //   //   return
    //   // }

    //   // const tilemeshes = scene.meshes.filter((mesh) => mesh.name.includes("tile"));

    //   // tilemeshes.forEach((mesh)=>{
    //   //   // console.log("in",scene.activeCamera?.isInFrustum(mesh,true))
    //   //   // console.log("length", tilemeshes.length);
    //   // })
    //   if (isLoaded) {
    //     return;
    //   }
    //   isLoaded = true;
    //   this.updateTiles();
    //   isLoaded = false;

    // }
  }
  getScreenMesh = () => {
    return this._meshTiles.filter((tile) => {
      if (!tile) {
        return false
      } else {
        if (!tile.lodMeshes[0]) {
          return;
        }
        let a = this.vec3ToScreenXY(tile.lodMeshes[0].getBoundingInfo().boundingBox.centerWorld);
        if (a.x < 0 || a.y < 0 || a.x > this.scene.getEngine().getRenderWidth() ||
          a.y > this.scene.getEngine().getRenderHeight()
        ) {
          // tile.lodMeshes[0].setEnabled(false);
          return false
        } else {
          // tile.lodMeshes[0].setEnabled(true);
          return true
        }
      }
    })
  }

  zoomIn() {
    let screenMesh = this.getScreenMesh();
    if (screenMesh.length > 20) {
      this._isLoading = false
      return;
    }
    if (this._lodLevel < 7) {
      this._lodLevel++;
      screenMesh.forEach((tile) => {
        if (tile)
          for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
              let ci = 2 * tile.parentI + i;
              let cj = 2 * tile.parentJ + j;
              this._updateMeshTiles.push(
                JSON.stringify(
                  {
                    col: ci!,
                    row: cj!,
                    level: tile._originLevel + 1
                  }
                )
              )
            }
          }

      })
      this.updateMeshTiles(() => {
        screenMesh.forEach((tile) => {
          tile?.dispose();
        })
        this._meshTiles = this._meshTiles.filter((d) => d!.lodMeshes.length > 0)
        console.log("new mesh tiles:", this._meshTiles.length)
        screenMesh.length = 0;
        this._isLoading = false
      });
    }else{
      this._isLoading = false
    }
  }

  zoomOut() {
    console.log("roomOut");
    let screenMesh = this.getScreenMesh();
    if (screenMesh.length < 20) {
      this._isLoading = false
      return;
    }
    if (this._lodLevel > 1) {
      console.log("roomOut");
      this._lodLevel--;
      screenMesh.forEach((tile) => {
        if (tile) {
          this._updateMeshTiles.push(
            JSON.stringify({
              col: Math.floor((tile._ci!) / 2),
              row: Math.floor(tile._cj! / (2)),
              level: tile._originLevel - 1
            })
          )
        }
      })
      this.updateMeshTiles(() => {
        screenMesh.forEach((tile) => {
          tile?.dispose();
        })
        this._meshTiles = this._meshTiles.filter((d) => d!.lodMeshes.length > 0)
       
        screenMesh.length = 0;
        console.log("zoomOut")

        // console.log(tileA?.position);
        this._meshTiles.forEach((tileA) => {
          this._meshTiles.filter(tile => tile?.lodMeshes[0]?.uniqueId != tileA?.lodMeshes[0]?.uniqueId).forEach((tileB) => {
            if (tileB?.lodMeshes[0]&&tileA?.lodMeshes[0]) {
              const isMeshIn = tileA?.isTileIn(tileB);
              if (isMeshIn) {
                tileB.dispose();
              }
            }
          })
        })
        this._meshTiles = this._meshTiles.filter((d) => d!.lodMeshes.length > 0)
        console.log("new mesh tiles:", this._meshTiles.length)
        screenMesh.length = 0;

        //删除重复的meshTile；
        console.log(this._meshTiles);
        this._isLoading = false;

      });
    }else{
      this._isLoading = false
    }
  }

  updateTiles = (isExtend: boolean) => {
    console.log("updateTiles!");
    let aa: any[] = []
    let screenMesh = this._meshTiles.filter((tile) => {
      if (!tile) {
        return false
      } else {
        let a = this.vec3ToScreenXY(Vector3.FromArray(tile.boudingBoxCenter));
        if (a.x < 0 || a.y < 0 || a.x > this.scene.getEngine().getRenderWidth() ||
          a.y > this.scene.getEngine().getRenderHeight()
        ) {
          // tile.lodMeshes[0].setEnabled(false);
          return false
        } else {
          // tile.lodMeshes[0].setEnabled(true);
          return true
        }
      }
    })

    let isEnableUpdata = false;
    if (isExtend) {
      if (screenMesh.length >= 20) {
        this._isLoading = false;
        return
      } else {
        isEnableUpdata = true;
        if (this._lodLevel < 7) {
          this._lodLevel++;
        }
      }
    } else {
      isEnableUpdata = true
      if (this._lodLevel > 1) {
        this._lodLevel--;
      }
      // if (screenMesh.length >= 20) {
      // } else {
      //   // this._isLoading = false;
      //   // return
      // }
    }
    console.log("当前等级为：", this._lodLevel);
    console.log("排除各个条件能否升级跟新：", isEnableUpdata);

    let lod: number;
    if (isExtend) {
      lod = 1
      screenMesh.forEach((tile) => {
        if (tile!._originLevel > lod) {
          lod = tile!._originLevel
        }
      })
    } else {
      lod = 30
      screenMesh.forEach((tile) => {
        if (tile!._originLevel < lod) {
          lod = tile!._originLevel
        }
      })
    }
    if (isEnableUpdata) {
      screenMesh.forEach((tile) => {
        if (tile) {
          console.log("当前底图与缩放等级相差等级：", Math.abs(tile._originLevel - this._lodLevel))
          if (Math.abs(tile._originLevel - this._lodLevel) != 1) {
            console.log("等级相差太大不处理")
          } else {
            if (tile._originLevel != lod) {
              return;
            }
            aa.push(tile);
            let _level: number = 0;
            if (isExtend) {
              _level = tile._originLevel + 1
            } else {
              _level = tile._originLevel - 1
            }
            if (_level > 7) {
              _level = 7
            } else if (_level < 1) {
              _level = 1;
            }
            console.log("_level", _level);
            let level = Math.abs(_level - tile._originLevel);
            // console.log("level", _level);
            // console.log("level orilevel", level, tile._originLevel)

            if (_level > tile._originLevel) {

              for (let i = 0; i < 2 ** (_level - tile._originLevel); i++) {
                for (let j = 0; j < 2 ** (_level - tile._originLevel); j++) {

                  let ci = 2 ** (_level - tile._originLevel) * tile.parentI + i;
                  let cj = 2 ** (_level - tile._originLevel) * tile.parentJ + j;
                  this._updateMeshTiles.push(
                    JSON.stringify(
                      {
                        col: ci!,
                        row: cj!,
                        level: _level
                      }
                    )
                  )
                }
              }
            } else if (_level < tile._originLevel) {
              this._updateMeshTiles.push(
                JSON.stringify({
                  col: Math.floor((tile._ci!) / 2 ** (level)),
                  row: Math.floor(tile._cj! / (2 ** (level))),
                  level: _level
                })
              )
              
            }
          }
        }
        // }
      })
      // console.log(this._updateMeshTiles);
      this.updateMeshTiles(() => {
        aa.forEach((tile) => {
          tile.dispose();
        })
        this._meshTiles = this._meshTiles.filter((d) => d!.lodMeshes.length > 0)
        console.log("new mesh tiles:", this._meshTiles.length)
        aa.length = 0;
        this._isLoading = false
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

  updateMeshTiles = (onEnd: () => void) => {
    let templist = Array.from(new Set(this._updateMeshTiles));
    this.circleCreate(0, templist.length, templist, 20, () => {
      console.log("生成新的tile完毕")
      templist.length = 0; 
      this._updateMeshTiles.length = 0;
      onEnd()
    })
  }

  // diposeMeshTiles = () => {
  //   this._diposeMeshTiles.forEach((tile) => {
  //     tile.dispose()
  //   })
  // }
  circleCreate = (start: number, end: number, updates: string[], step: number, onsuccess?: any) => {
    if (start >= end) {
      onsuccess();

      return
    }
    let temp = start + step > end ? end : start + step;
    console.log("circleCreate")
    const a = new Promise((resolve) => {
      let timeout = setTimeout(() => {
        for (let i = start; i < temp; i++) {
          // console.log(updates[i])
          let papms = JSON.parse(updates[i]) as IMeshTileParams;
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