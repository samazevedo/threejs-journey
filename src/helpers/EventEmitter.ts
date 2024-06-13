type EventListener = (...args: any[]) => void

export default class EventEmitter {
	private events: { [event: string]: EventListener[] } = {}

	public on(event: string, listener: EventListener): void {
		if (!this.events[event]) {
			this.events[event] = []
		}
		this.events[event].push(listener)
	}
	public emit(event: string, ...args: any[]): void {
		if (this.events[event]) {
			this.events[event].forEach((listener) => listener(...args))
		}
	}
	public off(event: string, listenerToRemove: EventListener): void {
		if (!this.events[event]) {
			return
		}
		this.events[event] = this.events[event].filter(
			(listener) => listener !== listenerToRemove
		)
	}
}
