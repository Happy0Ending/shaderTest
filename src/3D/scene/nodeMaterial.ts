import { NodeMaterial } from "@babylonjs/core/Materials/Node/nodeMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";
import { NodeEditor } from '@babylonjs/node-editor'
import "@babylonjs/loaders"


export function nodematerial1(scene: Scene) {
    const data ={
      "tags": null,
      "ignoreAlpha": false,
      "maxSimultaneousLights": 4,
      "mode": 0,
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
                  "x": 720,
                  "y": 90
              },
              {
                  "blockId": 9,
                  "x": 495,
                  "y": 90
              },
              {
                  "blockId": 7,
                  "x": 225,
                  "y": 45
              },
              {
                  "blockId": 5,
                  "x": 0,
                  "y": 0
              },
              {
                  "blockId": 6,
                  "x": 0,
                  "y": 135
              },
              {
                  "blockId": 8,
                  "x": 225,
                  "y": 180
              },
              {
                  "blockId": 12,
                  "x": 315,
                  "y": 270
              },
              {
                  "blockId": 30,
                  "x": 45,
                  "y": 405
              },
              {
                  "blockId": 31,
                  "x": -315,
                  "y": 450
              }
          ],
          "frames": [],
          "x": 369.78231736390467,
          "y": 165.509405015757,
          "zoom": 0.6366131739
      },
      "customType": "BABYLON.NodeMaterial",
      "outputNodes": [
          10,
          12
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
                      "targetBlockId": 9,
                      "targetConnectionName": "output",
                      "isExposedOnFrame": true,
                      "exposedPortPosition": -1
                  }
              ],
              "outputs": []
          },
          {
              "customType": "BABYLON.TransformBlock",
              "id": 9,
              "name": "WorldPos * ViewProjectionTransform",
              "comments": "",
              "visibleInInspector": false,
              "visibleOnFrame": false,
              "target": 1,
              "inputs": [
                  {
                      "name": "vector",
                      "inputName": "vector",
                      "targetBlockId": 7,
                      "targetConnectionName": "output",
                      "isExposedOnFrame": true,
                      "exposedPortPosition": -1
                  },
                  {
                      "name": "transform",
                      "inputName": "transform",
                      "targetBlockId": 8,
                      "targetConnectionName": "output",
                      "isExposedOnFrame": true,
                      "exposedPortPosition": -1
                  }
              ],
              "outputs": [
                  {
                      "name": "output"
                  },
                  {
                      "name": "xyz"
                  }
              ],
              "complementZ": 0,
              "complementW": 1
          },
          {
              "customType": "BABYLON.TransformBlock",
              "id": 7,
              "name": "WorldPos",
              "comments": "",
              "visibleInInspector": false,
              "visibleOnFrame": false,
              "target": 1,
              "inputs": [
                  {
                      "name": "vector",
                      "inputName": "vector",
                      "targetBlockId": 5,
                      "targetConnectionName": "output",
                      "isExposedOnFrame": true,
                      "exposedPortPosition": -1
                  },
                  {
                      "name": "transform",
                      "inputName": "transform",
                      "targetBlockId": 6,
                      "targetConnectionName": "output",
                      "isExposedOnFrame": true,
                      "exposedPortPosition": -1
                  }
              ],
              "outputs": [
                  {
                      "name": "output"
                  },
                  {
                      "name": "xyz"
                  }
              ],
              "complementZ": 0,
              "complementW": 1
          },
          {
              "customType": "BABYLON.InputBlock",
              "id": 5,
              "name": "position",
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
              "type": 8,
              "mode": 1,
              "systemValue": null,
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
              "id": 6,
              "name": "World",
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
              "type": 128,
              "mode": 0,
              "systemValue": 1,
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
              "id": 8,
              "name": "ViewProjection",
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
              "type": 128,
              "mode": 0,
              "systemValue": 4,
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
              "customType": "BABYLON.FragmentOutputBlock",
              "id": 12,
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
                      "targetBlockId": 30,
                      "targetConnectionName": "rgb",
                      "isExposedOnFrame": true,
                      "exposedPortPosition": -1
                  },
                  {
                      "name": "a"
                  }
              ],
              "outputs": [],
              "convertToGammaSpace": false,
              "convertToLinearSpace": false,
              "useLogarithmicDepth": false
          },
          {
              "customType": "BABYLON.TextureBlock",
              "id": 30,
              "name": "Texture",
              "comments": "",
              "visibleInInspector": false,
              "visibleOnFrame": false,
              "target": 3,
              "inputs": [
                  {
                      "name": "uv",
                      "inputName": "uv",
                      "targetBlockId": 31,
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
                  "invertY": false,
                  "samplingMode": 3,
                  "_useSRGBBuffer": false
              }
          },
          {
              "customType": "BABYLON.InputBlock",
              "id": 31,
              "name": "uv",
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
              "systemValue": null,
              "animationType": 0,
              "min": 0,
              "max": 0,
              "isBoolean": false,
              "matrixMode": 0,
              "isConstant": false,
              "groupInInspector": "",
              "convertToGammaSpace": false,
              "convertToLinearSpace": false
          }
      ]
  };
    const nodeMaterial = NodeMaterial.Parse(data,scene as any)

    return nodeMaterial;
}

export function nodeMaterial2 (name:string,scene:Scene){
    const nodeMat =nodematerial1(scene);
    // NodeEditor.Show({nodeMaterial:nodeMat} as any);
}

export function createNodeMaterial(dataString:any,scene:Scene){
    try {
        return NodeMaterial.Parse(dataString,scene);
    } catch (error) {
        return null;
    }
}   

