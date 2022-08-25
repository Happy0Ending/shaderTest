import { ref } from "vue";

const intensity = ref(1.0);
const blurKernelSize = ref(32);

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