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

    <canvas id="renderCanvas"></canvas>
    <!-- <div id="chartsDiv">
      <div id="chartsDDiv ">
        <div id="charts1"></div>
        <div id="charts2"></div>
        <div id="charts3"></div>
        <div id="charts4"></div>
        <div id="charts5"></div>
      </div>
    </div> -->
    <!-- <div id = "mapDivParent">

      <div id = "mapDiv">
    </div>

    </div> -->
  </div>
</template>
<style scoped>
#test {
  font-family: quantum;
}

#parent {
  padding-left: 0;
  padding-top: 0;
  width: 100%;
  height: 100%;
  position: relative;
}

#renderCanvas {
  padding-left: 0;
  padding-top: 0;
  width: 100%;
  height: 100%;
}

#chartsDiv {
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding-left: 0;
  padding-top: 0;
  position: absolute;
  top: 0%;
  left: 0%;
  z-index: 500;
  /* background-color: aqua; */
}

#mapDivParent{
  pointer-events: none;
  width: 1000px;
  height: 1000px;
  padding-left: 0;
  padding-top: 0;
  position: absolute;
  top: 0%;
  left: 0%;
  z-index: 500;
}
#mapDiv{
  width: 1000px;
  height:1000px ;
}

#chartsDDiv {
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding-left: 0;
  padding-top: 0;
  position: relative;
  background-color: aqua;
}

#charts1 {
  position: absolute;
  top: 0%;
  left: 50%;
  width: 500px;
  height: 500px;
  background-color: rgb(41, 210, 15);
}

#charts2 {
  width: 500px;
  height: 500px;
}

#charts3 {
  width: 500px;
  height: 500px;
}

#charts4 {
  width: 500px;
  height: 500px;
}

#charts5 {
  width: 500px;
  height: 500px;
}

.block {
  position: absolute;
  margin: auto;
  left: 40%;
  width: 100px;
  height: 20px;
}
</style>
