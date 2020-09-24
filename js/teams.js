import { getRandomItem } from '/js/util'
import { buildPlayerName, generatePlayerPortrait } from '/js/players'
import { cityNames, citySuffix, rosterTemplate } from '/js/constants'
import { batterName } from '/js/elements'

let prevCity = ''
export const getCityName = () => {
	const city = getRandomItem(cityNames.filter(n => n !== prevCity))
	prevCity = city
	const suffix = Math.round(Math.random()) ? getRandomItem(citySuffix) : ''
	return `${city}${suffix}`
}
// END - TEAM UTILS - END

export const buildRoster = (roster) => roster.map(
	(name) => buildPlayerName(name)
)

let roster = buildRoster(rosterTemplate)
const setRoster = (modRoster) => roster = modRoster

export const fetchNewPlayer = () => {
	const newBatter = getRandomItem(roster)
	setRoster(roster.filter(p => p !== newBatter))
	batterName.textContent = newBatter
	generatePlayerPortrait()
}