import { Curve3, Material, Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector2, Vector3 } from "@babylonjs/core";
import { QuaternionLineComponent } from "@babylonjs/inspector/components/actionTabs/lines/quaternionLineComponent";
import { SceneManager } from "../scene";

export enum EffectType {
    CENTER = "center",
    CONSTANT = "constant",
    PATH = "path",
    LINE = "line",
}

export enum LineType {
    DIRECT = "direct",
    BEND = "bend",
}

export class LineMeshSysManager {
    public manager: SceneManager;
    public newPoint: Vector3 | undefined = undefined;
    public lastPoint: Vector3 | undefined = undefined;
    public effectType: EffectType | null = EffectType.CENTER;
    public bendRate: number = Math.PI * 0.5;
    public lineType = "bend";
    public scene: Scene;
    public mat: StandardMaterial;
    public mat2: StandardMaterial;
    constructor(scene: Scene) {
        // this.manager = manager;

        this.scene = scene;
        window.scene = scene;
      

        this.mat = new StandardMaterial("123");
        this.mat.diffuseTexture = new Texture("jiantou.jpg", this.scene);
        this.mat2 = new StandardMaterial("123");
        this.mat2.diffuseTexture = new Texture("tiaowen2.png", this.scene);
        // this.scene.meshes.forEach((mesh) => {
        //     mesh.material = this.mat;
        // })
        this.scene.onPointerObservable.add((p, e) => {
            if (p.event.buttons === 0 && p.pickInfo?.pickedPoint &&p.pickInfo?.pickedMesh?.name!="skyBox") {
                //处理两个点的关系；
                //连续直线
                if(this.effectType ==EffectType.CONSTANT){
                    this.lastPoint = this.newPoint?.clone();
                }
                if(this.effectType ==EffectType.CENTER){
                    if(!this.lastPoint){
                        this.lastPoint = this.newPoint?.clone();
                    }
                }
                if(this.effectType ==EffectType.CENTER){
                    if(!this.lastPoint){
                        this.lastPoint = this.newPoint?.clone();
                    }
                }
                this.newPoint = p.pickInfo.pickedPoint;
                if (!this.isSamePoint(this.newPoint, this.lastPoint) && this.newPoint && this.lastPoint) {
                    this.createLinePath(this.newPoint, this.lastPoint as Vector3)
                }

            }
        })
    }

    createLinePath(p1: Vector3, p2: Vector3) {
        const pathArray: Vector3[][] = [];
        const uvs: Vector2[] = [];
        const originVec = p2.subtract(p1);
        const center = Vector3.Center(p1,p2);
        const length = Vector3.Distance(p1,p2);
        let ribbon: Mesh;
        if (this.lineType == LineType.DIRECT) {
            console.log("direct")
            const z1 = originVec.x;
            const x1 = -originVec.z;
            const norVec = Vector3.Normalize(new Vector3(x1, 0, z1));
            const p3 = p1.add(norVec);
            const p4 = p2.add(norVec)
            p1.y += 0.01;
            p2.y += 0.01;
            p3.y += 0.01;
            p4.y += 0.01;
            pathArray.push([p1, p3]);
            uvs.push(new Vector2(0, 0), new Vector2(0, 1))
            uvs.push(new Vector2(1, 0), new Vector2(1, 1))
            pathArray.push([p2, p4]);
            ribbon = MeshBuilder.CreateRibbon("ribbon",
                { pathArray: pathArray, sideOrientation: Mesh.DOUBLESIDE, uvs }, this.scene);
            ribbon.material = this.mat;

        } else {
            console.log("bend")
            center.y  = center.y+ 0.1*length;
            const beisaier =  Curve3.ArcThru3Points(p1,center,p2);
            ribbon = MeshBuilder.CreateTube("ribbon",
            { path: beisaier.getPoints(), sideOrientation: Mesh.DOUBLESIDE,radius:1 }, this.scene);
            ribbon.material = this.mat2;
            // console.log(123,ribbon)
            
        }
        // if(this.effectType ==EffectType.LINE){
        //     console.log("lastPoint");
        //     this.lastPoint = undefined;
        // }
        return ribbon;
    }

    isSamePoint(p1: Vector3 | undefined, p2: Vector3 | undefined) {
        if (p1?.x === p2?.x && p1?.y === p2?.y && p1?.z === p2?.z) {
            return true;
        } else {
            return false;
        }
    }
}