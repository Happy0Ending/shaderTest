import { Camera, Color3, Effect, FilterMode, Matrix, RenderTargetTexture, Scene, ShaderMaterial, StandardMaterial, Texture, Vector2, VertexFormat } from "@babylonjs/core";

export class OutLinePass {
    public scene: Scene;
    public camera: Camera | null;
    public selectedObjects: never[];
    public visibleEdgeColor: Color3;
    public hiddenEdgeColor: Color3;
    public edgeGlow: number;
    public usePatternTexture: boolean;
    public edgeThickness: number;
    public edgeStrength: number;
    public downSampleRatio: number;
    public pulsePeriod: number;
    public resolution: any;
    public maskBufferMaterial: StandardMaterial;
    public renderTargetMaskBuffer: RenderTargetTexture;
    public depthMaterial: StandardMaterial;
    public prepareMaskMaterial: ShaderMaterial;
    public edgeDetectionMaterial: ShaderMaterial;
    public separableBlurMaterial1: ShaderMaterial;
    public separableBlurMaterial2: ShaderMaterial;

    public renderTargetMaskDownSampleBuffer: RenderTargetTexture;
    public renderTargetBlurBuffer1: RenderTargetTexture;
    public renderTargetBlurBuffer2: RenderTargetTexture;
    public renderTargetEdgeBuffer1: RenderTargetTexture;
    public renderTargetEdgeBuffer2: RenderTargetTexture;


    constructor(scene: Scene, selectedObjects?: [], resolution?: { x: number, y: number },) {
        this.scene = scene;
        this.camera = scene.activeCamera;
        this.selectedObjects = selectedObjects !== undefined ? selectedObjects : [];
        this.visibleEdgeColor = new Color3(1, 1, 1);
        this.hiddenEdgeColor = new Color3(0.1, 0.04, 0.02);
        this.edgeGlow = 0.0;
        this.usePatternTexture = false;
        this.edgeThickness = 1.0;
        this.edgeStrength = 3.0;
        this.downSampleRatio = 2;
        this.pulsePeriod = 0;
        this.resolution = (resolution !== undefined) ? new Vector2(resolution.x, resolution.y) : new Vector2(256, 256);
        var pars = { minFilter: FilterMode.Linear, magFilter: FilterMode.Linear, format: { r: '', g: "", b: "", a: "" } };

        var resx = Math.round(this.resolution.x / this.downSampleRatio);
        var resy = Math.round(this.resolution.y / this.downSampleRatio);

        this.maskBufferMaterial = new StandardMaterial("maskBufferMaterial", this.scene);
        this.maskBufferMaterial.backFaceCulling = false;

        this.maskBufferMaterial.backFaceCulling = false;
        this.renderTargetMaskBuffer = new RenderTargetTexture("renderTargetMaskBuffer", { width: this.resolution.x, height: this.resolution.y }, this.scene, false);
        this.renderTargetMaskBuffer.name = "OutlinePass.mask";


        this.depthMaterial = new StandardMaterial("depthMaterial", this.scene);
        this.depthMaterial.backFaceCulling = false;
        this.depthMaterial.needDepthPrePass = true;
        this.depthMaterial.alphaMode = 0;

        this.prepareMaskMaterial = this.getPrepareMaskMaterial();
        this.prepareMaskMaterial.backFaceCulling = false;


        this.renderTargetMaskDownSampleBuffer = new RenderTargetTexture("OutlinePass.depthDownSample", { width: resx, height: resy }, this.scene, false);


        this.renderTargetBlurBuffer1 = new RenderTargetTexture("OutlinePass.blur1", { width: resx, height: resy }, this.scene, false);

        this.renderTargetBlurBuffer2 = new RenderTargetTexture("OutlinePass.blur2", { width: Math.round(resx / 2), height: Math.round(resy / 2), }, this.scene, false);


        this.edgeDetectionMaterial = this.getEdgeDetectionMaterial();
        this.renderTargetEdgeBuffer1 = new RenderTargetTexture("OutlinePass.edge1", { width: resx, height: resy }, this.scene, false);

        this.renderTargetEdgeBuffer2 = new RenderTargetTexture("OutlinePass.edge2", { width: Math.round(resx / 2), height: Math.round(resy / 2), }, this.scene, false);

        var MAX_EDGE_THICKNESS = 4;
        var MAX_EDGE_GLOW = 4;
        this.separableBlurMaterial1 = this.getSeperableBlurMaterial();
        this.separableBlurMaterial1.setVector2("texSize",new Vector2(resx, resy));
        this.separableBlurMaterial1.setFloat("kernelRadius",1.0);
       
      
        this.separableBlurMaterial2 = this.getSeperableBlurMaterial();
        this.separableBlurMaterial2.setVector2("texSize",new Vector2(Math.round(resx / 2), Math.round(resy / 2)));
        this.separableBlurMaterial2.setFloat("kernelRadius", MAX_EDGE_GLOW)


        this.overlayMaterial = this.getOverlayMaterial();

        // copy material
        if ( CopyShader === undefined )
            console.error( "OutlinePass relies on CopyShader" );
    
        var copyShader = CopyShader;
    
        this.copyUniforms = UniformsUtils.clone( copyShader.uniforms );
        this.copyUniforms[ "opacity" ].value = 1.0;
    
        this.materialCopy = new ShaderMaterial( {
            uniforms: this.copyUniforms,
            vertexShader: copyShader.vertexShader,
            fragmentShader: copyShader.fragmentShader,
            blending: NoBlending,
            depthTest: false,
            depthWrite: false,
            transparent: true
        } );
    
        this.enabled = true;
        this.needsSwap = false;
    
        this.oldClearColor = new Color();
        this.oldClearAlpha = 1;
    
        this.fsQuad = new Pass.FullScreenQuad( null );
    
        this.tempPulseColor1 = new Color();
        this.tempPulseColor2 = new Color();
        this.textureMatrix = new Matrix4();

    



        // this.scene.autoClear = false;
    }
    getPrepareMaskMaterial = () => {
        Effect.ShadersStore["PrepareMaskMaterial" + "VertexShader"] =
            'varying vec4 projTexCoord;',
            'varying vec4 vPosition;',
            'uniform mat4 textureMatrix;',

            'void main() {',

            '	vPosition = modelViewMatrix * vec4( position, 1.0 );',
            '	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );',
            '	projTexCoord = textureMatrix * worldPosition;',
            '	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

            '}'
        Effect.ShadersStore["PrepareMaskMaterial" + "FragmentShader"] =
            '#include <packing>',
            'varying vec4 vPosition;',
            'varying vec4 projTexCoord;',
            'uniform sampler2D depthTexture;',
            'uniform vec2 cameraNearFar;',

            'void main() {',

            '	float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));',
            '	float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );',
            '	float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;',
            '	gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);',

            '}'
        let mat = new ShaderMaterial(
            "PrepareMaskMaterial",
            this.scene,
            {
                vertex: "PrepareMaskMaterial" + "VertexShader",
                fragment: "PrepareMaskMaterial" + "FragmentShader",
            },
            {
                attributes: ["normals", "position", "uv"],
                uniforms: [
                    "world",
                    "worldView",
                    "worldViewProjection",
                    "view",
                    "projection",
                ],
                needAlphaBlending: true,
                needAlphaTesting: true,
            }
        );

        // let depthTexture = new Texture("getPrepareMaskMaterial", this.scene);
        let cameraNearFar = new Vector2(0.5, 0.5);
        let textureMatrix = new Matrix();

        // mat.setTexture("depthTexture", depthTexture);
        mat.setVector2("cameraNearFar", cameraNearFar);
        mat.setMatrix("textureMatrix", textureMatrix);
        return mat;
    }

