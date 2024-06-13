import * as THREE from 'three'
import { IApp } from '@/types/interfaces'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

export class Box {
	private image!: HTMLImageElement
	private texture!: THREE.Texture

	constructor(private app: IApp) {
		this.app = app

		this.image = new Image()
		this.texture = this.app.resources.getResource('door') as THREE.Texture
		this.texture.colorSpace = THREE.SRGBColorSpace
		this.texture.repeat.set(0.1, 0.1)
		// this.texture.wrapS = THREE.RepeatWrapping
		// this.texture.wrapT = THREE.RepeatWrapping
		console.log(this.texture)
		this.setup()
	}

	private setup(): void {
		const geometry = new THREE.SphereGeometry(1, 12, 32)
		const material = new THREE.ShaderMaterial({
			vertexShader: vertex,
			fragmentShader: fragment,
			glslVersion: THREE.GLSL3,
			uniforms: {
				uTime: { value: 0 },
				uTexture: { value: this.texture },
			},
		})

		this.app.scene.add(new THREE.Mesh(geometry, material))
	}

	public update(): void {}
}
