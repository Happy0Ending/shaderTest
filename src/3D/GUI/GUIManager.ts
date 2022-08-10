import { Animation, ArcRotateCamera, InputBlock, Mesh, Observer, PickingInfo, Vector3 } from "babylonjs";
import { AdvancedDynamicTexture, CheckboxGroup, Control, Image, InputText, Rectangle, SelectionPanel, SelectorGroup, StackPanel, TextBlock } from "babylonjs-gui";

import { SceneManager } from "../scene";
import { getControlProperty, GUI2d } from "./GUI";

export class GUI2dManager {
    public GUIMap: Map<string, GUI2d>
    public manager: SceneManager;
    public ADTexture: AdvancedDynamicTexture;
    public isDelete = false;
    public _deleteControl: Control;
    public textGUI: Control;
    public imageGUI: Control;
    public set activeControl(value: Control) {

        if (value) {
            this._deleteControl = value;
        }
        console.log(value)
        if (value instanceof TextBlock) {
            console.log("text")
            this.textGUI && this.ADTexture.addControl(this.textGUI);
            this.imageGUI && this.ADTexture.removeControl(this.imageGUI);

        } else if (value instanceof Image) {
            console.log("image");
            this.textGUI && this.ADTexture.removeControl(this.textGUI);
            this.imageGUI && this.ADTexture.addControl(this.imageGUI);
        }
    }

    constructor(manager: SceneManager) {
        this.manager = manager;
        this.GUIMap = new Map();
        !manager.root.running && (this.ADTexture = AdvancedDynamicTexture.CreateFullscreenUI("guiManager", true, this.manager.scene));
    }

    /**
     * 创建一个新的GUI2dM面板
     * @param mesh 指定一个特殊的mesh，默认将创建一个 10x10 plane
     * @param running 当前场景是编辑还是运行状态；
     * @returns gui2d
     */
    createGUI2d(mesh?: Mesh, running?: boolean) {
        let gui2d = new GUI2d(this.manager.scene, mesh);
        this.GUIMap.set(gui2d.plane.name, gui2d);
        gui2d.plane.onDispose = () => {
            gui2d?.dispose();
            this.GUIMap.delete(gui2d.plane.name);
        }
        if (!running) {
            this.addObserver(gui2d);
            this.textGUI = this.addChangeTextObserable();
            this.imageGUI = this.addChangeImageObserable();
            // this.ADTexture.addControl(changePanel);
        }
        return gui2d;
    }
    // 获取GUI目前的最新属性；
    getGUI2dInfo(name: string) {
        let gui2d = this.GUIMap.get(name);
        return gui2d.getProperty();
    }
    /**
     * 根据mesh 获取GUI对象
     * @param mesh 
     * @returns 
     */
    getGui2d(mesh: Mesh | string): null | GUI2d {
        let name: string;
        if (mesh instanceof Mesh)
            name = mesh.name;
        else
            name = mesh;
        return this.GUIMap.get(name);
    }

