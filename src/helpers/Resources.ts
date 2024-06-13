import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import EventEmitter from './EventEmitter'
import { IResourceData, ResourceType } from '../types/interfaces'

export default class Resources extends EventEmitter {
	private resources = new Map<string, any>()
	private totalResources: number
	private loadedResources = 0
	private resourceData: IResourceData[]

	constructor(resourceData: IResourceData[]) {
		super()
		this.resourceData = resourceData
		this.totalResources = this.resourceData.length

		// Init LoadingManager
		this.initResources(this.resourceData)
	}

	private initResources(resourceData: IResourceData[]): void | null {
		// check if there's any resources
		if (resourceData.length > 0) {
			resourceData.forEach((resource) => {
				this.loadResource(resource)
			})
		} else {
			console.warn('NO RESOURCE DATA TO LOAD')
			this.emit('ready', this.totalResources)
		}
	}

	private loadResource(resourceData: IResourceData): void {
		let loader = null

		switch (resourceData.type) {
			case ResourceType.Texture: {
				loader = new THREE.TextureLoader()

				loader.load(
					resourceData.path as string,
					(file) => {
						this.resources.set(resourceData.name, file)
						this.resourceLoaded(resourceData, file)
					},
					undefined,
					(error) => {
						console.error('error loading texture', error)
					}
				)
				break
			}
			case ResourceType.GLTFModel: {
				loader = new GLTFLoader()
				loader.load(
					resourceData.path as string,
					(file) => {
						this.resources.set(resourceData.name, file)
						this.resourceLoaded(resourceData, file)
					},
					undefined,
					(error) => {
						console.error('error loading GLTFModel', error)
					}
				)
				break
			}
			case ResourceType.CubeTexture: {
				loader = new THREE.CubeTextureLoader()
				loader.load(
					resourceData.path as string[],
					(file) => {
						this.resources.set(resourceData.name, file)
						this.resourceLoaded(resourceData, file)
					},
					undefined,
					(error) => {
						console.error('error loading cubetexture', error)
					}
				)
				break
			}
		}
	}

	private resourceLoaded = (resourceData: IResourceData, file: any): void => {
		this.loadedResources++

		if (this.loadedResources === this.totalResources) {
			this.emit('ready', resourceData, file)
		}
	}

	public getResource(name: string): any {
		return this.resources.get(name)
	}
}
