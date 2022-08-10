import { Camera, Matrix, Mesh, Scene, StandardMaterial } from "babylonjs";

class CSS3DRenderer {
    public cache: any;
    public domElement: HTMLElement;
    public cameraElement: HTMLElement;
    public width: number | undefined;
    public height: number | undefined;
    public widthHalf: number | undefined;
    public heightHalf: number | undefined;
    constructor() {
        var matrix = new Matrix()

        this.cache = {
            camera: { fov: 0, style: '' },
            objects: new WeakMap()
        }

        var domElement = document.createElement('div')
        domElement.style.overflow = 'hidden'

        this.domElement = domElement
        this.cameraElement = document.createElement('div')

        // this.isIE = true;

        this.cameraElement.style.webkitTransformStyle = 'preserve-3d'
        this.cameraElement.style.transformStyle = 'preserve-3d'

        // this.cameraElement.style.pointerEvents = 'none'

        domElement.appendChild(this.cameraElement)
    }

    getSize() {
        return {
            width: this.width,
            height: this.height
        }
    }

    setSize(width:number, height:number) {
        this.width = width
        this.height = height
        this.widthHalf = this.width / 2
        this.heightHalf = this.height / 2

        this.domElement.style.width = width + 'px'
        this.domElement.style.height = height + 'px'

        this.cameraElement.style.width = width + 'px'
        this.cameraElement.style.height = height + 'px'
    }

    epsilon(value:number) {
        return Math.abs(value) < 1e-10 ? 0 : value
    }

    getCameraCSSMatrix(matrix:Matrix) {
        var elements = matrix.m

        return 'matrix3d(' +
            this.epsilon(elements[0]) + ',' +
            this.epsilon(- elements[1]) + ',' +
            this.epsilon(elements[2]) + ',' +
            this.epsilon(elements[3]) + ',' +
            this.epsilon(elements[4]) + ',' +
            this.epsilon(- elements[5]) + ',' +
            this.epsilon(elements[6]) + ',' +
            this.epsilon(elements[7]) + ',' +
            this.epsilon(elements[8]) + ',' +
            this.epsilon(- elements[9]) + ',' +
            this.epsilon(elements[10]) + ',' +
            this.epsilon(elements[11]) + ',' +
            this.epsilon(elements[12]) + ',' +
            this.epsilon(- elements[13]) + ',' +
            this.epsilon(elements[14]) + ',' +
            this.epsilon(elements[15]) +
            ')'
    }

    getObjectCSSMatrix(matrix:Matrix, cameraMatrix:string) {
        var elements = matrix.m;
        var matrix3d = 'matrix3d(' +
            this.epsilon(elements[0]) + ',' +
            this.epsilon(elements[1]) + ',' +
            this.epsilon(elements[2]) + ',' +
            this.epsilon(elements[3]) + ',' +
            this.epsilon(- elements[4]) + ',' +
            this.epsilon(- elements[5]) + ',' +
            this.epsilon(- elements[6]) + ',' +
            this.epsilon(- elements[7]) + ',' +
            this.epsilon(elements[8]) + ',' +
            this.epsilon(elements[9]) + ',' +
            this.epsilon(elements[10]) + ',' +
            this.epsilon(elements[11]) + ',' +
            this.epsilon(elements[12]) + ',' +
            this.epsilon(elements[13]) + ',' +
            this.epsilon(elements[14]) + ',' +
            this.epsilon(elements[15]) +
            ')'

        return 'translate(-50%,-50%)' + matrix3d
    }

    renderObject(object:any, scene:Scene, camera:Camera, cameraCSSMatrix:string) {
        if (object instanceof CSS3DObject) {
            var style
            var objectMatrixWorld = object.getWorldMatrix().clone()
            var camMatrix = camera.getWorldMatrix()
            var innerMatrix = objectMatrixWorld.m as Float32Array;

            // Set scaling
            const youtubeVideoWidth = 4.8
            const youtubeVideoHeight = 3.6

            innerMatrix[0] *= 0.01 / youtubeVideoWidth
            innerMatrix[2] *= 0.01 / youtubeVideoWidth
            innerMatrix[5] *= 0.01 / youtubeVideoHeight

            // Set position from camera
            innerMatrix[12] = -camMatrix.m[12] + object.position.x
            innerMatrix[13] = -camMatrix.m[13] + object.position.y
            innerMatrix[14] = camMatrix.m[14] - object.position.z
            innerMatrix[15] = camMatrix.m[15] * 0.00001

            objectMatrixWorld = Matrix.FromArray(innerMatrix)

            style = this.getObjectCSSMatrix(objectMatrixWorld, cameraCSSMatrix)
            var element = object.element
            var cachedObject = this.cache.objects.get(object)

            if (cachedObject === undefined || cachedObject.style !== style) {

                element.style.webkitTransform = style
                element.style.transform = style

                var objectData = { style: style }

                this.cache.objects.set(object, objectData)
            }
            if (element.parentNode !== this.cameraElement) {
                this.cameraElement.appendChild(element)
            }

        } else if (object instanceof Scene) {
            for (var i = 0, l = object.meshes.length; i < l; i++) {
                this.renderObject(object.meshes[i], scene, camera, cameraCSSMatrix)
            }
        }
    }

