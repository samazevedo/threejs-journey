import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons'
import { IApp } from '@/types/interfaces'

export default class Camera {
	private camera: THREE.PerspectiveCamera
	private canvas: HTMLCanvasElement
	private aspectRatio: number
	private controls!: OrbitControls

	constructor(private app: IApp) {
		this.app = app
		this.canvas = this.app.canvas
		this.aspectRatio = this.app.sizes.width / this.app.sizes.height

		this.camera = new THREE.PerspectiveCamera(75, this.aspectRatio, 0.1, 100)
		this.camera.position.z = 3

		this.createControl()
	}

	private createControl(): void {
		this.controls = new OrbitControls(this.camera, this.canvas)
		this.controls.enableDamping = true
	}

	public resize(): void {
		this.aspectRatio = this.app.sizes.width / this.app.sizes.height
		this.camera.aspect = this.aspectRatio
		this.camera.updateProjectionMatrix()
	}

	public update(): void {
		this.controls.update()
	}

	public getCamera(): THREE.PerspectiveCamera {
		return this.camera
	}
}
