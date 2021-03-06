import { AbstractMesh, Color3, Color4, ShaderMaterial } from "babylonjs";
import { IEdges, IshaderMatInfo } from "./IProperty";
import { setUniform2 } from "./shaderType";
import { toArray } from "./utils";

export function setValueMeshEdge(mesh: AbstractMesh | AbstractMesh[], info: IEdges) {
    const meshes = toArray(mesh);
    meshes.forEach((mesh) => {

        Object.keys(info).forEach((key) => {
            switch (key) {
                case "edgesWidth":
                    mesh[key] = info[key] as number
                    break;
                case "edgesColor":
                    mesh[key] = Color4.FromHexString(info[key] as string);
                    break;
            }

        })
    })
}
export function setValueShaderMaterial(mat:ShaderMaterial,info:IshaderMatInfo ) {
    switch (true) {
        case info.type==="float":
            return mat.setFloat(info.name as string, info.value as number);
        case info.type==="Color3":
            return mat.setColor3(info.name as string, Color3.FromHexString(info.value as string));
    }
}
