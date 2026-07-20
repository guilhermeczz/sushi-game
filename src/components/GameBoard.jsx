import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Avatar from './Avatar'
import Sushi from './Sushi'
import { EatingEffects } from './Animations'

const achievements = [
  {points:20,icon:'⭐',title:'Primeira conquista'},
  {points:40,icon:'🥢',title:'Mestre do Hashi'},
  {points:60,icon:'🍱',title:'Craque do Rodízio'},
  {points:80,icon:'🔥',title:'Lenda do Sushi'},
  {points:100,icon:'👑',title:'Rei do Sushi'},
]

export default function GameBoard({ avatar, goal, count, onEat, onGiveUp, onFinish }) {
  const [bites, setBites] = useState([])
  const [eating, setEating] = useState(false)
  const [goalPrompt, setGoalPrompt] = useState(count === goal)
  const [unlockedAchievement, setUnlockedAchievement] = useState(null)
  const progress = goal > 0 ? Math.min(100, (count / goal) * 100) : 100
  const stage = achievements.filter((achievement) => count >= achievement.points).length
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
    const achievement = achievements.find((item) => item.points === count + 1)
    if (achievement) { setUnlockedAchievement(achievement); setTimeout(()=>setUnlockedAchievement(null),1700) }
    if (count + 1 === goal) setTimeout(() => setGoalPrompt(true), 450)
  }

  return (
    <main className="screen gameplay">
      <header className="game-header"><div><small>Jogador</small><b>{avatar.name}</b></div></header>
      <section className="score-panel">
        <div><small>Meta</small><strong>{goal}</strong></div><i /><div><small>Pontos</small><strong>{count}</strong></div>
      </section>
      <div className="progress-track"><motion.div animate={{ width: `${progress}%` }} /><Sushi /></div>
      <p className="remaining">{remaining > 0 ? <>Faltam <b>{remaining} pontos</b>. Você consegue!</> : <><b>Meta superada!</b> +{count - goal} além da meta</>}</p>
      <div className="game-stage">
        <section className="achievement-board" aria-label="Conquistas do desafio">
          <header><b>CONQUISTAS</b><span>{stage} / {achievements.length}</span></header>
          <div>{achievements.map((achievement)=><div key={achievement.points} className={count>=achievement.points?'unlocked':''} aria-label={`${achievement.title}: ${achievement.points} pontos`}><i>{count>=achievement.points?achievement.icon:'?'}</i><small>{achievement.points}</small></div>)}</div>
        </section>
        <Avatar avatar={avatar} size="large" eating={eating} stage={stage} />
        <EatingEffects bites={bites} onDone={(id) => setBites((items) => items.filter((item) => item !== id))} />
        {unlockedAchievement&&<motion.div className="achievement-celebration" initial={{scale:.35,opacity:0,y:25}} animate={{scale:[.35,1.08,1],opacity:1,y:0}} exit={{opacity:0}}><span>{unlockedAchievement.icon}</span><small>CONQUISTA DESBLOQUEADA</small><b>{unlockedAchievement.title}</b><em>{unlockedAchievement.points} pontos</em></motion.div>}
      </div>
      <div className="action-zone">
        <motion.button className="sushi-button realistic" whileTap={{ scale: .88, rotate: -2 }} onClick={eat} aria-label="Comer uma peça de sushi"><motion.img src="/assets/sushi-real.png" alt="Sushi de salmão" animate={{ y: [0,-7,0] }} transition={{ repeat: Infinity, duration: 2.1 }} /><span>TOQUE PARA COMER</span></motion.button>
        <button className="give-up" onClick={onGiveUp}>{count >= goal ? 'Encerrar rodízio' : 'Estou cheio'}</button>
      </div>
      {goalPrompt && (
        <motion.div className="goal-reached-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="goal-reached-card" initial={{ scale: .7, y: 40 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring' }}>
            <span>🏆</span><small>META ATINGIDA</small><h2>Você chegou em {goal}!</h2><p>Quer continuar no desafio?</p>
            <button className="keep-eating" onClick={() => setGoalPrompt(false)}>Continuar comendo 🍣</button>
            <button className="stop-now" onClick={onFinish}>Encerrar e ver resultado</button>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
