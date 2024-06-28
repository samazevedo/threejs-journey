import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FontLoader } from "three/examples/jsm/Addons"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

const APP = () => {
	const canvas = document.querySelector(".webgl")

	if (!canvas) {
		throw new Error("Failed to load canvas!")
	}

	const scene = new THREE.Scene()
	//////////////////////
	//      CAMERA    //
	//////////////////////
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	)
	camera.position.z = 3

	//////////////////////
	//      TEXTURES    //
	//////////////////////
	const textureLoader = new THREE.TextureLoader()
	const greenTexture = textureLoader.load("/assets/matcaps/green2.png")
	const perlTexture = textureLoader.load("/assets/matcaps/perl2.png")
	const purpleTexture = textureLoader.load("/assets/matcaps/purple.png")

	greenTexture.colorSpace = THREE.SRGBColorSpace

	//////////////////////
	//      FONTS    //
	//////////////////////
	const fontLoader = new FontLoader()
	// resource URL
	fontLoader.load(
		"/fonts/philosopher/regular.json",

		// onLoad callback
		(font) => {
			console.log(font)
			const geometry = new TextGeometry("Sam", {
				font,
				size: 0.5,
				height: 0.2,
				curveSegments: 3,
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.02,
				bevelOffset: 0,
				bevelSegments: 3,
			})
			// geometry.center()

			// axis helper
			const axesHelper = new THREE.AxesHelper(2)
			scene.add(axesHelper)

			// using bounding box to center text
			// geometry.computeBoundingBox()
			// geometry.translate(
			// 	-(geometry.boundingBox!.max.x - 0.2) * 0.5,
			// 	-(geometry.boundingBox!.max.y - 0.2) * 0.5,
			// 	(-geometry.boundingBox!.max.z - 0.3) * 0.5
			// )

			// using center() to center text
			geometry.center()

			// material
			const material = new THREE.MeshMatcapMaterial({
				// color: "#92F64B",
				// transparent: true,
				matcap: perlTexture,
				// opacity: 0.6,
			})

			const mesh = new THREE.Mesh(geometry, material)
			scene.add(mesh)
		},

		// onProgress callback
		(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
		},

		// onError callback
		(error) => {
			console.log(error)
		}
	)

	//////////////////////
	//      OBJS    //
	//////////////////////
	console.time("OBJs")
	const geometry = new THREE.TorusGeometry(0.3, 0.2, 10, 30)
	const geometry2 = new THREE.OctahedronGeometry(0.3, 0)
	const materialGreen = new THREE.MeshMatcapMaterial({
		matcap: greenTexture,
	})

	const materialPurple = new THREE.MeshMatcapMaterial({
		matcap: purpleTexture,
	})
	for (let i = 0; i < 100; i++) {
		const mesh = new THREE.Mesh(
			i % 2 === 0 ? geometry : geometry2,
			i % 2 === 0 ? materialGreen : materialPurple
		)
		mesh.position.x = (Math.random() - 0.5) * 10
		mesh.position.y = (Math.random() - 0.5) * 10
		mesh.position.z = (Math.random() - 0.5) * 10

		mesh.rotation.x = Math.random() * 2 * Math.PI
		mesh.rotation.y = Math.random() * 2 * Math.PI

		const scale = Math.random()
		mesh.scale.set(scale, scale, scale)

		scene.add(mesh)
	}
	console.timeEnd("OBJs")

	//////////////////////
	//      LIGHTS    //
	//////////////////////

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
	scene.add(ambientLight)

	const pointLight = new THREE.PointLight(0xffffff, 0.5)
	pointLight.position.x = 2
	pointLight.position.y = 3
	pointLight.position.z = 4
	scene.add(pointLight)
	//////////////////////
	//      RESIZE    //
	//////////////////////

	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	}
	window.addEventListener("resize", onWindowResize)

	//////////////////////
	//      MOUSEMOVE    //
	//////////////////////

	let mouse = { x: 0, y: 0 }
	const onMouseMove = (event: MouseEvent) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
	}
	// move camera with mouse
	window.addEventListener("mousemove", onMouseMove)

	//////////////////////
	//      RENDERER    //
	//////////////////////
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: false,
	})
	renderer.setSize(window.innerWidth, window.innerHeight)

	//////////////////////
	//      CONTROLS   //
	//////////////////////
	const controls = new OrbitControls(camera, renderer.domElement)

	const animate = () => {
		requestAnimationFrame(animate)

		controls.update()
		renderer.render(scene, camera)

		camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02
		camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02
	}

	animate()
}

window.addEventListener("DOMContentLoaded", APP)
