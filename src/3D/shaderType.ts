import { ShaderMaterial, Vector3, Color3, Texture } from "@babylonjs/core";


export interface Ishader{
    mat:ShaderMaterial,
    uniforms:{ name: string, uniform: any }[]
}

export function setUniform(mat: ShaderMaterial, uniformName: string, uniform: any) {
    switch (true) {
        case uniform instanceof Vector3:
            return mat.setVector3(uniformName, uniform);
        case uniform instanceof Number:
            return mat.setFloat(uniformName, uniform);
        case uniform instanceof Color3:
            return mat.setColor3(uniformName, Color3.FromHexString(uniform));
        case uniform instanceof Texture:
            return mat.setTexture(uniformName, uniform);
    }
}

export function setUniform2(mat: ShaderMaterial, info:{type:string,name:string,value:string|number}) {
    switch (true) {
        case info.type==="float":
            return mat.setFloat(info.name, info.value as number);
        case info.type==="Color3":
            return mat.setColor3(info.name, Color3.FromHexString(info.value as string));
    }
}