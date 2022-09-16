
import { Engine, Scene, Color4, ArcRotateCamera, Vector3, HemisphericLight, Color3, MeshBuilder, HighlightLayer, PointsCloudSystem, ShaderMaterial, Mesh, NodeMaterial, TransformBlock, NodeMaterialSystemValues, VertexOutputBlock, ScaleBlock, AnimatedInputBlockTypes, VectorSplitterBlock, TrigonometryBlock, TrigonometryBlockOperations, VectorMergerBlock, SubtractBlock, MultiplyBlock, Vector2, OneMinusBlock, DotBlock, AddBlock, DivideBlock, FragmentOutputBlock, Camera, PostProcess, Effect, StandardMaterial, CubeTexture, Texture, HDRCubeTexture, SceneLoader } from "@babylonjs/core";
import { InputBlock } from "@babylonjs/core/Materials/Node/Blocks/Input/inputBlock";
import { Space } from "ant-design-vue";

import { BUNNY } from "../../store/pointCloud";
import { createNodeMaterial, DataString2, DataString3, nodeMaterial2 } from "./nodeMaterial";


export function mapScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    let light = new HemisphericLight('light', new Vector3(0, -100, 0), scene);
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


    const dataString =
        `year,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20,t21,t22,t23,t24,t25,t26,t27,t28,t29,t30,t31
    2017,29,29,28,27,27,26,26,26,26,27,29,29,28,28,29,31,32,33,34,35,35,35,36,37,37,35,35,34,34,33,31
2016,28,28,27,26,26,25,25,25,25,26,27,27,28,28,29,30,31,32,33,34,34,35,36,37,36,34,34,33,33,32,31
2015,27,27,27,26,25,25,25,25,25,25,27,27,27,27,28,29,30,31,32,33,33,34,35,36,35,34,33,32,32,31,30
2014,27,27,27,26,25,25,25,25,25,25,26,26,27,26,27,28,29,30,31,32,32,33,35,35,34,33,32,31,31,30,29
2013,27,27,27,26,25,25,25,25,26,25,27,27,27,27,28,29,30,31,32,33,33,34,35,36,35,34,33,32,32,31,30
2012,28,28,27,26,26,25,25,25,25,26,27,27,28,28,29,30,31,32,33,34,34,35,36,37,36,34,34,33,33,32,31
2011,29,29,28,27,27,26,26,26,26,27,29,29,28,28,29,31,32,33,34,35,35,35,36,37,37,35,35,34,34,33,31
2010,30,30,29,28,28,27,27,27,27,28,30,30,29,29,30,31,32,34,35,36,36,36,37,36,36,35,36,34,33,32,30
2009,31,31,30,29,29,28,28,28,28,29,31,31,30,30,31,32,33,34,35,36,37,37,37,36,35,35,34,33,32,31,29
2008,32,32,31,30,30,29,29,29,29,30,32,32,31,31,32,33,34,35,36,37,37,37,37,37,35,35,34,32,31,30,29
2007,32,32,31,30,30,29,29,29,29,30,32,32,31,31,32,33,34,35,36,37,37,37,37,37,35,35,34,32,31,30,29
2006,30,30,29,28,28,27,27,27,27,28,30,30,29,29,30,31,32,34,35,36,36,36,37,36,36,35,36,34,33,32,30`
    let stringList = CSVdataStringToVector3List(dataString);
    const xList: number[] = [];
    stringList[0].forEach((string) => {
        string.split("t").length > 1 && xList.push(Number(string.split("t")[1]));
    })

    const positionList: Vector3[][] = []
    for (let i = 1; i < stringList.length; i++) {//z
        //X
        positionList[i - 1] = [];
        xList.forEach((x) => {
            positionList[i - 1].push(new Vector3(x, Number(stringList[i][x]), i));
        })
    }

    const ribbon = MeshBuilder.CreateRibbon("ribbon", { pathArray: positionList, sideOrientation: 2, updatable: true }, scene)
    const highLight = new HighlightLayer("blackHeight", scene);
    
    highLight.addMesh(ribbon, Color3.Black());
    highLight.innerGlow = false;

    nodeMaterial2("test", scene);
    // highLight.blurHorizontalSize = 32;
    // highLight.blurVerticalSize = 32;
    // ribbon.position.x = 0;
    // ribbon.position.z = 0;
    // let shaderMat = colorShader("temp", scene);
    // ribbon.material = shaderMat;
    // pivotPointCenter(ribbon);
    // camera.setTarget(ribbon.getBoundingInfo().boundingBox.centerWorld);
    // const gizmo = new GizmoManager(scene);
    // gizmo.positionGizmoEnabled = true;
    // gizmo.attachToMesh(ribbon);
    // const box = MeshBuilder.CreateBox("name");
    // box.material = maSaiKe(scene);
    // const postProcess = blackPostProgress(scene, camera);
    // const box = MeshBuilder.CreateBox("name", { size: 0.002 });

    // const positions = XYZ2num(ELEPHANT);


    // const indices:number[] = [];
    // for(let i =0;i<positions.length;i+=3){
    //     indices.push(i/3);
    // }

    // console.log("indices",indices);
    // const normals:number[] =[];
    // const vertexData = new VertexData();
    // VertexData.ComputeNormals(positions, indices, normals);
    // vertexData.positions = positions;
    // vertexData.indices = indices;
    // vertexData.normals = normals;

    // const mesh = new Mesh("mesh", scene);
    // vertexData.applyToMesh(mesh,true);
    // const mat = new StandardMaterial("mat",scene);
    // mat.diffuseColor = Color3.Red();
    // mesh.material = mat
    // mat.backFaceCulling = false;
    // mesh.showBoundingBox = true;
    // mesh.scaling = new Vector3(2, 2, 2);

    // vertexData.
    // const noise = load.getBlockByName("Noise") as any;
    // noise.texture = new Texture("waterBump.png", scene);

    const box2 = MeshBuilder.CreateBox("name", { width: 20, height: 20 }, scene);
    box2.position.y += 30
        ;
    //点云数据
    // const positions = XYZ2Vec3(ELEPHANT)
    // const pointCloud = new PointsCloudSystem("elephant",0.2,scene,{updatable:true});
    // console.log("length",positions.length);

    // pointCloud.addPoints(positions.length,(p:any,i:number)=>{
    //     p.color = Color3.Random();
    //     p.position =positions[i];
    // })
    SceneLoader.ImportMesh("", "", "dao.glb", scene, (a, b, c, d) => {
        console.log(a);
        const material1 = createNodeMaterial({
            "tags": null,
            "id": "node",
            "uniqueId": 3,
            "name": "node",
            "checkReadyOnEveryCall": false,
            "checkReadyOnlyOnce": false,
            "state": "",
            "alpha": 1,
            "backFaceCulling": true,
            "sideOrientation": 1,
            "alphaMode": 2,
            "_needDepthPrePass": false,
            "disableDepthWrite": false,
            "forceDepthWrite": false,
            "depthFunction": 0,
            "separateCullingPass": false,
            "fogEnabled": true,
            "pointSize": 1,
            "zOffset": 0,
            "wireframe": false,
            "pointsCloud": false,
            "fillMode": 0,
            "editorData": {
                "locations": [
                    {
                        "blockId": 1493,
                        "x": 805,
                        "y": -280
                    },
                    {
                        "blockId": 1494,
                        "x": 455,
                        "y": -280
                    },
                    {
                        "blockId": 1495,
                        "x": 35,
                        "y": -350
                    },
                    {
                        "blockId": 1496,
                        "x": -315,
                        "y": -350
                    },
                    {
                        "blockId": 1497,
                        "x": -315,
                        "y": -210
                    },
                    {
                        "blockId": 1498,
                        "x": 35,
                        "y": -210
                    },
                    {
                        "blockId": 1499,
                        "x": 4130,
                        "y": 1260
                    },
                    {
                        "blockId": 1500,
                        "x": 3815,
                        "y": 1295
                    },
                    {
                        "blockId": 1501,
                        "x": 3570,
                        "y": 1295
                    },
                    {
                        "blockId": 1502,
                        "x": 3010,
                        "y": 700
                    },
                    {
                        "blockId": 1503,
                        "x": 2065,
                        "y": 770
                    },
                    {
                        "blockId": 1505,
                        "x": 1785,
                        "y": 1680
                    },
                    {
                        "blockId": 1506,
                        "x": 2695,
                        "y": 455
                    },
                    {
                        "blockId": 1507,
                        "x": 2380,
                        "y": 350
                    },
                    {
                        "blockId": 1508,
                        "x": 2100,
                        "y": 315
                    },
                    {
                        "blockId": 1509,
                        "x": 595,
                        "y": 315
                    },
                    {
                        "blockId": 1510,
                        "x": 315,
                        "y": 315
                    },
                    {
                        "blockId": 1511,
                        "x": 0,
                        "y": 315
                    },
                    {
                        "blockId": 1512,
                        "x": -245,
                        "y": 315
                    },
                    {
                        "blockId": 1513,
                        "x": 1820,
                        "y": 420
                    },
                    {
                        "blockId": 1514,
                        "x": 1540,
                        "y": 420
                    },
                    {
                        "blockId": 1515,
                        "x": 595,
                        "y": 630
                    },
                    {
                        "blockId": 1516,
                        "x": 315,
                        "y": 595
                    },
                    {
                        "blockId": 1517,
                        "x": -35,
                        "y": 595
                    },
                    {
                        "blockId": 1518,
                        "x": 875,
                        "y": 805
                    },
                    {
                        "blockId": 1519,
                        "x": 595,
                        "y": 805
                    },
                    {
                        "blockId": 1520,
                        "x": 315,
                        "y": 735
                    },
                    {
                        "blockId": 1521,
                        "x": 315,
                        "y": 910
                    },
                    {
                        "blockId": 1522,
                        "x": 2100,
                        "y": 420
                    },
                    {
                        "blockId": 1523,
                        "x": 2380,
                        "y": 560
                    },
                    {
                        "blockId": 1524,
                        "x": 2100,
                        "y": 525
                    },
                    {
                        "blockId": 1525,
                        "x": 2100,
                        "y": 630
                    },
                    {
                        "blockId": 1526,
                        "x": 1575,
                        "y": 560
                    },
                    {
                        "blockId": 1528,
                        "x": 1820,
                        "y": 665
                    },
                    {
                        "blockId": 1529,
                        "x": 2415,
                        "y": 1820
                    },
                    {
                        "blockId": 1530,
                        "x": 2030,
                        "y": 1680
                    },
                    {
                        "blockId": 1532,
                        "x": 2065,
                        "y": 1925
                    },
                    {
                        "blockId": 1533,
                        "x": 1785,
                        "y": 1925
                    },
                    {
                        "blockId": 1534,
                        "x": 1470,
                        "y": 1855
                    },
                    {
                        "blockId": 1535,
                        "x": 1190,
                        "y": 1820
                    },
                    {
                        "blockId": 1536,
                        "x": 1190,
                        "y": 1960
                    },
                    {
                        "blockId": 1537,
                        "x": 2380,
                        "y": 700
                    },
                    {
                        "blockId": 1538,
                        "x": 1820,
                        "y": 560
                    }
                ],
                "zoom": 0.40173790973227325,
                "x": 285.94957217876413,
                "y": 282.2401525487632,
                "frames": [
                    {
                        "x": 1440,
                        "y": 220,
                        "width": 1877.91,
                        "height": 1085,
                        "color": [
                            0.2823529411764706,
                            0.2823529411764706,
                            0.2823529411764706
                        ],
                        "name": "specular",
                        "isCollapsed": false,
                        "blocks": [
                            1537,
                            1514,
                            1513,
                            1508,
                            1522,
                            1507,
                            1524,
                            1538,
                            1528,
                            1525,
                            1523,
                            1506,
                            1502,
                            1503,
                            1526
                        ]
                    },
                    {
                        "x": 1120,
                        "y": 1600,
                        "width": 1669.39,
                        "height": 630,
                        "color": [
                            0.2823529411764706,
                            0.2823529411764706,
                            0.2823529411764706
                        ],
                        "name": "diffuse",
                        "isCollapsed": false,
                        "blocks": [
                            1505,
                            1530,
                            1535,
                            1534,
                            1533,
                            1536,
                            1532,
                            1529
                        ]
                    },
                    {
                        "x": -630,
                        "y": -490,
                        "width": 1764.83,
                        "height": 455.521,
                        "color": [
                            0.2823529411764706,
                            0.2823529411764706,
                            0.2823529411764706
                        ],
                        "name": "vertex",
                        "isCollapsed": false,
                        "blocks": [
                            1496,
                            1497,
                            1495,
                            1498,
                            1494,
                            1493
                        ]
                    },
                    {
                        "x": -490,
                        "y": 210,
                        "width": 1777.28,
                        "height": 903.574,
                        "color": [
                            0.2823529411764706,
                            0.2823529411764706,
                            0.2823529411764706
                        ],
                        "name": "vectors",
                        "isCollapsed": false,
                        "blocks": [
                            1512,
                            1511,
                            1510,
                            1509,
                            1517,
                            1516,
                            1515,
                            1520,
                            1521,
                            1519,
                            1518
                        ]
                    }
                ]
            },
            "customType": "BABYLON.NodeMaterial",
            "outputNodes": [
                1493,
                1499
            ],
            "blocks": [
                {
                    "customType": "BABYLON.VertexOutputBlock",
                    "id": 1493,
                    "name": "VertexOutput",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "vector",
                            "inputName": "vector",
                            "targetBlockId": 1494,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.TransformBlock",
                    "id": 1494,
                    "name": "WorldPos * ViewProjectionTransform",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "vector",
                            "inputName": "vector",
                            "targetBlockId": 1495,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "transform",
                            "inputName": "transform",
                            "targetBlockId": 1498,
                            "targetConnectionName": "output"
                        }
                    ],
                    "complementZ": 0,
                    "complementW": 1
                },
                {
                    "customType": "BABYLON.TransformBlock",
                    "id": 1495,
                    "name": "WorldPos",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "vector",
                            "inputName": "vector",
                            "targetBlockId": 1496,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "transform",
                            "inputName": "transform",
                            "targetBlockId": 1497,
                            "targetConnectionName": "output"
                        }
                    ],
                    "complementZ": 0,
                    "complementW": 1
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1496,
                    "name": "position",
                    "comments": "",
                    "inputs": [],
                    "type": 8,
                    "mode": 1,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": false,
                    "groupInInspector": ""
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1497,
                    "name": "World",
                    "comments": "",
                    "inputs": [],
                    "type": 128,
                    "mode": 0,
                    "systemValue": 1,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": false,
                    "groupInInspector": ""
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1498,
                    "name": "ViewProjection",
                    "comments": "",
                    "inputs": [],
                    "type": 128,
                    "mode": 0,
                    "systemValue": 4,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": false,
                    "groupInInspector": ""
                },
                {
                    "customType": "BABYLON.FragmentOutputBlock",
                    "id": 1499,
                    "name": "FragmentOutput",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "rgba"
                        },
                        {
                            "name": "rgb",
                            "inputName": "rgb",
                            "targetBlockId": 1500,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "a"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.ClampBlock",
                    "id": 1500,
                    "name": "Clamp",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "value",
                            "inputName": "value",
                            "targetBlockId": 1501,
                            "targetConnectionName": "output"
                        }
                    ],
                    "minimum": 0,
                    "maximum": 1
                },
                {
                    "customType": "BABYLON.AddBlock",
                    "id": 1501,
                    "name": "finalColor",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "left",
                            "inputName": "left",
                            "targetBlockId": 1502,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "right",
                            "inputName": "right",
                            "targetBlockId": 1529,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.ScaleBlock",
                    "id": 1502,
                    "name": "Scale",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "input",
                            "inputName": "input",
                            "targetBlockId": 1503,
                            "targetConnectionName": "rgb"
                        },
                        {
                            "name": "factor",
                            "inputName": "factor",
                            "targetBlockId": 1506,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.TextureBlock",
                    "id": 1503,
                    "name": "specularTexture",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "uv",
                            "inputName": "uv",
                            "targetBlockId": 1505,
                            "targetConnectionName": "output"
                        }
                    ],
                    "convertToGammaSpace": false
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1505,
                    "name": "uv",
                    "comments": "",
                    "inputs": [],
                    "type": 4,
                    "mode": 1,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": false,
                    "groupInInspector": ""
                },
                {
                    "customType": "BABYLON.PowBlock",
                    "id": 1506,
                    "name": "Pow",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "value",
                            "inputName": "value",
                            "targetBlockId": 1507,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "power",
                            "inputName": "power",
                            "targetBlockId": 1523,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.MaxBlock",
                    "id": 1507,
                    "name": "Max",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "left",
                            "inputName": "left",
                            "targetBlockId": 1508,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "right",
                            "inputName": "right",
                            "targetBlockId": 1522,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.DotBlock",
                    "id": 1508,
                    "name": "Dot",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "left",
                            "inputName": "left",
                            "targetBlockId": 1509,
                            "targetConnectionName": "xyz"
                        },
                        {
                            "name": "right",
                            "inputName": "right",
                            "targetBlockId": 1513,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.VectorSplitterBlock",
                    "id": 1509,
                    "name": "VectorSplitter",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "xyzw",
                            "inputName": "xyzw",
                            "targetBlockId": 1510,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "xyz "
                        },
                        {
                            "name": "xy "
                        }
                    ]
                },
                {
                    "customType": "BABYLON.NormalizeBlock",
                    "id": 1510,
                    "name": "Normalize",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "input",
                            "inputName": "input",
                            "targetBlockId": 1511,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.TransformBlock",
                    "id": 1511,
                    "name": "World normal",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "vector",
                            "inputName": "vector",
                            "targetBlockId": 1512,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "transform",
                            "inputName": "transform",
                            "targetBlockId": 1497,
                            "targetConnectionName": "output"
                        }
                    ],
                    "complementZ": 0,
                    "complementW": 0
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1512,
                    "name": "normal",
                    "comments": "",
                    "inputs": [],
                    "type": 8,
                    "mode": 1,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": false,
                    "groupInInspector": ""
                },
                {
                    "customType": "BABYLON.NormalizeBlock",
                    "id": 1513,
                    "name": "Normalize",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "input",
                            "inputName": "input",
                            "targetBlockId": 1514,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.AddBlock",
                    "id": 1514,
                    "name": "halfVector",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "left",
                            "inputName": "left",
                            "targetBlockId": 1515,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "right",
                            "inputName": "right",
                            "targetBlockId": 1518,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.NormalizeBlock",
                    "id": 1515,
                    "name": "Normalize",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "input",
                            "inputName": "input",
                            "targetBlockId": 1516,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.ViewDirectionBlock",
                    "id": 1516,
                    "name": "View direction",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "worldPosition",
                            "inputName": "worldPosition",
                            "targetBlockId": 1495,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "cameraPosition",
                            "inputName": "cameraPosition",
                            "targetBlockId": 1517,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1517,
                    "name": "cameraPosition",
                    "comments": "",
                    "inputs": [],
                    "type": 8,
                    "mode": 0,
                    "systemValue": 7,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": false,
                    "groupInInspector": ""
                },
                {
                    "customType": "BABYLON.NormalizeBlock",
                    "id": 1518,
                    "name": "Normalize",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "input",
                            "inputName": "input",
                            "targetBlockId": 1519,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.ScaleBlock",
                    "id": 1519,
                    "name": "Scale",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "input",
                            "inputName": "input",
                            "targetBlockId": 1520,
                            "targetConnectionName": "direction"
                        },
                        {
                            "name": "factor",
                            "inputName": "factor",
                            "targetBlockId": 1521,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.LightInformationBlock",
                    "id": 1520,
                    "name": "Light information",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "worldPosition",
                            "inputName": "worldPosition",
                            "targetBlockId": 1495,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1521,
                    "name": "negativeOne",
                    "comments": "",
                    "inputs": [],
                    "type": 1,
                    "mode": 0,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": true,
                    "groupInInspector": "",
                    "valueType": "number",
                    "value": -1
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1522,
                    "name": "zero",
                    "comments": "",
                    "inputs": [],
                    "type": 1,
                    "mode": 0,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": true,
                    "groupInInspector": "",
                    "valueType": "number",
                    "value": 0
                },
                {
                    "customType": "BABYLON.MultiplyBlock",
                    "id": 1523,
                    "name": "Multiply",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "left",
                            "inputName": "left",
                            "targetBlockId": 1524,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "right",
                            "inputName": "right",
                            "targetBlockId": 1525,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1524,
                    "name": "glossPower",
                    "comments": "",
                    "inputs": [],
                    "type": 1,
                    "mode": 0,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": true,
                    "groupInInspector": "",
                    "valueType": "number",
                    "value": 512
                },
                {
                    "customType": "BABYLON.PowBlock",
                    "id": 1525,
                    "name": "Pow",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "value",
                            "inputName": "value",
                            "targetBlockId": 1526,
                            "targetConnectionName": "g"
                        },
                        {
                            "name": "power",
                            "inputName": "power",
                            "targetBlockId": 1528,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.TextureBlock",
                    "id": 1526,
                    "name": "glossTexture",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "uv",
                            "inputName": "uv",
                            "targetBlockId": 1505,
                            "targetConnectionName": "output"
                        }
                    ],
                    "convertToGammaSpace": false
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1528,
                    "name": "glossInputPower",
                    "comments": "",
                    "inputs": [],
                    "type": 1,
                    "mode": 0,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": false,
                    "groupInInspector": "",
                    "valueType": "number",
                    "value": 3
                },
                {
                    "customType": "BABYLON.MultiplyBlock",
                    "id": 1529,
                    "name": "Multiply",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "left",
                            "inputName": "left",
                            "targetBlockId": 1530,
                            "targetConnectionName": "rgb"
                        },
                        {
                            "name": "right",
                            "inputName": "right",
                            "targetBlockId": 1532,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.TextureBlock",
                    "id": 1530,
                    "name": "diffuseTexture",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "uv",
                            "inputName": "uv",
                            "targetBlockId": 1505,
                            "targetConnectionName": "output"
                        }
                    ],
                    "convertToGammaSpace": false
                },
                {
                    "customType": "BABYLON.GradientBlock",
                    "id": 1532,
                    "name": "Gradient",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "gradient",
                            "inputName": "gradient",
                            "targetBlockId": 1533,
                            "targetConnectionName": "output"
                        }
                    ],
                    "colorSteps": [
                        {
                            "step": 0.25,
                            "color": {
                                "r": 0.3058823529411765,
                                "g": 0.788235294117647,
                                "b": 0.788235294117647
                            }
                        },
                        {
                            "step": 0.45,
                            "color": {
                                "r": 0.25882352941176473,
                                "g": 0.1803921568627451,
                                "b": 0.3137254901960784
                            }
                        },
                        {
                            "step": 0.56,
                            "color": {
                                "r": 0.3411764705882353,
                                "g": 0.23921568627450981,
                                "b": 0.4117647058823529
                            }
                        },
                        {
                            "step": 0.84,
                            "color": {
                                "r": 1,
                                "g": 1,
                                "b": 1
                            }
                        }
                    ]
                },
                {
                    "customType": "BABYLON.AddBlock",
                    "id": 1533,
                    "name": "Add",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "left",
                            "inputName": "left",
                            "targetBlockId": 1534,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "right",
                            "inputName": "right",
                            "targetBlockId": 1536,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.MultiplyBlock",
                    "id": 1534,
                    "name": "Multiply",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "left",
                            "inputName": "left",
                            "targetBlockId": 1535,
                            "targetConnectionName": "output"
                        },
                        {
                            "name": "right",
                            "inputName": "right",
                            "targetBlockId": 1536,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.DotBlock",
                    "id": 1535,
                    "name": "Dot",
                    "comments": "",
                    "inputs": [
                        {
                            "name": "left",
                            "inputName": "left",
                            "targetBlockId": 1509,
                            "targetConnectionName": "xyz"
                        },
                        {
                            "name": "right",
                            "inputName": "right",
                            "targetBlockId": 1518,
                            "targetConnectionName": "output"
                        }
                    ]
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1536,
                    "name": "float",
                    "comments": "",
                    "inputs": [],
                    "type": 1,
                    "mode": 0,
                    "animationType": 0,
                    "visibleInInspector": false,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": true,
                    "groupInInspector": "",
                    "valueType": "number",
                    "value": 0.5
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1537,
                    "name": "specularColor",
                    "comments": "",
                    "inputs": [],
                    "type": 32,
                    "mode": 0,
                    "animationType": 0,
                    "visibleInInspector": true,
                    "min": 0,
                    "max": 0,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": false,
                    "groupInInspector": "",
                    "valueType": "BABYLON.Color3",
                    "value": [
                        0.34509803921568627,
                        0.34509803921568627,
                        0.34509803921568627
                    ]
                },
                {
                    "customType": "BABYLON.InputBlock",
                    "id": 1538,
                    "name": "gloss",
                    "comments": "",
                    "inputs": [],
                    "type": 1,
                    "mode": 0,
                    "animationType": 0,
                    "visibleInInspector": true,
                    "min": 0,
                    "max": 1,
                    "isBoolean": false,
                    "matrixMode": 0,
                    "isConstant": false,
                    "groupInInspector": "",
                    "valueType": "number",
                    "value": 0.42
                }
            ]
        }, scene);

        const material2 = createNodeMaterial(DataString2, scene)
        box2.material = material2;
        a[1].material = material1;
        a[2].material = material2;
        const material3 = createNodeMaterial(DataString3, scene)
        a[3].material = material3;

    });
    const position2 = XYZ2Vec3(BUNNY);
    const pointCloud2 = new PointsCloudSystem("buu", 0.2, scene, { updatable: true });
    pointCloud2.addPoints(position2.length, (p: any, i: number) => {
        p.color = Color3.Random();
        p.position = position2[i];
    })
    const promiseMesh = pointCloud2.buildMeshAsync();
    promiseMesh.then((mesh) => {
        mesh.scaling = new Vector3(5, 5, 5);
        // mat.diffuseColor = Color3.Yellow();
        // mesh.material = mat;
        // mat.backFaceCulling  = true;
    })
    return scene;
}
export function CSVdataStringToVector3List(data: string) {
    let number = data.split("\n");

    const stringList: string[][] = []

    number.forEach((value) => {
        stringList.push(value.split(","));
    })

    return stringList;
}
export function colorShader(name: string, scene: Scene) {

    Effect.ShadersStore[`${name}VertexShader`] =
        `
     precision highp float;
   //attribute
   attribute vec3 position;
   attribute vec2 uv;
   attribute vec3 normal;
   uniform mat4 worldViewProjection;
   varying vec3 vPosition;
    varying vec2 vUV;
    varying vec3 vNormal;
    void main(void) {
       gl_Position = worldViewProjection*vec4(position,1.0);
       vPosition = position;
       vUV = uv;
       vNormal = normal;
    }
    `

    Effect.ShadersStore[`${name}FragmentShader`] =
        `
        precision highp float;
        varying vec3 vPosition;
        varying vec3 vUV;
        varying vec3 vNormal;
       
        vec3 hsv2rgb_03(vec3 c)
        {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx,0.0,1.0), c.y);
        }
        vec3 transformColor(float height){
            // 颜色从deca71变化到deFF71 d:14 e:15 C:13 a:11 
            //颜色变化从25到40;
            // 冷红色：H330 S100 B100
            // 黄 色：H45   S100 B100
            float h =-0.01*height +0.15;
            float s = 0.8;
            float v =  0.8;
            vec3 color = hsv2rgb_03(vec3(h,s,v));
            return color;
        }
        void main(void) {
        vec3 color = transformColor(vPosition.y);
           gl_FragColor = vec4(color,1.0);
        }
    `
    let mat = new ShaderMaterial("shader", scene, {
        vertex: name,
        fragment: name
    }, {
        attributes: ["normal", "position", 'uv'],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
        // needAlphaBlending: true,
        // needAlphaTesting: true
    })

    return mat;
}
export function colorGrad(name: string, scene: Scene) {
    Effect.ShadersStore[`${name}VertexShader`] =
        `
 precision highp float;
//attribute
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;
uniform mat4 worldViewProjection;
varying vec3 vPosition;
varying vec2 vUV;
varying vec3 vNormal;
void main(void) {
   gl_Position = worldViewProjection*vec4(position,1.0);
   vPosition = position;
   vUV = uv;
   vNormal = normal;
}
`

    Effect.ShadersStore[`${name}FragmentShader`] =
        `
    precision highp float;
    varying vec3 vPosition;
    varying vec3 vUV;
    varying vec3 vNormal;
   
    vec3 hsv2rgb_03(vec3 c)
    {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx,0.0,1.0), c.y);
    }
    vec3 transformColor(float height){
        // 颜色从deca71变化到deFF71 d:14 e:15 C:13 a:11 
        //颜色变化从25到40;
        // 冷红色：H330 S100 B100
        // 黄 色：H45   S100 B100
        float r = 1.0;
        float g = 1.0-height/8.0/32.0;
        float b =  0.5;
        vec3 color = vec3(r,g,b);
        return color;
    }
    void main(void) {
    vec3 color = transformColor(vPosition.y);
       gl_FragColor = vec4(color,1.0);
    }
`
    let mat = new ShaderMaterial("shader", scene, {
        vertex: name,
        fragment: name
    }, {
        attributes: ["normal", "position", 'uv'],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
        // needAlphaBlending: true,
        // needAlphaTesting: true
    })

    return mat;
}
export function pivotPointCenter(ribbon: Mesh) {
    const clonePostion = ribbon.getBoundingInfo().boundingBox.centerWorld.clone();
    ribbon.position = Vector3.Zero().subtract(clonePostion);
    ribbon.position.y += ribbon.getBoundingInfo().boundingBox.extendSize.y;
    ribbon.setPivotPoint(ribbon.position, Space.WORLD);
    ribbon.bakeTransformIntoVertices(ribbon._worldMatrix);
    ribbon.position = Vector3.Zero();
}
export function maSaiKe(scene: Scene) {
    var nodeMaterial = new NodeMaterial("node", scene);

    // InputBlock
    var position = new InputBlock("position");
    position.visibleInInspector = false;
    position.visibleOnFrame = false;
    position.target = 1;
    position.setAsAttribute("position");

    // TransformBlock
    var worldPos = new TransformBlock("worldPos");
    worldPos.visibleInInspector = false;
    worldPos.visibleOnFrame = false;
    worldPos.target = 1;
    worldPos.complementZ = 0;
    worldPos.complementW = 1;

    // InputBlock
    var world = new InputBlock("world");
    world.visibleInInspector = false;
    world.visibleOnFrame = false;
    world.target = 1;
    world.setAsSystemValue(NodeMaterialSystemValues.World);

    // TransformBlock
    var worldPosviewProjectionTransform = new TransformBlock("worldPos * viewProjectionTransform");
    worldPosviewProjectionTransform.visibleInInspector = false;
    worldPosviewProjectionTransform.visibleOnFrame = false;
    worldPosviewProjectionTransform.target = 1;
    worldPosviewProjectionTransform.complementZ = 0;
    worldPosviewProjectionTransform.complementW = 1;

    // InputBlock
    var viewProjection = new InputBlock("viewProjection");
    viewProjection.visibleInInspector = false;
    viewProjection.visibleOnFrame = false;
    viewProjection.target = 1;
    viewProjection.setAsSystemValue(NodeMaterialSystemValues.ViewProjection);

    // VertexOutputBlock
    var vertexOutput = new VertexOutputBlock("vertexOutput");
    vertexOutput.visibleInInspector = false;
    vertexOutput.visibleOnFrame = false;
    vertexOutput.target = 1;

    // InputBlock
    var uv = new InputBlock("uv");
    uv.visibleInInspector = false;
    uv.visibleOnFrame = false;
    uv.target = 1;
    uv.setAsAttribute("uv");

    // ScaleBlock
    var st = new ScaleBlock("st");
    st.visibleInInspector = false;
    st.visibleOnFrame = false;
    st.target = 4;

    // InputBlock
    var Float = new InputBlock("Float");
    Float.visibleInInspector = false;
    Float.visibleOnFrame = false;
    Float.target = 1;
    Float.value = 20;
    Float.min = 0;
    Float.max = 0;
    Float.isBoolean = false;
    Float.matrixMode = 0;
    Float.animationType = AnimatedInputBlockTypes.None;
    Float.isConstant = false;

    // VectorSplitterBlock
    var VectorSplitter = new VectorSplitterBlock("VectorSplitter");
    VectorSplitter.visibleInInspector = false;
    VectorSplitter.visibleOnFrame = false;
    VectorSplitter.target = 4;

    // TrigonometryBlock
    var Floor = new TrigonometryBlock("Floor");
    Floor.visibleInInspector = false;
    Floor.visibleOnFrame = false;
    Floor.target = 4;
    Floor.operation = TrigonometryBlockOperations.Floor;

    // VectorMergerBlock
    var i = new VectorMergerBlock("i");
    i.visibleInInspector = false;
    i.visibleOnFrame = false;
    i.target = 4;
    i.xSwizzle = "x";
    i.ySwizzle = "y";
    i.zSwizzle = "z";
    i.wSwizzle = "w";

    // TrigonometryBlock
    var Floor1 = new TrigonometryBlock("Floor");
    Floor1.visibleInInspector = false;
    Floor1.visibleOnFrame = false;
    Floor1.target = 4;
    Floor1.operation = TrigonometryBlockOperations.Floor;

    // SubtractBlock
    var Subtract = new SubtractBlock("Subtract");
    Subtract.visibleInInspector = false;
    Subtract.visibleOnFrame = false;
    Subtract.target = 4;

    // VectorMergerBlock
    var f = new VectorMergerBlock("f");
    f.visibleInInspector = false;
    f.visibleOnFrame = false;
    f.target = 4;
    f.xSwizzle = "x";
    f.ySwizzle = "y";
    f.zSwizzle = "z";
    f.wSwizzle = "w";

    // SubtractBlock
    var Subtract1 = new SubtractBlock("Subtract");
    Subtract1.visibleInInspector = false;
    Subtract1.visibleOnFrame = false;
    Subtract1.target = 4;

    // MultiplyBlock
    var u = new MultiplyBlock("u");
    u.visibleInInspector = false;
    u.visibleOnFrame = false;
    u.target = 4;

    // MultiplyBlock
    var Multiply = new MultiplyBlock("Multiply");
    Multiply.visibleInInspector = false;
    Multiply.visibleOnFrame = false;
    Multiply.target = 4;

    // SubtractBlock
    var Subtract2 = new SubtractBlock("Subtract");
    Subtract2.visibleInInspector = false;
    Subtract2.visibleOnFrame = false;
    Subtract2.target = 4;

    // InputBlock
    var Vector = new InputBlock("Vector2");
    Vector.visibleInInspector = false;
    Vector.visibleOnFrame = false;
    Vector.target = 1;
    Vector.value = new Vector2(3, 3);
    Vector.isConstant = false;

    // MultiplyBlock
    var Multiply1 = new MultiplyBlock("Multiply");
    Multiply1.visibleInInspector = false;
    Multiply1.visibleOnFrame = false;
    Multiply1.target = 4;

    // InputBlock
    var vector1 = new InputBlock("Vector2");
    vector1.visibleInInspector = false;
    vector1.visibleOnFrame = false;
    vector1.target = 1;
    vector1.value = new Vector2(2, 2);
    vector1.isConstant = false;

    // VectorSplitterBlock
    var VectorSplitter1 = new VectorSplitterBlock("VectorSplitter");
    VectorSplitter1.visibleInInspector = false;
    VectorSplitter1.visibleOnFrame = false;
    VectorSplitter1.target = 4;

    // OneMinusBlock
    var Oneminus = new OneMinusBlock("One minus");
    Oneminus.visibleInInspector = false;
    Oneminus.visibleOnFrame = false;
    Oneminus.target = 4;

    // MultiplyBlock
    var Multiply2 = new MultiplyBlock("Multiply");
    Multiply2.visibleInInspector = false;
    Multiply2.visibleOnFrame = false;
    Multiply2.target = 4;

    // SubtractBlock
    var a = new SubtractBlock("a");
    a.visibleInInspector = false;
    a.visibleOnFrame = false;
    a.target = 4;

    // MultiplyBlock
    var Multiply3 = new MultiplyBlock("Multiply");
    Multiply3.visibleInInspector = false;
    Multiply3.visibleOnFrame = false;
    Multiply3.target = 4;

    // TrigonometryBlock
    var Sin = new TrigonometryBlock("Sin");
    Sin.visibleInInspector = false;
    Sin.visibleOnFrame = false;
    Sin.target = 4;
    Sin.operation = TrigonometryBlockOperations.Sin;

    // DotBlock
    var Dot = new DotBlock("Dot");
    Dot.visibleInInspector = false;
    Dot.visibleOnFrame = false;
    Dot.target = 4;

    // InputBlock
    var vector2 = new InputBlock("Vector2");
    vector2.visibleInInspector = false;
    vector2.visibleOnFrame = false;
    vector2.target = 1;
    vector2.value = new Vector2(12.9898, 78.233);
    vector2.isConstant = false;

    // DotBlock
    var Dot1 = new DotBlock("Dot");
    Dot1.visibleInInspector = false;
    Dot1.visibleOnFrame = false;
    Dot1.target = 4;

    // AddBlock
    var Add = new AddBlock("Add");
    Add.visibleInInspector = false;
    Add.visibleOnFrame = false;
    Add.target = 4;

    // InputBlock
    var Vector3 = new InputBlock("Vector2");
    Vector3.visibleInInspector = false;
    Vector3.visibleOnFrame = false;
    Vector3.target = 1;
    Vector3.value = new Vector2(1, 0);
    Vector3.isConstant = false;

    // TrigonometryBlock
    var Sin1 = new TrigonometryBlock("Sin");
    Sin1.visibleInInspector = false;
    Sin1.visibleOnFrame = false;
    Sin1.target = 4;
    Sin1.operation = TrigonometryBlockOperations.Sin;

    // MultiplyBlock
    var Multiply4 = new MultiplyBlock("Multiply");
    Multiply4.visibleInInspector = false;
    Multiply4.visibleOnFrame = false;
    Multiply4.target = 4;

    // MultiplyBlock
    var Multiply5 = new MultiplyBlock("Multiply");
    Multiply5.visibleInInspector = false;
    Multiply5.visibleOnFrame = false;
    Multiply5.target = 4;

    // AddBlock
    var Add1 = new AddBlock("Add");
    Add1.visibleInInspector = false;
    Add1.visibleOnFrame = false;
    Add1.target = 4;

    // InputBlock
    var Float1 = new InputBlock("Float");
    Float1.visibleInInspector = false;
    Float1.visibleOnFrame = false;
    Float1.target = 1;
    Float1.value = 1;
    Float1.min = 0;
    Float1.max = 0;
    Float1.isBoolean = false;
    Float1.matrixMode = 0;
    Float1.animationType = AnimatedInputBlockTypes.None;
    Float1.isConstant = false;

    // TrigonometryBlock
    var Sin2 = new TrigonometryBlock("Sin");
    Sin2.visibleInInspector = false;
    Sin2.visibleOnFrame = false;
    Sin2.target = 4;
    Sin2.operation = TrigonometryBlockOperations.Sin;

    // DivideBlock
    var Divide = new DivideBlock("Divide");
    Divide.visibleInInspector = false;
    Divide.visibleOnFrame = false;
    Divide.target = 4;

    // InputBlock
    var Time = new InputBlock("Time");
    Time.visibleInInspector = false;
    Time.visibleOnFrame = false;
    Time.target = 1;
    Time.value = 0;
    Time.min = 0;
    Time.max = 0;
    Time.isBoolean = false;
    Time.matrixMode = 0;
    Time.animationType = AnimatedInputBlockTypes.Time;
    Time.isConstant = false;

    // InputBlock
    var Float2 = new InputBlock("Float");
    Float2.visibleInInspector = false;
    Float2.visibleOnFrame = false;
    Float2.target = 1;
    Float2.value = 200000;
    Float2.min = 0;
    Float2.max = 0;
    Float2.isBoolean = false;
    Float2.matrixMode = 0;
    Float2.animationType = AnimatedInputBlockTypes.None;
    Float2.isConstant = false;

    // InputBlock
    var Float3 = new InputBlock("Float");
    Float3.visibleInInspector = false;
    Float3.visibleOnFrame = false;
    Float3.target = 1;
    Float3.value = 43758.5453123;
    Float3.min = 0;
    Float3.max = 0;
    Float3.isBoolean = false;
    Float3.matrixMode = 0;
    Float3.animationType = AnimatedInputBlockTypes.None;
    Float3.isConstant = false;

    // MultiplyBlock
    var Multiply6 = new MultiplyBlock("Multiply");
    Multiply6.visibleInInspector = false;
    Multiply6.visibleOnFrame = false;
    Multiply6.target = 4;

    // TrigonometryBlock
    var Sin3 = new TrigonometryBlock("Sin");
    Sin3.visibleInInspector = false;
    Sin3.visibleOnFrame = false;
    Sin3.target = 4;
    Sin3.operation = TrigonometryBlockOperations.Sin;

    // DotBlock
    var Dot2 = new DotBlock("Dot");
    Dot2.visibleInInspector = false;
    Dot2.visibleOnFrame = false;
    Dot2.target = 4;

    // AddBlock
    var Add2 = new AddBlock("Add");
    Add2.visibleInInspector = false;
    Add2.visibleOnFrame = false;
    Add2.target = 4;

    // InputBlock
    var Vector4 = new InputBlock("Vector2");
    Vector4.visibleInInspector = false;
    Vector4.visibleOnFrame = false;
    Vector4.target = 1;
    Vector4.value = new Vector2(0, 1);
    Vector4.isConstant = false;

    // SubtractBlock
    var c = new SubtractBlock("c");
    c.visibleInInspector = false;
    c.visibleOnFrame = false;
    c.target = 4;

    // TrigonometryBlock
    var Floor2 = new TrigonometryBlock("Floor");
    Floor2.visibleInInspector = false;
    Floor2.visibleOnFrame = false;
    Floor2.target = 4;
    Floor2.operation = TrigonometryBlockOperations.Floor;

    // SubtractBlock
    var ca = new SubtractBlock("c-a");
    ca.visibleInInspector = false;
    ca.visibleOnFrame = false;
    ca.target = 4;

    // MultiplyBlock
    var Multiply7 = new MultiplyBlock("Multiply");
    Multiply7.visibleInInspector = false;
    Multiply7.visibleOnFrame = false;
    Multiply7.target = 4;

    // MultiplyBlock
    var term = new MultiplyBlock("term2");
    term.visibleInInspector = false;
    term.visibleOnFrame = false;
    term.target = 4;

    // OneMinusBlock
    var Oneminus1 = new OneMinusBlock("One minus");
    Oneminus1.visibleInInspector = false;
    Oneminus1.visibleOnFrame = false;
    Oneminus1.target = 4;

    // AddBlock
    var Add3 = new AddBlock("Add");
    Add3.visibleInInspector = false;
    Add3.visibleOnFrame = false;
    Add3.target = 4;

    // MultiplyBlock
    var term1 = new MultiplyBlock("term3");
    term1.visibleInInspector = false;
    term1.visibleOnFrame = false;
    term1.target = 4;

    // SubtractBlock
    var db = new SubtractBlock("d-b");
    db.visibleInInspector = false;
    db.visibleOnFrame = false;
    db.target = 4;

    // SubtractBlock
    var d = new SubtractBlock("d");
    d.visibleInInspector = false;
    d.visibleOnFrame = false;
    d.target = 4;

    // MultiplyBlock
    var Multiply8 = new MultiplyBlock("Multiply");
    Multiply8.visibleInInspector = false;
    Multiply8.visibleOnFrame = false;
    Multiply8.target = 4;

    // TrigonometryBlock
    var Sin4 = new TrigonometryBlock("Sin");
    Sin4.visibleInInspector = false;
    Sin4.visibleOnFrame = false;
    Sin4.target = 4;
    Sin4.operation = TrigonometryBlockOperations.Sin;

    // DotBlock
    var Dot3 = new DotBlock("Dot");
    Dot3.visibleInInspector = false;
    Dot3.visibleOnFrame = false;
    Dot3.target = 4;

    // AddBlock
    var Add4 = new AddBlock("Add");
    Add4.visibleInInspector = false;
    Add4.visibleOnFrame = false;
    Add4.target = 4;

    // InputBlock
    var Vector5 = new InputBlock("Vector2");
    Vector5.visibleInInspector = false;
    Vector5.visibleOnFrame = false;
    Vector5.target = 1;
    Vector5.value = new Vector2(1, 1);
    Vector5.isConstant = false;

    // TrigonometryBlock
    var Floor3 = new TrigonometryBlock("Floor");
    Floor3.visibleInInspector = false;
    Floor3.visibleOnFrame = false;
    Floor3.target = 4;
    Floor3.operation = TrigonometryBlockOperations.Floor;

    // SubtractBlock
    var b = new SubtractBlock("b");
    b.visibleInInspector = false;
    b.visibleOnFrame = false;
    b.target = 4;

    // TrigonometryBlock
    var Floor4 = new TrigonometryBlock("Floor");
    Floor4.visibleInInspector = false;
    Floor4.visibleOnFrame = false;
    Floor4.target = 4;
    Floor4.operation = TrigonometryBlockOperations.Floor;

    // MultiplyBlock
    var Multiply9 = new MultiplyBlock("Multiply");
    Multiply9.visibleInInspector = false;
    Multiply9.visibleOnFrame = false;
    Multiply9.target = 4;

    // AddBlock
    var Add5 = new AddBlock("Add");
    Add5.visibleInInspector = false;
    Add5.visibleOnFrame = false;
    Add5.target = 4;

    // AddBlock
    var Add6 = new AddBlock("Add");
    Add6.visibleInInspector = false;
    Add6.visibleOnFrame = false;
    Add6.target = 4;

    // VectorMergerBlock
    var VectorMerger = new VectorMergerBlock("VectorMerger");
    VectorMerger.visibleInInspector = false;
    VectorMerger.visibleOnFrame = false;
    VectorMerger.target = 4;
    VectorMerger.xSwizzle = "x";
    VectorMerger.ySwizzle = "y";
    VectorMerger.zSwizzle = "z";
    VectorMerger.wSwizzle = "w";

    // FragmentOutputBlock
    var fragmentOutput = new FragmentOutputBlock("fragmentOutput");
    fragmentOutput.visibleInInspector = false;
    fragmentOutput.visibleOnFrame = false;
    fragmentOutput.target = 2;

    fragmentOutput.useLogarithmicDepth = false;

    // MultiplyBlock
    var Multiply10 = new MultiplyBlock("Multiply");
    Multiply10.visibleInInspector = false;
    Multiply10.visibleOnFrame = false;
    Multiply10.target = 4;

    // TrigonometryBlock
    var Floor5 = new TrigonometryBlock("Floor");
    Floor5.visibleInInspector = false;
    Floor5.visibleOnFrame = false;
    Floor5.target = 4;
    Floor5.operation = TrigonometryBlockOperations.Floor;

    // Connections
    position.output.connectTo(worldPos.vector);
    world.output.connectTo(worldPos.transform);
    worldPos.output.connectTo(worldPosviewProjectionTransform.vector);
    viewProjection.output.connectTo(worldPosviewProjectionTransform.transform);
    worldPosviewProjectionTransform.output.connectTo(vertexOutput.vector);
    uv.output.connectTo(st.input);
    Float.output.connectTo(st.factor);
    st.output.connectTo(VectorSplitter.xyIn);
    VectorSplitter.x.connectTo(Floor.input);
    Floor.output.connectTo(i.x);
    VectorSplitter.y.connectTo(Floor1.input);
    Floor1.output.connectTo(i.y);
    i.xy.connectTo(Dot.left);
    vector2.output.connectTo(Dot.right);
    Dot.output.connectTo(Sin.input);
    Sin.output.connectTo(Multiply3.left);
    Float1.output.connectTo(Add1.left);
    Time.output.connectTo(Divide.left);
    Float2.output.connectTo(Divide.right);
    Divide.output.connectTo(Sin2.input);
    Sin2.output.connectTo(Add1.right);
    Add1.output.connectTo(Multiply5.left);
    Float3.output.connectTo(Multiply5.right);
    Multiply5.output.connectTo(Multiply3.right);
    Multiply3.output.connectTo(a.left);
    Multiply3.output.connectTo(Floor5.input);
    Floor5.output.connectTo(a.right);
    a.output.connectTo(Multiply2.left);
    Vector.output.connectTo(Subtract2.left);
    VectorSplitter.x.connectTo(Subtract1.left);
    Floor.output.connectTo(Subtract1.right);
    Subtract1.output.connectTo(f.x);
    VectorSplitter.y.connectTo(Subtract.left);
    Floor1.output.connectTo(Subtract.right);
    Subtract.output.connectTo(f.y);
    f.xy.connectTo(Multiply1.left);
    vector1.output.connectTo(Multiply1.right);
    Multiply1.output.connectTo(Subtract2.right);
    Subtract2.output.connectTo(Multiply.left);
    f.xy.connectTo(Multiply.right);
    Multiply.output.connectTo(u.left);
    f.xy.connectTo(u.right);
    u.output.connectTo(VectorSplitter1.xyIn);
    VectorSplitter1.x.connectTo(Oneminus.input);
    Oneminus.output.connectTo(Multiply2.right);
    Multiply2.output.connectTo(Add5.left);
    VectorSplitter1.x.connectTo(Multiply9.left);
    i.xy.connectTo(Add.left);
    Vector3.output.connectTo(Add.right);
    Add.output.connectTo(Dot1.left);
    vector2.output.connectTo(Dot1.right);
    Dot1.output.connectTo(Sin1.input);
    Sin1.output.connectTo(Multiply4.left);
    Multiply5.output.connectTo(Multiply4.right);
    Multiply4.output.connectTo(b.left);
    Multiply4.output.connectTo(Floor4.input);
    Floor4.output.connectTo(b.right);
    b.output.connectTo(Multiply9.right);
    Multiply9.output.connectTo(Add5.right);
    Add5.output.connectTo(Add6.left);
    i.xy.connectTo(Add2.left);
    Vector4.output.connectTo(Add2.right);
    Add2.output.connectTo(Dot2.left);
    vector2.output.connectTo(Dot2.right);
    Dot2.output.connectTo(Sin3.input);
    Sin3.output.connectTo(Multiply6.left);
    Multiply5.output.connectTo(Multiply6.right);
    Multiply6.output.connectTo(c.left);
    Multiply6.output.connectTo(Floor2.input);
    Floor2.output.connectTo(c.right);
    c.output.connectTo(ca.left);
    a.output.connectTo(ca.right);
    ca.output.connectTo(Multiply7.left);
    VectorSplitter1.y.connectTo(Multiply7.right);
    Multiply7.output.connectTo(term.left);
    VectorSplitter1.x.connectTo(Oneminus1.input);
    Oneminus1.output.connectTo(term.right);
    term.output.connectTo(Add3.left);
    i.xy.connectTo(Add4.left);
    Vector5.output.connectTo(Add4.right);
    Add4.output.connectTo(Dot3.left);
    vector2.output.connectTo(Dot3.right);
    Dot3.output.connectTo(Sin4.input);
    Sin4.output.connectTo(Multiply8.left);
    Multiply5.output.connectTo(Multiply8.right);
    Multiply8.output.connectTo(d.left);
    Multiply8.output.connectTo(Floor3.input);
    Floor3.output.connectTo(d.right);
    d.output.connectTo(db.left);
    b.output.connectTo(db.right);
    db.output.connectTo(term1.left);
    VectorSplitter1.x.connectTo(Multiply10.left);
    VectorSplitter1.y.connectTo(Multiply10.right);
    Multiply10.output.connectTo(term1.right);
    term1.output.connectTo(Add3.right);
    Add3.output.connectTo(Add6.right);
    Add6.output.connectTo(VectorMerger.x);
    Add6.output.connectTo(VectorMerger.y);
    Add6.output.connectTo(VectorMerger.z);
    VectorMerger.xyz.connectTo(fragmentOutput.rgb);
    // Output nodes
    nodeMaterial.addOutputNode(vertexOutput);
    nodeMaterial.addOutputNode(fragmentOutput);
    nodeMaterial.build();
    return nodeMaterial;
}

