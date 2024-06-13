import * as THREE from 'three'
import { IApp } from 'interfaces'

export class Overlay {
	private app: IApp
	private overlayMesh!: THREE.Mesh
	public material!: THREE.ShaderMaterial
	constructor(app: IApp) {
		this.app = app
		this.overlayMesh = new THREE.Mesh()

		this.setup()
		this.update()
	}

	private setup() {
		this.material = new THREE.ShaderMaterial({
			vertexShader: `
            void main(){
                gl_Position =  vec4(position, 1.0);

            }`,
			fragmentShader: `
            uniform float uAlpha;
            out vec4 outColor; 
            void main(){
                vec3 color = vec3(0.0, 0.0, 0.0);
                outColor = vec4(color, uAlpha);
            }`,
			glslVersion: THREE.GLSL3,
			uniforms: {
				uTime: { value: 0 },
				uAlpha: { value: 1 },
			},
			transparent: true,
		})
		const geometry = new THREE.PlaneGeometry(2, 2, 1, 1)

		this.overlayMesh = new THREE.Mesh(geometry, this.material)
		this.overlayMesh.name = 'Overlay'
		this.app.scene.add(this.overlayMesh)
	}
	public update() {}
}
