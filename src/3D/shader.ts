import { AbstractMesh, Color3, Effect, GizmoManager, Mesh, Scene, ShaderMaterial, Texture, Vector3 } from "babylonjs";
import Color from "element-plus/es/components/color-picker/src/color";



export function effectEg(scene: Scene) {
    Effect.ShadersStore["customVertexShader"] = "\r\n" +
        "precision highp float;\r\n" +

        "// Attributes\r\n" +
        "attribute vec3 position;\r\n" +
        "attribute vec2 uv;\r\n" +

        "// Uniforms\r\n" +
        "uniform mat4 worldViewProjection;\r\n" +

        "// Varying\r\n" +
        "varying vec2 vUV;\r\n" +

        "void main(void) {\r\n" +
        "    gl_Position = worldViewProjection * vec4(position, 1.0);\r\n" +
        "    vUV = uv;\r\n" +
        "}\r\n";

    Effect.ShadersStore["customFragmentShader"] = "\r\n" +
        "precision highp float;\r\n" +

        "varying vec2 vUV;\r\n" +

        "uniform sampler2D textureSampler;\r\n" +

        "void main(void) {\r\n" +
        "   vec3 color = vec3(0.1,0.2,0.8);\r\n" +
        "    gl_FragColor = vec4(color,1.0);\r\n" +
        "}\r\n";

    var shaderMaterial = new ShaderMaterial("shader", scene, {
        vertex: "custom",
        fragment: "custom",
    },
        {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        });
    var mainTexture = new Texture("xuanwo.png", scene);
    shaderMaterial.setTexture("textureSampler", mainTexture);
    return shaderMaterial
}

/**
 * UV随着中心旋转
 * @param scene UV所在场景
 * @param step 时间增长步长，可以加快旋转速度
 * @returns shaderMat
 */
export function UVRotateByTime(scene: Scene, step: number) {
    Effect.ShadersStore["customVertexShader"] = "\r\n" +
        "precision highp float;\r\n" +

        "//attribute\r\n" +
        "attribute vec3 position;\r\n" +
        "attribute vec2 uv;\r\n" +
        "attribute vec3 normal;\r\n" +

        "//uniform\r\n" +
        "uniform mat4 worldViewProjection;\r\n" +
        "//varying\r\n" +
        "varying vec3 vPosition;\r\n" +
        "varying vec2 vUV;\r\n" +

        "void main(void) {\r\n" +
        "   gl_Position = worldViewProjection*vec4(position,1.0);\r\n" +
        "   vPosition = position;\r\n" +
        "   vUV = uv;\r\n" +
        "}\r\n"
        ;

    Effect.ShadersStore["customFragmentShader"] = "\r\n" +
        "precision highp float;\r\n" +

        "varying vec2 vUV;\r\n" +
        "varying vec3 vPosition;\r\n" +

        "uniform sampler2D textureSampler;\r\n" +
        "uniform float time;\r\n" +

        "void main(void) {\r\n" +
        "    float cosAngle = cos(time);\r\n" +
        "    float sinAngle = sin(time);\r\n" +
        "    vec2 pivot =vec2(0.5,0.5);\r\n" +
        "    vec2 newUV = vUV-pivot;\r\n" +
        "    mat2 re = mat2(cosAngle,-1.0*sinAngle,sinAngle,cosAngle);\r\n" +
        "    vec2 VV = newUV * re + pivot;\r\n" +
        "    vec4 color = texture2D(textureSampler,VV);\r\n" +
        "    gl_FragColor = color;\r\n" +
        "}\r\n";
    let mat = new ShaderMaterial("shader", scene, {
        vertex: "custom",
        fragment: "custom"
    }, {
        attributes: ["normals", "position", 'uv'],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
    })
    let xuanwoTexture = new Texture("xuanwo2.png", scene);
    mat.setTexture("textureSampler", xuanwoTexture);
    let time = 0.0;
    setInterval(() => {
        mat.setFloat("time", time);
        time += step;
    }, 16)
    mat.backFaceCulling = false;
    return mat;
}


/**
 * UV随着中心旋转
 * @param scene UV所在场景
 * @param step 时间增长步长，可以加快速度
 * @returns  shaderMat
 */
