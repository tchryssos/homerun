import { fps } from '/js/constants'

export const timeout = (func, ms) => (
	new Promise((resolve) => (
		setTimeout(() => {
			func()
			resolve()
		}, ms)
	))
)

export const getTargetFrameMod = (target, speed, mod = 1) => (
	((target / (speed / 1000) / fps)) * mod
)

export const getRandomItem = (array) => (
	array[Math.floor(Math.random() * array.length)]
)

export const getRandomBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min)
}

export const addAndRemoveClass = (el, classString, time) => {
	el.classList.add(classString)
	setTimeout(() => el.classList.remove(classString), time)
}

export const getRandomColorString = () => `#${Math.floor(Math.random()*16777215).toString(16)}`