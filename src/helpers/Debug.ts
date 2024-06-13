import * as dat from 'dat.gui'

export default class Debug {
	private active: boolean
	public ui!: dat.GUI
	constructor() {
		this.active = window.location.hash === '#debug'
		if (this.active) {
			this.ui = new dat.GUI()
		}
	}
}
