<template>
    <div id="meshEdgeStyle">
        <a-slider v-model:value="edgesWidth" :min="0" :max="5" :step='0.1'
            @change="onChange(meshEdgeInfo.getEdgesWidth())" />
        <el-color-picker v-model="edgesColor" size="mini" @change="onChange(meshEdgeInfo.getEdgesColor())">
        </el-color-picker>
        <a-slider v-model:value="power" :min="0" :max="5" :step='0.1' @change="onShaderChange(shaderMat.getPow())" />
        <a-slider v-model:value="k" :min="0" :max="5" :step='0.1' @change="onShaderChange(shaderMat.getK())" />
        <el-color-picker v-model="color" size="mini" @change="onShaderChange(shaderMat.getColor())">
        </el-color-picker>
    </div>
</template>
<script setup lang="ts">
import { IEdges } from '../3D/IProperty';
import { GScene } from '../global';
import { Imat } from '../store/Imat';
import { IMeshEdge } from '../store/ImeshEdge';

let meshEdgeInfo = IMeshEdge();
let edgesWidth = meshEdgeInfo.meshEdgesWidth;
let edgesColor = meshEdgeInfo.meshEdgesColor;

const onChange = (property: IEdges) => {
    GScene.changeMeshEdge(property);
}

const shaderMat = Imat();
let power = shaderMat.pow;
let k = shaderMat.k;
let color = shaderMat.color;
const onShaderChange = (info: { type: string, name: string, value: string | number }) => {
  GScene.changeShaderMat(info);
}
</script>

<style>
#meshEdgeStyle {
    position: absolute;
    margin: auto;
    top: 20%;
    left: 40%;
    width: 100px;
    height: 20px;
}
</style>