export const DataString2 = {
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
          "blockId": 26,
          "x": 490,
          "y": -280
        },
        {
          "blockId": 27,
          "x": 245,
          "y": -280
        },
        {
          "blockId": 28,
          "x": -70,
          "y": -385
        },
        {
          "blockId": 29,
          "x": -350,
          "y": -385
        },
        {
          "blockId": 30,
          "x": -350,
          "y": -280
        },
        {
          "blockId": 31,
          "x": -70,
          "y": -245
        },
        {
          "blockId": 32,
          "x": 6755,
          "y": 2170
        },
        {
          "blockId": 33,
          "x": 6370,
          "y": 2170
        },
        {
          "blockId": 34,
          "x": 5775,
          "y": 1645
        },
        {
          "blockId": 35,
          "x": 5495,
          "y": 1645
        },
        {
          "blockId": 36,
          "x": 5180,
          "y": 1610
        },
        {
          "blockId": 37,
          "x": 4865,
          "y": 1540
        },
        {
          "blockId": 38,
          "x": 4550,
          "y": 1470
        },
        {
          "blockId": 39,
          "x": 3780,
          "y": 1435
        },
        {
          "blockId": 40,
          "x": 3500,
          "y": 1400
        },
        {
          "blockId": 41,
          "x": 3010,
          "y": 700
        },
        {
          "blockId": 42,
          "x": 2380,
          "y": 700
        },
        {
          "blockId": 44,
          "x": 1155,
          "y": 1400
        },
        {
          "blockId": 45,
          "x": 2695,
          "y": 455
        },
        {
          "blockId": 46,
          "x": 2380,
          "y": 350
        },
        {
          "blockId": 47,
          "x": 2100,
          "y": 315
        },
        {
          "blockId": 48,
          "x": 560,
          "y": 280
        },
        {
          "blockId": 49,
          "x": 280,
          "y": 280
        },
        {
          "blockId": 50,
          "x": -35,
          "y": 280
        },
        {
          "blockId": 51,
          "x": -280,
          "y": 280
        },
        {
          "blockId": 52,
          "x": 1820,
          "y": 420
        },
        {
          "blockId": 53,
          "x": 1540,
          "y": 420
        },
        {
          "blockId": 54,
          "x": 560,
          "y": 595
        },
        {
          "blockId": 55,
          "x": 280,
          "y": 560
        },
        {
          "blockId": 56,
          "x": -70,
          "y": 595
        },
        {
          "blockId": 57,
          "x": 840,
          "y": 770
        },
        {
          "blockId": 58,
          "x": 560,
          "y": 770
        },
        {
          "blockId": 59,
          "x": 280,
          "y": 700
        },
        {
          "blockId": 60,
          "x": 280,
          "y": 875
        },
        {
          "blockId": 61,
          "x": 2100,
          "y": 420
        },
        {
          "blockId": 62,
          "x": 2380,
          "y": 560
        },
        {
          "blockId": 63,
          "x": 2100,
          "y": 525
        },
        {
          "blockId": 64,
          "x": 2100,
          "y": 630
        },
        {
          "blockId": 65,
          "x": 1820,
          "y": 525
        },
        {
          "blockId": 67,
          "x": 1820,
          "y": 770
        },
        {
          "blockId": 68,
          "x": 2380,
          "y": 1540
        },
        {
          "blockId": 69,
          "x": 2030,
          "y": 1610
        },
        {
          "blockId": 70,
          "x": 1750,
          "y": 1610
        },
        {
          "blockId": 71,
          "x": 1435,
          "y": 1540
        },
        {
          "blockId": 72,
          "x": 1155,
          "y": 1505
        },
        {
          "blockId": 73,
          "x": 1155,
          "y": 1645
        },
        {
          "blockId": 74,
          "x": 1995,
          "y": 1365
        },
        {
          "blockId": 76,
          "x": 2415,
          "y": 3360
        },
        {
          "blockId": 77,
          "x": 2030,
          "y": 3360
        },
        {
          "blockId": 78,
          "x": 1050,
          "y": 3290
        },
        {
          "blockId": 80,
          "x": -490,
          "y": 3290
        },
        {
          "blockId": 81,
          "x": 1610,
          "y": 3640
        },
        {
          "blockId": 82,
          "x": 1330,
          "y": 3640
        },
        {
          "blockId": 83,
          "x": 4095,
          "y": 1505
        },
        {
          "blockId": 84,
          "x": 2660,
          "y": 2345
        },
        {
          "blockId": 85,
          "x": 2380,
          "y": 2345
        },
        {
          "blockId": 86,
          "x": 1995,
          "y": 2415
        },
        {
          "blockId": 88,
          "x": 1995,
          "y": 2205
        },
        {
          "blockId": 89,
          "x": 1995,
          "y": 2310
        },
        {
          "blockId": 90,
          "x": 3465,
          "y": 2485
        },
        {
          "blockId": 91,
          "x": 2380,
          "y": 2485
        },
        {
          "blockId": 92,
          "x": 3150,
          "y": 2660
        },
        {
          "blockId": 93,
          "x": 2835,
          "y": 2555
        },
        {
          "blockId": 94,
          "x": 2415,
          "y": 3430
        },
        {
          "blockId": 95,
          "x": 2030,
          "y": 3570
        },
        {
          "blockId": 96,
          "x": 1610,
          "y": 3465
        },
        {
          "blockId": 97,
          "x": 1330,
          "y": 3535
        },
        {
          "blockId": 98,
          "x": 1050,
          "y": 3570
        },
        {
          "blockId": 99,
          "x": 700,
          "y": 3535
        },
        {
          "blockId": 101,
          "x": 350,
          "y": 3570
        },
        {
          "blockId": 102,
          "x": 70,
          "y": 3570
        },
        {
          "blockId": 103,
          "x": -210,
          "y": 3570
        },
        {
          "blockId": 104,
          "x": -210,
          "y": 3780
        },
        {
          "blockId": 105,
          "x": 700,
          "y": 3780
        },
        {
          "blockId": 106,
          "x": 1610,
          "y": 3745
        },
        {
          "blockId": 107,
          "x": 2380,
          "y": 2625
        },
        {
          "blockId": 108,
          "x": 2835,
          "y": 2730
        },
        {
          "blockId": 109,
          "x": 2380,
          "y": 2730
        },
        {
          "blockId": 110,
          "x": 1995,
          "y": 2730
        },
        {
          "blockId": 111,
          "x": 2380,
          "y": 2835
        },
        {
          "blockId": 112,
          "x": 2695,
          "y": 3570
        },
        {
          "blockId": 113,
          "x": 2415,
          "y": 3570
        }
      ],
      "zoom": 0.2915904013118646,
      "x": 476.1825761714034,
      "y": 2.3267497013113996,
      "frames": [
        {
          "x": 1440,
          "y": 220,
          "width": 1877.91,
          "height": 943.496,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "specular",
          "isCollapsed": false,
          "blocks": [
            53,
            52,
            47,
            61,
            46,
            63,
            67,
            64,
            62,
            45,
            41,
            42,
            65
          ]
        },
        {
          "x": 1080,
          "y": 1300,
          "width": 1669.39,
          "height": 620,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "diffuse",
          "isCollapsed": false,
          "blocks": [
            44,
            72,
            73,
            71,
            70,
            69,
            74,
            68
          ]
        },
        {
          "x": -400,
          "y": -480,
          "width": 1176.39,
          "height": 444.588,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "vertex",
          "isCollapsed": false,
          "blocks": [
            29,
            30,
            28,
            31,
            27,
            26
          ]
        },
        {
          "x": -420,
          "y": 180,
          "width": 1658.35,
          "height": 875.405,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "vectors",
          "isCollapsed": false,
          "blocks": [
            51,
            50,
            49,
            48,
            56,
            55,
            54,
            59,
            60,
            58,
            57
          ]
        },
        {
          "x": 1920,
          "y": 2060,
          "width": 1825.25,
          "height": 1000,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "emissive",
          "isCollapsed": false,
          "blocks": [
            86,
            88,
            85,
            84,
            89,
            91,
            107,
            110,
            111,
            108,
            92,
            90,
            93,
            109
          ]
        },
        {
          "x": 3340,
          "y": 1300,
          "width": 2752.53,
          "height": 560,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "final color",
          "isCollapsed": false,
          "blocks": [
            40,
            39,
            83,
            38,
            37,
            34,
            36,
            35
          ]
        },
        {
          "x": -502.52,
          "y": 3180,
          "width": 3582.53,
          "height": 820,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "bladeHeat",
          "isCollapsed": false,
          "blocks": [
            80,
            78,
            82,
            81,
            77,
            76,
            103,
            104,
            102,
            101,
            99,
            97,
            96,
            106,
            95,
            94,
            113,
            112,
            98,
            105
          ]
        }
      ]
    },
    "customType": "BABYLON.NodeMaterial",
    "outputNodes": [
      26,
      32
    ],
    "blocks": [
      {
        "customType": "BABYLON.VertexOutputBlock",
        "id": 26,
        "name": "VertexOutput",
        "comments": "",
        "inputs": [
          {
            "name": "vector",
            "inputName": "vector",
            "targetBlockId": 27,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.TransformBlock",
        "id": 27,
        "name": "WorldPos * ViewProjectionTransform",
        "comments": "",
        "inputs": [
          {
            "name": "vector",
            "inputName": "vector",
            "targetBlockId": 28,
            "targetConnectionName": "output"
          },
          {
            "name": "transform",
            "inputName": "transform",
            "targetBlockId": 31,
            "targetConnectionName": "output"
          }
        ],
        "complementZ": 0,
        "complementW": 1
      },
      {
        "customType": "BABYLON.TransformBlock",
        "id": 28,
        "name": "WorldPos",
        "comments": "",
        "inputs": [
          {
            "name": "vector",
            "inputName": "vector",
            "targetBlockId": 29,
            "targetConnectionName": "output"
          },
          {
            "name": "transform",
            "inputName": "transform",
            "targetBlockId": 30,
            "targetConnectionName": "output"
          }
        ],
        "complementZ": 0,
        "complementW": 1
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 29,
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
        "id": 30,
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
        "id": 31,
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
        "id": 32,
        "name": "FragmentOutput",
        "comments": "",
        "inputs": [
          {
            "name": "rgba"
          },
          {
            "name": "rgb",
            "inputName": "rgb",
            "targetBlockId": 33,
            "targetConnectionName": "output"
          },
          {
            "name": "a"
          }
        ]
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 33,
        "name": "glowLayerMask",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 34,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 92,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.ClampBlock",
        "id": 34,
        "name": "Clamp",
        "comments": "",
        "inputs": [
          {
            "name": "value",
            "inputName": "value",
            "targetBlockId": 35,
            "targetConnectionName": "output"
          }
        ],
        "minimum": 0,
        "maximum": 1
      },
      {
        "customType": "BABYLON.AddBlock",
        "id": 35,
        "name": "Add",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 36,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 94,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 36,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 37,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 112,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.AddBlock",
        "id": 37,
        "name": "Add",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 38,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 90,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.LerpBlock",
        "id": 38,
        "name": "Lerp",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 39,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 83,
            "targetConnectionName": "output"
          },
          {
            "name": "gradient",
            "inputName": "gradient",
            "targetBlockId": 89,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 39,
        "name": "charEffect",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 40,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 76,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.AddBlock",
        "id": 40,
        "name": "diffuseSpec",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 41,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 68,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.ScaleBlock",
        "id": 41,
        "name": "Scale",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 42,
            "targetConnectionName": "rgb"
          },
          {
            "name": "factor",
            "inputName": "factor",
            "targetBlockId": 45,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.TextureBlock",
        "id": 42,
        "name": "specularTexture",
        "comments": "",
        "inputs": [
          {
            "name": "uv",
            "inputName": "uv",
            "targetBlockId": 44,
            "targetConnectionName": "output"
          }
        ],
        "convertToGammaSpace": false
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 44,
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
        "id": 45,
        "name": "Pow",
        "comments": "",
        "inputs": [
          {
            "name": "value",
            "inputName": "value",
            "targetBlockId": 46,
            "targetConnectionName": "output"
          },
          {
            "name": "power",
            "inputName": "power",
            "targetBlockId": 62,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.MaxBlock",
        "id": 46,
        "name": "Max",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 47,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 61,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.DotBlock",
        "id": 47,
        "name": "Dot",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 48,
            "targetConnectionName": "xyz"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 52,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.VectorSplitterBlock",
        "id": 48,
        "name": "VectorSplitter",
        "comments": "",
        "inputs": [
          {
            "name": "xyzw",
            "inputName": "xyzw",
            "targetBlockId": 49,
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
        "id": 49,
        "name": "Normalize",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 50,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.TransformBlock",
        "id": 50,
        "name": "World normal",
        "comments": "",
        "inputs": [
          {
            "name": "vector",
            "inputName": "vector",
            "targetBlockId": 51,
            "targetConnectionName": "output"
          },
          {
            "name": "transform",
            "inputName": "transform",
            "targetBlockId": 30,
            "targetConnectionName": "output"
          }
        ],
        "complementZ": 0,
        "complementW": 0
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 51,
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
        "id": 52,
        "name": "Normalize",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 53,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.AddBlock",
        "id": 53,
        "name": "halfVector",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 54,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 57,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.NormalizeBlock",
        "id": 54,
        "name": "Normalize",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 55,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.ViewDirectionBlock",
        "id": 55,
        "name": "View direction",
        "comments": "",
        "inputs": [
          {
            "name": "worldPosition",
            "inputName": "worldPosition",
            "targetBlockId": 28,
            "targetConnectionName": "output"
          },
          {
            "name": "cameraPosition",
            "inputName": "cameraPosition",
            "targetBlockId": 56,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 56,
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
        "id": 57,
        "name": "Normalize",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 58,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.ScaleBlock",
        "id": 58,
        "name": "Scale",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 59,
            "targetConnectionName": "direction"
          },
          {
            "name": "factor",
            "inputName": "factor",
            "targetBlockId": 60,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.LightInformationBlock",
        "id": 59,
        "name": "Light information",
        "comments": "",
        "inputs": [
          {
            "name": "worldPosition",
            "inputName": "worldPosition",
            "targetBlockId": 28,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 60,
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
        "id": 61,
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
        "id": 62,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 63,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 64,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 63,
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
        "id": 64,
        "name": "Pow",
        "comments": "",
        "inputs": [
          {
            "name": "value",
            "inputName": "value",
            "targetBlockId": 65,
            "targetConnectionName": "r"
          },
          {
            "name": "power",
            "inputName": "power",
            "targetBlockId": 67,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.TextureBlock",
        "id": 65,
        "name": "glossTexture",
        "comments": "",
        "inputs": [
          {
            "name": "uv",
            "inputName": "uv",
            "targetBlockId": 44,
            "targetConnectionName": "output"
          }
        ],
        "convertToGammaSpace": false
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 67,
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
        "id": 68,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 69,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 74,
            "targetConnectionName": "rgb"
          }
        ]
      },
      {
        "customType": "BABYLON.GradientBlock",
        "id": 69,
        "name": "Gradient",
        "comments": "",
        "inputs": [
          {
            "name": "gradient",
            "inputName": "gradient",
            "targetBlockId": 70,
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
            "step": 0.58,
            "color": {
              "r": 0.3411764705882353,
              "g": 0.23921568627450981,
              "b": 0.4117647058823529
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
        "customType": "BABYLON.AddBlock",
        "id": 70,
        "name": "Add",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 71,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 73,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 71,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 72,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 73,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.DotBlock",
        "id": 72,
        "name": "Dot",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 48,
            "targetConnectionName": "xyz"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 57,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 73,
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
        "customType": "BABYLON.TextureBlock",
        "id": 74,
        "name": "diffuseTexture",
        "comments": "",
        "inputs": [
          {
            "name": "uv",
            "inputName": "uv",
            "targetBlockId": 44,
            "targetConnectionName": "output"
          }
        ],
        "convertToGammaSpace": false
      },
      {
        "customType": "BABYLON.GradientBlock",
        "id": 76,
        "name": "charring",
        "comments": "",
        "inputs": [
          {
            "name": "gradient",
            "inputName": "gradient",
            "targetBlockId": 77,
            "targetConnectionName": "output"
          }
        ],
        "colorSteps": [
          {
            "step": 0,
            "color": {
              "r": 0.7411764705882353,
              "g": 0.2196078431372549,
              "b": 0.20784313725490197
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
        "customType": "BABYLON.RemapBlock",
        "id": 77,
        "name": "Remap",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 78,
            "targetConnectionName": "r"
          },
          {
            "name": "sourceMin"
          },
          {
            "name": "sourceMax"
          },
          {
            "name": "targetMin",
            "inputName": "targetMin",
            "targetBlockId": 81,
            "targetConnectionName": "output"
          },
          {
            "name": "targetMax"
          }
        ],
        "sourceRange": [
          0,
          1
        ],
        "targetRange": [
          0,
          1
        ]
      },
      {
        "customType": "BABYLON.TextureBlock",
        "id": 78,
        "name": "maskTexture",
        "comments": "",
        "inputs": [
          {
            "name": "uv",
            "inputName": "uv",
            "targetBlockId": 80,
            "targetConnectionName": "output"
          }
        ],
        "convertToGammaSpace": false
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 80,
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
        "customType": "BABYLON.OneMinusBlock",
        "id": 81,
        "name": "One minus",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 82,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 82,
        "name": "charLevel",
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
        "value": 0
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 83,
        "name": "maskRune",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 39,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 84,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.OneMinusBlock",
        "id": 84,
        "name": "One minus",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 85,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.DesaturateBlock",
        "id": 85,
        "name": "Desaturate",
        "comments": "",
        "inputs": [
          {
            "name": "color",
            "inputName": "color",
            "targetBlockId": 86,
            "targetConnectionName": "rgb"
          },
          {
            "name": "level",
            "inputName": "level",
            "targetBlockId": 88,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.TextureBlock",
        "id": 86,
        "name": "emissiveTexture",
        "comments": "",
        "inputs": [
          {
            "name": "uv",
            "inputName": "uv",
            "targetBlockId": 44,
            "targetConnectionName": "output"
          }
        ],
        "convertToGammaSpace": false
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 88,
        "name": "one",
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
        "value": 1
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 89,
        "name": "emissiveStrength",
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
        "value": 0
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 90,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 91,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 92,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.ScaleBlock",
        "id": 91,
        "name": "Scale",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 86,
            "targetConnectionName": "rgb"
          },
          {
            "name": "factor",
            "inputName": "factor",
            "targetBlockId": 89,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.LerpBlock",
        "id": 92,
        "name": "Lerp",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 93,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 107,
            "targetConnectionName": "output"
          },
          {
            "name": "gradient",
            "inputName": "gradient",
            "targetBlockId": 108,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.AddBlock",
        "id": 93,
        "name": "combineEmission",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 91,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 94,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.GradientBlock",
        "id": 94,
        "name": "heat",
        "comments": "",
        "inputs": [
          {
            "name": "gradient",
            "inputName": "gradient",
            "targetBlockId": 95,
            "targetConnectionName": "output"
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
            "step": 0.26,
            "color": {
              "r": 0.29411764705882354,
              "g": 0.054901960784313725,
              "b": 0.058823529411764705
            }
          },
          {
            "step": 0.45,
            "color": {
              "r": 0.6352941176470588,
              "g": 0.10980392156862745,
              "b": 0.03137254901960784
            }
          },
          {
            "step": 0.72,
            "color": {
              "r": 0.8156862745098039,
              "g": 0.5137254901960784,
              "b": 0.2
            }
          },
          {
            "step": 0.82,
            "color": {
              "r": 0.9137254901960784,
              "g": 0.7372549019607844,
              "b": 0.38823529411764707
            }
          },
          {
            "step": 0.93,
            "color": {
              "r": 0.9568627450980393,
              "g": 0.9215686274509803,
              "b": 0.8392156862745098
            }
          }
        ]
      },
      {
        "customType": "BABYLON.RemapBlock",
        "id": 95,
        "name": "Remap",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 96,
            "targetConnectionName": "output"
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
            "name": "targetMax",
            "inputName": "targetMax",
            "targetBlockId": 106,
            "targetConnectionName": "output"
          }
        ],
        "sourceRange": [
          0,
          1
        ],
        "targetRange": [
          0,
          1
        ]
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 96,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 78,
            "targetConnectionName": "g"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 97,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.AddBlock",
        "id": 97,
        "name": "Add",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 78,
            "targetConnectionName": "g"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 98,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 98,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 99,
            "targetConnectionName": "b"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 105,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.TextureBlock",
        "id": 99,
        "name": "animTexture",
        "comments": "",
        "inputs": [
          {
            "name": "uv",
            "inputName": "uv",
            "targetBlockId": 101,
            "targetConnectionName": "xy"
          }
        ],
        "convertToGammaSpace": false
      },
      {
        "customType": "BABYLON.VectorMergerBlock",
        "id": 101,
        "name": "VectorMerger",
        "comments": "",
        "inputs": [
          {
            "name": "xyz "
          },
          {
            "name": "xy "
          },
          {
            "name": "x",
            "inputName": "x",
            "targetBlockId": 102,
            "targetConnectionName": "output"
          },
          {
            "name": "y",
            "inputName": "y",
            "targetBlockId": 103,
            "targetConnectionName": "y"
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
        "customType": "BABYLON.SubtractBlock",
        "id": 102,
        "name": "Subtract",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 103,
            "targetConnectionName": "x"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 104,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.VectorSplitterBlock",
        "id": 103,
        "name": "VectorSplitter",
        "comments": "",
        "inputs": [
          {
            "name": "xyzw"
          },
          {
            "name": "xyz "
          },
          {
            "name": "xy ",
            "inputName": "xy ",
            "targetBlockId": 80,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 104,
        "name": "uOffset",
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
        "value": 0
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 105,
        "name": "flickerStrength",
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
        "value": 0
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 106,
        "name": "heatLevel",
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
        "value": 0
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 107,
        "name": "white",
        "comments": "",
        "inputs": [],
        "type": 32,
        "mode": 0,
        "animationType": 0,
        "visibleInInspector": false,
        "min": 0,
        "max": 0,
        "isBoolean": false,
        "matrixMode": 0,
        "isConstant": true,
        "groupInInspector": "",
        "valueType": "BABYLON.Color3",
        "value": [
          1,
          1,
          1
        ]
      },
      {
        "customType": "BABYLON.StepBlock",
        "id": 108,
        "name": "Step",
        "comments": "",
        "inputs": [
          {
            "name": "value",
            "inputName": "value",
            "targetBlockId": 109,
            "targetConnectionName": "output"
          },
          {
            "name": "edge",
            "inputName": "edge",
            "targetBlockId": 111,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.OneMinusBlock",
        "id": 109,
        "name": "One minus",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 110,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 110,
        "name": "glowMask",
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
        "value": 1
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 111,
        "name": "switchValue",
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
        "customType": "BABYLON.OneMinusBlock",
        "id": 112,
        "name": "One minus",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 113,
            "targetConnectionName": "rgb"
          }
        ]
      },
      {
        "customType": "BABYLON.ColorMergerBlock",
        "id": 113,
        "name": "ColorMerger",
        "comments": "",
        "inputs": [
          {
            "name": "rgb "
          },
          {
            "name": "r",
            "inputName": "r",
            "targetBlockId": 95,
            "targetConnectionName": "output"
          },
          {
            "name": "g",
            "inputName": "g",
            "targetBlockId": 95,
            "targetConnectionName": "output"
          },
          {
            "name": "b",
            "inputName": "b",
            "targetBlockId": 95,
            "targetConnectionName": "output"
          },
          {
            "name": "a"
          }
        ]
      }
    ]
  }

export const DataString3 = {
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
          "blockId": 1274,
          "x": 980,
          "y": -140
        },
        {
          "blockId": 1275,
          "x": 455,
          "y": -140
        },
        {
          "blockId": 1276,
          "x": 35,
          "y": -245
        },
        {
          "blockId": 1277,
          "x": -350,
          "y": -245
        },
        {
          "blockId": 1278,
          "x": -315,
          "y": -105
        },
        {
          "blockId": 1279,
          "x": 35,
          "y": -105
        },
        {
          "blockId": 1280,
          "x": 5600,
          "y": 1470
        },
        {
          "blockId": 1281,
          "x": 5145,
          "y": 1505
        },
        {
          "blockId": 1282,
          "x": 4865,
          "y": 1505
        },
        {
          "blockId": 1283,
          "x": 4585,
          "y": 1505
        },
        {
          "blockId": 1284,
          "x": 4305,
          "y": 1435
        },
        {
          "blockId": 1285,
          "x": 3395,
          "y": 1225
        },
        {
          "blockId": 1286,
          "x": 3045,
          "y": 910
        },
        {
          "blockId": 1287,
          "x": 2415,
          "y": 910
        },
        {
          "blockId": 1288,
          "x": 2695,
          "y": 665
        },
        {
          "blockId": 1289,
          "x": 2415,
          "y": 560
        },
        {
          "blockId": 1290,
          "x": 2100,
          "y": 525
        },
        {
          "blockId": 1291,
          "x": 700,
          "y": 280
        },
        {
          "blockId": 1292,
          "x": 420,
          "y": 280
        },
        {
          "blockId": 1293,
          "x": 105,
          "y": 280
        },
        {
          "blockId": 1294,
          "x": -140,
          "y": 280
        },
        {
          "blockId": 1295,
          "x": 1820,
          "y": 630
        },
        {
          "blockId": 1296,
          "x": 1575,
          "y": 630
        },
        {
          "blockId": 1297,
          "x": 700,
          "y": 595
        },
        {
          "blockId": 1298,
          "x": 420,
          "y": 560
        },
        {
          "blockId": 1299,
          "x": 70,
          "y": 595
        },
        {
          "blockId": 1300,
          "x": 980,
          "y": 770
        },
        {
          "blockId": 1301,
          "x": 700,
          "y": 770
        },
        {
          "blockId": 1302,
          "x": 420,
          "y": 700
        },
        {
          "blockId": 1303,
          "x": 420,
          "y": 875
        },
        {
          "blockId": 1304,
          "x": 2100,
          "y": 630
        },
        {
          "blockId": 1305,
          "x": 2415,
          "y": 770
        },
        {
          "blockId": 1306,
          "x": 2100,
          "y": 735
        },
        {
          "blockId": 1307,
          "x": 2100,
          "y": 840
        },
        {
          "blockId": 1308,
          "x": 1820,
          "y": 770
        },
        {
          "blockId": 1309,
          "x": 1820,
          "y": 875
        },
        {
          "blockId": 1310,
          "x": 2415,
          "y": 1470
        },
        {
          "blockId": 1311,
          "x": 2135,
          "y": 1470
        },
        {
          "blockId": 1312,
          "x": 3850,
          "y": 1435
        },
        {
          "blockId": 1313,
          "x": 2590,
          "y": 1960
        },
        {
          "blockId": 1314,
          "x": 2275,
          "y": 1960
        },
        {
          "blockId": 1315,
          "x": 1890,
          "y": 2065
        },
        {
          "blockId": 1317,
          "x": 1610,
          "y": 2065
        },
        {
          "blockId": 1318,
          "x": 1890,
          "y": 1855
        },
        {
          "blockId": 1319,
          "x": 1890,
          "y": 1960
        },
        {
          "blockId": 1320,
          "x": 2905,
          "y": 2030
        },
        {
          "blockId": 1321,
          "x": 2275,
          "y": 2100
        },
        {
          "blockId": 1322,
          "x": 2590,
          "y": 2170
        },
        {
          "blockId": 1323,
          "x": 2275,
          "y": 2240
        },
        {
          "blockId": 1324,
          "x": 2275,
          "y": 2310
        },
        {
          "blockId": 1325,
          "x": 1890,
          "y": 2310
        },
        {
          "blockId": 1326,
          "x": 1610,
          "y": 2310
        },
        {
          "blockId": 1327,
          "x": 1890,
          "y": 2415
        }
      ],
      "zoom": 0.22661822832862083,
      "x": 305.9828601702918,
      "y": 253.17841573923963,
      "frames": [
        {
          "x": 1440,
          "y": 220,
          "width": 1877.91,
          "height": 945,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "specular",
          "isCollapsed": false,
          "blocks": [
            1287,
            1296,
            1295,
            1290,
            1304,
            1289,
            1306,
            1308,
            1309,
            1307,
            1305,
            1288,
            1286
          ]
        },
        {
          "x": 2020,
          "y": 1360,
          "width": 698.762,
          "height": 315,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "diffuse",
          "isCollapsed": false,
          "blocks": [
            1311,
            1310
          ]
        },
        {
          "x": 1549.23,
          "y": 1800,
          "width": 1670.77,
          "height": 840,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "emissive",
          "isCollapsed": false,
          "blocks": [
            1317,
            1315,
            1318,
            1314,
            1313,
            1319,
            1321,
            1323,
            1326,
            1327,
            1324,
            1322,
            1320,
            1325
          ]
        },
        {
          "x": 3760,
          "y": 1300,
          "width": 1731.32,
          "height": 525,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "combine emissive",
          "isCollapsed": false,
          "blocks": [
            1312,
            1284,
            1283,
            1282,
            1281
          ]
        },
        {
          "x": -360,
          "y": -340,
          "width": 1100.97,
          "height": 420,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "vertex",
          "isCollapsed": false,
          "blocks": [
            1277,
            1278,
            1276,
            1279,
            1275
          ]
        },
        {
          "x": -300,
          "y": 180,
          "width": 1623.56,
          "height": 945,
          "color": [
            0.2823529411764706,
            0.2823529411764706,
            0.2823529411764706
          ],
          "name": "vectors",
          "isCollapsed": false,
          "blocks": [
            1294,
            1293,
            1292,
            1291,
            1299,
            1298,
            1297,
            1302,
            1303,
            1301,
            1300
          ]
        }
      ]
    },
    "customType": "BABYLON.NodeMaterial",
    "outputNodes": [
      1274,
      1280
    ],
    "blocks": [
      {
        "customType": "BABYLON.VertexOutputBlock",
        "id": 1274,
        "name": "VertexOutput",
        "comments": "",
        "inputs": [
          {
            "name": "vector",
            "inputName": "vector",
            "targetBlockId": 1275,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.TransformBlock",
        "id": 1275,
        "name": "WorldPos * ViewProjectionTransform",
        "comments": "",
        "inputs": [
          {
            "name": "vector",
            "inputName": "vector",
            "targetBlockId": 1276,
            "targetConnectionName": "output"
          },
          {
            "name": "transform",
            "inputName": "transform",
            "targetBlockId": 1279,
            "targetConnectionName": "output"
          }
        ],
        "complementZ": 0,
        "complementW": 1
      },
      {
        "customType": "BABYLON.TransformBlock",
        "id": 1276,
        "name": "WorldPos",
        "comments": "",
        "inputs": [
          {
            "name": "vector",
            "inputName": "vector",
            "targetBlockId": 1277,
            "targetConnectionName": "output"
          },
          {
            "name": "transform",
            "inputName": "transform",
            "targetBlockId": 1278,
            "targetConnectionName": "output"
          }
        ],
        "complementZ": 0,
        "complementW": 1
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1277,
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
        "id": 1278,
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
        "id": 1279,
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
        "id": 1280,
        "name": "FragmentOutput",
        "comments": "",
        "inputs": [
          {
            "name": "rgba"
          },
          {
            "name": "rgb",
            "inputName": "rgb",
            "targetBlockId": 1281,
            "targetConnectionName": "output"
          },
          {
            "name": "a"
          }
        ]
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 1281,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1282,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1322,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.ClampBlock",
        "id": 1282,
        "name": "Clamp",
        "comments": "",
        "inputs": [
          {
            "name": "value",
            "inputName": "value",
            "targetBlockId": 1283,
            "targetConnectionName": "output"
          }
        ],
        "minimum": 0,
        "maximum": 1
      },
      {
        "customType": "BABYLON.AddBlock",
        "id": 1283,
        "name": "Add",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1284,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1320,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.LerpBlock",
        "id": 1284,
        "name": "Lerp",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1285,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1312,
            "targetConnectionName": "output"
          },
          {
            "name": "gradient",
            "inputName": "gradient",
            "targetBlockId": 1319,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.AddBlock",
        "id": 1285,
        "name": "finalColor",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1286,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1310,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.ScaleBlock",
        "id": 1286,
        "name": "Scale",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 1287,
            "targetConnectionName": "output"
          },
          {
            "name": "factor",
            "inputName": "factor",
            "targetBlockId": 1288,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1287,
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
          0.7647058823529411,
          0.7647058823529411,
          0.7647058823529411
        ]
      },
      {
        "customType": "BABYLON.PowBlock",
        "id": 1288,
        "name": "Pow",
        "comments": "",
        "inputs": [
          {
            "name": "value",
            "inputName": "value",
            "targetBlockId": 1289,
            "targetConnectionName": "output"
          },
          {
            "name": "power",
            "inputName": "power",
            "targetBlockId": 1305,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.MaxBlock",
        "id": 1289,
        "name": "Max",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1290,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1304,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.DotBlock",
        "id": 1290,
        "name": "Dot",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1291,
            "targetConnectionName": "xyz"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1295,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.VectorSplitterBlock",
        "id": 1291,
        "name": "VectorSplitter",
        "comments": "",
        "inputs": [
          {
            "name": "xyzw",
            "inputName": "xyzw",
            "targetBlockId": 1292,
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
        "id": 1292,
        "name": "Normalize",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 1293,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.TransformBlock",
        "id": 1293,
        "name": "World normal",
        "comments": "",
        "inputs": [
          {
            "name": "vector",
            "inputName": "vector",
            "targetBlockId": 1294,
            "targetConnectionName": "output"
          },
          {
            "name": "transform",
            "inputName": "transform",
            "targetBlockId": 1278,
            "targetConnectionName": "output"
          }
        ],
        "complementZ": 0,
        "complementW": 0
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1294,
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
        "id": 1295,
        "name": "Normalize",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 1296,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.AddBlock",
        "id": 1296,
        "name": "halfVector",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1297,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1300,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.NormalizeBlock",
        "id": 1297,
        "name": "Normalize",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 1298,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.ViewDirectionBlock",
        "id": 1298,
        "name": "View direction",
        "comments": "",
        "inputs": [
          {
            "name": "worldPosition",
            "inputName": "worldPosition",
            "targetBlockId": 1276,
            "targetConnectionName": "output"
          },
          {
            "name": "cameraPosition",
            "inputName": "cameraPosition",
            "targetBlockId": 1299,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1299,
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
        "id": 1300,
        "name": "Normalize",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 1301,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.ScaleBlock",
        "id": 1301,
        "name": "Scale",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 1302,
            "targetConnectionName": "direction"
          },
          {
            "name": "factor",
            "inputName": "factor",
            "targetBlockId": 1303,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.LightInformationBlock",
        "id": 1302,
        "name": "Light information",
        "comments": "",
        "inputs": [
          {
            "name": "worldPosition",
            "inputName": "worldPosition",
            "targetBlockId": 1276,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1303,
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
        "id": 1304,
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
        "id": 1305,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1306,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1307,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1306,
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
        "id": 1307,
        "name": "Pow",
        "comments": "",
        "inputs": [
          {
            "name": "value",
            "inputName": "value",
            "targetBlockId": 1308,
            "targetConnectionName": "output"
          },
          {
            "name": "power",
            "inputName": "power",
            "targetBlockId": 1309,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1308,
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
        "value": 0.41
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1309,
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
        "customType": "BABYLON.GradientBlock",
        "id": 1310,
        "name": "Gradient",
        "comments": "",
        "inputs": [
          {
            "name": "gradient",
            "inputName": "gradient",
            "targetBlockId": 1311,
            "targetConnectionName": "output"
          }
        ],
        "colorSteps": [
          {
            "step": 0,
            "color": {
              "r": 0.27450980392156865,
              "g": 0.03529411764705882,
              "b": 0.03529411764705882
            }
          },
          {
            "step": 0.13,
            "color": {
              "r": 0.7098039215686275,
              "g": 0.058823529411764705,
              "b": 0.058823529411764705
            }
          },
          {
            "step": 1,
            "color": {
              "r": 0.3607843137254902,
              "g": 0.0392156862745098,
              "b": 0.0392156862745098
            }
          }
        ]
      },
      {
        "customType": "BABYLON.DotBlock",
        "id": 1311,
        "name": "Dot",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1291,
            "targetConnectionName": "xyz"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1300,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 1312,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1285,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1313,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.OneMinusBlock",
        "id": 1313,
        "name": "One minus",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 1314,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.DesaturateBlock",
        "id": 1314,
        "name": "Desaturate",
        "comments": "",
        "inputs": [
          {
            "name": "color",
            "inputName": "color",
            "targetBlockId": 1315,
            "targetConnectionName": "rgb"
          },
          {
            "name": "level",
            "inputName": "level",
            "targetBlockId": 1318,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.TextureBlock",
        "id": 1315,
        "name": "emissiveTexture",
        "comments": "",
        "inputs": [
          {
            "name": "uv",
            "inputName": "uv",
            "targetBlockId": 1317,
            "targetConnectionName": "output"
          }
        ],
        "convertToGammaSpace": false
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1317,
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
        "customType": "BABYLON.InputBlock",
        "id": 1318,
        "name": "one",
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
        "value": 1
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1319,
        "name": "emissiveStrength",
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
        "value": 0
      },
      {
        "customType": "BABYLON.MultiplyBlock",
        "id": 1320,
        "name": "Multiply",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1321,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1322,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.ScaleBlock",
        "id": 1321,
        "name": "Scale",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 1315,
            "targetConnectionName": "rgb"
          },
          {
            "name": "factor",
            "inputName": "factor",
            "targetBlockId": 1319,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.LerpBlock",
        "id": 1322,
        "name": "Lerp",
        "comments": "",
        "inputs": [
          {
            "name": "left",
            "inputName": "left",
            "targetBlockId": 1321,
            "targetConnectionName": "output"
          },
          {
            "name": "right",
            "inputName": "right",
            "targetBlockId": 1323,
            "targetConnectionName": "output"
          },
          {
            "name": "gradient",
            "inputName": "gradient",
            "targetBlockId": 1324,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1323,
        "name": "white",
        "comments": "",
        "inputs": [],
        "type": 32,
        "mode": 0,
        "animationType": 0,
        "visibleInInspector": false,
        "min": 0,
        "max": 0,
        "isBoolean": false,
        "matrixMode": 0,
        "isConstant": true,
        "groupInInspector": "",
        "valueType": "BABYLON.Color3",
        "value": [
          1,
          1,
          1
        ]
      },
      {
        "customType": "BABYLON.StepBlock",
        "id": 1324,
        "name": "Step",
        "comments": "",
        "inputs": [
          {
            "name": "value",
            "inputName": "value",
            "targetBlockId": 1325,
            "targetConnectionName": "output"
          },
          {
            "name": "edge",
            "inputName": "edge",
            "targetBlockId": 1327,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.OneMinusBlock",
        "id": 1325,
        "name": "One minus",
        "comments": "",
        "inputs": [
          {
            "name": "input",
            "inputName": "input",
            "targetBlockId": 1326,
            "targetConnectionName": "output"
          }
        ]
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1326,
        "name": "glowMask",
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
        "value": 1
      },
      {
        "customType": "BABYLON.InputBlock",
        "id": 1327,
        "name": "switchValue",
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
      }
    ]
  }