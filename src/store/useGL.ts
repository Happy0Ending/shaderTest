import { ref } from "vue";

const intensity = ref(0);
const blurKernelSize = ref(0);

export function UseGl() {
    const getIntensity = () => {
        return { intensity: intensity.value };
    }
    const getBlurKernelSize = () => {
        return { blurKernelSize: blurKernelSize.value };
    }
    return {
        intensity,
        blurKernelSize,
        getIntensity,
        getBlurKernelSize
    }
}