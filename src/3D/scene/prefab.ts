import { SceneLoader,Geometry, SceneSerializer,Material, Mesh, Scene, TransformNode, VertexBuffer, VertexData, Quaternion, Vector3 } from "@babylonjs/core"
import { Space } from "@babylonjs/core/Maths/math.axis"



interface IPerFabTransformNodeData {
    position: number[],
    rotation: number[],
    scaling: number[],
    id:string,
    metadata: any
}
interface IPerFabMeshData {
    position: number[],
    rotation: number[],
    scaling: number[],
    id:string,
    geoId: string | undefined,
    matId: string | undefined,
    metadata: any
}
interface IPerfabGeoData {
    id: string | undefined,
    indices: any,
    uvs: any,
    position: any,
    normals: any,
    colors: any,
    uvs2: any,
    uvs3: any,
    uvs4: any,
    uvs5: any,
    uvs6: any,
    matricesIndices: any,
    tangents: any,
    matricesWeights: any,
    matricesWeightsExtra: any,
    colorInstance: any,
    matricesIndicesExtraKind: any
}
interface IPerFab {
    transformNodes: IPerFabTransformNodeData[]
    meshes: IPerFabMeshData[]
    geometry: IPerfabGeoData[]
    materials: any[],
    root: string,
    rootPivot:number[]
}
export class Prefab {
    static Materials: Material[] = [];
    static Geometrys: Geometry[] = [];
    static Serilize(node: TransformNode | Mesh): IPerFab {
        let a = SceneSerializer.Serialize(node.getScene());
        console.log("序列化",a)
        // SceneLoader.Append("","data:"+JSON.stringify(a),node.getScene());
        let perfab: IPerFab = {
            transformNodes: [],
            meshes: [],
            geometry: [],
            materials: [],
            root: node.name,
            rootPivot:node.getAbsolutePivotPoint().asArray(),
        };
        let meshes = node.getChildMeshes();
        let transformNodes = node.getChildTransformNodes(false, (node) => !(meshes.includes(node as Mesh)));
        if (node instanceof Mesh) {
            meshes.push(node);
        } else {
            transformNodes.push(node);
        }
        //记录transformNode节点信息
        transformNodes.forEach((node) => {
            let rotation:number[];
            if(node.rotationQuaternion){
                rotation = node.rotationQuaternion.asArray();
            }else{
                rotation = node.rotation.asArray();
            }

            const tNodeData = {
                position: node.position.asArray(),
                rotation: rotation,
                scaling: node.scaling.asArray(),
                metadata: node.metadata,
                id:node.name
            }
            perfab.transformNodes.push(tNodeData);
        })
        //记录meshes节点信息
        const geometrys: Geometry[] = [];
        const materials: Material[] = [];
        meshes.forEach((node) => {
            let rotation:number[];
            if(node.rotationQuaternion){
                rotation = node.rotationQuaternion.asArray();
            }else{
                rotation = node.rotation.asArray();
            }
            const tNodeData = {
                position: node.position.asArray(),
                scaling: node.scaling.asArray(),
                rotation: rotation,
                id:node.name,
                geoId: (<Mesh>node).geometry?.id,
                matId: (<Mesh>node).material?.name,
                metadata: node.metadata,
            }
            perfab.meshes.push(tNodeData);
            let geo = (<Mesh>node).geometry;
            if (geo && (!geometrys.includes(geo))) {
                geometrys.push(geo);
            }

            let mat = (<Mesh>node).material;
            if (mat && !(materials.includes(mat))) {
                materials.push(mat);
            }
        })

        //记录Geo节点信息
        geometrys.forEach((geometry) => {

            let indices = geometry.getIndices();
            let position = geometry?.getVerticesData(VertexBuffer.PositionKind, true, true);
            let uvs = geometry.getVerticesData(VertexBuffer.UVKind, true, true);
            let normals = geometry.getVerticesData(
                VertexBuffer.NormalKind,
                true,
                true
            );
            let colors = geometry.getVerticesData(
                VertexBuffer.ColorKind,
                true,
                true
            );
            let uvs2 = geometry.getVerticesData(VertexBuffer.UV2Kind, true, true);
            let uvs3 = geometry.getVerticesData(VertexBuffer.UV3Kind, true, true);
            let uvs4 = geometry.getVerticesData(VertexBuffer.UV4Kind, true, true);
            let uvs5 = geometry.getVerticesData(VertexBuffer.UV5Kind, true, true);
            let uvs6 = geometry.getVerticesData(VertexBuffer.UV6Kind, true, true);
            let matricesIndices = geometry.getVerticesData(
                VertexBuffer.MatricesIndicesKind,
                true,
                true
            );
            let tangents = geometry.getVerticesData(
                VertexBuffer.TangentKind,
                true,
                true
            );
            let matricesWeights = geometry.getVerticesData(
                VertexBuffer.MatricesWeightsKind,
                true,
                true
            );

            let matricesWeightsExtra = geometry.getVerticesData(
                VertexBuffer.MatricesWeightsExtraKind,
                true,
                true
            );

            let colorInstance = geometry.getVerticesData(
                VertexBuffer.ColorInstanceKind,
                true,
                true
            );

            let matricesIndicesExtraKind = geometry.getVerticesData(
                VertexBuffer.MatricesIndicesExtraKind,
                true,
                true
            );

            const geoData = {
                id: geometry.id,
                indices: indices,
                uvs: uvs,
                position: position,
                normals: normals,
                colors: colors,
                uvs2: uvs2,
                uvs3: uvs3,
                uvs4: uvs4,
                uvs5: uvs5,
                uvs6:uvs6,
                matricesIndices: matricesIndices,
                tangents: tangents,
                matricesWeights: matricesWeights,
                matricesWeightsExtra: matricesWeightsExtra,
                colorInstance: colorInstance,
                matricesIndicesExtraKind: matricesIndicesExtraKind
            };
            perfab.geometry.push(geoData);
        })

        materials.forEach((mat) => {
            perfab.materials.push({ mat: mat.serialize(), metadata: mat.metadata,id:mat.name});
        })
        console.log("自己的序列化：",perfab);
        return perfab;
    }

