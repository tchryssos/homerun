import pitcherSvg1 from '/static/Pitcher1.svg'

import { runPitchAnimation, homerun } from '/js/animations'
import { batterBox, ball, pitcher } from '/js/elements'

// LISTENERS
batterBox.addEventListener('click', runPitchAnimation)
ball.addEventListener('click', homerun)

// RUN
pitcher.src = pitcherSvg1

