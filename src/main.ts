import './style.css'
import * as THREE from 'three'
import { createCamera } from './three/camera'
import { createLight } from './three/lights'
import { createBoxMesh } from './three/meshes'
import { createOrbitControls } from './three/controls/Controls'

// SCENE
const scene = new THREE.Scene()
const camera = createCamera()
const light = createLight()
const boxMesh = createBoxMesh()

scene.add(camera)
scene.add(light)
scene.add(boxMesh)
// RENDERER AND CANVAS
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const canvas = document.getElementById('webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
// document.appendChild(renderer.domElement)

const controls = createOrbitControls(camera, renderer)

const animate = (): void => {
    requestAnimationFrame(animate)
    controls.update()

    boxMesh.rotation.x += 0.01
    boxMesh.rotation.y += 0.01

    renderer.render(scene, camera)
}

animate()
