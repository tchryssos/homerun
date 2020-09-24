import {
	eyeSheet, noseSheet, hairSheet, markSheet, pupilSheet,
	stacheSheet,
} from '/js/elements'

import { getRandomBetween } from '/js/util'

const eyeSheetSize = 3
const noseSheetSize = 4
const hairSheetSize = 8
const markSheetSize = 3
const pupilSheetSize = 3
const stacheSheetSize = 3

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
	const markShift = calcShift(markSheetSize)
	const pupilShift = calcShift(pupilSheetSize)
	const stacheShift = calcShift(stacheSheetSize)

	shiftSheet(eyeSheet, eyeShift)
	shiftSheet(noseSheet, noseShift)
	shiftSheet(hairSheet, hairShift)
	shiftSheet(markSheet, markShift)
	shiftSheet(pupilSheet, pupilShift)
	shiftSheet(stacheSheet, stacheShift)
}