    getEdgeDetectionMaterial = () => {
        Effect.ShadersStore["EdgeDetectionMaterial" + "VertexShader"] =
            "varying vec2 vUv;\n\
        void main() {\n\
            vUv = uv;\n\
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
        }";
        Effect.ShadersStore["EdgeDetectionMaterial" + "FragmentShader"] =
            "varying vec2 vUv;\
        uniform sampler2D maskTexture;\
        uniform vec2 texSize;\
        uniform vec3 visibleEdgeColor;\
        uniform vec3 hiddenEdgeColor;\
        \
        void main() {\n\
            vec2 invSize = 1.0 / texSize;\
            vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);\
            vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);\
            vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);\
            vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);\
            vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);\
            float diff1 = (c1.r - c2.r)*0.5;\
            float diff2 = (c3.r - c4.r)*0.5;\
            float d = length( vec2(diff1, diff2) );\
            float a1 = min(c1.g, c2.g);\
            float a2 = min(c3.g, c4.g);\
            float visibilityFactor = min(a1, a2);\
            vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;\
            gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);\
        }"
        let mat = new ShaderMaterial(
            "PrepareMaskMaterial",
            this.scene,
            {
                vertex: "EdgeDetectionMaterial" + "VertexShader",
                fragment: "EdgeDetectionMaterial" + "FragmentShader",
            },
            {
                attributes: ["normals", "position", "uv"],
                uniforms: [
                    "world",
                    "worldView",
                    "worldViewProjection",
                    "view",
                    "projection",
                ],
                needAlphaBlending: true,
                needAlphaTesting: true,
            }
        );
        // let maskTexture = new Texture("getPrepareMaskMaterial", this.scene);
        let texSize = new Vector2(0.5, 0.5);
        let visibleEdgeColor = new Color3(1, 1, 1);
        let hiddenEdgeColor = new Color3(1, 1, 1);
        // mat.setTexture("maskTexture", maskTexture);
        mat.setVector2("texSize", texSize);
        mat.setColor3("visibleEdgeColor", visibleEdgeColor);
        mat.setColor3("hiddenEdgeColor", hiddenEdgeColor);


