import { IApp } from '@/types/interfaces'
import { Box } from '@/components/box/Box'
import { Overlay } from '@/components/overlay/Overlay'

export default class World {
	private box!: Box
	public overlay!: Overlay
	public app: IApp

	constructor(app: IApp) {
		this.app = app

		this.setup()
	}
	private setup(): void {
		// initialize components once resources are loaded
		this.box = new Box(this.app)
		this.overlay = new Overlay(this.app)
	}
	public update(): void {
		// this.box?.update()
	}
}
