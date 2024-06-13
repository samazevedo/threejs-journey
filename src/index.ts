import './scss/style.scss'
import APP from './app/App'

window.addEventListener('DOMContentLoaded', () => {
	const canvasElement = document.querySelector('canvas') as HTMLCanvasElement
	if (!canvasElement) return console.error('Failed to load canvas!')

	APP.getInstance(canvasElement)
})
