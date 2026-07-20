import { useState } from 'react'
import { motion } from 'framer-motion'
import Avatar from './Avatar'
import Sushi from './Sushi'

export default function GoalScreen({ avatar, onStart, onBack }) {
  const [goal, setGoal] = useState('')
  return (
    <main className="screen goal-screen">
      <header className="mini-header"><button onClick={onBack} aria-label="Editar avatar">←</button><b>Hora do desafio</b><span /></header>
      <div className="goal-avatar"><Avatar avatar={avatar} size="hero" mood="happy" /></div>
      <div className="floating-sushi"><Sushi animated /></div>
      <motion.section className="goal-card" initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring' }}>
        <span className="eyebrow">DEFINA SEU OBJETIVO</span>
        <h1>Qual é a sua meta<br />de peças hoje?</h1>
        <div className="free-goal-input">
          <span>🍣</span><input type="text" inputMode="numeric" pattern="[0-9]*" autoFocus value={goal} placeholder="Digite sua meta" onChange={(event) => setGoal(event.target.value.replace(/\D/g, ''))} aria-label="Meta de peças" />
        </div>
        <p>Você decide o tamanho do desafio.</p>
        <button className="primary-button yellow" disabled={goal === ''} onClick={() => onStart(Number(goal))}>Começar desafio <span>→</span></button>
      </motion.section>
    </main>
  )
}