    dispose() {
        this.GUIMap.forEach(gui =>
            gui?.dispose()
        )
        this.GUIMap.clear();
    }
    addObserver(gui2d: GUI2d) {
        const addRec: Image = gui2d.addImage({ source: "resources/image/text.jpg", width: '5%', height: '5%', left: '-20%', top: "35%" });
        const deleteRec: Image = gui2d.addImage({ source: "resources/image/delete.png", width: '5%', height: '5%', left: '47.5%%', top: "47.5%" });
        const addPic: Image = gui2d.addImage({ source: "resources/image/picture.png", width: '5%', height: '5%', left: '-25%', top: "35%" });
        // let isRunning:boolean = true;
        gui2d.ADTexture.addControl(deleteRec);
        gui2d.ADTexture.addControl(addRec);
        deleteRec.onPointerEnterObservable.add(() => {
            this.isDelete = true;
        })
        deleteRec.onPointerOutObservable.add(() => {
            this.isDelete = false;
        })
        gui2d.texts.forEach((text) => {
            this.addTextBlockObserable(gui2d, text);
        })
        addRec.onPointerClickObservable.add(() => {
            let text = gui2d.createTextBlock({ text: "文本内容", fontSize: "10%", height: "10%", width: "40%", left: "0%", top: gui2d.texts.length % 100 + '%' });
            this.addTextBlockObserable(gui2d, text);
            gui2d.ADTexture.removeControl(deleteRec);
            gui2d.ADTexture.removeControl(addRec);
            gui2d.ADTexture.addControl(deleteRec);
            gui2d.ADTexture.addControl(addRec);

        });
        addPic.onPointerClickObservable.add(() => {
            let image = gui2d.createImage({ source: "resources/image/logo.png", height: "0.4", width: "0.4", left: "45%", top: gui2d.images.length % 50 + '%' });
            this.addTextBlockObserable(gui2d, image);
            gui2d.ADTexture.removeControl(deleteRec);
            gui2d.ADTexture.removeControl(addRec);
            gui2d.ADTexture.addControl(deleteRec);
            gui2d.ADTexture.addControl(addRec);
        })

    }
    addTextBlockObserable(gui2d: GUI2d, text: Control) {

        let imageObserver: Observer<any>;
        let textObserver: Observer<any>;
        let observer: Observer<any>;
        let color: string;
        text.onPointerClickObservable.add(() => {
            this.adjustCameraView(gui2d.plane);
        })
        text.onPointerDownObservable.add(() => {

            this.activeControl = text;
            gui2d.scene.activeCamera.detachControl();
            const oldValue = getControlProperty(text);
            let result: PickingInfo;
            let i = 0;
            observer = gui2d.scene.onBeforeCameraRenderObservable.add(() => {
                result = gui2d.scene.pick(
                    gui2d.scene.pointerX,
                    gui2d.scene.pointerY,
                    (mesh) => mesh === gui2d.plane
                );
                if (result && result.pickedPoint && i > 4) {
                    text.moveToVector3(result.pickedPoint, gui2d.scene);
                    // let lt = vec3ToScreenXY(result.pickedPoint,gui2d.scene)
                    // text.left = lt.x;
                    // text.top = lt.y;
                    // console.log(text.left,text.top);
                    // console.log(vec3ToScreenXY(result.pickedPoint,gui2d.scene));
                }
                i++;
            });

            imageObserver = gui2d.image.onPointerClickObservable.add(() => {
                //点击图片 将重新赋予
                gui2d.scene.activeCamera.attachControl();
                gui2d.scene.onBeforeCameraRenderObservable.remove(observer);
                gui2d.image.onPointerUpObservable.remove(imageObserver);
                //防止右键 gui2d.plane 跟着相机移动；
                gui2d.plane.position = new Vector3(
                    gui2d.plane.position.x,
                    gui2d.plane.position.y,
                    gui2d.plane.position.z
                );
                // gui2d.activeTextblock = null;
                i = 0;
                console.log(text.left,text.top);
                if (this.isDelete) {
                    if (this.activeControl instanceof TextBlock) {
                        let index = gui2d.texts.findIndex(item => item == text);
                        if (index != -1) {
                            gui2d.texts.splice(index, 1);
                        }
                    } else {
                        let index = gui2d.images.findIndex(item => item == text);
                        if (index != -1) {
                            gui2d.images.splice(index, 1);
                        }
                    }
                    this._deleteControl.dispose()
                    this.activeControl = null;
                }
                gui2d.getProperty();
            });

            textObserver = text.onPointerUpObservable.add(() => {
                text.color = color;
                gui2d.scene.activeCamera.attachControl();
                gui2d.scene.onBeforeCameraRenderObservable.remove(observer);
                text.onPointerUpObservable.remove(textObserver);
                //防止右键 gui2d.plane 跟着相机移动；
                gui2d.plane.position = new Vector3(
                    gui2d.plane.position.x,
                    gui2d.plane.position.y,
                    gui2d.plane.position.z
                );
                i = 0;
                console.log(text.left,text.top);
                if (this.isDelete) {
                    if (this.activeControl instanceof TextBlock) {
                        let index = gui2d.texts.findIndex(item => item == text);
                        if (index != -1) {
                            gui2d.texts.splice(index, 1);
                        }
                    } else {
                        let index = gui2d.images.findIndex(item => item == text);
                        if (index != -1) {
                            gui2d.images.splice(index, 1);
                        }
                    }
                    this.activeControl = null;
                    this._deleteControl.dispose()
                }
                gui2d.getProperty();
            });
        });
    }
    adjustCameraView(plane: Mesh) {
        let boundingBox = plane.getBoundingInfo().boundingBox.extendSizeWorld;
        let length = Vector3.Distance(boundingBox, Vector3.Zero()) * 12 / 7;
        let camera = plane.getScene().activeCamera as ArcRotateCamera;
        camera._initialFocalDistance;

        const startPosition = camera.position;
        const endPosition = plane.position.add(
            Vector3.Normalize(plane.getFacetNormal(1)).scale(length)
        );
        let cameraMoveTarget = new Animation("move", "position", 60, Animation.ANIMATIONTYPE_VECTOR3,
            Animation.ANIMATIONLOOPMODE_CONSTANT);
        const keyFrames = [];
        keyFrames.push({
            frame: 0,
            value: startPosition,
        });
        keyFrames.push({
            frame: 30,
            value: endPosition,
        });
        cameraMoveTarget.setKeys(keyFrames);
        let cameraLookTarget = new Animation("move", "target", 60, Animation.ANIMATIONTYPE_VECTOR3,
            Animation.ANIMATIONLOOPMODE_CONSTANT);
        const keyFrames2 = [];
        keyFrames2.push({
            frame: 0,
            value: camera.target,
        });
        keyFrames2.push({
            frame: 30,
            value: plane.position,
        });
        cameraLookTarget.setKeys(keyFrames2);
        this.manager.scene.beginDirectAnimation(camera, [cameraMoveTarget, cameraLookTarget], 0, 30, false);
    }

