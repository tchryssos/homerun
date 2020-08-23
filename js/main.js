import pitcherSvg1 from '/static/Pitcher1.svg'

import { runPitchAnimation, homerun } from '/js/animations'
import { batterBox, ball, pitcher, teamOneTag, teamTwoTag } from '/js/elements'
import { teamNames, cityNames } from '/js/constants'
import { getRandomItem } from '/js/util'

// LISTENERS
batterBox.addEventListener('click', runPitchAnimation)
ball.addEventListener('click', homerun)

// SETUP
const teamNameOne = getRandomItem(teamNames)
const teamNameTwo = getRandomItem(teamNames.filter(n => n !== teamNameOne))
const cityNameOne = getRandomItem(cityNames)
const cityNameTwo = getRandomItem(cityNames.filter(n => n !== cityNameOne))

const teamOneString = `${cityNameOne} ${teamNameOne}`
const teamTwoString = `${cityNameTwo} ${teamNameTwo}`
teamOneTag.textContent = teamOneString
teamTwoTag.textContent = teamTwoString

// RUN
pitcher.src = pitcherSvg1

