import { ref } from "vue";

const meshEdgesWidth = ref(1);

const meshEdgesColor = ref("#91f6fe");

export function IMeshEdge() {
    const getEdgesWidth = () => {
        return {
            edgesWidth: meshEdgesWidth.value
        };
    }
    const getEdgesColor = () => {
        return {
            edgesColor:meshEdgesColor.value
        }
    }
    return {
        getEdgesWidth,
        getEdgesColor,
        meshEdgesWidth,
        meshEdgesColor
    }
}