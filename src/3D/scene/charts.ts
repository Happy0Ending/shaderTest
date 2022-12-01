import { Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { SceneManager } from "../scene";

export class ChartsManager {
    public manager: SceneManager | undefined;
    public x: number = 10;
    public y: number = 10;
    public z: number = 10;
    public scene: Scene | undefined;
    public charts: Mesh;
    constructor(manager: SceneManager) {
        this.manager = manager;
        this.scene = manager.activeScene;
        this.charts = this.createCharts();
    }

    createCharts() {
        //xoz
        const points: Vector3[][] = [];
        for (let i = 0; i <= this.y; i++) {
            points.push([new Vector3(this.x, i, 0), new Vector3(0,i,0), new Vector3(0, i, this.z)])
        }
        //yoz
        for (let i = 0; i <= this.x; i++) {
            points.push([new Vector3(i, this.y, 0), new Vector3(i,0,0), new Vector3(i, 0, this.z)])
        }
        //xoy
        for (let i = 0; i <= this.z; i++) {
            points.push([new Vector3(this.x, 0, i), new Vector3(0,0,i), new Vector3(0, this.y, i)]);
        }
        const linesMesh = MeshBuilder.CreateLineSystem("lines", { lines: points }, this.scene as Scene);
        return linesMesh;
    }

}