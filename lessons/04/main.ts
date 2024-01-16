import * as THREE from 'three'

const canvas = document.getElementById('webgl4') as HTMLCanvasElement
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// CAMERA

const fov = 75 // Camera frustum vertical field of view.
const aspect = sizes.width / sizes.height //Camera frustum aspect ratio.
const near = 1 // Camera frustum near plane.
const far = 100 // camera frustum far plane.

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 3
camera.position.y = 0.3
camera.position.x = 0.3

// MESH OBJECT = geometry + material
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// mesh position
mesh.position.x = 0.7
mesh.position.y = 2
mesh.position.z = 0.3
// mesh.position.set(x,y,z)
mesh.position.normalize()

// mesh scale
mesh.scale.x = 2
mesh.scale.y = 0.3
mesh.scale.z = 0.4

//mesh rotation
mesh.rotation.y = Math.PI * 0.7
mesh.rotation.x = Math.PI * 0.3

const group = new THREE.Group()

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ffff })
)
group.add(cube1)
group.add(cube2)
group.add(cube3)

cube1.position.x = 1.5
cube2.position.x = -1.5

// Axes Helper
const axesHelper = new THREE.AxesHelper()

// LOOKAT
// camera.lookAt(new THREE.Vector3(2, 0, 0))
// camera.lookAt(mesh.position)

// SCENE
const scene = new THREE.Scene()

scene.add(camera)
// scene.add(mesh)
scene.add(axesHelper)
scene.add(group)

// RENDERER

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
