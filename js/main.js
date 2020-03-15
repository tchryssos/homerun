import { timeout, getTargetFrameMod } from '/js/util'
import {
	fps, pitchSpeed, frameSpeed, hitSpeed, pitchYTarget, 
	hitYTarget, hitXTarget, hitScaleTarget, pitchScaleTarget,
} from '/js/config'

import pitcherSvg1 from '/static/Pitcher1.svg'
import pitcherSvg2 from '/static/Pitcher2.svg'
import pitcherSvg3 from '/static/Pitcher3.svg'

// CONFIG
let isAnimating = false
let isHit = false
let pitchTime
let hitTime

let translateY = 0
let hitY
let translateX = 0
let scale = 1
let hitScale


// ELEMENTS
const pitcher = document.getElementById('pitcher')
const batterBox = document.getElementById('batterBox')
const ball = document.getElementById('ball')
const setSvg1 = () => pitcher.src = pitcherSvg1
const setSvg2 = () => pitcher.src = pitcherSvg2
const setSvg3 = () => pitcher.src = pitcherSvg3

// ANIMATION FUNCTIONS
const endPitchCycle = async () => {
	await timeout(
		() => ball.style.display = 'none', 
		pitchSpeed
	)
	isAnimating = false
	batterBox.style.display = 'block'
}

const hit = () => {
	requestAnimationFrame(() => {
		translateY += getTargetFrameMod(hitYTarget - hitY, hitSpeed)
		scale += getTargetFrameMod(hitScaleTarget - hitScale, hitSpeed)
		ball.style.transform = `scale(${scale}) translateY(${translateY}px)`
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
	ball.style.cursor = 'default'
	if (!isHit) {
		isHit = true
		hitTime = Date.now()
		hitY = translateY
		hitScale = scale
	}
}

// LISTENERS
batterBox.addEventListener('click', runPitchAnimation)
ball.addEventListener('click', homerun)

// START
pitcher.src = pitcherSvg1

