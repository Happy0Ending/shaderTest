import { ArcRotateCamera, BoundingInfo, Color3, Color4, CubeTexture, Engine, GizmoManager, HemisphericLight, MeshBuilder, Scene, SceneLoader, SceneSerializer, StandardMaterial, Vector3 } from "@babylonjs/core";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";


export function prefabScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);

    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("TEST.dds", scene);
    // const texture = new Texture("环境.jpg",scene);
    let light = new HemisphericLight('light', new Vector3(0, 100, 0), scene);
    light.intensity  = 0.5;

    // const box2 = MeshBuilder.CreateGround("Box2",{width:400,height:400});
    // // box2.position.z += 8
    // const mat = new StandardMaterial("mat",scene);
    // mat.metadata = {
    //     id:"mat"
    // }
    // mat.diffuseColor = Color3.Red();
    // // box2.metadata = {id:"123"};

    // box2.material = mat;
    // let a = Prefab.Serilize(box2);
    // console.log(a);
    // let bb = Prefab.Parse(a,scene);
    // setTimeout(() => {
    //     box2.position.y +=10;
    // }, 1000);
    // scene.createDefaultEnvironment();
    // let c  = SceneSerializer.Serialize(scene);
    // console.log("c:,",c);
    // window.scene = scene;
    // new BoundingInfo();
    // console.time("GLTFToBase64");
    // let ss = encode(JSONDATA)
    // // console.timeEnd("GLTFToBase64")
    // // console.time("gltfStr");
    // let gltfStr = decode(ss);
    // console.log(gltfStr), gltfStr
    // console.timeEnd("gltfStr");

    // let file = new File([gltfStr], "scene.gltf");
    // console.log('file', file);
    const gizmo = new GizmoManager(scene);
    gizmo.positionGizmoEnabled = true;
    gizmo.rotationGizmoEnabled = true;
    gizmo.scaleGizmoEnabled = true;


    // SceneLoader.ImportMesh("", "", "机房.glb", scene, (meshes1, a, b, c, transformNodes) => {
    //     // console.log('transformNodes',transformNodes)
    //     meshes1.forEach((mesh)=>{
         
    //         if(mesh.material){
    //             (<PBRMaterial>mesh.material).metallic =0;
    //             (<PBRMaterial>mesh.material).roughness =1;

               
    //         }
            
    //     })
    //     SceneLoader.ImportMesh("", "", "light1.glb", scene,(meshes)=>{
    //         meshes.forEach((mesh)=>{
    //             if(mesh.material){
    //                 (<PBRMaterial>mesh.material).metallic = 0;
    //             }
                
    //         })
    //     })
    //     // console.log('meshes',meshes)
    //     // meshes[0].position.y += 10;
    //     // let nodes = [...meshes, ...transformNodes]
    //     // nodes.forEach((mesh, index) => {
    //     //     console.log(mesh.getClassName());
    //     //     const id = "node" + index;
    //     //     mesh.name = id;
    //     //     if (mesh.rotationQuaternion) {
    //     //         // console.log("rotationQuaternion",mesh.rotationQuaternion.clone());
    //     //         const rotationQ = mesh.rotationQuaternion.toEulerAngles().clone();
    //     //         mesh.rotationQuaternion = null;
    //     //         // console.log("oldrotation",mesh.rotation.clone());
    //     //         // console.log("oldabsoluteRotationQuaternion",mesh.absoluteRotationQuaternion.clone())
    //     //         mesh.rotation = rotationQ;
    //     //         // console.log("newrotation",mesh.rotation.clone());
    //     //         // console.log("newabsoluteRotationQuaternion",mesh.absoluteRotationQuaternion.clone())

    //     //     }
    //     //     if (mesh instanceof Mesh && mesh.geometry) {
    //     //         mesh.geometry.id = "geo" + index;
    //     //         if (mesh.material) {
    //     //             mesh.material.name = "mat" + index;
    //     //             mesh.material.metadata = {
    //     //                 id: "mat" + index
    //     //             }
    //     //         }
    //     //     }
    //     //     mesh.metadata = {
    //     //         id: id,
    //     //     }
    //     // })

    //     // nodes.forEach((mesh) => {
    //     //     mesh.metadata.parentId = mesh.parent?.name;
    //     // })
    //     // // camera.target = meshes[0].position;
    //     // let oldser = SceneSerializer.Serialize(scene);
    //     // console.log("oldser",oldser);

    //     // let ser = Prefab.Serilize(meshes[0]);
    //     // console.log("newSer", ser);


    //     // // scene.debugLayer.show();

    //     // camera.setTarget(meshes[0])
    //     // setTimeout(() => {
    //     //     let newMesh = Prefab.Parse(ser, scene);
    //     //     if (newMesh) {
    //     //         console.log("ParseMesh", newMesh.name);
    //     //         console.log(newMesh.getChildMeshes())
    //     //         // newMesh.position.y +=50;

    //     //         // gizmo.attachToMesh(newMesh);
    //     //     }
    //     //     meshes[0].position.y += 10;
    //     //     meshes[0].position.x += 50;
    //     // }, 3000);

    //     // Prefab.Serilize(meshes[0]);
    // });

    // let a = evalRPN(["4","13","5","/","+"]);
    // console.log("aaaa",a)




    return scene
}
