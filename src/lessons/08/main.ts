import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// CANVAS
const canvas = document.getElementById('webgl8') as HTMLCanvasElement

// SIZES
const sizes: { width: number; height: number } = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const fov = 45
const aspect = sizes.width / sizes.height
const near = 0.2
const far = 200

window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
window.addEventListener('dbclick', () => {
    if (!document.fullscreenElement) canvas.requestFullscreen()
    else document.exitFullscreen()
})

// CAMERA
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 3

// CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/// FLOAT32 ARRAY
const posiitonsArray = new Float32Array(9)

posiitonsArray[0] = 0
posiitonsArray[1] = 0
posiitonsArray[2] = 0

posiitonsArray[3] = 0
posiitonsArray[4] = 1
posiitonsArray[5] = 0

posiitonsArray[6] = 1
posiitonsArray[7] = 0
posiitonsArray[8] = 0

// const positionArray2 = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0])

const positionAttribute = new THREE.BufferAttribute(posiitonsArray, 3)
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionAttribute)

/// MESH
const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
})

const obj = new THREE.Mesh(geometry, material)

// SCENE
const scene = new THREE.Scene()
scene.add(obj)

scene.add(camera)

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const Animate = () => {
    obj.rotation.y += 0.02
    renderer.render(scene, camera)
    controls.update()
    window.requestAnimationFrame(Animate)
}

Animate()
