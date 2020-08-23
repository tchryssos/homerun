import {
	pitchSpeed, frameSpeed, hitSpeed, pitchYTarget,
	hitYTarget, hitXTarget, pitchScaleTarget, hitScaleTarget,
} from '/js/constants'
import { timeout, getTargetFrameMod } from '/js/util'
import {
	ball, batterBox, homerunId, textBox,
	setSvg2, setSvg3, setSvg1, strike,
} from '/js/elements'
import {
	isAnimating, setIsAnimating, translateY, setTranslateY, scale,
	setScale, translateX, setTranslateX, pitchTime, setPitchTime,
	isHit, setIsHit, hitScale, strikeCount, setStrikeCount,
	hitTime, hitY,
} from '/js/state'
import { setHitTime, setHitY, setHitScale } from '/js/state'
import { strikeAudio, speakHomerun } from '/js/audio'

// START - ANIMATION HELPERS - START
const endPitchCycle = async () => {
	await timeout(
		() => ball.style.display = 'none', 
		pitchSpeed
	)
	setIsAnimating(false)
	batterBox.style.display = 'block'
	setTranslateY(0)
	setTranslateX(0)
	setScale(1)
}

const ballVisible = () => {
	ball.style.display = 'block'
	ball.style.cursor = 'pointer'
	setPitchTime(Date.now())
	pitch()
}

export const homerun = () => {
	ball.style.cursor = 'default'
	if (!isHit) {
		setIsHit(true)
		setHitTime(Date.now())
		setHitY(translateY)
		setHitScale(scale)
		toggleText(homerunId, true)
		speakHomerun()
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
		setTranslateY(translateY + getTargetFrameMod(hitYTarget - hitY, hitSpeed))
		setScale(scale + getTargetFrameMod(hitScaleTarget - hitScale, hitSpeed))
		setTranslateX(translateX + getTargetFrameMod(hitXTarget, hitSpeed))
		ball.style.transform = (
			`scale(${scale}) translateY(${translateY}px) translateX(${translateX}px)`
		)
		if ((Date.now() - hitTime) < hitSpeed) {
			hit()
		}
	})
}

const pitch = () => (
	requestAnimationFrame(() => {
		if (!isHit) {
			if ((Date.now() - pitchTime) >= pitchSpeed) {
				ball.style.display = 'none'
				return
			}
			setScale(scale + getTargetFrameMod(pitchScaleTarget, pitchSpeed))
			setTranslateY(translateY + getTargetFrameMod(pitchYTarget, pitchSpeed))
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
		setIsHit(false)
		setIsAnimating(true)
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
				setStrikeCount(strikeCount + 1)
			}
		}, frameSpeed)
	}
}
// END - MAIN ANIMATION - END
