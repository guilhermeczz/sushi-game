import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AvatarCreator from './components/AvatarCreator'
import GoalScreen from './components/GoalScreen'
import GameBoard from './components/GameBoard'
import ResultScreen from './components/ResultScreen'

const AVATAR_KEY = 'sushi-count-avatar'
const GAME_KEY = 'sushi-count-game'
const defaultAvatar = { name: '', gender: 'boy', character: 0 }

function loadState() {
  try {
    const avatar = JSON.parse(localStorage.getItem(AVATAR_KEY)) || defaultAvatar
    const saved = JSON.parse(localStorage.getItem(GAME_KEY))
    if (saved?.screen === 'game') return { avatar, ...saved }
    if (saved?.screen === 'result') localStorage.removeItem(GAME_KEY)
    return { avatar, screen: 'onboarding', goal: 0, count: 0, won: false }
  } catch {
    return { avatar: defaultAvatar, screen: 'onboarding', goal: 0, count: 0, won: false }
  }
}

export default function App() {
  const initial = loadState()
  const [avatar, setAvatar] = useState(initial.avatar)
  const [screen, setScreen] = useState(initial.screen)
  const [goal, setGoal] = useState(initial.goal)
  const [count, setCount] = useState(initial.count)
  const [won, setWon] = useState(initial.won)

  useEffect(() => {
    if (screen === 'game') localStorage.setItem(GAME_KEY, JSON.stringify({ screen, goal, count }))
  }, [screen, goal, count])

  const saveAvatar = () => {
    const clean = { ...avatar, name: avatar.name.trim() }
    setAvatar(clean)
    localStorage.setItem(AVATAR_KEY, JSON.stringify(clean))
    setScreen('goal')
  }
  const start = (nextGoal) => { setGoal(nextGoal); setCount(0); setScreen('game') }
  const finish = (victory, finalCount = count) => {
    setWon(victory); setCount(finalCount); setScreen('result')
    localStorage.setItem(GAME_KEY, JSON.stringify({ screen: 'result', goal, count: finalCount, won: victory }))
  }
  const eat = () => {
    const next = count + 1
    setCount(next)
  }
  const restart = () => { localStorage.removeItem(GAME_KEY); setGoal(0); setCount(0); setScreen('goal') }

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <motion.div key={screen} className="screen-wrap" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: .25 }}>
          {screen === 'onboarding' && <AvatarCreator avatar={avatar} setAvatar={setAvatar} onSave={saveAvatar} />}
          {screen === 'goal' && <GoalScreen avatar={avatar} onStart={start} onBack={() => setScreen('onboarding')} />}
          {screen === 'game' && <GameBoard avatar={avatar} goal={goal} count={count} onEat={eat} onGiveUp={() => finish(count >= goal)} onFinish={() => finish(true)} />}
          {screen === 'result' && <ResultScreen won={won} avatar={avatar} count={count} goal={goal} onRestart={restart} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
