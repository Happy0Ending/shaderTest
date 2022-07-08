export interface IPropertyData {
   
}
export interface IEdges extends IPropertyData{ edgesWidth?: number, edgesColor?: string }

export interface IshaderMatInfo extends IPropertyData{type?:string,name?:string,value?:string|number};