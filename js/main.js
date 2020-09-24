import throttle from 'lodash.throttle'
import pitcherSvg1 from '/static/Pitcher1.svg'

import { runPitchAnimation, homerun } from '/js/animations'
import {
	batterBox, ball, pitcher, teamOneScore, teamTwoScore,
	bat, teamOneText, teamOneLogo, teamTwoText, teamTwoLogo,
} from '/js/elements'
import { teamNames } from '/js/constants'
import { getRandomItem, getRandomBetween, getRandomColorString } from '/js/util'
import { getCityName, fetchNewPlayer } from '/js/teams'
import { colorChange } from '/js/players'

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
const teamNameOne = getRandomItem(teamNames)
const teamNameTwo = getRandomItem(teamNames.filter(n => n !== teamNameOne))
const cityNameOne = getCityName()
const cityNameTwo = getCityName()
const teamOneString = `${cityNameOne} ${teamNameOne}`
const teamTwoString = `${cityNameTwo} ${teamNameTwo}`
const getAbvTeam = (teamName) => teamName.split(/[^A-Z0-9]/).join('')
teamOneText.textContent = getAbvTeam(teamOneString)
teamTwoText.textContent = getAbvTeam(teamTwoString)
teamOneLogo.style.backgroundColor = getRandomColorString()
teamTwoLogo.style.backgroundColor = getRandomColorString()
teamOneLogo.style.color = getRandomColorString()
teamTwoLogo.style.color = getRandomColorString()
teamOneScore.textContent = getRandomBetween(0, 20)
teamTwoScore.textContent = getRandomBetween(0, 20)


colorChange(pitcher)
fetchNewPlayer(true)
// RUN
pitcher.src = pitcherSvg1

