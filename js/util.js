import { fps } from '/js/config'

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