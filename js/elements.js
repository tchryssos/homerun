import pitcherSvg1 from '/static/Pitcher1.svg'
import pitcherSvg2 from '/static/Pitcher2.svg'
import pitcherSvg3 from '/static/Pitcher3.svg'

import strikeMp3 from '/static/strike.mp3'

// START - ELEMENTS - START
export const pitcher = document.getElementById('pitcher')
export const batterBox = document.getElementById('batterBox')
export const ball = document.getElementById('ball')
export const strike = 'strike'
export const homerunId = 'homerun'
export const textBox = document.getElementById('text-box')
export const setSvg1 = () => pitcher.src = pitcherSvg1
export const setSvg2 = () => pitcher.src = pitcherSvg2
export const setSvg3 = () => pitcher.src = pitcherSvg3

export const strikeAudio = new Audio(strikeMp3)
export const homerunAudio = new SpeechSynthesisUtterance('Wow! Homerun!')
homerunAudio.voice = speechSynthesis.getVoices()[48]
// END - ELEMENTS - END