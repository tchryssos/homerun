// START - STATEFUL STUFF - START
export let isAnimating = false
export const setIsAnimating = (bool) => isAnimating = bool
export const getIsAnimating = () => isAnimating

export let isHit = false
export const setIsHit = (bool) => isHit = bool
export let pitchTime
export const setPitchTime = (time) => pitchTime = time
export let hitTime
export const setHitTime = (time) => hitTime = time

export let translateY = 0
export const setTranslateY = (num) => translateY = num
export let hitY
export const setHitY = (num) => hitY = num
export let translateX = 0
export const setTranslateX = (num) => translateX = num
export let scale = 1
export const setScale = (num) => scale = num
export let hitScale
export const setHitScale = (num) => hitScale = num
export let strikeCount = 0
export const setStrikeCount = (num) => strikeCount = num

export let currentScoreVal = 0
export const setCurrentScoreVal = (num) => currentScoreVal = num
// END - STATEFUL STUFF - END