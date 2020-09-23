import pitcherSvg1 from '/static/Pitcher1.svg'
import pitcherSvg2 from '/static/Pitcher2.svg'
import pitcherSvg3 from '/static/Pitcher3.svg'

// START - ELEMENTS - START
export const pitcher = document.getElementById('pitcher')
export const batterBox = document.getElementById('batter-box')
export const ball = document.getElementById('ball')
export const bat = document.getElementById('bat')
export const teamOneTag = document.getElementById('team-one')
export const teamTwoTag = document.getElementById('team-two')
export const scores = Array.from(document.querySelectorAll('.score'))
export const strike = 'strike'
export const homerunId = 'homerun'
export const textBox = document.getElementById('text-box')
export const setSvg1 = () => pitcher.src = pitcherSvg1
export const setSvg2 = () => pitcher.src = pitcherSvg2
export const setSvg3 = () => pitcher.src = pitcherSvg3