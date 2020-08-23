import strikeMp3 from '/static/strike.mp3'

export const strikeAudio = new Audio(strikeMp3)
export const homerunAudio = new SpeechSynthesisUtterance('Wow! Homerun!')
homerunAudio.voice = speechSynthesis.getVoices()[48]
export const speakHomerun = () => speechSynthesis.speak(homerunAudio)