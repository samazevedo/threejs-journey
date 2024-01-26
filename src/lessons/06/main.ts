import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.getElementById('webgl6') as HTMLCanvasElement

// SIZES
const sizes: {
    width: number
    height: number
} = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
)
const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     0.01,
//     100
// )
camera.position.z = 3

////////////////
///  CURSOR ///
//////////////

const cursor = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', (event: MouseEvent) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

// RESIZE WINDOW VIEWPORT
window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // update camera
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()
    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// FULLSCREEN DOUBLE CLICK
window.addEventListener('dblclick', () => {
    // const fullscreenElement = document.fullscreenElement || document.webkitRequestFullscreen
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

// MESH
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
)

// CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// SCENE
const scene = new THREE.Scene()
scene.add(camera)
scene.add(box)

const animate = () => {
    renderer.render(scene, camera)

    // box.rotation.y += 0.01

    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 7
    camera.lookAt(box.position)

    controls.update()
    window.requestAnimationFrame(animate)
}

animate()
