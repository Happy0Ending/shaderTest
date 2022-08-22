<script setup lang="ts">

import { onMounted, onUnmounted, ref } from 'vue';
import { SceneManager } from '../3D/scene';
import { GSceneWrite } from '../global';
import { Imat } from '../store/Imat';

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
    <canvas id="renderCanvas"></canvas>
  </div>
</template>



<style scoped>
#renderCanvas {
  margin-top: 0%;
  width: 100%;
  height: 100%;
}

.block {
  position: absolute;
  margin: auto;
  left: 40%;
  width: 100px;
  height: 20px;
}
</style>
