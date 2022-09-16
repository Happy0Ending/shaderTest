import { AbstractMesh, Color3, LinesMesh, Mesh, MeshBuilder, Nullable, Particle, PointsCloudSystem, Scene, Size, SolidParticleSystem, TransformNode, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control, RadioButton, TextBlock } from "@babylonjs/gui";
import { UnitButton } from "@babylonjs/node-editor/lines/unitButton";
import { tr } from "element-plus/es/locale";
import { SceneManager } from "../scene";
export interface lineData {
    mesh: LinesMesh,
    dataList: Vector3[];
    control: TextBlock
}
export class LineSysManager {
    public manager: SceneManager;
    public scene: Scene;
    public points: AbstractMesh[] = [];//显示中心点和面的顶点
    // public boxSource:Mesh;
    public lines: Mesh[] = [];
    public GUIs: Control[] = []
    public lineDatas: lineData[] = [];
    public currentPP: Vector3[] = [];
    public adt: AdvancedDynamicTexture;
    // public pointCloudSystem: SolidParticleSystem;
    private _currentFP: Nullable<Vector3> | undefined = null;
    private _currentSP: Nullable<Vector3> | undefined = null;
    private _currentFPNode: Nullable<RadioButton> | undefined = null;
    private _currentSPNode: Nullable<RadioButton> | undefined = null;
    private _isMark: boolean = false
    public set isShow(value: boolean) {
        if (value) {

        } else {

        }
    }
    public set isMark(value: boolean) {
        if (value) {
            this.currentFP = null;
            this.currentSP = null;
            this._isMark = value;
        }
    }

    public set currentFP(value: Nullable<RadioButton> | undefined) {
        this._currentFPNode = value;
        this._currentFP = value?.linkedMesh?.position;

    }

    public set currentSP(value: Nullable<RadioButton> | undefined) {
        this._currentSP = value?.linkedMesh?.position;
        this._currentSPNode = value;
        this._currentFPNode && (this._currentFPNode.background = "green");
        this._currentSPNode && (this._currentSPNode.background = "green") && console.log();
        this._isMark = false;
    }

    constructor(manager: SceneManager) {
        this.manager = manager;
        this.scene = manager.activeScene;
        this.adt = AdvancedDynamicTexture.CreateFullscreenUI("fullUI", true, this.scene);
        this.createGUIHotSpot();
        const button = new Button("test");
        button.width = "10%";
        button.height = "10%";
        this.adt.addControl(button);
        button.left = "-45%";
        button.onPointerClickObservable.add(() => {
            console.log("123");
            this.isMark = true;
        })
    }

    createPointLine(FP: Vector3, SP: Vector3, scene: Scene) {
        const lines = MeshBuilder.CreateLines("lines", { points: [FP, SP], updatable: true }, scene);
        lines.renderingGroupId = 2;
        const text = new TextBlock("text");
        text.resizeToFit = true;
        text.text = Math.round(Vector3.Distance(FP, SP) * 100) * 0.01 + "米";
        this.adt.addControl(text);
        text.linkWithMesh(lines);
        this.lines.push(lines);
        this.lineDatas.push({
            mesh: lines,
            dataList: [FP, SP],
            control: text
        })

    }

    createPoints(sps: SolidParticleSystem) {
        this.points.forEach((mesh) => {
            mesh.dispose();
        })
        //box.dispose();
        console.log(this.scene.meshes)

        this.scene.meshes.forEach((mesh) => {
            // console.log(mesh);
            // const points = [mesh.getBoundingInfo().boundingBox.centerWorld,...mesh.getBoundingInfo().boundingBox.vectorsWorld];
            // console.log(points);
            // points.forEach((point)=>{

            // })
        })
    }

    createGUIHotSpot() {
        this.scene.meshes.forEach((mesh) => {
            const vectors = mesh.getBoundingInfo().boundingBox.vectorsWorld;
            const points = [mesh.getBoundingInfo().boundingBox.centerWorld, ...vectors];

            points.forEach((point) => {
                let button = new RadioButton("but");
                this.adt.addControl(button);
                // button.moveToVector3(mesh.position,this.scene);
                // button.linkWithMesh(mesh);
                console.log(point.asArray());
                const node = new TransformNode('node', this.scene);
                node.position = point;
                button.linkWithMesh(node);

                button.width = "10px";
                button.height = "10px";
                button.background = "green";
                button.onPointerClickObservable.add(() => {
                    if (this._isMark) {
                        button.background = "white";
                        if (!this._currentFP) {
                            this.currentFP = button;
                        } else {
                            this.currentSP = button;
                            this.createPointLine(this._currentFP as Vector3, this._currentSP as Vector3, this.scene);
                            this.isMark = false;
                        }
                    }
                })
                this.GUIs.push(button);
            })
        })

    }

    updataLines() {
        this.lineDatas.forEach((lineData) => {
            lineData.mesh = MeshBuilder.CreateLines(lineData.mesh.name, { points: lineData.dataList, updatable: true, instance: lineData.mesh }, this.scene)
            lineData.control.text = Math.round(Vector3.Distance(lineData.dataList[0], lineData.dataList[1]) * 100) * 0.01 + "米";
            lineData.control.linkWithMesh(null);
       
            lineData.control.linkWithMesh(lineData.mesh);
        })
    }
}