export function UVScaleByTime(scene: Scene, step: number) {
    Effect.ShadersStore["customVertexShader"] = "\r\n" +
        "precision highp float;\r\n" +

        "//attribute\r\n" +
        "attribute vec3 position;\r\n" +
        "attribute vec2 uv;\r\n" +
        "attribute vec3 normal;\r\n" +

        "//uniform\r\n" +
        "uniform mat4 worldViewProjection;\r\n" +
        "//varying\r\n" +
        "varying vec3 vPosition;\r\n" +
        "varying vec2 vUV;\r\n" +

        "void main(void) {\r\n" +
        "   gl_Position = worldViewProjection*vec4(position,1.0);\r\n" +
        "   vPosition = position;\r\n" +
        "   vUV = uv;\r\n" +
        "}\r\n"
        ;

    Effect.ShadersStore["customFragmentShader"] = "\r\n" +
        "precision highp float;\r\n" +

        "varying vec2 vUV;\r\n" +
        "varying vec3 vPosition;\r\n" +

        "uniform sampler2D textureSampler;\r\n" +
        "uniform float time;\r\n" +

        "void main(void) {\r\n" +
        "    float cosAngle = cos(time);\r\n" +
        "    float sinAngle = sin(time);\r\n" +
        "    vec2 pivot =vec2(0.5,0.5);\r\n" +
        "    vec2 newUV = vUV-pivot;\r\n" +
        "    mat2 re = mat2(cosAngle,0.0,0.0,cosAngle);\r\n" +
        "    vec2 VV = newUV * re + pivot;\r\n" +
        "    vec4 color = texture2D(textureSampler,VV);\r\n" +
        "    gl_FragColor = color;\r\n" +
        "}\r\n";
    let mat = new ShaderMaterial("shader", scene, {
        vertex: "custom",
        fragment: "custom"
    }, {
        attributes: ["normals", "position", 'uv'],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
    })
    let xuanwoTexture = new Texture("xuanwo2.png", scene);
    mat.setTexture("textureSampler", xuanwoTexture);
    let time = 0.0;
    setInterval(() => {
        mat.setFloat("time", time);
        time += step;
    }, 16)
    mat.backFaceCulling = false;
    mat.wireframe = true;
    return mat;
}



export function gradientMat(scene: Scene, mesh: Mesh) {
    Effect.ShadersStore["gradientVertexShader"] = "\r\n" +
    "precision highp float;\r\n" +

    "//attribute\r\n" +
    "attribute vec3 position;\r\n" +
    "attribute vec2 uv;\r\n" +
    "attribute vec3 normal;\r\n" +

    "//uniform\r\n" +
    "uniform mat4 worldViewProjection;\r\n" +
    "//varying\r\n" +
    "varying vec3 vPosition;\r\n" +
    "varying vec2 vUV;\r\n" +
    "varying vec3 vNormal;\r\n" +

    "void main(void) {\r\n" +
    "   gl_Position = worldViewProjection*vec4(position,1.0);\r\n" +
    "   vPosition = position;\r\n" +
    "   vUV = uv;\r\n" +
    "   vNormal = normal;\r\n" +
    "}\r\n"
    ;
Effect.ShadersStore["gradientFragmentShader"] = "\r\n" +
    "precision highp float;\r\n" +

    "varying vec3 vPosition;\r\n" +
    "float distanceTwoVec3(vec3 p1,vec3 p2){\r\n" +
    "   float d = sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)+(p1.z-p2.z)*(p1.z-p2.z));\r\n" +
    "   return d;\r\n" +
    "}\r\n" +
    "uniform vec3 mainColor;\r\n"+
    "uniform float maxHeight;\r\n"+
    "uniform float minHeight;\r\n"+
    "void main(void) {\r\n" +
    "   float height = maxHeight - minHeight;\r\n"+
    "   vec3 color = mainColor;\r\n"+
    "   float alpha = (vPosition.y-minHeight)/height;\r\n"+
    "   gl_FragColor = vec4(color,0.15+pow(alpha,0.5)*alpha*0.85);\r\n" +
    "}\r\n";
let mat = new ShaderMaterial("shader", scene, {
    vertex: "gradient",
    fragment: "gradient"
}, {
    attributes: ["normal", "position", 'uv'],
    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
    needAlphaBlending: true,
    needAlphaTesting: true
})
    let mainColor = Color3.FromHexString("#2c59a0");
    //设置主要的发光颜色
    mat.setColor3("mainColor",mainColor);
    const maxHeight = mesh.getBoundingInfo().boundingBox.maximumWorld.y
    const minHeight = mesh.getBoundingInfo().boundingBox.minimumWorld.y;
    mat.setFloat("maxHeight",maxHeight);
    mat.setFloat("minHeight",minHeight);
    return mat;
}



