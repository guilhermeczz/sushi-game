import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Avatar from './Avatar'
import Sushi from './Sushi'
import { FlyingSushi, PlusOne } from './Animations'

export default function GameBoard({ avatar, goal, count, onEat, onGiveUp }) {
  const [bite, setBite] = useState(0)
  const [eating, setEating] = useState(false)
  const progress = Math.min(100, (count / goal) * 100)
  const stage = count >= 30 ? 3 : count >= 20 ? 2 : count >= 10 ? 1 : 0
  const remaining = Math.max(0, goal - count)

  useEffect(() => {
    if (!eating) return
    const timer = setTimeout(() => setEating(false), 620)
    return () => clearTimeout(timer)
  }, [eating, bite])

  const eat = () => {
    setBite((value) => value + 1)
    setEating(true)
    onEat()
  }

  return (
    <main className="screen gameplay">
      <header className="game-header"><div><small>Jogador</small><b>{avatar.name}</b></div><span className="live-dot">AO VIVO</span></header>
      <section className="score-panel">
        <div><small>Meta</small><strong>{goal}</strong></div><i /><div><small>Peças</small><strong>{count}</strong></div>
      </section>
      <div className="progress-track"><motion.div animate={{ width: `${progress}%` }} /><Sushi /></div>
      <p className="remaining">{remaining > 0 ? <>Faltam <b>{remaining} peças</b>. Você consegue!</> : 'Meta atingida!'}</p>
      <div className="game-stage">
        <span className="stage-badge">NÍVEL {stage + 1}</span>
        <Avatar avatar={avatar} size="large" eating={eating} stage={stage} />
        <FlyingSushi id={bite} /><PlusOne id={bite} />
      </div>
      <div className="action-zone">
        <motion.button className="sushi-button" whileTap={{ scale: .88 }} onClick={eat} aria-label="Comer uma peça de sushi"><Sushi /><span>TOQUE PARA COMER</span></motion.button>
        <button className="give-up" onClick={onGiveUp}>Estou cheio</button>
      </div>
    </main>
  )
}