    addPointUpObservable(gui2d: GUI2d, observer: Observer<any>, imageObserver: Observer<any>, i: number, text: Control) {
        gui2d.image.onPointerClickObservable.add(() => {
            //点击图片 将重新赋予
            gui2d.scene.activeCamera.attachControl();
            gui2d.scene.onBeforeCameraRenderObservable.remove(observer);
            gui2d.image.onPointerUpObservable.remove(imageObserver);
            //防止右键 gui2d.plane 跟着相机移动；
            gui2d.plane.position = new Vector3(
                gui2d.plane.position.x,
                gui2d.plane.position.y,
                gui2d.plane.position.z
            );
            // gui2d.activeTextblock = null;
            i = 0
            if (this.isDelete) {
                if (this.activeControl instanceof TextBlock) {
                    let index = gui2d.texts.findIndex(item => item == text);
                    if (index != -1) {
                        gui2d.texts.splice(index, 1);
                    }
                } else {
                    let index = gui2d.images.findIndex(item => item == text);
                    if (index != -1) {
                        gui2d.images.splice(index, 1);
                    }
                }
                this._deleteControl.dispose()
                this.activeControl = null;
            }
            gui2d.getProperty();
        });


    }
    addChangeTextObserable() {
        let selectBox = new SelectionPanel("changePlane");
        let fontSizeGUI = this.addChangeOption("fontSize", "-45%");
        selectBox.addControl(fontSizeGUI);

        let fontTextGUI = this.addChangeOption("text", "-35%");
        selectBox.addControl(fontTextGUI);

        let fontleftGUI = this.addChangeOption("left", "-25%");
        selectBox.addControl(fontleftGUI);

        let fontTopGUI = this.addChangeOption("top", "-15%");
        selectBox.addControl(fontTopGUI);

        let fontColorGUI = this.addChangeOption("color", "-5%");
        selectBox.addControl(fontColorGUI);

        let fontFamilyGUI = this.addChangeOption("fontFamily", "5%");
        selectBox.addControl(fontFamilyGUI);
        let fontWeightGUI = this.addChangeOption("fontWeight", "15%");
        selectBox.addControl(fontWeightGUI);

        let fontWidthGUI = this.addChangeOption("width", "25%");
        selectBox.addControl(fontWidthGUI);

        let fontHeigthGUI = this.addChangeOption("height", "35%");
        selectBox.addControl(fontHeigthGUI);

        let fontStyleGUI = this.addChangeOption("fontStyle", "45%");
        selectBox.addControl(fontStyleGUI);
        selectBox.width = 0.25;
        selectBox.height = 0.45;
        selectBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        selectBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        /* Change Color Scheme  */
        selectBox.color = "blue";
        selectBox.background = "#FFFF99";
        selectBox.barColor = "#4F7DF2";
        selectBox.headerColor = "blue";
        selectBox.buttonColor = "orange";
        selectBox.buttonBackground = "#684502";
        return selectBox;
    }

