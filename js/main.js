import pitcherSvg1 from '../static/Pitcher1.svg'
import pitcherSvg2 from '../static/Pitcher2.svg'
import pitcherSvg3 from '../static/Pitcher3.svg'

// TIMING
let animating = false

// CONSTANTS
const pitcher = document.getElementById('pitcher')
const batterBox = document.getElementById('batterBox')
const setSvg1 = () => pitcher.src = pitcherSvg1
const setSvg2 = () => pitcher.src = pitcherSvg2
const setSvg3 = () => pitcher.src = pitcherSvg3

const timeout = (func, ms) => (
	new Promise((resolve) => (
		setTimeout(() => {
			func()
			resolve()
		}, ms)
	))
)

const pitch = async () => {
	if (animating === false) {
		animating = true
		await timeout(setSvg2, 1500)
		await timeout(setSvg3, 1500)
		await timeout(setSvg1, 1500)
		animating = false
	}
}

// LISTENERS
batterBox.addEventListener('click', pitch)

// START
pitcher.src = pitcherSvg1

