import pitcherSvg1 from '../static/Pitcher1.svg'
import pitcherSvg2 from '../static/Pitcher2.svg'
import pitcherSvg3 from '../static/Pitcher3.svg'

// CONSTANTS
const pitcher = document.getElementById('pitcher')
const setSvg1 = () => pitcher.src = pitcherSvg1
const setSvg2 = () => pitcher.src = pitcherSvg2
const setSvg3 = () => pitcher.src = pitcherSvg3

// LISTENERS
document.addEventListener('click', setSvg2)

// START
pitcher.src = pitcherSvg1