    render(scene:Scene, camera:Camera) {
        var projectionMatrix = camera.getProjectionMatrix()
        var fov = projectionMatrix.m[5] * <number>this.heightHalf;

        if (this.cache.camera.fov !== fov) {

            if (camera.mode == Camera.PERSPECTIVE_CAMERA) {
                this.domElement.style.webkitPerspective = fov + 'px'
                this.domElement.style.perspective = fov + 'px'
            } else {
                this.domElement.style.webkitPerspective = ''
                this.domElement.style.perspective = ''
            }
            this.cache.camera.fov = fov
        }

        if (camera.parent === null) camera.computeWorldMatrix()

        var matrixWorld = camera.getWorldMatrix().clone()
        var rotation = matrixWorld.clone().getRotationMatrix().transpose()
        var innerMatrix = matrixWorld.m as Float32Array;

        innerMatrix[1] = rotation.m[1]
        innerMatrix[2] = -rotation.m[2]
        innerMatrix[4] = -rotation.m[4]
        innerMatrix[6] = -rotation.m[6]
        innerMatrix[8] = -rotation.m[8]
        innerMatrix[9] = -rotation.m[9]

        matrixWorld = Matrix.FromArray(innerMatrix)

        var cameraCSSMatrix = 'translateZ(' + fov + 'px)' + this.getCameraCSSMatrix(matrixWorld)

        var style = cameraCSSMatrix + 'translate(' + this.widthHalf + 'px,' + this.heightHalf + 'px)'

        if (this.cache.camera.style !== style) {
            this.cameraElement.style.webkitTransform = style
            this.cameraElement.style.transform = style
            this.cache.camera.style = style
        }

        this.renderObject(scene, scene, camera, cameraCSSMatrix)
    }
}

class CSS3DObject extends Mesh {
    public element: HTMLElement;
    constructor(element: HTMLElement, scene: Scene) {
        super("CSS3DMESH", scene);
        this.element = element
        this.element.style.position = 'absolute'
        this.element.style.pointerEvents = 'auto'
    }
}


export function setupRenderer(canvas: HTMLCanvasElement) {
    let container = document.createElement('div')
    container.id = 'css-container'
    container.style.position = 'absolute'
    container.style.width = '100%'
    container.style.height = '100%'
    container.style.zIndex = '1';
    container.style.pointerEvents = "none"

    let canvasZone = canvas.parentElement as HTMLElement;
    canvasZone.insertBefore(container, canvasZone.firstChild)

    let renderer = new CSS3DRenderer()
    container.appendChild(renderer.domElement)
    renderer.setSize(canvasZone.offsetWidth, canvasZone.offsetHeight)

    window.addEventListener('resize', e => {
        renderer.setSize(canvasZone.offsetWidth, canvasZone.offsetHeight)
    })
    return renderer
}

export function createCSSobject(mesh: Mesh, scene: Scene, src: string, renderer: CSS3DRenderer) {
    let width = 1920;
    let height = 1080;
    scene.onBeforeRenderObservable.add(() => {
        renderer.render(scene, scene.activeCamera as Camera)
    })
    var div = document.createElement('div');
    
    div.style.width = width + 'px'
    div.style.height = height + 'px'
    var CSSobject = new CSS3DObject(div, scene)
    CSSobject.position.copyFrom(mesh.getAbsolutePosition())
    CSSobject.rotation.y = -mesh.rotation.y
    CSSobject.scaling.copyFrom(mesh.scaling)

    var iframe = document.createElement('iframe')
    // iframe.id = 'video-' + videoID
    iframe.style.width = width + 'px'
    iframe.style.height = height + 'px'
    iframe.style.border = '0px'
    // iframe.allow = 'autoplay'
    iframe.src = src;
    div.appendChild(iframe)
}

export function createMaskingScreen(maskMesh: Mesh, scene: Scene) {
    let depthMask = new StandardMaterial('matDepthMask', scene)
    depthMask.backFaceCulling = false
    maskMesh.material = depthMask
    const engine = scene.getEngine();
    maskMesh.onBeforeRenderObservable.add(() => engine.setColorWrite(false))
    maskMesh.onAfterRenderObservable.add(() => engine.setColorWrite(true))
    // swap meshes to put mask first
    var mask_index = scene.meshes.indexOf(maskMesh)
    scene.meshes[mask_index] = scene.meshes[0]
    scene.meshes[0] = maskMesh
}
/**
 * 为场景添加一个iframe 并使得Iframe跟着场景旋转缩放位移
 * @param node 一个mesh 需要给定一个位置 缩放 角度等；
 * @param canvas engine绘画的canvas，这个canvas 需要有个父类；
 * @param src iframe的src 属性 对应嵌入的 网页网址
 */
export function createHtmlMesh(node:Mesh,canvas:HTMLCanvasElement,src:string) {
    let renderer = setupRenderer(canvas);
    createCSSobject(node as Mesh, node.getScene(), src, renderer);
    createMaskingScreen(node as Mesh, node.getScene());
}