        return mat;
    }
    getSeperableBlurMaterial = () => {

        Effect.ShadersStore["SeperableBlurMaterial" + "VertexShader"] =
            "varying vec2 vUv;\n\
        void main() {\n\
            vUv = uv;\n\
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
        }",

            Effect.ShadersStore["SeperableBlurMaterial" + "FragmentShader"] =
            "#include <common>\
        varying vec2 vUv;\
        uniform sampler2D colorTexture;\
        uniform vec2 texSize;\
        uniform vec2 direction;\
        uniform float kernelRadius;\
        uniform float MAX_RADIUS;\
        \
        float gaussianPdf(in float x, in float sigma) {\
            return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\
        }\
        void main() {\
            vec2 invSize = 1.0 / texSize;\
            float weightSum = gaussianPdf(0.0, kernelRadius);\
            vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;\
            vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);\
            vec2 uvOffset = delta;\
            for( int i = 1; i <= MAX_RADIUS; i ++ ) {\
                float w = gaussianPdf(uvOffset.x, kernelRadius);\
                vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);\
                vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);\
                diffuseSum += ((sample1 + sample2) * w);\
                weightSum += (2.0 * w);\
                uvOffset += delta;\
            }\
            gl_FragColor = diffuseSum/weightSum;\
        }"
        let mat = new ShaderMaterial(
            "PrepareMaskMaterial",
            this.scene,
            {
                vertex: "SeperableBlurMaterial" + "VertexShader",
                fragment: "SeperableBlurMaterial" + "FragmentShader",
            },
            {
                attributes: ["normals", "position", "uv"],
                uniforms: [
                    "world",
                    "worldView",
                    "worldViewProjection",
                    "view",
                    "projection",
                ],
                needAlphaBlending: true,
                needAlphaTesting: true,
            }
        );
        // "colorTexture": { value: null },
        // "texSize": { value: new Vector2( 0.5, 0.5 ) },
        // "direction": { value: new Vector2( 0.5, 0.5 ) },
        // "kernelRadius": { value: 1.0 }
        // let colorTexture = new Texture('colorTexture', this.scene);
        let texSize = new Vector2(0.5, 0.5);
        let direction = new Vector2(0.5, 0.5)
        let kernelRadius = 1.0;
        let MAX_RADIUS = 4.0;
        // mat.setTexture("colorTexture", colorTexture);
        mat.setVector2("texSize", texSize);
        mat.setVector2("direction", direction);
        mat.setFloat("kernelRadius", kernelRadius);
        mat.setFloat("MAX_RADIUS", MAX_RADIUS);
        return mat;

    }

    getOverlayMaterial = () => {
        Effect.ShadersStore["OverlayMaterial" + "VertexShader"] =
            "varying vec2 vUv;\n\
        void main() {\n\
            vUv = uv;\n\
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
        }";

        Effect.ShadersStore["OverlayMaterial" + "FragmentShader"] =
            "varying vec2 vUv;\
				uniform sampler2D maskTexture;\
				uniform sampler2D edgeTexture1;\
				uniform sampler2D edgeTexture2;\
				uniform sampler2D patternTexture;\
				uniform float edgeStrength;\
				uniform float edgeGlow;\
				uniform bool usePatternTexture;\
				\
				void main() {\
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);\
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);\
					vec4 maskColor = texture2D(maskTexture, vUv);\
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);\
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;\
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;\
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;\
					if(usePatternTexture)\
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);\
					gl_FragColor = finalColor;\
				}";

        let mat = new ShaderMaterial(
            "OverlayMaterial",
            this.scene,
            {
                vertex: "OverlayMaterial" + "VertexShader",
                fragment: "OverlayMaterial" + "FragmentShader",
            },
            {
                attributes: ["normals", "position", "uv"],
                uniforms: [
                    "world",
                    "worldView",
                    "worldViewProjection",
                    "view",
                    "projection",
                ],
                needAlphaBlending: true,
                needAlphaTesting: true,
            }
        );
        mat.alphaMode = 1;
        // "maskTexture": { value: null },
        // "edgeTexture1": { value: null },
        // "edgeTexture2": { value: null },
        // "patternTexture": { value: null },
        // "edgeStrength": { value: 1.0 },
        // "edgeGlow": { value: 1.0 },
        // "usePatternTexture": { value: 0.0 }
        // let maskTexture = new Texture('maskTexture', this.scene);
        // let edgeTexture1 = new Texture('edgeTexture1', this.scene);
        // let edgeTexture2 = new Texture('edgeTexture2', this.scene);
        // let patternTexture = new Texture('patternTexture', this.scene);
        let edgeStrength = 1.0;
        let edgeGlow = 1.0;
        let usePatternTexture = 0.0;
        // mat.setTexture("maskTexture", maskTexture);
        // mat.setTexture("edgeTexture1", edgeTexture1);
        // mat.setTexture("edgeTexture2", edgeTexture2);
        // mat.setTexture("patternTexture", patternTexture);
        mat.setFloat("edgeStrength", edgeStrength);
        mat.setFloat("edgeGlow", edgeGlow);
        mat.setFloat("usePatternTexture", usePatternTexture);
        return mat;
    }
}