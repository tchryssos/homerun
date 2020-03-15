import pitcherSvg1 from '../static/Pitcher1.svg'
import pitcherSvg2 from '../static/Pitcher2.svg'
import pitcherSvg3 from '../static/Pitcher3.svg'

// ANIMATION & TIMING
let isAnimating = false
let isHit = false
let pitchTime
const fps = 60 // @TODO Find a way to target actual refresh rate
const pitchSpeed = 3000
const frameSpeed = 1500
const hitSpeed = 6000

let translateY = 0
let hitY
const pitchYTarget = 20
const hitYTarget = -40

let translateX = 0
const hitXTarget = 90

let scale = 1
let hitScale
const pitchScaleTarget = 80
const hitScaleTarget = 0.5

// ELEMENTS
const pitcher = document.getElementById('pitcher')
const batterBox = document.getElementById('batterBox')
const ball = document.getElementById('ball')
const setSvg1 = () => pitcher.src = pitcherSvg1
const setSvg2 = () => pitcher.src = pitcherSvg2
const setSvg3 = () => pitcher.src = pitcherSvg3

// ANIMATION FUNCTIONS
const timeout = (func, ms) => (
	new Promise((resolve) => (
		setTimeout(() => {
			func()
			resolve()
		}, ms)
	))
)

const endPitchCycle = async () => {
	await timeout(
		() => ball.style.display = 'none', 
		pitchSpeed
	)
	isAnimating = false
	batterBox.style.display = 'block'
}

const targetMod = (target, speed) => (target / (pitchSpeed / 1000) / fps)

const hit = () => {
	requestAnimationFrame(() => {
		translateY += targetMod(hitYTarget - hitY, hitSpeed)
		ball.style.transform = `scale(${scale}) translateY(${translateY}px)`
		hit()
		// translateX = translateX + (hitSpeed / fps)
		// scale = scale - (hitSpeed / fps)
	})
}

const pitch = () => (
	requestAnimationFrame(() => {
		if (!isHit) {
			if (Date.now() - pitchTime >= pitchSpeed) {
				ball.style.display = 'none'
				return
			}
			scale += targetMod(pitchScaleTarget, pitchSpeed)
			console.log(scale)
			translateY += targetMod(pitchYTarget, pitchSpeed)
			ball.style.transform = `scale(${scale}) translateY(${translateY}px)`
			pitch()
		} else {
			hit()
		}
	})
)

const ballVisible = () => {
	ball.style.display = 'block'
	ball.style.cursor = 'pointer'
	pitchTime = Date.now()
	pitch()
}

const runPitchAnimation = async () => {
	if (isAnimating === false) {
		isHit = false
		isAnimating = true
		batterBox.style.display = 'none'
		await timeout(setSvg2, frameSpeed)
		await timeout(setSvg3, frameSpeed)
		ballVisible()
		setTimeout(setSvg1, frameSpeed)
		if (!hit) {
			endPitchCycle()
		}
	}
}

const homerun = () => {
	isHit = true
	hitY = translateY
	hitScale = scale
}

// LISTENERS
batterBox.addEventListener('click', runPitchAnimation)
ball.addEventListener('click', homerun)

// START
pitcher.src = pitcherSvg1

