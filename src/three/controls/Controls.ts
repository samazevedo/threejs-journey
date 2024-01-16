import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { CameraType, RendererType, ControlType } from '../../types'

export const createOrbitControls = (
    camera: CameraType,
    renderer: RendererType
): ControlType => {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    return controls
}
