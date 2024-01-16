import * as THREE from 'three'
import { LightType } from '../../types'

export const createLight = (): LightType => {
    const light = new THREE.DirectionalLight(0xffffff, 1.0)
    light.position.set(5, 5, 5)
    return light
}
