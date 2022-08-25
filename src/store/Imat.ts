import { ref } from "vue";


const pow = ref(1.0);
const k = ref(0.9);
const color = ref("#91f6fe");
export function Imat(){
    const getPow = ()=>{
       return {type:"float",name:"power",value:pow.value};
    }
    const getK = ()=>{
        return {type:"float",name:"k",value:k.value};
     }
     const getColor = ()=>{
        return {type:"Color3",name:"changeColor",value:color.value};
     }
    return {
        pow,
        k,
        color,
        getPow,
        getK,
        getColor
    }
}