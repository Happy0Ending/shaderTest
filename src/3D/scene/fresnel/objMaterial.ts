import { Color3, FresnelParameters, Nullable, RegisterClass, Scene, StandardMaterial, SceneLoader, Material, Texture, Mesh, PBRMaterial, BaseTexture } from "@babylonjs/core";
import "@babylonjs/loaders"
export class FresnelMaterial extends StandardMaterial {
  private _fresnel: FresnelParameters = new FresnelParameters();

  public set bias(value: number) {
    this._fresnel.bias = value;
  }
  public get bias() {
    return this._fresnel.bias;
  }

  public set power(value: number) {
    this._fresnel.power = value;
  }
  public get power() {
    return this._fresnel.power;
  }

  public set leftColor(color: Color3) {
    this._fresnel.leftColor = color;
  }
  public get leftColor() {
    return this._fresnel.leftColor;
  }

  public set rightColor(color: Color3) {
    this._fresnel.rightColor = color;
  }

  public get rightColor() {
    return this._fresnel.rightColor;
  }

  public set isEnabled(isEnabled: boolean) {
    this._fresnel.isEnabled = isEnabled
  }
  
  public get isEnabled() {
    return this._fresnel.isEnabled;
  }

  constructor(name: string, scene: Scene) {
    super(name, scene);
    this._fresnel = new FresnelParameters();
    this.diffuseFresnelParameters = this._fresnel;
    this.emissiveFresnelParameters = this._fresnel;
    this.opacityFresnelParameters = this._fresnel;
    this._fresnel.bias = 0.25;
    this._fresnel.power = 1;
    this._fresnel.leftColor = Color3.FromHexString("#00A8FF");

    this._fresnel.rightColor = Color3.FromArray([0.1,0.1,0.1]);
    
    // this.linkEmissiveWithDiffuse = true;
    
    // this.emissiveFresnelParameters = new FresnelParameters();
    
    // this.emissiveFresnelParameters.bias = 0.35;
    
    // this.emissiveFresnelParameters.power = 1;

    // this.emissiveFresnelParameters.leftColor = Color3.FromHexString("#00A8FF");
    // this.diffuseFresnelParameters = new FresnelParameters();
    // this.diffuseFresnelParameters.bias = 0.35;
    // this.diffuseFresnelParameters.power = 1;

    // this.diffuseFresnelParameters.leftColor = Color3.FromHexString("#00A8FF");
    // this.emissiveFresnelParameters.rightColor = Color3.FromArray([0.1, 0.1, 0.1]);

    // this.opacityFresnelParameters = new FresnelParameters();
    // this.opacityFresnelParameters.power = 0.25;
    // this.opacityFresnelParameters.bias = 1;
    // this.opacityFresnelParameters.leftColor = Color3.FromHexString("#00A8FF");
    // this.opacityFresnelParameters.rightColor = Color3.White();
  }
}

export const fresnelLoader = (name: string, root: string, file: string, scene: Scene) => {
  SceneLoader.ImportMesh(name, root, file, scene, (meshes, p, s, a, t, g, l) => {
    let matMap: Map<Material, { diffuseTexture?: BaseTexture, emissiveTexture?: BaseTexture, meshList?: Mesh[] }> = new Map();

    meshes.forEach((mesh) => {
      if (!(mesh instanceof Mesh)) return;
      if (mesh.material && mesh.material instanceof PBRMaterial) {
        if (!matMap.get(mesh.material)) {
          matMap.set(mesh.material, {});
        }

        let mapObj = matMap.get(mesh.material);
        if (mesh.material.albedoTexture) {
          mapObj!.diffuseTexture = mesh.material.albedoTexture
        }

        if (mesh.material.emissiveTexture) {
          mapObj!.emissiveTexture = mesh.material.emissiveTexture
        }
        console.log(mapObj?.meshList)
        if (!(mapObj?.meshList)) {
          mapObj!.meshList = [];
        }
        mapObj!.meshList.push(mesh);

      }
    })
    console.log("map", matMap);
    matMap.forEach((mat, key) => {
      let fresnelMat = new FresnelMaterial(Math.random() * 500 + "", scene);
      fresnelMat.linkEmissiveWithDiffuse = true;
      fresnelMat.emissiveTexture = mat.diffuseTexture ?? null;
      // fresnelMat.emissiveTexture = mat.emissiveTexture ?? null;
      key.dispose();
      mat.meshList?.forEach((mesh) => {
        mesh.material = fresnelMat
      })
    })

  })
}








RegisterClass("BABYLON.FresnelMaterial", FresnelMaterial);