import pitcherSvg1 from '../static/Pitcher1.svg'
import pitcherSvg2 from '../static/Pitcher2.svg'
import pitcherSvg3 from '../static/Pitcher3.svg'

// TIMING
let animating = false

// CONSTANTS
const pitchSpeed = 4000
const frameSpeed = 1500
const pitcher = document.getElementById('pitcher')
const batterBox = document.getElementById('batterBox')
const ball = document.getElementById('ball')
const setSvg1 = () => pitcher.src = pitcherSvg1
const setSvg2 = () => pitcher.src = pitcherSvg2
const setSvg3 = () => pitcher.src = pitcherSvg3

const timeout = (func, ms) => (
	new Promise((resolve) => (
		setTimeout(() => {
			func()
			resolve()
		}, ms)
	))
)

const ballThrow = () => {
	ball.style.display = 'block'
	ball.style.animationName = 'ballThrow'
	timeout(() => ball.style.display = 'none', 4000)
}

const pitch = async () => {
	if (animating === false) {
		animating = true
		batterBox.style.display = 'none'
		await timeout(setSvg2, frameSpeed)
		await timeout(setSvg3, frameSpeed)
		ballThrow()
		await timeout(setSvg1, frameSpeed)
		await timeout(() => {}, pitchSpeed - frameSpeed)
		animating = false
		batterBox.style.display = 'block'
	}
}

// LISTENERS
batterBox.addEventListener('click', pitch)

// START
pitcher.src = pitcherSvg1