    addChangeImageObserable() {
        let selectBox = new SelectionPanel("changePlane");


        let fontleftGUI = this.addChangeOption("left", "-25%");
        selectBox.addControl(fontleftGUI);

        let imageSource = this.addChangeOption("source", "0%");
        selectBox.addControl(imageSource);


        let fontTopGUI = this.addChangeOption("top", "-15%");
        selectBox.addControl(fontTopGUI);

        let fontWidthGUI = this.addChangeOption("width", "25%");
        selectBox.addControl(fontWidthGUI);

        let fontHeigthGUI = this.addChangeOption("height", "35%");
        selectBox.addControl(fontHeigthGUI);

        selectBox.width = 0.25;
        selectBox.height = 0.45;
        selectBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        selectBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        /* Change Color Scheme  */
        selectBox.color = "blue";
        selectBox.background = "#FFFF99";
        selectBox.barColor = "#4F7DF2";
        selectBox.headerColor = "blue";
        selectBox.buttonColor = "orange";
        selectBox.buttonBackground = "#684502";
        return selectBox;
    }

    addChangeOption(option: string, top: number | string) {
        let rectangle = new Rectangle(option);
        rectangle.background = "pink";
        // rectangle.horizontalAlignment = 0;
        // rectangle.verticalAlignment = 0;
        rectangle.height = 0.1;
        rectangle.top = top;
        let text = new TextBlock(option);
        text.width = 0.5;
        text.text = option;
        text.color = "white";
        text.horizontalAlignment = 0;
        text.verticalAlignment = 0;
        text.fontSize = "80%";
        rectangle.addControl(text);
        // inputText.

        let inputText = new InputText(option);
        // let slider = new Slider("123");
        // slider.maximum = 1;
        // slider.minimum = 0;
        // slider.step = 0.1;
        // slider.onValueChangedObservable.add((data => {
        //     console.log(data);
        // })  )
        // text.text = option;
        // text.horizontalAlignment = 0;
        inputText.verticalAlignment = 2;
        rectangle.addControl(inputText);
        inputText.horizontalAlignment = 1;
        inputText.verticalAlignment = 0;
        inputText.width = 0.5;
        inputText.color = "white";
        inputText.fontSize = "80%";
        if (option == "text") {
            let input = document.createElement('input');
            document.body.appendChild(input);
            input.type = "text";
            input.style.position = "absolute";
            input.style.left = inputText.left as string;
            input.style.top = inputText.top as string;
            // input.onCh

        }
        inputText.onKeyboardEventProcessedObservable.add((input) => {
            if (input.key == "Enter") {
                if (this._deleteControl) {
                    this._deleteControl[option] = inputText.text;
                    this.GUIMap.get(this.activeControl?.linkedMesh?.name) && this.GUIMap.get(this.activeControl?.linkedMesh?.name).getProperty();
                }
            }

        })


        return rectangle
    }
}
