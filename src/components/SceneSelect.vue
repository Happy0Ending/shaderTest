<template>

    <div class="selectScene">

        <el-select class="m-2" :placeholder="valueType" @change="onchange">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </div>


</template>
<script setup lang="ts">
import { ref } from 'vue';
import { SceneType } from '../3D/IType';
import { GScene } from '../global';

const valueType = ref("");
const onchange = (value: SceneType) => {
    GScene.selectScene(value);
    valueType.value = value;
}
const options = [

    {
        value: 'glScene',
        label: '发光场景',
    },
    {
        value: 'grientScene',
        label: '渐变场景',
    },
    {
        value: 'wireFrameScene',
        label: '线框场景',
    },
    {
        value: 'pbrScene',
        label: '物理质感场景',
    },
    {
        value: "reflectScene",
        label: "反射流动场景"
    },
    {
        value: "glassScene",
        label: "玻璃透光场景"
    },
     {
        value: "boliScene",
        label: "有色玻璃场景"
    }
]

</script>
<style>
.selectScene {
    position: absolute;
    background-color: pink;
    left: 0;
    top: 0%;

}
</style>