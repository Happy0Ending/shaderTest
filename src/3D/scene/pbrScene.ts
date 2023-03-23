import { ArcRotateCamera, Color4, Engine, HemisphericLight, MeshBuilder, Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import { gradientMat } from "../shader";
import { JSONDATA } from "./jsons";

export function pbrScene(engine: Engine, canvas: HTMLCanvasElement) {
    let scene = new Scene(engine);

    scene.clearColor = new Color4(0, 0, 0, 1)
    let camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, Math.PI,
        Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.lowerRadiusLimit = 2;
    let light = new HemisphericLight('light', new Vector3(0, 100, 0), scene);

    const box2 = MeshBuilder.CreateBox("Box2");
    box2.position.z += 8
    box2.material = null;
    SceneLoader.ImportMesh("","","subway.glb",scene,(mesh)=>{
        
    })
    // console.time("GLTFToBase64");
    // let ss = encode(JSONDATA)
    // console.timeEnd("GLTFToBase64")
    // console.time("gltfStr");
    // let gltfStr = decode(ss);
    // console.log(gltfStr), gltfStr
    // console.timeEnd("gltfStr");
    // scene.createDefaultEnvironment();
// 
    let file = new File([gltfStr], "scene.gltf");
    // console.log('file', file);
    // SceneLoader.ImportMesh("", "", file, scene);
    // let a = evalRPN(["4","13","5","/","+"]);
    // console.log("aaaa",a)

    

let b = evalRPN(["4","-2","/","2","-3","-","-"]);
console.log("bbbb",b)
    return scene
}
function encode(str: string) {
    // 对字符串进行编码
    var encode = encodeURI(str);
    // 对编码的字符串转化base64
    var base64 = btoa(encode);
    return base64;
}
function decode(base64: string) {
    // 对base64转编码
    var decode = atob(base64);
    // 编码转字符串
    var str = decodeURI(decode);
    return str;
}
function evalRPN(tokens: string[]): number {
    if (tokens.length <= 3) {
        let num3 = 0;
        if (tokens[2] == "+") {
            num3 = Number(tokens[0]) + Number(tokens[1]);
        } else if (tokens[2] == "-") {
            num3 = Number(tokens[0]) - Number(tokens[1]);
        } else if (tokens[2] == "*") {
            num3 = Number(tokens[0]) * Number(tokens[1]);
        } else if (tokens[2] == "/") {
            num3 = Math.floor(Number(tokens[0]) / Number(tokens[1]));
        } else {
            num3 += Number(tokens[0]);
        }
        return num3
    }
    let num = 0;
    let result = devideTokens(tokens);
    console.log("devideTokens", result);
    if (tokens[tokens.length - 1] == "+") {
        if (!isNumber(result.left)) {
            num = evalRPN(result.left) + Number(result.right[0])
        } else {
            num = evalRPN(result.right) + Number(result.left[0])
        }
    } else if (tokens[tokens.length - 1] == "-") {
        if (!isNumber(result.left)) {
            num = evalRPN(result.left) - Number(result.right[0])
        } else {
            num = Number(result.left[0]) - evalRPN(result.right);
        }
    } else if (tokens[tokens.length - 1] == "*") {
        if (!isNumber(result.left)) {
            num = evalRPN(result.left) * Number(result.right[0])
        } else {
            num = Number(result.left[0]) * evalRPN(result.right);
        }
    } else if (tokens[tokens.length - 1] == "/") {
        if (!isNumber(result.left)) {
            let temp = evalRPN(result.left) / Number(result.right[0]);
           num = Math.trunc(temp);

        } else {
            let temp = Number(result.left[0]) / evalRPN(result.right);
            num = Math.trunc(temp);
        }
    }
    console.log("num",num)
    return num;
};
function isNumber(s: string[]) {
    if (s[s.length - 1] == "+" || s[s.length - 1] == "-" || s[s.length - 1] == "*" || s[s.length - 1] == "/") {
        return false;
    } else {
        return true;
    }
}
function devideTokens(tokens: string[]) {
    console.log("[tokens[tokens.length - 1]]", [tokens[tokens.length - 1]])
    let flag = isNumber([tokens[tokens.length - 2]]);
    let result: { left: string[], right: string[] } = {
        left: [],
        right: []
    }
    if (flag) {
        result.right.push(tokens[tokens.length - 2]);
        let leftLength= tokens.length - 2;
        if(isNumber([tokens[tokens.length - 3]]))
            result.right.push(tokens[tokens.length - 2])
            leftLength-=1;
        }
        for (let i = 0; i < tokens.length - 2; i++) {
            result.left.push(tokens[i]);
        }
    } else {
        result.left = [tokens[0]];
        for (let i = 1; i <= tokens.length - 2; i++) {
            result.right.push(tokens[i]);
        }
    }
    return result;
}