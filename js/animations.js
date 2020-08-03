import {
	pitchSpeed, frameSpeed, hitSpeed, pitchYTarget,
	hitYTarget, hitXTarget, pitchScaleTarget, hitScaleTarget,
} from '/js/constants'

import { timeout, getTargetFrameMod } from '/js/util'

import {
	ball, batterBox, homerunAudio, homerunId, textBox,
} from '/js/elements'

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
		toggleText(homerunId, true)
		homerunAudio.voice = speechSynthesis.getVoices()[48]
		speechSynthesis.speak(homerunAudio)
		timeout(() => toggleText(homerunId, false), hitSpeed)
		endPitchCycle()
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
export const runPitchAnimation = async () => {
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
				strikeCount += 1
			}
		}, frameSpeed)
	}
}
// END - MAIN ANIMATION - END
