import * as THREE from 'three'
import { IApp } from '@/types/interfaces'

export default class Renderer {
	private renderer: THREE.WebGLRenderer
	private context: WebGLRenderingContext

	public constructor(private app: IApp) {
		this.app = app
		this.context = this.app.canvas.getContext('webgl2') as WebGLRenderingContext

		if (!this.context) {
			throw new Error('WebGL is not supported')
		}

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.app.canvas,
			antialias: true,
			context: this.app.canvas.getContext('webgl2')!,
		})

		this.setupRenderer()
	}

	private setupRenderer(): void {
		this.renderer.setClearColor('#2D2F30')
		this.renderer.setSize(this.app.sizes.width, this.app.sizes.height)
		this.renderer.setPixelRatio(this.app.sizes.pixelRatio)
	}

	public resize(): void {
		this.renderer.setSize(this.app.sizes.width, this.app.sizes.height)
		this.renderer.setPixelRatio(this.app.sizes.pixelRatio)
	}

	public update(): void {
		this.renderer.render(this.app.scene, this.app.camera.getCamera())
	}
}
