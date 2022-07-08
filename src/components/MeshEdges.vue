<template>
    <div id = "meshEdgeStyle">
        <a-slider v-model:value="edgesWidth" :min="0" :max="5" :step='0.1'
            @change="onChange(meshEdgeInfo.getEdgesWidth())" />
        <el-color-picker v-model="edgesColor" size="mini" @change="onChange(meshEdgeInfo.getEdgesColor())" ></el-color-picker>
    </div>
</template>
<script setup lang="ts">
import { IEdges } from '../3D/IProperty';
import { SceneManager } from '../3D/scene';
import { GScene } from '../global';
import { IMeshEdge } from '../store/ImeshEdge';

let meshEdgeInfo = IMeshEdge();
let edgesWidth = meshEdgeInfo.meshEdgesWidth;
let edgesColor = meshEdgeInfo.meshEdgesColor;

const onChange = (property:IEdges) => {
    GScene.changeMeshEdge(property);
}
</script>

<style>
#meshEdgeStyle {
    position: absolute;
    margin: auto;
    top:20%;
    left: 40%;
    width: 100px;
    height: 20px;
}
</style>