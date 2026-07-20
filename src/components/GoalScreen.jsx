import { useState } from 'react'
import { motion } from 'framer-motion'
import Avatar from './Avatar'
import Sushi from './Sushi'

export default function GoalScreen({ avatar, onStart, onBack }) {
  const [goal, setGoal] = useState(50)
  const adjust = (amount) => setGoal((value) => Math.min(999, Math.max(1, value + amount)))
  return (
    <main className="screen goal-screen">
      <header className="mini-header"><button onClick={onBack} aria-label="Editar avatar">←</button><b>Hora do desafio</b><span /></header>
      <div className="goal-avatar"><Avatar avatar={avatar} size="hero" mood="happy" /></div>
      <div className="floating-sushi"><Sushi animated /></div>
      <motion.section className="goal-card" initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring' }}>
        <span className="eyebrow">DEFINA SEU OBJETIVO</span>
        <h1>Qual é a sua meta<br />de peças hoje?</h1>
        <div className="stepper">
          <button onClick={() => adjust(-5)} aria-label="Diminuir meta">−</button>
          <input type="number" inputMode="numeric" min="1" max="999" value={goal} onChange={(event) => setGoal(Math.min(999, Math.max(1, Number(event.target.value) || 1)))} aria-label="Meta de peças" />
          <button onClick={() => adjust(5)} aria-label="Aumentar meta">+</button>
        </div>
        <p>Comece com coragem. Termine como uma lenda.</p>
        <button className="primary-button yellow" onClick={() => onStart(goal)}>Começar desafio <span>→</span></button>
      </motion.section>
    </main>
  )
}
