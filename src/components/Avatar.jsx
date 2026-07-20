import { motion } from 'framer-motion'

export const customization = {
  skins: ['#ffd1aa', '#e8aa78', '#b96f45', '#75432f'],
  hairs: [0, 1, 2, 3, 4, 5, 6, 7],
  outfits: [0, 1, 2, 3, 4, 5, 6, 7],
}

const positions = ['0%', '33.333%', '66.666%', '100%']
const layerStyle = (id) => ({ backgroundPosition: `${positions[id % 4]} ${id >= 4 ? '100%' : '0%'}` })

export default function Avatar({ avatar, size = 'large', mood = 'happy', eating = false, stage = 0, className = '' }) {
  const genderOffset = avatar?.gender === 'girl' ? 4 : 0
  const hair = genderOffset + ((avatar?.hair ?? 0) % 4)
  const skinBrightness = [1, .92, .76, .58][avatar?.skin ?? 0]
  const outfitColors = ['#292929', '#ff5d22', '#50b858', '#2688ce']
  const heightClass = size === 'small' ? 'avatar-small' : size === 'hero' ? 'avatar-hero' : 'avatar-large'

  return (
    <motion.div className={`art-avatar ${heightClass} mood-${mood} ${eating ? 'is-eating' : ''} ${className}`} animate={mood === 'victory' ? { y: [0, -20, 0], rotate: [-2, 2, -2] } : { y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: mood === 'victory' ? .75 : 2.5, ease: 'easeInOut' }} role="img" aria-label="Avatar personalizado do jogador">
      <motion.div className="avatar-composite" style={{ '--outfit-color': outfitColors[avatar?.outfit ?? 0] }} animate={{ scaleX: 1 + stage * .065 }} transition={{ type: 'spring', stiffness: 100, damping: 16 }}>
        <div className="avatar-art avatar-base" style={{ ...layerStyle(hair), filter: `brightness(${skinBrightness}) saturate(${1 + (avatar?.skin ?? 0) * .08}) hue-rotate(${(avatar?.outfit ?? 0) * 18}deg)` }} />
        {stage > 0 && <motion.div className={`avatar-belly stage-${stage}`} initial={{ scale: .4 }} animate={{ scale: 1 }} />}
      </motion.div>
      {mood === 'victory' && <span className="avatar-prop trophy">🏆</span>}
      {mood === 'sad' && <><span className="tear left">💧</span><span className="tear right">💧</span></>}
      {eating && <motion.span className="eating-mouth" initial={{ scaleY: .2 }} animate={{ scaleY: 1 }} />}
    </motion.div>
  )
}