export function rongjie(scene: Scene) {
    const string = {
        "tags": null,
        "ignoreAlpha": false,
        "maxSimultaneousLights": 4,
        "mode": 1,
        "forceAlphaBlending": false,
        "id": "node",
        "name": "node",
        "checkReadyOnEveryCall": false,
        "checkReadyOnlyOnce": false,
        "state": "",
        "alpha": 1,
        "backFaceCulling": true,
        "cullBackFaces": true,
        "sideOrientation": 1,
        "alphaMode": 2,
        "_needDepthPrePass": false,
        "disableDepthWrite": false,
        "disableColorWrite": false,
        "forceDepthWrite": false,
        "depthFunction": 0,
        "separateCullingPass": false,
        "fogEnabled": true,
        "pointSize": 1,
        "zOffset": 0,
        "zOffsetUnits": 0,
        "pointsCloud": false,
        "fillMode": 0,
        "editorData": {
            "locations": [
                {
                    "blockId": 10,
                    "x": 500,
                    "y": 60
                },
                {
                    "blockId": 11,
                    "x": 240,
                    "y": 0
                },
                {
                    "blockId": 12,
                    "x": -20,
                    "y": 220
                },
                {
                    "blockId": 13,
                    "x": -20,
                    "y": 120
                },
                {
                    "blockId": 14,
                    "x": 2240,
                    "y": 540
                },
                {
                    "blockId": 15,
                    "x": 2000,
                    "y": 540
                },
                {
                    "blockId": 16,
                    "x": 1500,
                    "y": 580
                },
                {
                    "blockId": 17,
                    "x": 1260,
                    "y": 580
                },
                {
                    "blockId": 18,
                    "x": 1260,
                    "y": 700
                },
                {
                    "blockId": 19,
                    "x": 1020,
                    "y": 580
                },
                {
                    "blockId": 20,
                    "x": 740,
                    "y": 700
                },
                {
                    "blockId": 21,
                    "x": 500,
                    "y": 700
                },
                {
                    "blockId": 22,
                    "x": 240,
                    "y": 680
                },
                {
                    "blockId": 23,
                    "x": 0,
                    "y": 640
                },
                {
                    "blockId": 24,
                    "x": 0,
                    "y": 740
                },
                {
                    "blockId": 25,
                    "x": 740,
                    "y": 480
                },
                {
                    "blockId": 27,
                    "x": 500,
                    "y": 300
                },
                {
                    "blockId": 28,
                    "x": 240,
                    "y": 300
                },
                {
                    "blockId": 29,
                    "x": 240,
                    "y": 520
                },
                {
                    "blockId": 30,
                    "x": 1020,
                    "y": 740
                },
                {
                    "blockId": 31,
                    "x": 740,
                    "y": 240
                },
                {
                    "blockId": 33,
                    "x": 2000,
                    "y": 760
                },
                {
                    "blockId": 34,
                    "x": 1740,
                    "y": 660
                },
                {
                    "blockId": 35,
                    "x": 1740,
                    "y": 880
                }
            ],
            "frames": [],
            "x": -555.8785232014802,
            "y": -235.7614335880989,
            "zoom": 1.024927427066662
        },
        "customType": "BABYLON.NodeMaterial",
        "outputNodes": [
            10,
            14
        ],
        "blocks": [
            {
                "customType": "BABYLON.VertexOutputBlock",
                "id": 10,
                "name": "VertexOutput",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 1,
                "inputs": [
                    {
                        "name": "vector",
                        "inputName": "vector",
                        "targetBlockId": 11,
                        "targetConnectionName": "xyzw",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": []
            },
            {
                "customType": "BABYLON.VectorMergerBlock",
                "id": 11,
                "name": "Position3D",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "xyzw "
                    },
                    {
                        "name": "xyz "
                    },
                    {
                        "name": "xy ",
                        "inputName": "xy ",
                        "targetBlockId": 12,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "zw "
                    },
                    {
                        "name": "x"
                    },
                    {
                        "name": "y"
                    },
                    {
                        "name": "z"
                    },
                    {
                        "name": "w",
                        "inputName": "w",
                        "targetBlockId": 13,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "xyzw"
                    },
                    {
                        "name": "xyz"
                    },
                    {
                        "name": "xy"
                    },
                    {
                        "name": "zw"
                    }
                ],
                "xSwizzle": "x",
                "ySwizzle": "y",
                "zSwizzle": "z",
                "wSwizzle": "w"
            },
            {
                "customType": "BABYLON.InputBlock",
                "id": 12,
                "name": "position2d",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 1,
                "inputs": [],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "type": 4,
                "mode": 1,
                "animationType": 0,
                "min": 0,
                "max": 0,
                "isBoolean": false,
                "matrixMode": 0,
                "isConstant": false,
                "groupInInspector": "",
                "convertToGammaSpace": false,
                "convertToLinearSpace": false
            },
            {
                "customType": "BABYLON.InputBlock",
                "id": 13,
                "name": "Constant1",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 1,
                "inputs": [],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "type": 1,
                "mode": 0,
                "animationType": 0,
                "min": 0,
                "max": 0,
                "isBoolean": false,
                "matrixMode": 0,
                "isConstant": true,
                "groupInInspector": "",
                "convertToGammaSpace": false,
                "convertToLinearSpace": false,
                "valueType": "number",
                "value": 1
            },
            {
                "customType": "BABYLON.FragmentOutputBlock",
                "id": 14,
                "name": "FragmentOutput",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 2,
                "inputs": [
                    {
                        "name": "rgba"
                    },
                    {
                        "name": "rgb",
                        "inputName": "rgb",
                        "targetBlockId": 15,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "a"
                    }
                ],
                "outputs": [],
                "useLogarithmicDepth": false
            },
            {
                "customType": "BABYLON.LerpBlock",
                "id": 15,
                "name": "Lerp",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "left",
                        "inputName": "left",
                        "targetBlockId": 16,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "right",
                        "inputName": "right",
                        "targetBlockId": 31,
                        "targetConnectionName": "rgb",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "gradient",
                        "inputName": "gradient",
                        "targetBlockId": 33,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ]
            },
            {
                "customType": "BABYLON.GradientBlock",
                "id": 16,
                "name": "Gradient",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "gradient",
                        "inputName": "gradient",
                        "targetBlockId": 17,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "colorSteps": [
                    {
                        "step": 0,
                        "color": {
                            "r": 0,
                            "g": 0,
                            "b": 0
                        }
                    },
                    {
                        "step": 0.05,
                        "color": {
                            "r": 0.7333333333333333,
                            "g": 0,
                            "b": 0
                        }
                    },
                    {
                        "step": 0.07,
                        "color": {
                            "r": 0.9921568627450981,
                            "g": 0.9686274509803922,
                            "b": 0
                        }
                    },
                    {
                        "step": 0.1,
                        "color": {
                            "r": 1,
                            "g": 1,
                            "b": 1
                        }
                    },
                    {
                        "step": 1,
                        "color": {
                            "r": 1,
                            "g": 1,
                            "b": 1
                        }
                    }
                ]
            },
            {
                "customType": "BABYLON.ClampBlock",
                "id": 17,
                "name": "Clamp",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "value",
                        "inputName": "value",
                        "targetBlockId": 18,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "minimum": 0,
                "maximum": 1
            },
            {
                "customType": "BABYLON.AddBlock",
                "id": 18,
                "name": "Add",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "left",
                        "inputName": "left",
                        "targetBlockId": 19,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "right",
                        "inputName": "right",
                        "targetBlockId": 30,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ]
            },
            {
                "customType": "BABYLON.SubtractBlock",
                "id": 19,
                "name": "Subtract",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "left",
                        "inputName": "left",
                        "targetBlockId": 20,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "right",
                        "inputName": "right",
                        "targetBlockId": 25,
                        "targetConnectionName": "r",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ]
            },
            {
                "customType": "BABYLON.TrigonometryBlock",
                "id": 20,
                "name": "Abs",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "input",
                        "inputName": "input",
                        "targetBlockId": 21,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "operation": 2
            },
            {
                "customType": "BABYLON.TrigonometryBlock",
                "id": 21,
                "name": "Sin",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "input",
                        "inputName": "input",
                        "targetBlockId": 22,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "operation": 0
            },
            {
                "customType": "BABYLON.MultiplyBlock",
                "id": 22,
                "name": "Multiply",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "left",
                        "inputName": "left",
                        "targetBlockId": 23,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "right",
                        "inputName": "right",
                        "targetBlockId": 24,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ]
            },
            {
                "customType": "BABYLON.InputBlock",
                "id": 23,
                "name": "Time",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 1,
                "inputs": [],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "type": 1,
                "mode": 0,
                "animationType": 1,
                "min": 0,
                "max": 0,
                "isBoolean": false,
                "matrixMode": 0,
                "isConstant": false,
                "groupInInspector": "",
                "convertToGammaSpace": false,
                "convertToLinearSpace": false,
                "valueType": "number",
                "value": 7.612619999957084
            },
            {
                "customType": "BABYLON.InputBlock",
                "id": 24,
                "name": "Speed",
                "comments": "",
                "visibleInInspector": true,
                "visibleOnFrame": false,
                "target": 1,
                "inputs": [],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "type": 1,
                "mode": 0,
                "animationType": 0,
                "min": 0.01,
                "max": 5,
                "isBoolean": false,
                "matrixMode": 0,
                "isConstant": false,
                "groupInInspector": "",
                "convertToGammaSpace": false,
                "convertToLinearSpace": false,
                "valueType": "number",
                "value": 1.008
            },
            {
                "customType": "BABYLON.TextureBlock",
                "id": 25,
                "name": "Noise",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 3,
                "inputs": [
                    {
                        "name": "uv",
                        "inputName": "uv",
                        "targetBlockId": 27,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "source"
                    }
                ],
                "outputs": [
                    {
                        "name": "rgba"
                    },
                    {
                        "name": "rgb"
                    },
                    {
                        "name": "r"
                    },
                    {
                        "name": "g"
                    },
                    {
                        "name": "b"
                    },
                    {
                        "name": "a"
                    },
                    {
                        "name": "level"
                    }
                ],
                "convertToGammaSpace": false,
                "convertToLinearSpace": false,
                "fragmentOnly": false,
                "disableLevelMultiplication": false,
                "texture": {
                    "tags": null,
                    "url": "",
                    "uOffset": 0,
                    "vOffset": 0,
                    "uScale": 1,
                    "vScale": 1,
                    "uAng": 0,
                    "vAng": 0,
                    "wAng": 0,
                    "uRotationCenter": 0.5,
                    "vRotationCenter": 0.5,
                    "wRotationCenter": 0.5,
                    "homogeneousRotationInUVTransform": false,
                    "isBlocking": true,
                    "name": "data:octet/stream;base64,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",
                    "hasAlpha": false,
                    "getAlphaFromRGB": false,
                    "level": 1,
                    "coordinatesIndex": 0,
                    "coordinatesMode": 7,
                    "wrapU": 1,
                    "wrapV": 1,
                    "wrapR": 1,
                    "anisotropicFilteringLevel": 4,
                    "isCube": false,
                    "is3D": false,
                    "is2DArray": false,
                    "gammaSpace": true,
                    "invertZ": false,
                    "lodLevelInAlpha": false,
                    "lodGenerationOffset": 0,
                    "lodGenerationScale": 0,
                    "linearSpecularLOD": false,
                    "isRenderTarget": false,
                    "animations": [],
                    "invertY": true,
                    "samplingMode": 3,
                    "_useSRGBBuffer": false
                }
            },
            {
                "customType": "BABYLON.MultiplyBlock",
                "id": 27,
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "left",
                        "inputName": "left",
                        "targetBlockId": 28,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "right",
                        "inputName": "right",
                        "targetBlockId": 29,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ]
            },
            {
                "customType": "BABYLON.RemapBlock",
                "id": 28,
                "name": "uv0",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "input",
                        "inputName": "input",
                        "targetBlockId": 12,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "sourceMin"
                    },
                    {
                        "name": "sourceMax"
                    },
                    {
                        "name": "targetMin"
                    },
                    {
                        "name": "targetMax"
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "sourceRange": [
                    -1,
                    1
                ],
                "targetRange": [
                    0,
                    1
                ]
            },
            {
                "customType": "BABYLON.InputBlock",
                "id": 29,
                "name": "scale",
                "comments": "",
                "visibleInInspector": true,
                "visibleOnFrame": false,
                "target": 1,
                "inputs": [],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "type": 4,
                "mode": 0,
                "animationType": 0,
                "min": 0,
                "max": 0,
                "isBoolean": false,
                "matrixMode": 0,
                "isConstant": false,
                "groupInInspector": "",
                "convertToGammaSpace": false,
                "convertToLinearSpace": false,
                "valueType": "BABYLON.Vector2",
                "value": [
                    1,
                    1
                ]
            },
            {
                "customType": "BABYLON.InputBlock",
                "id": 30,
                "name": "Offset",
                "comments": "",
                "visibleInInspector": true,
                "visibleOnFrame": false,
                "target": 1,
                "inputs": [],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "type": 1,
                "mode": 0,
                "animationType": 0,
                "min": 0,
                "max": 1,
                "isBoolean": false,
                "matrixMode": 0,
                "isConstant": false,
                "groupInInspector": "",
                "convertToGammaSpace": false,
                "convertToLinearSpace": false,
                "valueType": "number",
                "value": 0.08
            },
            {
                "customType": "BABYLON.CurrentScreenBlock",
                "id": 31,
                "name": "CurrentScreen",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 2,
                "inputs": [
                    {
                        "name": "uv",
                        "inputName": "uv",
                        "targetBlockId": 27,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "rgba"
                    },
                    {
                        "name": "rgb"
                    },
                    {
                        "name": "r"
                    },
                    {
                        "name": "g"
                    },
                    {
                        "name": "b"
                    },
                    {
                        "name": "a"
                    }
                ],
                "convertToGammaSpace": false,
                "convertToLinearSpace": false,
                "texture": {
                    "tags": null,
                    "url": "https://assets.babylonjs.com/nme/currentScreenPostProcess.png",
                    "uOffset": 0,
                    "vOffset": 0,
                    "uScale": 1,
                    "vScale": 1,
                    "uAng": 0,
                    "vAng": 0,
                    "wAng": 0,
                    "uRotationCenter": 0.5,
                    "vRotationCenter": 0.5,
                    "wRotationCenter": 0.5,
                    "homogeneousRotationInUVTransform": false,
                    "isBlocking": true,
                    "name": "https://assets.babylonjs.com/nme/currentScreenPostProcess.png",
                    "hasAlpha": false,
                    "getAlphaFromRGB": false,
                    "level": 1,
                    "coordinatesIndex": 0,
                    "coordinatesMode": 0,
                    "wrapU": 1,
                    "wrapV": 1,
                    "wrapR": 1,
                    "anisotropicFilteringLevel": 4,
                    "isCube": false,
                    "is3D": false,
                    "is2DArray": false,
                    "gammaSpace": true,
                    "invertZ": false,
                    "lodLevelInAlpha": false,
                    "lodGenerationOffset": 0,
                    "lodGenerationScale": 0,
                    "linearSpecularLOD": false,
                    "isRenderTarget": false,
                    "animations": [],
                    "invertY": true,
                    "samplingMode": 3,
                    "_useSRGBBuffer": false
                }
            },
            {
                "customType": "BABYLON.StepBlock",
                "id": 33,
                "name": "Step",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "value",
                        "inputName": "value",
                        "targetBlockId": 34,
                        "targetConnectionName": "z",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "edge",
                        "inputName": "edge",
                        "targetBlockId": 35,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    }
                ],
                "outputs": [
                    {
                        "name": "output"
                    }
                ]
            },
            {
                "customType": "BABYLON.VectorSplitterBlock",
                "id": 34,
                "name": "VectorSplitter",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 4,
                "inputs": [
                    {
                        "name": "xyzw"
                    },
                    {
                        "name": "xyz ",
                        "inputName": "xyz ",
                        "targetBlockId": 16,
                        "targetConnectionName": "output",
                        "isExposedOnFrame": true,
                        "exposedPortPosition": -1
                    },
                    {
                        "name": "xy "
                    }
                ],
                "outputs": [
                    {
                        "name": "xyz"
                    },
                    {
                        "name": "xy"
                    },
                    {
                        "name": "zw"
                    },
                    {
                        "name": "x"
                    },
                    {
                        "name": "y"
                    },
                    {
                        "name": "z"
                    },
                    {
                        "name": "w"
                    }
                ]
            },
            {
                "customType": "BABYLON.InputBlock",
                "id": 35,
                "name": "Constant1",
                "comments": "",
                "visibleInInspector": false,
                "visibleOnFrame": false,
                "target": 1,
                "inputs": [],
                "outputs": [
                    {
                        "name": "output"
                    }
                ],
                "type": 1,
                "mode": 0,
                "animationType": 0,
                "min": 0,
                "max": 0,
                "isBoolean": false,
                "matrixMode": 0,
                "isConstant": true,
                "groupInInspector": "",
                "convertToGammaSpace": false,
                "convertToLinearSpace": false,
                "valueType": "number",
                "value": 1
            }
        ]
    }
    const nodeMaterial = NodeMaterial.Parse(string, scene);
    return nodeMaterial;
}

