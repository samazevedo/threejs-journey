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
	// CANVAS TEXTURE
	const displacementcanvas = document.createElement("canvas")
	const canvasTexture = new THREE.CanvasTexture(displacementcanvas)

	const displacement: {
		canvas: HTMLCanvasElement
		context: CanvasRenderingContext2D | null
		image: HTMLImageElement
		plane: THREE.Mesh
		raycaster: THREE.Raycaster
		screenCursor: THREE.Vector2
		canvasCursor: THREE.Vector2
		canvasCursorPrev: THREE.Vector2
		texture: THREE.CanvasTexture | null
	} = {
		canvas: displacementcanvas,
		context: null,
		image: new Image(),
		plane: new THREE.Mesh(
			new THREE.PlaneGeometry(10, 10),
			new THREE.MeshBasicMaterial({ color: "#A7E09A", side: THREE.DoubleSide })
		),
		raycaster: new THREE.Raycaster(),
		screenCursor: new THREE.Vector2(9999, 9999),
		canvasCursor: new THREE.Vector2(9999, 9999),
		canvasCursorPrev: new THREE.Vector2(9999, 9999),
		texture: canvasTexture,
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
	displacement.context.fillStyle = "#0A0A0A"
	displacement.context?.fillRect(
		0,
		0,
		displacement.canvas.width,
		displacement.canvas.height
	)

	// HANDLE IMAGE LOADING
	displacement.image.onload = () => {
		if (displacement.context) {
			displacement.context.drawImage(displacement.image, 20, 20, 32, 32)
		} else {
			console.error("Failed to load image!")
		}
	}
	displacement.image.onerror = () => console.error("Failed to load image!")
	displacement.image.src = "/images/glow.png"

	// displacement.context.drawImage(displacement.image, 20, 20, 32, 32)

	// INTERACTIVE PLANE
	scene.add(displacement.plane)
	displacement.plane.visible = false

	//////////////////////
	//      PARTICLES   //
	//////////////////////
	const particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128)
	const intensityArray = new Float32Array(
		particlesGeometry.attributes.position.count
	)
	const angleArray = new Float32Array(
		particlesGeometry.attributes.position.count
	)
	for (let i = 0; i < intensityArray.length; i++) {
		intensityArray[i] = Math.random()
		angleArray[i] = Math.random() * Math.PI * 2
	}

	particlesGeometry.setAttribute(
		"aIntensity",
		new THREE.BufferAttribute(intensityArray, 1)
	)
	particlesGeometry.setAttribute(
		"aAngle",
		new THREE.BufferAttribute(intensityArray, 1)
	)
	particlesGeometry.setIndex(null)
	particlesGeometry.deleteAttribute("normal")

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
			uDisplacementTexture: {
				value: displacement.texture,
			},
		},
		glslVersion: THREE.GLSL3,
		// blending: THREE.AdditiveBlending,
		transparent: true,
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
		if (!displacement.context) return console.error("Failed to load context!")
		// raycaster
		displacement.raycaster.setFromCamera(displacement.screenCursor, camera)
		const intersections = displacement.raycaster.intersectObject(
			displacement.plane
		)

		if (intersections.length) {
			const uv = intersections[0].uv
			if (!uv) return console.error("Failed to load uv!")
			displacement.canvasCursor.x = uv.x * displacement.canvas.width
			displacement.canvasCursor.y = (1 - uv.y) * displacement.canvas.height
		}

		// displacement
		displacement.context.globalCompositeOperation = "source-over"
		displacement.context.globalAlpha = 0.02
		displacement.context.fillRect(
			0,
			0,
			displacement.canvas.width,
			displacement.canvas.height
		)

		// speed alpha
		const cursorDistance = displacement.canvasCursorPrev.distanceTo(
			displacement.canvasCursor
		)
		displacement.canvasCursorPrev.copy(displacement.canvasCursor)
		const alpha = Math.min(cursorDistance * 0.1, 1)

		const glowSize = displacement.canvas.width * 0.25
		displacement.context.globalCompositeOperation = "lighten"
		displacement.context.globalAlpha = alpha

		displacement.context?.drawImage(
			displacement.image,
			displacement.canvasCursor.x - glowSize * 0.5,
			displacement.canvasCursor.y - glowSize * 0.5,
			glowSize,
			glowSize
		)
		// texture
		displacement.texture!.needsUpdate = true

		controls.update()
		renderer.render(scene, camera)

		requestAnimationFrame(animate)
		// camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02
		// camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02
	}

	animate()
}

window.addEventListener("DOMContentLoaded", APP)
