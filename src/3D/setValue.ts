import { AbstractMesh, Color3, Color4, GlowLayer, ShaderMaterial } from "babylonjs";
import { object } from "vue-types";
import { IOptions } from "./Ioptions";
import { IEdges, IGlInfo, IshaderMatInfo } from "./IProperty";
import { IType } from "./IType";
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
export function setValueShaderMaterial(mat: ShaderMaterial, info: IshaderMatInfo) {
    switch (true) {
        case info.type === "float":
            return mat.setFloat(info.name as string, info.value as number);
        case info.type === "Color3":
            return mat.setColor3(info.name as string, Color3.FromHexString(info.value as string));
    }
}

export function setValueGlowLayer(gl: GlowLayer, info: IGlInfo) {
    Object.keys(info).forEach((key) => {
        gl[key as keyof IGlInfo] = info[key as keyof IGlInfo] as number;
    })
}

export function setValue(options: IOptions) {
    switch (options.type) {
        case IType.meshEdge:
            return setValueMeshEdge(options.target, options.value);
        case IType.shaderMaterial:
            return setValueShaderMaterial(options.target, options.value);
        case IType.glowLayer:
            return setValueGlowLayer(options.target, options.value);
    }

}