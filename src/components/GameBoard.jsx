import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Avatar from './Avatar'
import Sushi from './Sushi'
import { EatingEffects } from './Animations'

export default function GameBoard({ avatar, goal, count, onEat, onGiveUp, onFinish }) {
  const [bites, setBites] = useState([])
  const [eating, setEating] = useState(false)
  const [goalPrompt, setGoalPrompt] = useState(count === goal)
  const [stageUp, setStageUp] = useState(false)
  const progress = goal > 0 ? Math.min(100, (count / goal) * 100) : 100
  const stage = count >= 60 ? 5 : count >= 50 ? 4 : count >= 40 ? 3 : count >= 30 ? 2 : count >= 20 ? 1 : 0
  const remaining = Math.max(0, goal - count)

  useEffect(() => {
    if (!eating) return
    const timer = setTimeout(() => setEating(false), 620)
    return () => clearTimeout(timer)
  }, [eating, bites])

  const eat = () => {
    const id = Date.now() + Math.random()
    setBites((items) => [...items, id])
    setEating(true)
    onEat()
    if ([20,30,40,50,60].includes(count+1)) { setStageUp(true); setTimeout(()=>setStageUp(false),1200) }
    if (count + 1 === goal) setTimeout(() => setGoalPrompt(true), 450)
  }

  return (
    <main className="screen gameplay">
      <header className="game-header"><div><small>Jogador</small><b>{avatar.name}</b></div><span className="live-dot">AO VIVO</span></header>
      <section className="score-panel">
        <div><small>Meta</small><strong>{goal}</strong></div><i /><div><small>Pontos</small><strong>{count}</strong></div>
      </section>
      <div className="progress-track"><motion.div animate={{ width: `${progress}%` }} /><Sushi /></div>
      <p className="remaining">{remaining > 0 ? <>Faltam <b>{remaining} pontos</b>. Você consegue!</> : <><b>Meta superada!</b> +{count - goal} além da meta</>}</p>
      <div className="game-stage">
        <span className="stage-badge">NÍVEL {stage + 1}</span>
        <Avatar avatar={avatar} size="large" eating={eating} stage={stage} />
        <EatingEffects bites={bites} onDone={(id) => setBites((items) => items.filter((item) => item !== id))} />
        {stageUp&&<motion.div className="stage-celebration" initial={{scale:.4,opacity:0}} animate={{scale:1,opacity:1}} exit={{opacity:0}}><span>✨</span><b>NÍVEL {stage+1}</b><small>Novo visual desbloqueado!</small></motion.div>}
      </div>
      <div className="action-zone">
        <motion.button className="sushi-button realistic" whileTap={{ scale: .88, rotate: -2 }} onClick={eat} aria-label="Comer uma peça de sushi"><motion.img src="/assets/sushi-real.png" alt="Sushi de salmão" animate={{ y: [0,-7,0] }} transition={{ repeat: Infinity, duration: 2.1 }} /><span>TOQUE PARA COMER</span></motion.button>
        <button className="give-up" onClick={onGiveUp}>{count >= goal ? 'Encerrar rodízio' : 'Estou cheio'}</button>
      </div>
      {goalPrompt && (
        <motion.div className="goal-reached-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="goal-reached-card" initial={{ scale: .7, y: 40 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring' }}>
            <span>🏆</span><small>META ATINGIDA</small><h2>Você chegou em {goal}!</h2><p>A barriga ainda tem espaço?</p>
            <button className="keep-eating" onClick={() => setGoalPrompt(false)}>Continuar comendo 🍣</button>
            <button className="stop-now" onClick={onFinish}>Encerrar e ver resultado</button>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
