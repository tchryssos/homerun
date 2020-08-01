import pitcherSvg1 from '/static/Pitcher1.svg'
import pitcherSvg2 from '/static/Pitcher2.svg'
import pitcherSvg3 from '/static/Pitcher3.svg'
import strikeMp3 from '/static/strike.mp3'

// START - CONFIG CONSTANTS - START
const fps = 60 // @TODO Find a way to target actual refresh rate
const pitchSpeed = 3000
const frameSpeed = 1500
const hitSpeed = 3000

const pitchYTarget = 20
const hitYTarget = -300

const hitXTarget = 90

const pitchScaleTarget = 80
const hitScaleTarget = 0.5
// END - CONFIG CONSTANTS - END


// START - STATEFUL STUFF - START
let isAnimating = false
let isHit = false
let pitchTime
let hitTime

let translateY = 0
let hitY
let translateX = 0
let scale = 1
let hitScale
// END - STATEFUL STUFF - END


// START - UTIL FUNCTIONS - START
export const timeout = (func, ms) => (
	new Promise((resolve) => (
		setTimeout(() => {
			func()
			resolve()
		}, ms)
	))
)

export const getTargetFrameMod = (target, speed, mod = 1) => (
	((target / (speed / 1000) / fps)) * mod
)
// END - UTIL FUNCTIONS - END


// START - ELEMENTS - START
const pitcher = document.getElementById('pitcher')
const batterBox = document.getElementById('batterBox')
const ball = document.getElementById('ball')
const strike = 'strike'
const textBox = document.getElementById('text-box')
const setSvg1 = () => pitcher.src = pitcherSvg1
const setSvg2 = () => pitcher.src = pitcherSvg2
const setSvg3 = () => pitcher.src = pitcherSvg3
const strikeAudio = new Audio(strikeMp3)
// END - ELEMENTS - END


// START - ANIMATION HELPERS - START
const endPitchCycle = async () => {
	await timeout(
		() => ball.style.display = 'none', 
		pitchSpeed
	)
	isAnimating = false
	batterBox.style.display = 'block'
	translateY = 0
	translateX = 0
	scale = 1
}

const ballVisible = () => {
	ball.style.display = 'block'
	ball.style.cursor = 'pointer'
	pitchTime = Date.now()
	pitch()
}

const homerun = () => {
	ball.style.cursor = 'default'
	if (!isHit) {
		isHit = true
		hitTime = Date.now()
		hitY = translateY
		hitScale = scale
	}
}

const toggleText = (childId, bool) => {
	const el = document.getElementById(childId)
	const bgColor = bool ? 'rgba(0, 0, 0, 0.7' : 'transparent'
	const elDisplay = bool ? 'block' : 'none'

	textBox.style.backgroundColor = bgColor
	el.style.display = elDisplay
} 

// END - ANIMATION HELPERS - END


// START - RAFS - START
const hit = () => {
	requestAnimationFrame(() => {
		translateY += getTargetFrameMod(hitYTarget - hitY, hitSpeed)
		scale += getTargetFrameMod(hitScaleTarget - hitScale, hitSpeed)
		translateX += getTargetFrameMod(hitXTarget, hitSpeed)
		ball.style.transform = (
			`scale(${scale}) translateY(${translateY}px) translateX(${translateX}px)`
		)
		if (Date.now() - hitTime < hitSpeed) {
			hit()
		}
	})
}

const pitch = () => (
	requestAnimationFrame(() => {
		if (!isHit) {
			if (Date.now() - pitchTime >= pitchSpeed) {
				ball.style.display = 'none'
				return
			}
			scale += getTargetFrameMod(pitchScaleTarget, pitchSpeed)
			translateY += getTargetFrameMod(pitchYTarget, pitchSpeed)
			ball.style.transform = `scale(${scale}) translateY(${translateY}px)`
			pitch()
		} else {
			hit()
		}
	})
)
// END - RAFS - END


// START - MAIN ANIMATION - START
const runPitchAnimation = async () => {
	if (isAnimating === false) {
		isHit = false
		isAnimating = true
		batterBox.style.display = 'none'
		await timeout(setSvg2, frameSpeed)
		await timeout(setSvg3, frameSpeed)
		ballVisible()
		setTimeout(() => {
			setSvg1()
			if (!isHit) {
				toggleText(strike, true)
				strikeAudio.play()
				endPitchCycle()
				setTimeout(() => {
					toggleText(strike, false)
					strikeAudio.pause()
					strikeAudio.currentTime = 0
				}, 2000)
			}
		}, frameSpeed)
	}
}
// END - MAIN ANIMATION - END


// LISTENERS
batterBox.addEventListener('click', runPitchAnimation)
ball.addEventListener('click', homerun)

// RUN
pitcher.src = pitcherSvg1