export function outSkinAlphaByMesh(scene: Scene, mesh: AbstractMesh, color: string | Color3, pow: number) {
    Effect.ShadersStore["customVertexShader"] = "\r\n" +
        "precision highp float;\r\n" +

        "//attribute\r\n" +
        "attribute vec3 position;\r\n" +
        "attribute vec2 uv;\r\n" +
        "attribute vec3 normal;\r\n" +


        "//uniform\r\n" +
        "uniform mat4 worldViewProjection;\r\n" +
        "//varying\r\n" +
        "varying vec3 vPosition;\r\n" +
        "varying vec2 vUV;\r\n" +

        "void main(void) {\r\n" +
        "   gl_Position = worldViewProjection*vec4(position,1.0);\r\n" +
        "   vPosition = position;\r\n" +
        "   vUV = uv;\r\n" +
        "}\r\n"
        ;
    Effect.ShadersStore["customFragmentShader"] = "\r\n" +
        "precision highp float;\r\n" +

        "varying vec3 vPosition;\r\n" +

        "uniform float distance;\r\n" +
        "uniform vec3 changeColor;\r\n" +
        "uniform vec3 center;\r\n" +
        "uniform float power;\r\n" +
        "uniform float k;\r\n" +

        "float distanceTwoVec3(vec3 p1,vec3 p2){\r\n" +
        "   float d = sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)+(p1.z-p2.z)*(p1.z-p2.z));\r\n" +
        "   return d;\r\n" +
        "}\r\n" +
        "void main(void) {\r\n" +
        "   float alpha = distanceTwoVec3(center,vPosition)*k/distance;\r\n" +
        "   gl_FragColor = vec4(changeColor,pow(alpha,power));\r\n" +
        "}\r\n";
    let mat = new ShaderMaterial("shader", scene, {
        vertex: "custom",
        fragment: "custom"
    }, {
        attributes: ["normals", "position", 'uv'],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
        needAlphaBlending: true,
        needAlphaTesting: true
    })

    const changeColor = color instanceof Color3 ? color : Color3.FromHexString(color as string);
    const alphaPow = pow ? pow : 2;
    const center = mesh.getBoundingInfo().boundingBox.center;
    const max = mesh.getBoundingInfo().boundingBox.maximum;
    const distance = Vector3.Distance(center, max);
    let k = 0.9;
    mat.setFloat("distance", distance);
    mat.setColor3("changeColor", changeColor as Color3);
    mat.setVector3("center", center);
    mat.setFloat("power", alphaPow);
    mat.setFloat("k", k)
    const uniforms: { name: string, uniform: any }[] = [];
    uniforms.push({ name: "power", uniform: alphaPow });
    uniforms.push({ name: "changeColor", uniform: changeColor });
    uniforms.push({ name: "k", uniform: k });
    return {
        mat,
        uniforms
    };
}

export function outSkinByMeshes(scene: Scene, meshesBoundingInfo: any, color: string | Color3) {
    Effect.ShadersStore["customVertexShader"] = "\r\n" +
        "precision lowp float;\r\n" +

        "//attribute\r\n" +
        "attribute vec3 position;\r\n" +
        "attribute vec2 uv;\r\n" +
        "attribute vec3 normal;\r\n" +



        "//uniform\r\n" +
        "uniform mat4 worldViewProjection;\r\n" +
        "//varying\r\n" +
        "varying vec3 vPosition;\r\n" +
        "varying vec2 vUV;\r\n" +

        "void main(void) {\r\n" +
        "   gl_Position = worldViewProjection*vec4(position,1.0);\r\n" +
        "   vPosition = position;\r\n" +
        "   vUV = uv;\r\n" +
        "}\r\n"
        ;
    Effect.ShadersStore["customFragmentShader"] = "\r\n" +
        "precision lowp float;\r\n" +

        "varying vec3 vPosition;\r\n" +

        "uniform float distance;\r\n" +
        "uniform vec3 changeColor;\r\n" +
        "uniform vec3 center;\r\n" +
        "float distanceTwoVec3(vec3 p1,vec3 p2){\r\n" +
        "   float d = sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)+(p1.z-p2.z)*(p1.z-p2.z));\r\n" +
        "   return d;\r\n" +
        "}\r\n" +
        "void main(void) {\r\n" +
        "   float alpha = distanceTwoVec3(center,vPosition)*1.0 /distance;\r\n" +
        "   gl_FragColor = vec4(changeColor,alpha*alpha*alpha);\r\n" +
        "}\r\n";
    let mat = new ShaderMaterial("shader", scene, {
        vertex: "custom",
        fragment: "custom"
    }, {
        attributes: ["normals", "position", 'uv'],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
        needAlphaBlending: true,
        needAlphaTesting: true
    })

    let changeColor: Color3;
    if (color instanceof Color3) {
        changeColor = color
    } else {
        changeColor = Color3.FromHexString(color);
    }

    let center = meshesBoundingInfo.center;
    let max = meshesBoundingInfo.max;
    let distance = Vector3.Distance(center, max);
    mat.setFloat("distance", distance);
    mat.setColor3("changeColor", changeColor);
    mat.setVector3("center", center);
    return mat;
}

