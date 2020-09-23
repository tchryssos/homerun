import throttle from 'lodash.throttle'
import pitcherSvg1 from '/static/Pitcher1.svg'

import { runPitchAnimation, homerun } from '/js/animations'
import {
	batterBox, ball, pitcher, teamOneTag, teamTwoTag,
	scores, bat,
} from '/js/elements'
import { teamNames, rosterTemplate } from '/js/constants'
import { getRandomItem } from '/js/util'
import { getCityName, buildRoster } from '/js/teams'
import { setCurrentScoreVal } from '/js/state'

// LISTENERS
batterBox.addEventListener('click', runPitchAnimation)
ball.addEventListener('click', homerun)
if (window.innerWidth >= 600) {
	const trackCursor = throttle((e) => {
		bat.style.top = `${e.y - 140}px`
		bat.style.left = `${e.x - 30}px`
	}, 50)
	document.addEventListener('mousemove', trackCursor)
}

// SETUP
const roster = buildRoster(rosterTemplate)
console.log(roster)
const teamNameOne = getRandomItem(teamNames)
const teamNameTwo = getRandomItem(teamNames.filter(n => n !== teamNameOne))
const cityNameOne = getCityName()
const cityNameTwo = getCityName()
scores.forEach(
	(el, i) => {
		const rNum = Math.round(Math.random() * 10)
		el.textContent = rNum
		if (i === scores.length - 1) {
			setCurrentScoreVal(rNum)
		}
	}
)
const teamOneString = `${cityNameOne} ${teamNameOne}`
const teamTwoString = `${cityNameTwo} ${teamNameTwo}`
teamOneTag.textContent = teamOneString
teamTwoTag.textContent = teamTwoString

// RUN
pitcher.src = pitcherSvg1

