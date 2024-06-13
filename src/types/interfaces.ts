import * as THREE from 'three'
import Camera from '@/components/camera/Camera'
import Renderer from '@/components/renderer/Renderer'
import { Resources } from '../helpers'
// import { GLTFLoader } from 'three/examples/jsm/Addons.js'
export interface EventListener {
	(eventName: string, callback: Function): void
}
export interface ISizes {
	width: number
	height: number
	pixelRatio: number
	mouse: {
		x: number
		y: number
	}
}
export interface ITime {
	stop(): void
}

export interface CameraProps {
	canvas: HTMLCanvasElement
	sizes: ISizes
}

export interface RendererProps {
	canvas: HTMLCanvasElement
	sizes: ISizes
	scene: THREE.Scene
	camera: THREE.Camera
}

export interface WorldProps {
	scene: THREE.Scene
	sizes: ISizes
	camera: any
	resources: any
}
export enum ResourceType {
	Texture,
	GLTFModel,
	CubeTexture,
}

export interface IResourceData {
	name: string
	type: ResourceType
	path: string | string[]
}

export interface IApp {
	sizes: ISizes
	time: ITime
	canvas: HTMLCanvasElement
	scene: THREE.Scene
	camera: Camera
	renderer: Renderer
	resources: Resources
	resize(): void
	update(): void
	destroy(): void
}

// export interface CameraProps {
// 	canvas: HTMLCanvasElement
// 	sizes: {
// 		width: number
// 		height: number
// 	}
// 	scene: THREE.Scene
// }

// export interface RendererProps {
// 	canvas: HTMLCanvasElement
// 	sizes: {
// 		width: number
// 		height: number
// 	}
// 	scene: THREE.Scene
// 	camera: THREE.PerspectiveCamera
// }

// export interface SourceProps {
// 	name: string
// 	type: 'gltfModel' | 'texture' | 'cubeTexture'
// 	path: string | string[]
// }

// export interface ResourcesProps {
// 	on(event: string, callback: () => void): void
// }
// export interface WorldProps {
// 	scene: THREE.Scene
// 	resources?: ResourcesProps
// }
// export interface EnvironmentProps {
// 	scene: THREE.Scene
// 	resources?: {
// 		items: {
// 			environmentMapTexture: THREE.Texture
// 		}
// 	}
// }

// export interface Loaders {
// 	gltfLoader: GLTFLoader
// 	textureLoader: THREE.TextureLoader
// 	cubeTextureLoader: THREE.CubeTextureLoader
// }
// export type LoadedResource = THREE.Group | THREE.Texture | THREE.CubeTexture