export function outLineAlphaByMesh(scene: Scene, mesh: AbstractMesh, color: string | Color3, pow: number) {
    Effect.ShadersStore["customVertexShader"] = "\r\n" +
        "precision highp float;\r\n" +

        "//attribute\r\n" +
        "attribute vec3 position;\r\n" +
        "attribute vec2 uv;\r\n" +
        "attribute vec3 normal;\r\n" +

        "//uniform\r\n" +
        "uniform mat4 worldViewProjection;\r\n" +
        "//varying\r\n" +
        "varying vec3 vPosition;\r\n" +
        "varying vec2 vUV;\r\n" +
        "varying vec3 vNormal;\r\n" +

        "void main(void) {\r\n" +
        "   gl_Position = worldViewProjection*vec4(position,1.0);\r\n" +

        "   vPosition = position;\r\n" +
        "   vUV = uv;\r\n" +
        "   vNormal = normal;\r\n" +
        "}\r\n"
        ;
    Effect.ShadersStore["customFragmentShader"] = "\r\n" +
        "precision highp float;\r\n" +

        "varying vec3 vPosition;\r\n" +
        "varying vec3 vNormal;\r\n" +
        "uniform float distance;\r\n" +
        "uniform vec3 changeColor;\r\n" +

        "uniform vec3 center;\r\n" +
        "uniform float power;\r\n" +
        "uniform float k;\r\n" +
        "uniform vec3 viewPoint;\r\n" +
        "float distanceTwoVec3(vec3 p1,vec3 p2){\r\n" +
        "   float d = sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)+(p1.z-p2.z)*(p1.z-p2.z));\r\n" +
        "   return d;\r\n" +
        "}\r\n" +
        "void main(void) {\r\n" +
        "   float modelDot = abs(dot(viewPoint,vNormal)/(length(viewPoint)*length(vNormal)));\r\n" +
        "   float alpha = distanceTwoVec3(center,vPosition)*k /distance;\r\n" +
        "   vec3 color = changeColor;\r\n" +
        "   alpha = modelDot * pow(alpha,power);\r\n" +
        "   gl_FragColor = vec4(color,alpha);\r\n" +
        "}\r\n";
    let mat = new ShaderMaterial("shader", scene, {
        vertex: "custom",
        fragment: "custom"
    }, {
        attributes: ["normal", "position", 'uv'],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
        needAlphaBlending: true,
        needAlphaTesting: true
    })

    const changeColor = color instanceof Color3 ? color : Color3.FromHexString(color as string);
    const alphaPow = pow ? pow : 2.0;
    const center = mesh.getBoundingInfo().boundingBox.center;
    const max = mesh.getBoundingInfo().boundingBox.maximum;
    const distance = Vector3.Distance(center, max);
    const viewPoint = mat.getScene().activeCamera?.position.subtract(mesh.getBoundingInfo().boundingBox.center);

    let k = 0.9;
    mat.setFloat("distance", distance);
    mat.setColor3("changeColor", changeColor as Color3);
    mat.setVector3("center", center);
    mat.setFloat("power", alphaPow);
    mat.setFloat("k", k);
    mat.setVector3("viewPoint", viewPoint as Vector3);
    const uniforms: { name: string, uniform: any }[] = [];
    uniforms.push({ name: "power", uniform: alphaPow });
    uniforms.push({ name: "changeColor", uniform: changeColor });
    uniforms.push({ name: "k", uniform: k });
    const getClassName = () => {
        return "Shader";
    }
    return {
        mat,
        uniforms,
        getClassName
    };
}



