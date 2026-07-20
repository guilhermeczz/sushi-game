import { useState } from 'react'
import { motion } from 'framer-motion'
import Avatar from './Avatar'
import Sushi from './Sushi'

export default function GoalScreen({ avatar, onStart, onBack }) {
  const [goal, setGoal] = useState('')
  const [showRules, setShowRules] = useState(false)
  return (
    <main className="screen goal-screen">
      <header className="mini-header"><button onClick={onBack} aria-label="Editar avatar">←</button><b>Hora do desafio</b><span /></header>
      <div className="goal-avatar"><Avatar avatar={avatar} size="hero" mood="happy" /></div>
      <div className="floating-sushi"><Sushi animated /></div>
      <motion.section className="goal-card" initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring' }}>
        <span className="eyebrow">DEFINA SEU OBJETIVO</span>
        <h1>Qual é a sua meta<br />de pontos hoje?</h1>
        <div className="free-goal-input">
          <span>🍣</span><input type="text" inputMode="numeric" pattern="[0-9]*" autoFocus value={goal} placeholder="Digite sua meta" onChange={(event) => setGoal(event.target.value.replace(/\D/g, ''))} aria-label="Meta de pontos" />
        </div>
        <p>Você decide o tamanho do desafio.</p>
        <button className="primary-button yellow" disabled={goal === '' || Number(goal) < 1} onClick={() => setShowRules(true)}>Ver regras <span>→</span></button>
      </motion.section>
      {showRules&&<motion.div className="rules-overlay" initial={{opacity:0}} animate={{opacity:1}}>
        <motion.section className="pixel-rules-sheet" initial={{scale:.7,y:35}} animate={{scale:1,y:0}} transition={{type:'spring',damping:17}} aria-labelledby="rules-title">
          <span className="rules-pin" aria-hidden="true">🍣</span>
          <small>ANTES DE COMEÇAR</small>
          <h2 id="rules-title">Tabela de pontos</h2>
          <p>Sua meta é <b>{goal} pontos</b>. Conte assim:</p>
          <div className="points-table" role="table" aria-label="Regras de pontuação">
            <div className="points-head" role="row"><b role="columnheader">Item</b><b role="columnheader">Pontos</b></div>
            <div role="row"><span role="cell">🍣 Sushi unitário</span><strong role="cell">+1</strong></div>
            <div role="row"><span role="cell">🌯 Temaki</span><strong role="cell">+3</strong></div>
            <div role="row"><span role="cell">🥣 Ceviche individual</span><strong role="cell">+1</strong></div>
            <div role="row"><span role="cell">🍄 Shimeji individual</span><strong role="cell">+1</strong></div>
          </div>
          <p className="rules-tip">Some os pontos conforme você come.</p>
          <button className="primary-button yellow" onClick={() => onStart(Number(goal))}>Entendi, começar! <span>→</span></button>
          <button className="rules-back" onClick={() => setShowRules(false)}>Alterar minha meta</button>
        </motion.section>
      </motion.div>}
    </main>
  )
}
