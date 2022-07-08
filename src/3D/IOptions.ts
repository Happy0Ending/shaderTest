import { IPropertyData } from "./IProperty"

export interface IOptions{
    target:any// 操作的对象
    type:string //操作的属性
    value:IPropertyData //修改的值
}