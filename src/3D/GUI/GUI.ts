import {
  Mesh,
  MeshBuilder,
  Scene,
} from "babylonjs";
import {
  AdvancedDynamicTexture,
  Control,
  Image,
  InputText,
  Rectangle,
  Style,
  TextBlock,
} from "babylonjs-gui";
export class GUI2d {
  public ADTexture: AdvancedDynamicTexture;
  public plane: Mesh;
  public scene: Scene;
  public texts: TextBlock[];
  public rectangle: Rectangle;
  public image: Image;
  public images:Image[];
  public otherControl:Control[];
  constructor(scene: Scene, mesh?: Mesh) {
    this.scene = scene;
    this.plane = this.initPlane(mesh);
    this.ADTexture = this.createAdvancedTexture(this.plane);
    this.rectangle = this.createRectangle();
    this.image = this.createImage()
    this.texts = [];
    this.images = [];
    this.otherControl = [];
    if(mesh&&mesh.metadata?.toTips){
      const {backgroundColor,imageSource,texts,images} = mesh.metadata.toTips as ItipInfo;
      this.rectangle.background = backgroundColor;
      this.image.source = imageSource;
      texts.forEach((textInfo)=>{
        this.createTextBlock(textInfo);
      })
      images.forEach((imageInfo)=>{
        this.createImage(imageInfo);
      })
    }else{
      this.createTextBlock({ text: "le5le", fontSize: "10%", height: "10%", width: "40%", left:"30%", top: 0+'%' });
      this.createTextBlock({ text: "Le5le", fontSize: "10%", height: "10%", width: "40%",  left:"30%",top: 20+'%' });
    }
    this.getProperty();
  }

  //创建一个默认plane
  createPlaneMesh(width: number, height: number) {
    let plane = MeshBuilder.CreatePlane("",{height:height,width:width},this.scene);
    return plane;
  }

  createAdvancedTexture(plane: Mesh) {
    let adT = AdvancedDynamicTexture.CreateForMesh(plane);
    adT.name = "adt" + plane.name;
    return adT;
  }

  initPlane(mesh?: Mesh, billboardMode?: number) {
    let billMode = billboardMode ? billboardMode : mesh?.billboardMode ? mesh?.billboardMode : 0;
    this.plane = mesh ? mesh : this.createPlaneMesh(20, 20);
    this, this.plane.id = "2D";
    this.plane.billboardMode = billMode;
    this.plane.metadata.billboardMode = billMode;
    return this.plane;
  }
  //创建背景长方形；
  createRectangle(color?: string) {
    let rectangle = new Rectangle("le5le_Rectangle" + this.plane.name);
    rectangle.thickness = 0;
    // rectangle.background = background;
    this.ADTexture.addControl(rectangle);
    return rectangle;
  }
  //创建背景图
  createImage(option?:IImageInfo) {
    let image:Image;
    if(option){
      image = new Image("le5le_Images_"+this.images.length + this.plane.name);
      this.ADTexture.addControl(image);
      image.moveToVector3(this.plane.position, this.scene);
      Object.keys(option).forEach((key)=>{
        image[key]  = option[key];
      })
      this.images.push(image);
      this.getProperty();
    }else{
      image = new Image("le5le_Image" + this.plane.name, "resources/image/alpha.png");
      this.ADTexture.addControl(image);
    }
    return image;
  }
  //创建文本框
  createTextBlock(
    option: ITextBlockInfo
  ) {
    let text = new TextBlock(
      "le5le_textBlock_" + this.texts.length + "_" + this.plane.name,
      option.text
    );
    this.ADTexture.addControl(text);
    text.moveToVector3(this.plane.position, this.scene);
    Object.keys(option).forEach((property) => {
      text[property] = option[property];
    });
    this.texts.push(text);
    return text;
  }

  getProperty() {
    this.plane.metadata.toTips = {
      imageSource: this.image.source,
      backgroundColor: this.rectangle.background,
      texts: [],
      images:[]
    };
    this.texts.forEach((text) => {
      text&&this.plane.metadata.toTips.texts.push({
        color: text.color,
        text: text.text,
        left: text.left,
        top: text.top,
        fontSize: text.fontSize,
        fontFamily: text.fontFamily,
        fontWeight: text.fontWeight,
        width: text.width,
        height: text.height,
        style:text.style,
      });
    });

    this.images.forEach((image) => {
      image&&this.plane.metadata.toTips.images.push({
        source:image.source,
        width:image.width,
        height:image.height,
        left:image.left,
        top:image.top,
      });
    });
    return JSON.parse(JSON.stringify(this.plane.metadata.toTips));
  }

  
  getContral(name: string) {
    return this.ADTexture.getControlByName(name);
  }

  addRectangle(option:{background?:string,width?:string|number,height?:string|number,left?:string|number,top?:string|number}) {
    let rectangle = new Rectangle("le5le_Rectangle"+this.otherControl.length+1 + this.plane.name);
    Object.keys(option).forEach((property)=>{
      rectangle[property] = option[property];
    })
    this.ADTexture.addControl(rectangle);
    this.otherControl.push(rectangle)
    return rectangle;
  }

  addImage(option:{source?:string,width?:string|number,height?:string|number,left?:string|number,top?:string|number}) {
    let image = new Image("le5le_Image"+this.otherControl.length+1 + this.plane.name);
    
    Object.keys(option).forEach((property)=>{
      image[property] = option[property];
    })
    this.ADTexture.addControl(image);
    this.otherControl.push(image);
    return image;
  }
  addInput(option?:Object){
    let image = new InputText("le5le_Image"+this.otherControl.length+1 + this.plane.name);
    
    Object.keys(option).forEach((property)=>{
      image[property] = option[property];
    })
    this.ADTexture.addControl(image);
    this.otherControl.push(image);
    return image;
  }
  addText(option?:Object){
    let image = new TextBlock("le5le_Image"+this.otherControl.length+1 + this.plane.name);
    
    Object.keys(option).forEach((property)=>{
      image[property] = option[property];
    })
    this.ADTexture.addControl(image);
    this.otherControl.push(image);
    return image;
  }
  dispose() {
    this.ADTexture?.dispose();
    this.rectangle?.dispose();
    this.image?.dispose();
    this.texts?.forEach((text)=>{
      text?.dispose();
    })
    this.texts.length = 0;

    this.images?.forEach((text)=>{
      text?.dispose();
    })
    this.images.length = 0;

    this.otherControl.forEach((control)=>{
      control?.dispose();
    })
    this.otherControl.length = 0;
  }
}
export interface ItipInfo {
  imageSource: string,
  backgroundColor: string
  texts: [],
  images:[]
}
export interface ITextBlockInfo {
  color?: string;
  text?: string;
  left?: string;
  top?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  width?: string;
  height?: string;
  style?:Style
}
export interface IImageInfo {
  source:string,
  width:string|number,
  height:string|number,
  left:string|number,
  top:string|number
}
export function getControlProperty(control:Control){
    if(control instanceof TextBlock){
      return {
        color: control.color,
        text: control.text,
        left: control.left,
        top: control.top,
        fontSize: control.fontSize,
        fontFamily: control.fontFamily,
        fontWeight: control.fontWeight,
        width: control.width,
        height: control.height,
        style:control.style,
      }
    }else if(control instanceof Image){
      return {
        source:control.source,
        width:control.width,
        height:control.height,
        left:control.left,
        top:control.top,
      }
    }
}
