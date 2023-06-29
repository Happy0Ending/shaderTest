
import { Engine, Scene, Color4, ArcRotateCamera, Vector3, HemisphericLight, Color3, MeshBuilder, HighlightLayer, PointsCloudSystem, ShaderMaterial, Mesh, NodeMaterial, TransformBlock, NodeMaterialSystemValues, VertexOutputBlock, ScaleBlock, AnimatedInputBlockTypes, VectorSplitterBlock, TrigonometryBlock, TrigonometryBlockOperations, VectorMergerBlock, SubtractBlock, MultiplyBlock, Vector2, OneMinusBlock, DotBlock, AddBlock, DivideBlock, FragmentOutputBlock, Camera, PostProcess, Effect, StandardMaterial, CubeTexture, Texture, HDRCubeTexture, SceneLoader, AbstractMesh, Geometry, VertexBuffer, SceneSerializer, DataArray } from "@babylonjs/core";

export function ppScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
    let light2 = new HemisphericLight('light', new Vector3(0, 100, 0), scene);
    scene.clearColor = Color3.FromHexString("#e5e5e5").toColor4();

    // Skybox
    var skybox = Mesh.CreateBox("skyBox", 500.0, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new HDRCubeTexture("night.hdr", scene, 256, false, true, false, true);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    scene.debugLayer.show();
    // SceneLoader.ImportMesh("", "", "123glb.glb", scene, (meshes) => {
    //     let a = SceneSerializer.Serialize(scene);
    //     console.log("场景序列化", a);
    //     pp(meshes[0]);
    // })



    return scene
}

export function pp(mesh: AbstractMesh) {
    let lengthList: string[] = [];
    let meshMap: Map<string, number> = new Map();
    let scene = mesh.getScene();
    let meshes = mesh.getChildMeshes();
    meshes.forEach((mesh) => {
        mesh.setParent(null);
        if (mesh instanceof Mesh && mesh.geometry) {
            let indicesLength = mesh.geometry?.getIndices()?.length;
            let normalLength = mesh.geometry?.getVertexBuffer(VertexBuffer.NormalKind)?.getSize();
            let positionLenth = mesh.geometry?.getVertexBuffer(VertexBuffer.PositionKind)?.getSize();
            let meshStr = indicesLength + "-" + normalLength + "-" + positionLenth;

            //判断是不是长得相同的mesh
            let isExist = false;
            //第一步先判断顶点 法线 uv的数组长度是否相同；
            if (lengthList.includes(meshStr)) {
                let source = scene.getMeshByUniqueId(meshMap.get(meshStr) as number) as Mesh;
                let indicesV1 = mesh.geometry?.getIndices();
                let indicesV2 = source.geometry?.getIndices();

                let normalV1 = mesh.geometry?.getVertexBuffer(VertexBuffer.NormalKind)?.getData() as number[];
                let normalV2 = source.geometry?.getVertexBuffer(VertexBuffer.NormalKind)?.getData() as number[];;

                let positionV1 = mesh.geometry.getVertexBuffer(VertexBuffer.PositionKind)?.getData() as number[];
                let positionV2 = source.geometry?.getVertexBuffer(VertexBuffer.PositionKind)?.getData() as number[];
                let isEqual = {
                    indivces: false,
                    normal: false,
                    position: false,
                }
                if (indicesV2 && indicesV1) {
                    if (indicesV1.every((v, i) => v === (<[]>indicesV2)[i])) {
                        isEqual.indivces = true;
                    }
                }
                if (normalV1 && normalV2) {
                    if (normalV2.every((v, i) => v === (<[]>normalV1)[i])) {
                        isEqual.normal = true;
                    }
                }
                if (positionV1 && positionV2) {
                    if (positionV2.every((v, i) => v === (<[]>positionV1)[i])) {
                        isEqual.position = true;
                    }
                }
                if (isEqual.indivces && isEqual.normal && isEqual.position) {
                    isExist = true;
                    console.log("当前认为网格" + mesh.name + "与网格" + source.name + "是相同的网格");
                }

            }
            //第二部判断 顶点 法线 uv的数组 是否相同；

            if (!isExist) {
                console.log("一个新的GEO", meshStr);
                lengthList.push(meshStr);
                meshMap.set(meshStr, mesh.uniqueId);
            } else {
                let position = mesh.position.clone();
                let rotationQ = mesh.rotationQuaternion?.clone();
                let rotation = mesh.rotation?.clone();
                let scaling = mesh.scaling.clone();
                let sourceUid = meshMap.get(meshStr);
                let parent = mesh.parent;
                if (sourceUid) {
                    // mesh.position.y += 10;
                    mesh.setEnabled(false);
                    let source = scene.getMeshByUniqueId(sourceUid) as Mesh;
                    let newMesh = source.createInstance(source.name + "Instance");
                    if (source.material)
                        source.material.backFaceCulling = false;
                    let textures = mesh.material?.getActiveTextures();
                    textures?.forEach((texture) => {
                        if (!(source.material?.hasTexture(texture))) {
                            texture.dispose();
                        }
                    })
                    if (source.material != mesh.material) {
                        mesh.material?.dispose()
                    }
                    newMesh.setParent(parent);
                    mesh.dispose();
                    newMesh.position = position;
                    if(rotationQ){
                        newMesh.rotationQuaternion = rotationQ;
                    }else{
                        newMesh.rotation = rotation;
                    }
                    newMesh.scaling = scaling;
                }
            }
        }
    })
    console.log(lengthList);
    meshMap.clear();
    lengthList.length = 0;

}