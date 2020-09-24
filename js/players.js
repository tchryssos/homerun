import {
	eyeSheet, noseSheet, hairSheet, markSheet, pupilSheet,
	stacheSheet, mouthSheet, headSheet,
} from '/js/elements'

import { getRandomBetween, getRandomItem } from '/js/util'

// START - PORTRAIT GENERATOR - START
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
// END - PORTRAIT GENERATOR - END

// START - NAME GENERATOR - START
const vowels = ['a', 'e', 'i', 'o', 'u', 'y']

// Weightings roughly taken from the actual 1990 Mets roster
const weightedConsonants = [
	['b', 3], ['c', 4], ['d', 9], ['f', 3], ['g', 3],
	['h', 6], ['j', 3], ['k', 4], ['l', 10], ['m', 6],
	['n', 12], ['p', 1], ['q', 1], ['r', 16], ['s', 6],
	['t', 6], ['v', 4], ['w', 2], ['x', 1],
	['z', 1],
]
const consonants = weightedConsonants.map((c) => c[0])
const selectableConstants = []
// @TODO This is a very bad way of handling weighted random letters
weightedConsonants.forEach(
	(c) => {
		for (let i = 0; i < c[1]; i++) {
			selectableConstants.push(c[0])
		}
	}
)

const replaceLetter = (letter, optionArray) => {
	const replacement = getRandomItem(optionArray)
	if (letter === letter.toUpperCase()) {
		return replacement.toUpperCase()
	}
	return replacement
}

export const buildPlayerName = (templateName) => {
	const letters = templateName.split('')
	return letters.reduce(
		(acc, cur, i, arr) => {
			let letter = cur
			if (i && arr[i - 1] === cur) {
				letter = acc[i - 1]
			} else if (vowels.indexOf(cur.toLowerCase()) !== -1) {
				letter = replaceLetter(letter, vowels)
			} else if (consonants.indexOf(cur.toLowerCase()) !== -1) {
				letter = replaceLetter(letter, selectableConstants)
			}
			return [...acc, letter]
		}, []
	).join('')
}
// END - NAME GENERATOR - END