    static Parse(prefabData: IPerFab, scene: Scene) {

        const node: (TransformNode | Mesh)[] = [];
        //重新加载transformNodes
        prefabData.transformNodes.forEach((data) => {
            const transformNode = new TransformNode("Prefab" + data.id, scene);
            transformNode.position = Vector3.FromArray(data.position);
            transformNode.rotationQuaternion = null;
            let rotation;
            if(data.rotation.length>3){
                rotation = Quaternion.FromArray(data.rotation);
                transformNode.rotationQuaternion = rotation
            }else{
                rotation = Vector3.FromArray(data.rotation);
                transformNode.rotation = rotation
            }
            // transformNode.rotation = Quaternion.FromArray(data.rotation).toEulerAngles();
            transformNode.scaling = Vector3.FromArray(data.scaling);
            transformNode.metadata = data.metadata;
            node.push(transformNode);
        })

        //重新加载geometrys
        prefabData.geometry.forEach((geoData) => {
            let data = new VertexData();
            data.colors = geoData.colors;
            data.indices = geoData.indices;
            data.matricesIndices = geoData.matricesIndices;
            data.matricesIndicesExtra = geoData.matricesIndicesExtraKind;
            data.matricesWeights = geoData.matricesWeights;
            data.matricesWeightsExtra = geoData.matricesWeightsExtra;
            data.normals = geoData.normals;
            data.positions = geoData.position;
            data.tangents = geoData.tangents;
            data.uvs = geoData.uvs;
            data.uvs2 = geoData.uvs2;
            data.uvs3 = geoData.uvs3;
            data.uvs4 = geoData.uvs4;
            data.uvs5 = geoData.uvs5;
            data.uvs6 =  geoData.uvs6;

            const newGeo = new Geometry("Prefab" + geoData.id, scene, data);
            scene.addGeometry(newGeo);
        })

        //重新加载Materials
        prefabData.materials.forEach((matData) => {
            const mat = Material.Parse(matData.mat, scene, "");
            if (mat) {
                mat.metadata = matData.metadata;
                mat.name = "Prefab" + matData.id;
            }
        })

        //重新加载Mesh
        prefabData.meshes.forEach((meshData) => {

            const mesh = new Mesh("Prefab" + meshData.id, scene);
            mesh.position = Vector3.FromArray(meshData.position);
            mesh.rotationQuaternion = null;
            mesh.scaling = Vector3.FromArray(meshData.scaling);
            console.log("scaling：",meshData.scaling);
            let rotation;
            if(meshData.rotation.length>3){
                rotation = Quaternion.FromArray(meshData.rotation);
                mesh.rotationQuaternion = rotation
            }else{
                rotation = Vector3.FromArray(meshData.rotation);
                mesh.rotation = rotation
            }
            // mesh.rotation = Quaternion.FromArray(meshData.rotation).toEulerAngles();
            mesh.metadata = meshData.metadata;

            scene.getGeometryById("Prefab" + meshData.geoId)?.applyToMesh(mesh);
            // scene.addMesh(mesh);
            mesh.material = scene.getMaterialByName("Prefab" + meshData.matId);
            node.push(mesh);;
        })
        // console.log("retnode",node.length);
        node.forEach((cNode) => {
            let parent = scene.getTransformNodeByName("Prefab" + cNode.metadata?.parentId);

            if(!parent){
                parent = scene.getMeshByName("Prefab" + cNode.metadata?.parentId);
            }
            // console.log("parentName",cNode.metadata?.parentId,parent?.name,"Prefab" + cNode.metadata?.parentId);
            if (parent) {
                cNode.setParent(parent,true);
            }
        })
        const root = scene.getMeshByName("Prefab" + prefabData.root);
        // root.setPivotPoint(Vector3.FromArray(prefabData.rootPivot),Space.WORLD);
        console.log("root",root?.name);
        return root;
    }
}

