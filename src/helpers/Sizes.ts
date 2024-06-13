import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
	public width: number
	public height: number
	public pixelRatio: number
	public mouse: {
		x: number
		y: number
	}
	constructor() {
		super()

		// SET INITIAL SIZES
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)
		this.mouse = {
			x: 0,
			y: 0,
		}

		// RESIZE EVENT
		window.addEventListener('resize', this.onResize.bind(this))

		// MOUSE MOVE EVENT
		window.addEventListener('mousemove', (event: MouseEvent) =>
			this.onMouseMove(event)
		)
	}
	private onMouseMove(event: MouseEvent) {
		this.mouse.x = (event.clientX / this.width) * 2 - 1
		this.mouse.y = (event.clientY / this.width) * 2 + 1
	}

	private onResize(): void {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)

		this.emit('resize')
	}
}
