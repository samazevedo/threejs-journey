// 07 -  FULLSCREEN AND RESIZING
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.getElementById('webgl7') as HTMLCanvasElement

// SIZES
const sizes: {
    width: number
    height: number
} = {
    width: window.innerWidth,
    height: window.innerHeight,
}
window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // update the renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    // const fullscreenElement = document.fullscreenElement || document.webkitRequestFullscreen
    if (!document.fullscreenElement) {
        console.log('go fullscreem')
        canvas.requestFullscreen()
    } else {
        console.log('exit fullscreem')
        document.exitFullscreen()
    }
})

// CAMERA
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 3

// MESH
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
)

// CONTROLS
const controls = new OrbitControls(camera, canvas)
// controls.enabled = false
controls.enableDamping = true

// SCENE
const scene = new THREE.Scene()

scene.add(camera)
scene.add(box)

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const animate = () => {
    renderer.render(scene, camera)
    controls.update()
    window.requestAnimationFrame(animate)
}
animate()
