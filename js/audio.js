import strikeMp3 from '/static/strike.mp3'
import hitMp3 from '/static/hit.mp3'
import crowdMp3 from '/static/crowd.mp3'

export const strikeAudio = new Audio(strikeMp3)
export const hitAudio = new Audio(hitMp3)
export const crowdAudio = new Audio(crowdMp3)
crowdAudio.loop = true
export const homerunAudio = new SpeechSynthesisUtterance('Wow! Homerun!')
homerunAudio.voice = speechSynthesis.getVoices()[48]
export const speakHomerun = () => speechSynthesis.speak(homerunAudio)