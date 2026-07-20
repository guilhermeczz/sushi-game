import { motion } from 'framer-motion'

export const avatarModels = [
  { id: 0, gender: 'boy', name: 'Clássico', outfit: 'Camiseta preta' },
  { id: 1, gender: 'boy', name: 'Street', outfit: 'Moletom laranja' },
  { id: 2, gender: 'boy', name: 'Sport', outfit: 'Camiseta verde' },
  { id: 3, gender: 'boy', name: 'Urban', outfit: 'Moletom azul' },
  { id: 4, gender: 'girl', name: 'Clássica', outfit: 'Camiseta rosa' },
  { id: 5, gender: 'girl', name: 'Fun', outfit: 'Jardineira azul' },
  { id: 6, gender: 'girl', name: 'Pop', outfit: 'Vestido roxo' },
  { id: 7, gender: 'girl', name: 'Sunny', outfit: 'Jardineira amarela' },
]

const positions = ['0%', '33.333%', '66.666%', '100%']
const layerStyle = (id) => ({ backgroundPosition: `${positions[id % 4]} ${id >= 4 ? '100%' : '0%'}` })

export default function Avatar({ avatar, size = 'large', mood = 'happy', eating = false, stage = 0, staticAvatar = false, className = '' }) {
  const genderOffset = avatar?.gender === 'girl' ? 4 : 0
  const model = avatar?.character ?? (genderOffset + ((avatar?.hair ?? 0) % 4))
  const heightClass = size === 'small' ? 'avatar-small' : size === 'hero' ? 'avatar-hero' : 'avatar-large'

  return (
    <motion.div className={`art-avatar ${heightClass} mood-${mood} ${eating ? 'is-eating' : ''} ${className}`} animate={staticAvatar ? {} : mood === 'victory' ? { y: [0, -20, 0], rotate: [-2, 2, -2] } : { y: [0, -3, 0] }} transition={staticAvatar ? { duration: 0 } : { repeat: Infinity, duration: mood === 'victory' ? .75 : 2.5, ease: 'easeInOut' }} role="img" aria-label="Avatar personalizado do jogador">
      <motion.div className="avatar-composite" animate={{ scaleX: 1 + stage * .065 }} transition={{ type: 'spring', stiffness: 100, damping: 16 }}>
        <div className="avatar-art avatar-base" style={layerStyle(model)} />
        {stage > 0 && <motion.div className={`avatar-belly stage-${stage}`} initial={{ scale: .4 }} animate={{ scale: 1 }} />}
      </motion.div>
      {mood === 'victory' && <span className="avatar-prop trophy">🏆</span>}
      {mood === 'sad' && <><span className="tear left">💧</span><span className="tear right">💧</span></>}
      {eating && <motion.span className="eating-mouth" initial={{ scaleY: .2 }} animate={{ scaleY: 1 }} />}
    </motion.div>
  )
}
