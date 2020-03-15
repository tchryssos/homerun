import { fps } from '/js/configConstants'

export const timeout = (func, ms) => (
	new Promise((resolve) => (
		setTimeout(() => {
			func()
			resolve()
		}, ms)
	))
)

export const getTargetFrameMod = (target, speed, fps, mod = 1) => (
	((target / (speed / 1000) / fps)) * mod
)