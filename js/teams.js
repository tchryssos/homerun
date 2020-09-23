import { getRandomItem } from '/js/util'
import { cityNames, citySuffix } from '/js/constants'

// START - TEAM UTILS - START
let prevCity = ''
export const getCityName = () => {
	const city = getRandomItem(cityNames.filter(n => n !== prevCity))
	prevCity = city
	const suffix = Math.round(Math.random()) ? getRandomItem(citySuffix) : ''
	return `${city}${suffix}`
}
// END - TEAM UTILS - END

// START - NAME UTILS - START
const vowels = ['a', 'e', 'i', 'o', 'u']
// Weightings roughly taken from this chart:
// https://home.uchicago.edu/~jsfalk/misc/baby_names/images/contains_male.png
// const weightedConsonants = [
// 	['b', 10], ['c', 15], ['d', 25], ['f', 5], ['g', 10],
// 	['h', 27], ['j', 15], ['k', 7], ['l', 35], ['m', 20],
// 	['n', 35], ['p', 7], ['q', 1], ['r', 45], ['s', 20],
// 	['t', 20], ['v', 7], ['w', 10], ['x', 1], ['y', 15],
// 	['z', 1],
// ]

// Weightings taken from the actual 1990 Mets roster
const weightedConsonants = [
	['b', 3], ['c', 4], ['d', 9], ['f', 3], ['g', 3],
	['h', 6], ['j', 3], ['k', 4], ['l', 10], ['m', 5],
	['n', 11], ['p', 1], ['q', 1], ['r', 15], ['s', 6],
	['t', 6], ['v', 4], ['w', 2], ['x', 1], ['y', 3],
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

export const buildRoster = (roster) => roster.map(
	(name) => buildPlayerName(name)
)
// END - NAME UTILS - END