import { AbstractMesh, Color3, Effect, Material, Mesh, Scene, ShaderMaterial, Vector3 } from "@babylonjs/core";
import { setValueGlowLayer } from "../setValue";

export function createShaderMaterial(mesh: AbstractMesh, scene: Scene) {

    const name = mesh.name
    Effect.ShadersStore["gradient" + name + "VertexShader"] =
        `
         precision highp float;
         //attribute
         attribute vec3 position;
         attribute vec2 uv;
         attribute vec3 normal;
         //uniform
         uniform mat4 worldViewProjection;
         //varying
         varying vec3 vPosition;
         varying vec2 vUV;
         varying vec3 vNormal;
         void main(void) {
            gl_Position = worldViewProjection*vec4(position,1.0);
            vPosition = position;
            vUV = uv;
            vNormal = normal;
         }`;
    Effect.ShadersStore["gradient" + name + "FragmentShader"] =
        `
          precision highp float;
          varying vec3 vPosition;
          float distanceTwoVec3(vec3 p1){
             float d = sqrt((p1.x)*(p1.x)+(p1.y)*(p1.y)+(p1.z)*(p1.z));
             return d;
          }
          uniform vec3 mainColor;
          uniform vec3 ringColor;
          uniform vec3 growColor;
          uniform vec3 mixColor;
          uniform float maxHeight;
          uniform float minHeight;
          uniform float lengthHeight;
          uniform float ringLength;
          uniform float tTime;
          uniform float tTime2;
          uniform float tTime3;
          uniform float timeScale1;
          uniform float timeScale2;
          uniform float timeScale3;
          void main(void) {
              float alpha = (vPosition.z-minHeight)/lengthHeight;
             
              vec3 color = mix(vec3(0.5,0.5,0.5),mainColor,alpha);
              vec3 finalColor = color;
              float ringRange = distanceTwoVec3(vPosition);
              if(ringRange>tTime*timeScale1-ringLength&&ringRange<tTime*timeScale1+ringLength){
                float dIndex = sin((tTime*timeScale1 - ringRange) / 120.0 * 3.14);
                finalColor = mix(mainColor, ringColor, 1.0 - dIndex);
                
              };
              if(vPosition.x>tTime2*timeScale2-ringLength&&vPosition.x<tTime2*timeScale2+ringLength){
                float dIndex = sin((tTime2*timeScale2 - vPosition.x) / 120.0 * 3.14);
                finalColor = mix(mainColor, mixColor, 1.0 - dIndex);
              };
              if(vPosition.z>tTime3*timeScale3-ringLength*0.1&&vPosition.z<tTime3*timeScale3+ringLength*0.1){
                float dIndex = sin((tTime3*timeScale3-ringLength*0.1 - vPosition.z) / 120.0 * 3.14);
                finalColor = mix(mainColor, growColor, 1.0 - dIndex);
              }
             gl_FragColor = vec4(finalColor,1.0);
          }`;
    let mat = new ShaderMaterial(
        "effectGradAlpha" + name,
        scene,
        {
            vertex: "gradient" + name,
            fragment: "gradient" + name,
        },
        {
            attributes: ["normal", "position", "uv"],
            uniforms: [
                "world",
                "worldView",
                "worldViewProjection",
                "view",
                "projection",
            ],
        }
    );
    const mainColor = Color3.FromHexString("#738182");
    const mixColor =  new Color3(1,1,1);
    const ringColor =   Color3.FromHexString("#8cfffb");
 
    const lengthHeight = mesh.getBoundingInfo().boundingBox.extendSizeWorld.y*2;
    const maxHeight = mesh.getBoundingInfo().boundingBox.maximumWorld.y;
    const minHeight = mesh.getBoundingInfo().boundingBox.minimumWorld.y;
    const ringLength = 80;
    const growColor = Color3.FromHexString("#45b9af");
    mat.setFloat("minHeight",minHeight);
    mat.setFloat("ringLength",ringLength);
    mat.setFloat("lengthHeight",lengthHeight);
    mat.setFloat("maxHeight",maxHeight);
    mat.setColor3("mainColor",mainColor);
    mat.setColor3("mixColor",mixColor);
    mat.setColor3("ringColor",ringColor);
    mat.setColor3("growColor",growColor);
    let tTime = 500;
    let tTime2 = -200;
    let tTime3 = 0;

    let timeScale1= 1;
    let timeScale2 = 2;
    let timeScale3 = 1;

    mat.setFloat("tTime",tTime);
    mat.setFloat("tTime2",tTime2);
    mat.setFloat("tTime3",tTime3);

    mat.setFloat("timeScale1",timeScale1);
    mat.setFloat("timeScale2",timeScale2);
    mat.setFloat("timeScale3",timeScale3);
    
    const obseralbe= scene.onBeforeRenderObservable.add(()=>{
        if( mat.getBindedMeshes().length>0){
            // console.log("正在启动",mat.meshMap)
            if(tTime<2000){
                tTime+=5;
                mat.setFloat("tTime",tTime);
            }else{
                tTime = -1000;
                mat.setFloat("tTime",tTime);
            }
            if(tTime2<2000){
                tTime2+=10;
                mat.setFloat("tTime2",tTime2);
            }else{
                tTime2 = -200;
                mat.setFloat("tTime2",tTime2);
            }
            if(tTime3<300){
                tTime3+=1;
                mat.setFloat("tTime3",tTime3);
            }else{
                tTime3 = 0;
                mat.setFloat("tTime3",tTime3);
            }
        }else{
            console.log("清除")
            scene.onBeforeRenderObservable.remove(obseralbe)
        }
    })
    mat.onEffectCreatedObservable.add(()=>{
        console.log("bind")
    })
    
    // mat.pointsCloud = true;
    // mat.
    
    return mat
}


