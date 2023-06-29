 export const JSONDATA = `{
    "asset" : {
        "generator" : "Khronos glTF Blender I/O v1.8.19",
        "version" : "2.0"
    },
    "scene" : 0,
    "scenes" : [
        {
            "name" : "Scene",
            "nodes" : [
                0,
                1,
                2
            ]
        }
    ],
    "nodes" : [
        {
            "mesh" : 0,
            "name" : "Cylinder.001",
            "translation" : [
                1,
                0,
                2.785797119140625
            ]
        },
        {
            "mesh" : 1,
            "name" : "Floor"
        },
        {
            "mesh" : 2,
            "name" : "Cylinder",
            "translation" : [
                1,
                0,
                2.785797119140625
            ]
        }
    ],
    "materials" : [
        {
            "doubleSided" : true,
            "name" : "\u6750\u8d28",
            "pbrMetallicRoughness" : {
                "baseColorFactor" : [
                    0.800000011920929,
                    0.800000011920929,
                    0.800000011920929,
                    1
                ],
                "metallicFactor" : 0,
                "roughnessFactor" : 0.5
            }
        },
        {
            "doubleSided" : true,
            "name" : "Material.001",
            "pbrMetallicRoughness" : {
                "baseColorTexture" : {
                    "index" : 0
                },
                "metallicFactor" : 0
            }
        },
        {
            "doubleSided" : true,
            "name" : "Material.002",
            "pbrMetallicRoughness" : {
                "baseColorFactor" : [
                    0.00901819858700037,
                    0.00901819858700037,
                    0.00901819858700037,
                    1
                ],
                "metallicFactor" : 0
            }
        },
        {
            "doubleSided" : true,
            "name" : "Material.003",
            "pbrMetallicRoughness" : {
                "baseColorFactor" : [
                    0.8000000715255737,
                    0.059716809540987015,
                    0.03363529220223427,
                    1
                ],
                "metallicFactor" : 0
            }
        },
        {
            "doubleSided" : true,
            "emissiveFactor" : [
                1,
                1,
                1
            ],
            "name" : "Light",
            "pbrMetallicRoughness" : {}
        },
        {
            "doubleSided" : true,
            "name" : "Material.004",
            "pbrMetallicRoughness" : {
                "baseColorTexture" : {
                    "index" : 1
                },
                "metallicFactor" : 0
            }
        },
        {
            "doubleSided" : true,
            "name" : "Material.005",
            "pbrMetallicRoughness" : {
                "baseColorFactor" : [
                    0.6618639230728149,
                    0.05042377486824989,
                    0.02855793386697769,
                    1
                ],
                "metallicFactor" : 0
            }
        }
    ],
    "meshes" : [
        {
            "name" : "Cylinder.002",
            "primitives" : [
                {
                    "attributes" : {
                        "POSITION" : 0,
                        "NORMAL" : 1,
                        "TEXCOORD_0" : 2
                    },
                    "indices" : 3,
                    "material" : 0
                }
            ]
        },
        {
            "name" : "Plane",
            "primitives" : [
                {
                    "attributes" : {
                        "POSITION" : 4,
                        "NORMAL" : 5,
                        "TEXCOORD_0" : 6
                    },
                    "indices" : 7,
                    "material" : 1
                },
                {
                    "attributes" : {
                        "POSITION" : 8,
                        "NORMAL" : 9,
                        "TEXCOORD_0" : 10
                    },
                    "indices" : 11,
                    "material" : 2
                },
                {
                    "attributes" : {
                        "POSITION" : 12,
                        "NORMAL" : 13,
                        "TEXCOORD_0" : 14
                    },
                    "indices" : 15,
                    "material" : 3
                },
                {
                    "attributes" : {
                        "POSITION" : 16,
                        "NORMAL" : 17,
                        "TEXCOORD_0" : 18
                    },
                    "indices" : 19,
                    "material" : 4
                }
            ]
        },
        {
            "name" : "Cylinder.000",
            "primitives" : [
                {
                    "attributes" : {
                        "POSITION" : 20,
                        "NORMAL" : 21,
                        "TEXCOORD_0" : 22
                    },
                    "indices" : 23,
                    "material" : 5
                },
                {
                    "attributes" : {
                        "POSITION" : 24,
                        "NORMAL" : 25,
                        "TEXCOORD_0" : 26
                    },
                    "indices" : 27,
                    "material" : 6
                },
                {
                    "attributes" : {
                        "POSITION" : 28,
                        "NORMAL" : 29,
                        "TEXCOORD_0" : 30
                    },
                    "indices" : 31,
                    "material" : 4
                }
            ]
        }
    ],
    "textures" : [
        {
            "sampler" : 0,
            "source" : 0
        },
        {
            "sampler" : 0,
            "source" : 1
        }
    ],
    "images" : [
        {
            "bufferView" : 8,
            "mimeType" : "image/png",
            "name" : "Image_0"
        },
        {
            "bufferView" : 25,
            "mimeType" : "image/png",
            "name" : "Image_1"
        }
    ],
    "accessors" : [
        {
            "bufferView" : 0,
            "componentType" : 5126,
            "count" : 715,
            "max" : [
                1.1003735065460205,
                3.4631497859954834,
                1.10037362575531
            ],
            "min" : [
                -1.1003735065460205,
                2.9053804874420166,
                -1.10037362575531
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 1,
            "componentType" : 5126,
            "count" : 715,
            "type" : "VEC3"
        },
        {
            "bufferView" : 2,
            "componentType" : 5126,
            "count" : 715,
            "type" : "VEC2"
        },
        {
            "bufferView" : 3,
            "componentType" : 5123,
            "count" : 768,
            "type" : "SCALAR"
        },
        {
            "bufferView" : 4,
            "componentType" : 5126,
            "count" : 2871,
            "max" : [
                5.217350006103516,
                1.7032865285873413,
                5.099999904632568
            ],
            "min" : [
                -5.099999904632568,
                -1,
                -5.099999904632568
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 5,
            "componentType" : 5126,
            "count" : 2871,
            "type" : "VEC3"
        },
        {
            "bufferView" : 6,
            "componentType" : 5126,
            "count" : 2871,
            "type" : "VEC2"
        },
        {
            "bufferView" : 7,
            "componentType" : 5123,
            "count" : 3318,
            "type" : "SCALAR"
        },
        {
            "bufferView" : 9,
            "componentType" : 5126,
            "count" : 286,
            "max" : [
                3.465312957763672,
                0.40307459235191345,
                -0.7144498229026794
            ],
            "min" : [
                0.7111184597015381,
                0.016614913940429688,
                -1.4355388879776
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 10,
            "componentType" : 5126,
            "count" : 286,
            "type" : "VEC3"
        },
        {
            "bufferView" : 11,
            "componentType" : 5126,
            "count" : 286,
            "type" : "VEC2"
        },
        {
            "bufferView" : 12,
            "componentType" : 5123,
            "count" : 330,
            "type" : "SCALAR"
        },
        {
            "bufferView" : 13,
            "componentType" : 5126,
            "count" : 2894,
            "max" : [
                5.145308494567871,
                1.6821120977401733,
                -0.021958306431770325
            ],
            "min" : [
                0.8175528049468994,
                -0.151752769947052,
                -3.0770812034606934
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 14,
            "componentType" : 5126,
            "count" : 2894,
            "type" : "VEC3"
        },
        {
            "bufferView" : 15,
            "componentType" : 5126,
            "count" : 2894,
            "type" : "VEC2"
        },
        {
            "bufferView" : 16,
            "componentType" : 5123,
            "count" : 3186,
            "type" : "SCALAR"
        },
        {
            "bufferView" : 17,
            "componentType" : 5126,
            "count" : 16,
            "max" : [
                1.2837311029434204,
                0.523468554019928,
                -0.7806248068809509
            ],
            "min" : [
                0.934356689453125,
                0.43499940633773804,
                -0.8879272937774658
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 18,
            "componentType" : 5126,
            "count" : 16,
            "type" : "VEC3"
        },
        {
            "bufferView" : 19,
            "componentType" : 5126,
            "count" : 16,
            "type" : "VEC2"
        },
        {
            "bufferView" : 20,
            "componentType" : 5123,
            "count" : 24,
            "type" : "SCALAR"
        },
        {
            "bufferView" : 21,
            "componentType" : 5126,
            "count" : 1338,
            "max" : [
                1.1696956157684326,
                4.536928176879883,
                1.1696957349777222
            ],
            "min" : [
                -3.5999999046325684,
                0,
                -6.346014499664307
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 22,
            "componentType" : 5126,
            "count" : 1338,
            "type" : "VEC3"
        },
        {
            "bufferView" : 23,
            "componentType" : 5126,
            "count" : 1338,
            "type" : "VEC2"
        },
        {
            "bufferView" : 24,
            "componentType" : 5123,
            "count" : 1428,
            "type" : "SCALAR"
        },
        {
            "bufferView" : 26,
            "componentType" : 5126,
            "count" : 281,
            "max" : [
                0.6999999284744263,
                5.630528926849365,
                0.699999988079071
            ],
            "min" : [
                -0.699999988079071,
                1.86875319480896,
                -0.699999988079071
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 27,
            "componentType" : 5126,
            "count" : 281,
            "type" : "VEC3"
        },
        {
            "bufferView" : 28,
            "componentType" : 5126,
            "count" : 281,
            "type" : "VEC2"
        },
        {
            "bufferView" : 29,
            "componentType" : 5123,
            "count" : 288,
            "type" : "SCALAR"
        },
        {
            "bufferView" : 30,
            "componentType" : 5126,
            "count" : 166,
            "max" : [
                1.1003735065460205,
                5.714657306671143,
                1.10037362575531
            ],
            "min" : [
                -3.520885944366455,
                0.7791141867637634,
                -6.285730838775635
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 31,
            "componentType" : 5126,
            "count" : 166,
            "type" : "VEC3"
        },
        {
            "bufferView" : 32,
            "componentType" : 5126,
            "count" : 166,
            "type" : "VEC2"
        },
        {
            "bufferView" : 33,
            "componentType" : 5123,
            "count" : 180,
            "type" : "SCALAR"
        }
    ],
    "bufferViews" : [
        {
            "buffer" : 0,
            "byteLength" : 8580,
            "byteOffset" : 0
        },
        {
            "buffer" : 0,
            "byteLength" : 8580,
            "byteOffset" : 8580
        },
        {
            "buffer" : 0,
            "byteLength" : 5720,
            "byteOffset" : 17160
        },
        {
            "buffer" : 0,
            "byteLength" : 1536,
            "byteOffset" : 22880
        },
        {
            "buffer" : 0,
            "byteLength" : 34452,
            "byteOffset" : 24416
        },
        {
            "buffer" : 0,
            "byteLength" : 34452,
            "byteOffset" : 58868
        },
        {
            "buffer" : 0,
            "byteLength" : 22968,
            "byteOffset" : 93320
        },
        {
            "buffer" : 0,
            "byteLength" : 6636,
            "byteOffset" : 116288
        },
        {
            "buffer" : 0,
            "byteLength" : 770226,
            "byteOffset" : 122924
        },
        {
            "buffer" : 0,
            "byteLength" : 3432,
            "byteOffset" : 893152
        },
        {
            "buffer" : 0,
            "byteLength" : 3432,
            "byteOffset" : 896584
        },
        {
            "buffer" : 0,
            "byteLength" : 2288,
            "byteOffset" : 900016
        },
        {
            "buffer" : 0,
            "byteLength" : 660,
            "byteOffset" : 902304
        },
        {
            "buffer" : 0,
            "byteLength" : 34728,
            "byteOffset" : 902964
        },
        {
            "buffer" : 0,
            "byteLength" : 34728,
            "byteOffset" : 937692
        },
        {
            "buffer" : 0,
            "byteLength" : 23152,
            "byteOffset" : 972420
        },
        {
            "buffer" : 0,
            "byteLength" : 6372,
            "byteOffset" : 995572
        },
        {
            "buffer" : 0,
            "byteLength" : 192,
            "byteOffset" : 1001944
        },
        {
            "buffer" : 0,
            "byteLength" : 192,
            "byteOffset" : 1002136
        },
        {
            "buffer" : 0,
            "byteLength" : 128,
            "byteOffset" : 1002328
        },
        {
            "buffer" : 0,
            "byteLength" : 48,
            "byteOffset" : 1002456
        },
        {
            "buffer" : 0,
            "byteLength" : 16056,
            "byteOffset" : 1002504
        },
        {
            "buffer" : 0,
            "byteLength" : 16056,
            "byteOffset" : 1018560
        },
        {
            "buffer" : 0,
            "byteLength" : 10704,
            "byteOffset" : 1034616
        },
        {
            "buffer" : 0,
            "byteLength" : 2856,
            "byteOffset" : 1045320
        },
        {
            "buffer" : 0,
            "byteLength" : 1560522,
            "byteOffset" : 1048176
        },
        {
            "buffer" : 0,
            "byteLength" : 3372,
            "byteOffset" : 2608700
        },
        {
            "buffer" : 0,
            "byteLength" : 3372,
            "byteOffset" : 2612072
        },
        {
            "buffer" : 0,
            "byteLength" : 2248,
            "byteOffset" : 2615444
        },
        {
            "buffer" : 0,
            "byteLength" : 576,
            "byteOffset" : 2617692
        },
        {
            "buffer" : 0,
            "byteLength" : 1992,
            "byteOffset" : 2618268
        },
        {
            "buffer" : 0,
            "byteLength" : 1992,
            "byteOffset" : 2620260
        },
        {
            "buffer" : 0,
            "byteLength" : 1328,
            "byteOffset" : 2622252
        },
        {
            "buffer" : 0,
            "byteLength" : 360,
            "byteOffset" : 2623580
        }
    ],
    "samplers" : [
        {
            "magFilter" : 9729,
            "minFilter" : 9987
        }
    ],
    "buffers" : [
        {
            "byteLength" : 2623940,
        }
    ]
}
`