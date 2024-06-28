import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import vertex from "./vertex.glsl"
import fragment from "./fragment.glsl"

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
	camera.position.z = 10

	//////////////////////
	//      SIZES    //
	//////////////////////

	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight,
		pixelRatio: Math.min(window.devicePixelRatio, 2),
	}

	//////////////////////
	//      TEXTURES    //
	//////////////////////
	const textureLoader = new THREE.TextureLoader()
	const imageTexture = textureLoader.load("/images/flower2.png")
	imageTexture.colorSpace = THREE.SRGBColorSpace

	//////////////////////
	//   DISPLACEMENT   //
	//////////////////////

	const displacement: {
		canvas: HTMLCanvasElement
		context: CanvasRenderingContext2D | null
		image: HTMLImageElement
		plane: THREE.Mesh
		raycaster: THREE.Raycaster
		screenCursor: THREE.Vector2
		canvasCursor: THREE.Vector2
	} = {
		canvas: document.createElement("canvas"),
		context: null,
		image: new Image(),
		plane: new THREE.Mesh(
			new THREE.PlaneGeometry(10, 10),
			new THREE.MeshBasicMaterial({ color: "#A7E09A", wireframe: true })
		),
		raycaster: new THREE.Raycaster(),
		screenCursor: new THREE.Vector2(9999, 9999),
		canvasCursor: new THREE.Vector2(9999, 9999),
	}

	// 2D CANVAS => canvas same size as partticles
	// displacement.canvas = document.createElement("canvas")
	displacement.canvas.width = 128
	displacement.canvas.height = 128
	displacement.canvas.style.position = "fixed"
	displacement.canvas.style.width = "20rem"
	displacement.canvas.style.height = "20rem"
	displacement.canvas.style.top = "0"
	displacement.canvas.style.right = "0"
	displacement.canvas.style.zIndex = "100"
	document.body.appendChild(displacement.canvas)

	// CONTEXT
	displacement.context = displacement.canvas.getContext("2d")
	if (!displacement.context) return console.error("Failed to load context!")
	displacement.context.fillStyle = "#000"
	displacement.context?.fillRect(
		0,
		0,
		displacement.canvas.width,
		displacement.canvas.height
	)
	// displacement.image.onload = () => {
	// 	// get context
	// 	if (!displacement.context) return console.error("Failed to load context!")
	// 	displacement.context.drawImage(displacement.image, 20, 20, 32, 32)
	// 	displacement.image.src = "/images/glow.png"
	// }
	displacement.image.src = "/images/glow.png"
	// displacement.context.drawImage(displacement.image, 20, 20, 32, 32)

	console.log(displacement.image)
	displacement.image.onerror = () => console.error("Failed to load image!")

	// INTERACTIVE PLANE
	scene.add(displacement.plane)

	//////////////////////
	//      PARTICLES   //
	//////////////////////
	const particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128)

	const particlesMaterial = new THREE.RawShaderMaterial({
		vertexShader: vertex,
		fragmentShader: fragment,
		uniforms: {
			uResolution: {
				value: new THREE.Vector2(sizes.width, sizes.height),
			},
			uImageTexture: {
				value: imageTexture,
			},
		},
		glslVersion: THREE.GLSL3,
	})

	const particles = new THREE.Points(particlesGeometry, particlesMaterial)
	scene.add(particles)

	// RAYCASTER
	window.addEventListener("pointermove", (event) => {
		displacement.screenCursor.x = (event.clientX / sizes.width) * 2 - 1
		displacement.screenCursor.y = -(event.clientY / sizes.height) * 2 + 1
	})

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
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(sizes.pixelRatio)

	//////////////////////
	//      CONTROLS   //
	//////////////////////
	const controls = new OrbitControls(camera, renderer.domElement)

	const animate = () => {
		// raycaster
		displacement.raycaster.setFromCamera(displacement.screenCursor, camera)
		const intersections = displacement.raycaster.intersectObject(
			displacement.plane
		)

		if (intersections.length) {
			const uv = intersections[0].uv
			console.log(uv)
		}

		controls.update()
		renderer.render(scene, camera)

		requestAnimationFrame(animate)
		// camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02
		// camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02
	}

	animate()
}

window.addEventListener("DOMContentLoaded", APP)
