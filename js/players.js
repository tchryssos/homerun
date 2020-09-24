import {
	eyeSheet, noseSheet, hairSheet, markSheet, pupilSheet,
	stacheSheet, mouthSheet,
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
	return getRandomBetween(0, eyeSheetSize) * chunkP
}

export const generatePlayerPortrait = () => {
	const eyeShift = calcShift(eyeSheetSize)
	const noseShift = calcShift(noseSheetSize)
	const hairShift = calcShift(hairSheetSize)
	const pupilShift = calcShift(pupilSheetSize)
	const mouthShift = calcShift(mouthSheetSize)

	shiftSheet(eyeSheet, eyeShift)
	shiftSheet(noseSheet, noseShift)
	shiftSheet(hairSheet, hairShift)
	shiftSheet(pupilSheet, pupilShift)
	shiftSheet(mouthSheet, mouthShift)


	if (getRandomBetween(0, 10) > 6) {
		const stacheShift = calcShift(stacheSheetSize) 
		shiftSheet(stacheSheet, stacheShift)
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