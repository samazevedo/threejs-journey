import * as THREE from 'three'
import { MeshType } from '../../types'

export const createBoxMesh = (): MeshType => {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    return new THREE.Mesh(geometry, material)
}
