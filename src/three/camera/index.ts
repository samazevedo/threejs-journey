import * as THREE from 'three'
import { CameraType } from '../../types'

export const createCamera = (): CameraType => {
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.z = 5
    return camera
}
