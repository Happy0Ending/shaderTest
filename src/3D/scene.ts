
import { AbstractMesh, ArcRotateCamera, Color3, Color4, Engine, GizmoManager, GlowLayer, HemisphericLight, HtmlElementTexture, Mesh, MeshBuilder, PBRMaterial, Scene, SceneLoader, Space, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { outLineAlphaByMesh } from "./shader";
import '@babylonjs/loaders'
import { Ishader } from "./shaderType";
import { setValue } from "./setValue";
import { IEdges, IGlInfo, IshaderMatInfo } from "./IProperty";
import { IOptions } from "./Ioptions";
import { IType, SceneType } from "./IType";
import { gradientMatScene } from "./scene/grientScene";
import { wireFrameScene } from "./scene/wireFrame";
import { pbrScene } from "./scene/pbrScene";
import { reflectScene } from "./scene/reflectScene";
import { glassScene } from "./scene/glassScene";
import { boliScene } from "./scene/glassBoliScene";
import { textureScene } from "./scene/textureScene";
import { mapScene } from "./scene/mapScene";
import { Breadcrumb } from "ant-design-vue";
import { lineScene } from "./scene/lineScene";
import { LineSysManager } from "./lineSystem/lineSystemManager";
import { ChartsManager } from "./scene/charts";
import { prefabScene } from "./scene/prefabScene";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { Plane } from "@babylonjs/core/Maths/math.plane";
import { PBRBaseMaterial } from "@babylonjs/core/Materials/PBR/pbrBaseMaterial";
import { createCharts } from "./echarts";
import axios from "axios";
import { createHtmlMesh } from "./CSS3dRender";
import { createCharts2 } from "./charts/charts2";
import { createCharts3 } from "./charts/charts3";
import { createCharts4 } from "./charts/charts4";
import { ppScene } from "./scene/perferance";
// import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import * as olProj from "ol/proj";
// import XYZ from 'ol/source/XYZ';
import { tileScene } from "./scene/tileScene";
import Color from "element-plus/es/components/color-picker/src/color";
import { create } from "lodash";
import { createTianMap } from "./scene/tiaMap";
export class SceneManager {
    public engine: Engine;
    public activeScene: Scene;
    public matList: Ishader[];
    public gl: GlowLayer | null = null;
    // public glScene: Scene;
    // public gradientScene: Scene;
    // public wireFrameScene: Scene;
    // public pbrScene: Scene;
    // public reflectScene: Scene;
    // public glassScene: Scene;
    public boliScene: Scene;

    constructor(canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas);
        this.matList = [];
        // let scene = this.createScene(this.engine, canvas);
        // // this.glScene = textureScene(this.engine, canvas);
        // this.gradientScene = gradientMatScene(this.engine, canvas);
        // this.wireFrameScene = wireFrameScene(this.engine, canvas);
        // this.pbrScene = pbrScene(this.engine, canvas);
        // this.reflectScene = reflectScene(this.engine, canvas);
        // this.glassScene = glassScene(this.engine, canvas);

        // this.boliScene = ppScene(this.engine, canvas);
        // this.mapScene = reflectScene(this.engine,canvas);
        this.activeScene = createTianMap(this.engine, canvas);

        this.engine.runRenderLoop(() => {
            this.activeScene.render();
        })
        // this.lineSysManager = new LineSysManager(this);
        // let a = new ChartsManager(this);
    }
    createScene(engine: Engine, canvas: HTMLCanvasElement) {
        let scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 1)
        let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
            Vector3.Zero(), scene);
        camera.attachControl(canvas);
        let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
        scene.environmentTexture = CubeTexture.CreateFromPrefilteredData("country.env", scene);
        const plane = MeshBuilder.CreatePlane("plane", { size: 1 }, scene);
        const plane2 = MeshBuilder.CreatePlane("plane", { size: 16 }, scene);
        plane2.position.z = 16;

        plane.visibility = 0.2;
        plane.rotation.x = Math.PI / 2
        const mat = new PBRMaterial("mat", scene);
        mat.metallic = 0;
        mat.roughness = 1.0;
        mat.albedoColor = Color3.White();
        plane.material = mat;
        this.initChartsPlane(plane)

        const mat2 = new PBRMaterial("mat", scene);
        mat2.metallic = 0;
        mat2.roughness = 1.0;
        mat2.albedoColor = Color3.Blue();
        plane2.material = mat2;

        // var chartDom = document.getElementById('charts1') as HTMLCanvasElement;
        // createCharts2();
        // createCharts3();
        // createCharts4();
        // createCharts5()
        const domCanvas = document.getElementById("chartsDiv");
        if (domCanvas) {
            // const a = createHtmlMesh(plane, canvas, domCanvas);
            // window.a = a;
        }
        // new Map({
        //     target: 'mapDiv',
        //     layers: [
        //         new TileLayer({
        //             source: new XYZ({
        //                 url: 'https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        //             }),
        //         }),
        //     ],
        //     view: new View({
        //         // 将西安作为地图中心
        //         center: olProj.fromLonLat([108.945951, 34.465262]),
        //         zoom: 10,
        //     }),
        //     controls: [],
        // });
        const domMap = document.getElementById("mapDivParent");
        const gizmo = new GizmoManager(scene);
        gizmo.rotationGizmoEnabled = true;
        if (domMap) {
            const b = createHtmlMesh(plane, canvas, domMap);
            // b.scaling.x = 500;
            // b.scaling.y = 500;
            // b.scaling.z = 500;
            // window.b = b;
            // b.rotate(new Vector3(1,0,0),Math.PI/2);

        }

        // const domCanvas2 = document.getElementById("charts3");
        // if (domCanvas2) {
        //     createHtmlMesh(plane2, canvas, domCanvas2);
        // }

        // createHtmlMesh(plane,canvas,domCanvas)
        // let string1 = domCanvas.toDataURL();
        // let file1 = this.base64ImgtoFile(string1);
        // let imageURL = window.webkitURL.createObjectURL(file1) || window.URL.createObjectURL(file1);
        // let texture2 = new Texture(imageURL, scene);
        // mat.albedoTextur

        return scene
    }
    createScene2(engine: Engine, canvas: HTMLCanvasElement) {

        var scene = new Scene(engine);

        // Create a rotating camera
        var camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 3, 20, Vector3.Zero(), scene);

        // Attach it to handle user inputs (keyboard, mouse, touch)
        camera.attachControl(canvas, false);
        const xAixs = MeshBuilder.CreateLines("x", {
            points: [
                new Vector3(0, 0, 0),
                new Vector3(1000, 0, 0)
            ], colors: [Color3.Red().toColor4(), Color3.Red().toColor4()]
        })

        const zAixs = MeshBuilder.CreateLines("z", {
            points: [
                new Vector3(0, 0, 0),
                new Vector3(0, 0, 1000)
            ], colors: [Color3.Blue().toColor4(), Color3.Blue().toColor4()]
        })
        // Add a light
        var light = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
        light.specular = Color3.Black();
        // var multimat = new MultiMaterial("multi", scene);
        // var zoom = 9;

        function lonlatTomercator(lonlat: any) {
            var mercator = { x: 0, y: 0 };
            var x = lonlat.x * 20037508.34 / 180;
            var y = Math.log(Math.tan((90 + lonlat.y) * Math.PI / 360)) / (Math.PI / 180);
            y = y * 20037508.34 / 180;
            mercator.x = x;
            mercator.y = y;
            return mercator;
        }

        // http://webst04.is.autonavi.com/appmaptile?style=6&x=843&y=388&z=10

        var MapConfig = {
            // RootDir: '/DataServer?T=img_w&tk=af7560c213f145a1a52db53ca8c3fb5e',
            RootDir: '/appmaptile?style=6',
            ViewHeight: 2120 * 4,
            ViewWidth: 1498 * 8,
            TitlePix: 256,
            Resolution: [
                156543.033928,
                78271.5169639999,
                39135.7584820001,
                19567.8792409999,
                9783.93962049996,
                4891.96981024998,
                2445.98490512499,
                1222.99245256249,
                611.49622628138,
                305.748113140558,
                152.874056570411,
                76.4370282850732,
                38.2185141425366,
                19.1092570712683,
                9.55462853563415,
                4.77731426794937,
                2.38865713397468,
                1.19432856685505],
            // Scale: [591657527.591555, 295828763.795777, 147914381.897889, 73957190.948944,
            //     36978595.474472, 18489297.737236, 9244648.868618, 4622324.434309, 2311162.217155,
            //     1155581.108577, 577790.554289, 288895.277144, 144447.638572, 72223.819286,
            //     36111.909643, 18055.954822, 9027.977411, 4513.988705],
            FullExtent: {
                xmin: -20037508.3427892,
                ymin: -20037508.3427892,
                xmax: 20037508.3427892,
                ymax: 20037508.3427892,
                // spatialReference: {
                //     wkid: 3857
                // }
            }
        };


        //设置将要现实的地图中心点
        let centerGeoPoint = {
            x: 104.99,
            y: 34.79
        };
        centerGeoPoint = lonlatTomercator(centerGeoPoint);
        let level = 3;
        //当前窗口显示的范围
        let minX = centerGeoPoint.x - (MapConfig.Resolution[level] * MapConfig.ViewWidth / 2);
        let maxX = centerGeoPoint.x + (MapConfig.Resolution[level] * MapConfig.ViewWidth / 2);
        let minY = centerGeoPoint.y - (MapConfig.Resolution[level] * MapConfig.ViewHeight / 2);
        let maxY = centerGeoPoint.y + (MapConfig.Resolution[level] * MapConfig.ViewHeight / 2);
        //左上角开始的行列号
        let leftTopTitleRow = Math.floor(Math.abs(maxY - MapConfig.FullExtent.ymax) / MapConfig.Resolution[level] / MapConfig.TitlePix);
        let leftTopTitleCol = Math.floor(Math.abs(minX - MapConfig.FullExtent.xmin) / MapConfig.Resolution[level] / MapConfig.TitlePix);
        // //实际地理范围
        let realMinX = MapConfig.FullExtent.xmin + leftTopTitleCol * MapConfig.TitlePix * MapConfig.Resolution[level];
        let realMaxY = MapConfig.FullExtent.ymax - leftTopTitleRow * MapConfig.TitlePix * MapConfig.Resolution[level];
        // //计算左上角偏移像素
        let offSetX = (realMinX - minX) / MapConfig.Resolution[level];
        let offSetY = (maxY - realMaxY) / MapConfig.Resolution[level];
        //计算瓦片个数
        let xClipNum = Math.ceil((MapConfig.ViewHeight + Math.abs(offSetY)) / MapConfig.TitlePix);
        let yClipNum = Math.ceil((MapConfig.ViewWidth + Math.abs(offSetX)) / MapConfig.TitlePix);
        //右下角行列号
        let rightBottomTitleRow = leftTopTitleRow + xClipNum - 1;
        let rightBottomTitleCol = leftTopTitleCol + yClipNum - 1;
        let realMaxX = MapConfig.FullExtent.xmin + (rightBottomTitleCol + 1) * MapConfig.TitlePix * MapConfig.Resolution[level];
        let realMinY = MapConfig.FullExtent.ymax - (rightBottomTitleRow + 1) * MapConfig.TitlePix * MapConfig.Resolution[level];
        console.log("clip", xClipNum, yClipNum)
        // const meshesTotal = [];
        // for (var i = 0; i < xClipNum; i++) {
        //     let meshes = [];
        //     for (var j = 0; j < yClipNum; j++) {
        //         // var beauty = new Image();
        //         try {
        //             const texture = new Texture(MapConfig.RootDir + "&X=" + (leftTopTitleCol + j) + "&Y=" + (leftTopTitleRow + i) + "&z=" + level, scene);
        //             texture.onLoadObservable.add(() => {
        //                 console.log("size:", texture.getSize().height * texture.getSize().width);
        //             })
        //             var ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
        //             ground.position.x +=3;
        //             ground.position.z -=3;
        //             ground.bakeCurrentTransformIntoVertices();
        //             meshes.push(ground);
        //             ground.position.x = j * 6
        //             ground.position.z = (xClipNum - i) * 6
        //             const mat = new StandardMaterial("mat" + i + j, scene);
        //             mat.diffuseTexture = texture;
        //             // &x=843&y=388&z=10
        //             ground.material = mat;
        //             mat.useAlphaFromDiffuseTexture = true
        //         } catch (error) {
        //             console.log("没有该层的地图")
        //         }
        //         // var TitleImg = {
        //         //     img: null,
        //         //     x: 0,
        //         //     y: 0
        //         // };


        //         // TitleImg.img = beauty;
        //         // TitleImg.x = offSetX + (j * MapConfig.TitlePix);
        //         // TitleImg.y = offSetY + (i * MapConfig.TitlePix);
        //         // TitlesArry.push(TitleImg);
        //         // myctx.drawImage(TitleImg.img, TitleImg.x, TitleImg.y);
        //     }
        //     let mergemesh = Mesh.MergeMeshes(meshes, false);
        //     meshesTotal.push(mergemesh)
        // }
        // Mesh.MergeMeshes(meshesTotal as Mesh[], false);

        //***************************** */


        // for (var row = 0; row < subdivisions.h; row++) {
        //     for (var col = 0; col < subdivisions.w; col++) {
        //         var material = new StandardMaterial(
        //             "material" + row + "-" + col,
        //             scene
        //         );
        //         material.diffuseTexture = new Texture(
        //             `http://online1.map.bdimg.com/onlinelabel/?qt=tile&x=${col}&y=${row}&z=12`,
        //             /* "http://b.tile.openstreetmap.org/" + zoom + "/" + (xTileBase + col) + "/" + (yTileBase - row) + ".png", */
        //             scene
        //         );
        //         material.diffuseTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
        //         material.diffuseTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
        //         material.specularColor = new Color4(0, 0, 0, 0);
        //         material.backFaceCulling = false;
        //         multimat.subMaterials.push(material);
        //     }
        // }


        // // Part 3 : Apply the multi material
        // // Define multimat as material of the tiled ground
        // tiledGround.material = multimat;

        // // Needed variables to set subMeshes
        // var verticesCount = tiledGround.getTotalVertices();
        // var tileIndicesLength = tiledGround.getIndices().length / (subdivisions.w * subdivisions.h)////////////;

        // // Set subMeshes of the tiled ground
        // tiledGround.subMeshes = [];
        // var index = 0;
        // var base = 0;
        // for (var row = 0; row < subdivisions.h; row++) {
        //     for (var col = 0; col < subdivisions.w; col++) {
        //         var submesh = new SubMesh(
        //             index++, 0, verticesCount, base, tileIndicesLength, tiledGround
        //         );
        //         tiledGround.subMeshes.push(submesh);
        //         base += tileIndicesLength;
        //     }
        // }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
        const pic1 = "https://t2.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILECOL=0&TILEROW=0&TILEMATRIX=1&tk=68d166cfe304fa077ff035bed00edc37"

        const CreateGround = (str:string)=>{

            const texture = new Texture(str  , scene);
    
            var ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
            ground.position.x += 3;
            ground.position.z -= 3;
            ground.bakeCurrentTransformIntoVertices();
            // meshes.push(ground);
            // ground.position.x = j * 6
            // ground.position.z = (xClipNum - i) * 6
            const mat = new StandardMaterial("mat", scene);
            mat.diffuseTexture = texture;
            // &x=843&y=388&z=10
            ground.material = mat;
        }
        CreateGround(pic1);


        return scene;

    }
    initChartsPlane(plane: AbstractMesh) {
        // const pivot = plane.getBoundingInfo().boundingBox.vectorsWorld[6];
        // plane.setPivotPoint(pivot, Space.WORLD);
    }
    base64ImgtoFile(dataurl: any, filename = 'file') {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const suffix = mime.split('/')[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {
            type: mime
        })
    }
    getBoundingBoxInfo(nodes: AbstractMesh[]) {
        let min: Vector3 = Vector3.Zero();
        let max: Vector3 = Vector3.Zero();

        nodes.forEach((node) => {
            let minimumWorld: Vector3, maximumWorld: Vector3;
            const mesh = node;
            const boundingBox = mesh.getBoundingInfo().boundingBox;
            minimumWorld = boundingBox.minimumWorld;
            maximumWorld = boundingBox.maximumWorld;
            min = Vector3.Minimize(min, minimumWorld).clone();
            max = Vector3.Maximize(max, maximumWorld).clone();
        });


        return { max, min, center: Vector3.Center(min, max) };
    }
    dispose() {
        this.engine.dispose();
        this.activeScene.dispose();
    }
    changeShaderMat(property: IshaderMatInfo) {
        console.log(this.matList);
        this.matList.forEach((IShader) => {
            console.log('123');
            let options: IOptions = {
                type: IType.shaderMaterial,
                target: IShader.mat,
                value: property
            }
            setValue(options);
        })
    }

    changeMeshEdge(property: IEdges) {
        let options = {
            type: IType.meshEdge,
            target: this.glScene.meshes,
            value: property
        }
        setValue(options);
    }

    changeGlOption(property: IGlInfo) {
        let options: IOptions = {
            type: IType.glowLayer,
            target: this.gl,
            value: property
        }
        setValue(options);
    }


    arrayBufferToBase64Img = (buffer: Uint8Array) => {

        let str = "";
        buffer.forEach((bit) => {
            str += String.fromCharCode(bit);
        })


        return window.btoa(str);
    }


    /**
 * uint8array转Base64
 * @param callback Function 获取转换结果e.target.result后执行的回调函数
 */

    base64ToUint8Array(base64String: string) {
        let padding = '='.repeat((4 - base64String.length % 4) % 4);
        let base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        let rawData = atob(base64);
        let outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    previewSomeTwoTexture(oldTexture: Texture, newTexture: Texture) {
        // newTexture.wrapV = oldTexture.wrapV;
        // newTexture.wrapU = oldTexture.wrapU;
        // newTexture.wrapR = oldTexture.wrapR;
        // newTexture.level = oldTexture.level;
        // newTexture.invertZ = oldTexture.invertZ;
        // newTexture.hasAlpha = oldTexture.hasAlpha;
        newTexture.metadata = oldTexture.metadata;
        newTexture.wAng = oldTexture.wAng - Math.PI;
        newTexture.vAng = oldTexture.vAng - Math.PI;
        // newTexture.uAng = oldTexture.uAng
        // newTexture.uOffset = oldTexture.uOffset;
        // newTexture.vOffset = oldTexture.vOffset;
    }
}