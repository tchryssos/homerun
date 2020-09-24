import pitcherSvg1 from '/static/Pitcher1.svg'
import pitcherSvg2 from '/static/Pitcher2.svg'
import pitcherSvg3 from '/static/Pitcher3.svg'

// START - ELEMENTS - START
export const pitcher = document.getElementById('pitcher')
export const batterBox = document.getElementById('batter-box')
export const ball = document.getElementById('ball')
export const bat = document.getElementById('bat')
export const setSvg1 = () => pitcher.src = pitcherSvg1
export const setSvg2 = () => pitcher.src = pitcherSvg2
export const setSvg3 = () => pitcher.src = pitcherSvg3

export const teamOneText = document.getElementById('team-logo-text-one')
export const teamOneLogo = document.getElementById('team-logo-one')
export const teamTwoText = document.getElementById('team-logo-text-two') 
export const teamTwoLogo = document.getElementById('team-logo-two')
export const teamOneScore = document.getElementById('team-score-one')
export const teamTwoScore = document.getElementById('team-score-two')


export const slidingInfo = document.getElementById('sliding-info')
export const batterName = document.getElementById('batter-name')
export const batterNumber = document.getElementById('batter-number')
export const batterPosition = document.getElementById('batter-position')
export const batterHeight = document.getElementById('batter-height')
export const batterWeight = document.getElementById('batter-weight')
export const batterBA = document.getElementById('batter-ba')
export const atBatText = document.getElementById('at-bat')

export const eyeSheet = document.getElementById('eyes')
export const noseSheet = document.getElementById('noses')
export const pupilSheet = document.getElementById('pupils')
export const hairSheet = document.getElementById('hair')
export const stacheSheet = document.getElementById('stache')
export const markSheet = document.getElementById('marks')
export const mouthSheet = document.getElementById('mouths')
export const headSheet = document.getElementById('head')


export const strike = 'strike'
export const homerunId = 'homerun'
export const textBox = document.getElementById('text-box')