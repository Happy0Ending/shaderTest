<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { SceneManager } from '../3D/scene';
import { GSceneWrite } from '../global';
let scene: SceneManager;
onMounted(() => {
  let canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
  scene = new SceneManager(canvas);
  GSceneWrite(scene);
})
onUnmounted(() => {
  scene.dispose();
})
</script>
<template>
  <div id="parent">
    <div id = "test">hello HelloWorld</div>
    <canvas id="renderCanvas"></canvas>
  </div>
</template>
<style scoped>
#test{
  font-family: quantum;
}
#renderCanvas {
  padding-left: 0;
  padding-top: 0;
  width: 100%;
  height: 90%;
}

.block {
  position: absolute;
  margin: auto;
  left: 40%;
  width: 100px;
  height: 20px;
}
</style>
