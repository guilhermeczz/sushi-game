import { motion } from 'framer-motion'
import Avatar from './Avatar'

export default function ResultScreen({ won, avatar, count, goal, onRestart }) {
  return (
    <main className={`screen result ${won ? 'win' : 'lose'}`}>
      <div className="confetti" aria-hidden="true">✦ · ◆ ✦ · ◆</div>
      <motion.section initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }}>
        <span className="result-pill">{won ? 'DESAFIO CONCLUÍDO' : 'FIM DE JOGO'}</span>
        <h1>{won ? <>META<br />ATINGIDA!</> : <>QUASE<br />LÁ!</>}</h1>
        <p>{won ? `Mandou muito bem, ${avatar.name}!` : 'O desafio terminou, mas valeu a tentativa.'}</p>
      </motion.section>
      <div className="result-avatar"><Avatar avatar={avatar} size="hero" mood={won ? 'victory' : 'sad'} stage={count >= 100 ? 5 : count >= 80 ? 4 : count >= 60 ? 3 : count >= 40 ? 2 : count >= 20 ? 1 : 0} /></div>
      <div className="final-score"><span>PLACAR FINAL</span><strong>{count}<small> / {goal} pontos</small></strong></div>
      {won && <div className="over-goal"><span>🔥</span><div><b>+{Math.max(0, count - goal)} pontos</b><small>ALÉM DA META</small></div></div>}
      <button className="primary-button yellow" onClick={onRestart}>{won ? 'Jogar novamente' : 'Tentar novamente'} <span>↻</span></button>
    </main>
  )
}
