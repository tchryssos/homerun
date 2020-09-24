import {
	eyeSheet, noseSheet, hairSheet, markSheet, pupilSheet,
	stacheSheet, mouthSheet, headSheet,
} from '/js/elements'

import { getRandomBetween } from '/js/util'

const eyeSheetSize = 3
const noseSheetSize = 4
const hairSheetSize = 8
const markSheetSize = 3
const pupilSheetSize = 3
const stacheSheetSize = 3
const mouthSheetSize = 5

const shiftSheet = (el, shiftInt) => {
	el.style.transform = `translateY(-${shiftInt}%)`
}

const calcShift = (sheetSize) => {
	const chunkP = 100 / sheetSize
	return getRandomBetween(0, sheetSize) * chunkP
}

export const colorChange = (el, overrideH, overrideS, overrideB) => {
	el.style.filter = `
		hue-rotate(${overrideH || getRandomBetween(0, 360)}deg)
		saturate(${overrideS || getRandomBetween(50, 200)}%)
		brightness(${overrideB || getRandomBetween(20, 200)}%)
	`
}
export const generatePlayerPortrait = () => {
	const headSaturate = getRandomBetween(25, 100)
	const headBrightness = getRandomBetween(20, 100)
	colorChange(headSheet, null, headSaturate, headBrightness)


	const eyeShift = calcShift(eyeSheetSize)
	const noseShift = calcShift(noseSheetSize)
	const hairShift = calcShift(hairSheetSize)
	const pupilShift = calcShift(pupilSheetSize)
	const mouthShift = calcShift(mouthSheetSize)

	shiftSheet(eyeSheet, eyeShift)
	shiftSheet(noseSheet, noseShift)
	shiftSheet(mouthSheet, mouthShift)

	shiftSheet(hairSheet, hairShift)
	const hairRotation = getRandomBetween(0, 360)
	const hairSaturate = getRandomBetween(50, 200)
	const hairBrightness = getRandomBetween(20, 200)
	colorChange(hairSheet, hairRotation, hairSaturate, hairBrightness)

	shiftSheet(pupilSheet, pupilShift)
	colorChange(pupilSheet)

	if (getRandomBetween(0, 10) > 6) {
		const stacheShift = calcShift(stacheSheetSize) 
		shiftSheet(stacheSheet, stacheShift)
		colorChange(stacheSheet, hairRotation, hairSaturate, hairBrightness)
	} else {
		stacheSheet.style.display = 'none'
	}
	if (getRandomBetween(0, 10) > 7) {
		const markShift = calcShift(markSheetSize)
		shiftSheet(markSheet, markShift)
	} else {
		markSheet.style.display = 'none'
	}
}