function blackPostProgress(scene: Scene, camera: Camera) {


    Effect.ShadersStore["blackFragmentShader"] = `
    #ifdef GL_ES
    precision highp float;
    #endif
    // Samplers
    varying vec2 vUV;
    uniform sampler2D textureSampler;

    // Parameters
    uniform vec2 screenSize;
    uniform float threshold;

    void main(void) 
    {
        
        vec4 baseColor = texture2D(textureSampler,vUV);
        //Red * 0.299 + Green * 0.587 + Blue * 0.114
        float avarage= mix(baseColor.r,baseColor.g,baseColor.b);
        baseColor.r = avarage;
        baseColor.g = avarage;
        baseColor.b = avarage;
        gl_FragColor = baseColor;
        
    }
    `
    const postProcess = new PostProcess("black", "black", ["screenSize", "threshold"], null, 1, camera);

    postProcess.onApply = (effect) => {
        // effect.setFloat2("screenSize", postProcess.width, postProcess.height);
        // effect.setFloat("threshold", 0.30);
        // const texture = new Texture("xuanwo.png", scene);
        // effect.setTexture("textureSampler", texture);
        // effect.setTexture("mainTexture", texture);
        // effect.setFloat2("screenSize", postProcess.width, postProcess.height);
    }
    return postProcess;

}

/**
 * 经纬度转xyz
 * @param longitude 经度
 * @param latitude 纬度
 * @param radius 半径
 */
function lglt2xyz(longitude: number, latitude: number, radius: number) {
    var lg = (longitude) * Math.PI / 180, lt = latitude * Math.PI / 180;
    var y = radius * Math.sin(lt);
    var temp = radius * Math.cos(lt);
    var x = temp * Math.sin(lg);
    var z = temp * Math.cos(lg);
    return { x: x, y: y, z: z }
}
export function XYZ2Vec3(data: string) {
    const vec3List: Vector3[] = []
    const lists = data.split("\n");
    lists.forEach((list, index) => {
        const xyzs = list.split("\t");
        if (xyzs[0]) {
            vec3List.push(Vector3.FromArray([Number(xyzs[0]), Number(xyzs[1]), Number(xyzs[2])]));
        }
    })
    return vec3List;
}
export function XYZ2num(data: string) {
    const numbers: number[] = []
    const lists = data.split("\n");
    lists.forEach((list, index) => {

        const xyzs = list.split("\t");
        xyzs.forEach((x) => {
            if (x) {
                numbers.push(Number(x));
            }
        })
    })
    return numbers;
}

