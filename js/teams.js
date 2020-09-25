import { getRandomItem, addAndRemoveClass, getRandomBetween } from '/js/util'
import { buildPlayerName, generatePlayerPortrait } from '/js/players'
import { cityNames, citySuffix, rosterTemplate } from '/js/constants'
import {
	batterName, slidingInfo, batterHeight, batterWeight, batterPosition,
	batterNumber, batterBA,
} from '/js/elements'

let prevCity = ''
export const getCityName = () => {
	const city = getRandomItem(cityNames.filter(n => n !== prevCity))
	prevCity = city
	const suffix = Math.round(Math.random()) ? getRandomItem(citySuffix) : ''
	return `${city}${suffix}`
}
// END - TEAM UTILS - END

const positions = [
	'P', 'C', '1B', '2B', '3B',
	'SS', 'LF', 'CF', 'RF', 'IF',
	'OF', 'CL'
]
export const fetchNewPlayer = (preventSlide) => {
	if (!preventSlide) {
		addAndRemoveClass(slidingInfo, 'sliding-info-slide', 5000)
	}
	setTimeout(
		() => {
			const newBatter = buildPlayerName(getRandomItem(rosterTemplate))
			batterName.textContent = newBatter
			generatePlayerPortrait()
			batterHeight.textContent = `${getRandomBetween(3, 9)}'${getRandomBetween(0, 12)}"`
			batterWeight.textContent = `${getRandomBetween(60, 400)} lbs`
			batterPosition.textContent = getRandomItem(positions)
			batterNumber.textContent = `#${getRandomBetween(0, 100)}`
			batterBA.textContent = `.${getRandomBetween(100, 500)}`
		}, preventSlide ? 0 : 2500
	)
}