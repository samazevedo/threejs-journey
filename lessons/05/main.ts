import * as THREE from 'three'
import gsap from 'gsap'

const canvas = document.getElementById('webgl5') as HTMLCanvasElement

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// CAMERA
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)
camera.position.z = 7

// MESH
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
)

// SCENE
const scene = new THREE.Scene()

scene.add(box)

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

//TIME
let time = Date.now()

//CLOCK
const clock = new THREE.Clock()

gsap.to(box.position, {
    x: 2,
    duration: 1,
    delay: 1,
})

gsap.to(box.position, {
    y: -2,
    duration: 1,
    delay: 1,
})
gsap.to(box.position, {
    z: 2,
    duration: 1,
    delay: 1,
})

// ANIMATION
const animate = () => {
    // TIME
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // console.log(deltaTime)

    const elapsedTime = clock.getElapsedTime()

    //MESH
    // box.rotation.x = elapsedTime * Math.PI * 2
    // box.rotation.y = elapsedTime * Math.PI * 2

    // box.position.y = Math.sin(elapsedTime)
    // box.position.x = Math.cos(elapsedTime)

    // camera.position.x = Math.sin(elapsedTime)
    // camera.position.y = Math.sin(elapsedTime)
    // camera.lookAt(box.position)

    // RENDER
    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)
}

animate()
