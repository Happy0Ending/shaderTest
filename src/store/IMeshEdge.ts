import { ref } from "vue";

const meshEdgesWidth = ref(0);

const meshEdgesColor = ref("")

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