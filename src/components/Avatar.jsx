import { motion } from 'framer-motion'

export const avatarRoster = [
  { id: 0, gender: 'boy', label: 'Clássico' },
  { id: 1, gender: 'boy', label: 'Aventureiro' },
  { id: 2, gender: 'boy', label: 'Esportivo' },
  { id: 3, gender: 'boy', label: 'Urbano' },
  { id: 4, gender: 'girl', label: 'Clássica' },
  { id: 5, gender: 'girl', label: 'Divertida' },
  { id: 6, gender: 'girl', label: 'Criativa' },
  { id: 7, gender: 'girl', label: 'Aventureira' },
]

export default function Avatar({ avatar, size = 'large', mood = 'happy', eating = false, stage = 0, className = '' }) {
  const id = avatar?.character ?? (avatar?.gender === 'girl' ? 4 : 0)
  const column = id % 4
  const row = Math.floor(id / 4)
  const heightClass = size === 'small' ? 'avatar-small' : size === 'hero' ? 'avatar-hero' : 'avatar-large'
  const positions = ['0%', '33.333%', '66.666%', '100%']

  return (
    <motion.div
      className={`art-avatar ${heightClass} mood-${mood} ${eating ? 'is-eating' : ''} ${className}`}
      animate={mood === 'victory' ? { y: [0, -22, 0], rotate: [-2, 2, -2] } : { y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: mood === 'victory' ? .75 : 2.5, ease: 'easeInOut' }}
      role="img"
      aria-label="Avatar ilustrado do jogador"
    >
      <div className="avatar-art" style={{ backgroundPosition: `${positions[column]} ${row ? '100%' : '0%'}`, '--body-scale': 1 + stage * .07 }} />
      {mood === 'victory' && <span className="avatar-prop trophy">🏆</span>}
      {mood === 'sad' && <><span className="tear left">💧</span><span className="tear right">💧</span></>}
      {eating && <span className="eating-mouth" />}
    </motion.div>
  )
}
