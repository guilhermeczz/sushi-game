import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AvatarCreator from './components/AvatarCreator'
import GoalScreen from './components/GoalScreen'
import GameBoard from './components/GameBoard'
import ResultScreen from './components/ResultScreen'
import SideMenu from './components/SideMenu'

const AVATAR_KEY = 'sushi-count-avatar'
const GAME_KEY = 'sushi-count-game'
const defaultAvatar = { name: '', gender: 'boy', character: 0 }

function loadState() {
  try {
    const avatar = JSON.parse(localStorage.getItem(AVATAR_KEY)) || defaultAvatar
    const saved = JSON.parse(localStorage.getItem(GAME_KEY))
    if (saved?.screen === 'game' && Number.isInteger(saved.goal) && saved.goal >= 0 && saved.count >= 0) return { avatar, ...saved }
    if (saved?.screen === 'game') localStorage.removeItem(GAME_KEY)
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('sushi-count-theme') || 'light')
  const [profileReturn, setProfileReturn] = useState(null)

  useEffect(() => {
    if (screen === 'game') localStorage.setItem(GAME_KEY, JSON.stringify({ screen, goal, count }))
  }, [screen, goal, count])
  useEffect(() => { localStorage.setItem('sushi-count-theme', theme) }, [theme])

  const saveAvatar = () => {
    const clean = { ...avatar, name: avatar.name.trim() }
    setAvatar(clean)
    localStorage.setItem(AVATAR_KEY, JSON.stringify(clean))
    if (profileReturn) { setScreen(profileReturn); setProfileReturn(null) } else setScreen('goal')
  }
  const start = (nextGoal) => { const selectedGoal=Number(nextGoal); setGoal(selectedGoal); setCount(0); setScreen('game'); localStorage.setItem(GAME_KEY,JSON.stringify({screen:'game',goal:selectedGoal,count:0})) }
  const finish = (victory, finalCount = count) => {
    setWon(victory); setCount(finalCount); setScreen('result')
    localStorage.setItem(GAME_KEY, JSON.stringify({ screen: 'result', goal, count: finalCount, won: victory }))
  }
  const eat = () => {
    setCount((current) => { const next=current+1; localStorage.setItem(GAME_KEY,JSON.stringify({screen:'game',goal,count:next})); return next })
  }
  const restart = () => { localStorage.removeItem(GAME_KEY); setGoal(0); setCount(0); setScreen('goal') }
  const resetAll = () => { if (!window.confirm('Reiniciar tudo? Seu avatar e o progresso atual serão apagados.')) return; localStorage.removeItem(GAME_KEY); localStorage.removeItem(AVATAR_KEY); setAvatar(defaultAvatar); setGoal(0); setCount(0); setWon(false); setMenuOpen(false); setScreen('onboarding') }
  const editProfile = () => { setProfileReturn(screen === 'onboarding' ? null : screen); setScreen('onboarding') }

  return (
    <div className={`app-shell theme-${theme}`}>
      <SideMenu open={menuOpen} setOpen={setMenuOpen} theme={theme} setTheme={setTheme} onEditProfile={editProfile} onReset={resetAll} />
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
