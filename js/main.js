import pitcherSvg1 from '../static/Pitcher1.svg'
import pitcherSvg2 from '../static/Pitcher2.svg'
import pitcherSvg3 from '../static/Pitcher3.svg'

// ANIMATION & TIMING
let animating = false
let hit = false

let translateY = 0
const yTarget = 20
let scale = 1
const scaleTarget = 80

// CONSTANTS
const pitchSpeed = 3000
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

// @TODO Find a way to target actual refresh rate
const targetMod = target => (target / (pitchSpeed / 1000) / 60)

const pitch = () => (
	requestAnimationFrame(() => {
		if (!hit) {
			scale += targetMod(scaleTarget)
			translateY += targetMod(yTarget)
			ball.style.transform = `scale(${scale}) translateY(${translateY}px)`
			pitch()
		} else {
			ball.style.display = 'none'
		}
	})
)

const ballVisible = () => {
	ball.style.display = 'block'
	ball.style.cursor = 'pointer'
	pitch()
}

const runPitchAnimation = async () => {
	if (animating === false) {
		hit = false
		animating = true
		batterBox.style.display = 'none'
		await timeout(setSvg2, frameSpeed)
		await timeout(setSvg3, frameSpeed)
		ballVisible()
		setTimeout(setSvg1, frameSpeed)
		await timeout(
			() => ball.style.display = 'none', 
			pitchSpeed
		)
		animating = false
		batterBox.style.display = 'block'
	}
}

const homerun = () => hit = true

// LISTENERS
batterBox.addEventListener('click', runPitchAnimation)
ball.addEventListener('click', homerun)

// START
pitcher.src = pitcherSvg1

