import { ref } from "vue";
import { SceneManager } from "./3D/scene";

export let GScene:SceneManager;

export function GSceneWrite(scene:SceneManager){
    GScene = scene;
}
export const sceneType = ref("");

