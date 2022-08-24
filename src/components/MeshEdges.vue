<template>
    <div id="meshEdgeStyle">

        <p>边框线宽度
            <a-slider v-model:value="edgesWidth" :min="0" :max="5" :step='0.1'
                @change="onChange(meshEdgeInfo.getEdgesWidth())" />
        </p>
        <p>边框线颜色:
            <el-color-picker v-model="edgesColor" size="mini" @change="onChange(meshEdgeInfo.getEdgesColor())">
            </el-color-picker>
        </p>
        <p>透明补偿值:
            <a-slider v-model:value="k" :min="0" :max="2" :step='0.1' @change="onMaterialChange(shaderMat.getK())" />
        </p>

        <p>透明衰退值:
            <a-slider v-model:value="power" :min="0" :max="3" :step='0.1'
                @change="onMaterialChange(shaderMat.getPow())" />
        </p>


        <p>透明色:<el-color-picker v-model="color" size="mini" @change="onMaterialChange(shaderMat.getColor())">
            </el-color-picker>
        </p>
        <p>模糊因子:
            <a-slider v-model:value="blurKernelSize" :min="0" :max="64" :step='1'
                @change="onGlChange(useGl.getBlurKernelSize())" />
        </p>
        <p>模糊光强度:
            <a-slider v-model:value="intensity" :min="0" :max="2" :step='0.1'
                @change="onGlChange(useGl.getIntensity())" />
        </p>
    </div>
</template>
<script setup lang="ts">
import { IEdges, IGlInfo } from '../3D/IProperty';
import { GScene } from '../global';
import { Imat } from '../store/Imat';
import { IMeshEdge } from '../store/ImeshEdge';
import { UseGl } from '../store/useGL';

let meshEdgeInfo = IMeshEdge();
let edgesWidth = meshEdgeInfo.meshEdgesWidth;
let edgesColor = meshEdgeInfo.meshEdgesColor;
const shaderMat = Imat();
let power = shaderMat.pow;
let k = shaderMat.k;
let color = shaderMat.color;
const onChange = (property: IEdges) => {
    GScene.changeMeshEdge(property);
}

const onMaterialChange = (info: { type: string, name: string, value: string | number }) => {
    GScene.changeShaderMat(info);
}
const useGl = UseGl();
const intensity = useGl.intensity
const blurKernelSize = useGl.blurKernelSize
const onGlChange = (property: IGlInfo) => {
    GScene.changeGlOption(property);
}
</script>

<style>
#meshEdgeStyle {
    position: absolute;
    background-color: pink;
    right: 0;
    top: 0%;
    width: auto;
    height: auto
}
</style>