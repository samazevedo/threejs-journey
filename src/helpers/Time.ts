import { ITime } from '../types/interfaces'
import EventEmitter from './EventEmitter'

export default class Time extends EventEmitter implements ITime {
	private start: number
	private current: number
	private elapsed: number
	private delta: number
	private rafId: number | null // keep track of the requestAnimationFrame ID

	constructor() {
		super()
		this.start = performance.now()
		this.current = this.start
		this.elapsed = 0
		this.delta = 16 // assuming 60fps frame rate (approx. 1000ms/60 ≈ 16ms per frame)

		this.animate = this.animate.bind(this)
		this.rafId = window.requestAnimationFrame(this.animate)
	}

	private animate(): void {
		const currentTime = performance.now()
		this.delta = currentTime - this.current
		this.elapsed = currentTime - this.start
		this.current = currentTime

		this.emit('animate', this.elapsed, this.delta)
		this.rafId = window.requestAnimationFrame(this.animate)
	}

	public stop(): void {
		if (this.rafId !== null) {
			window.cancelAnimationFrame(this.rafId)
			this.rafId = null
		}
	}
}
