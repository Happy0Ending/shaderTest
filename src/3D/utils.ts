export function toArray<t>(obj:t|t[]){
    if(obj instanceof Array){
        return obj
    }else{
        return [obj];
    }
}