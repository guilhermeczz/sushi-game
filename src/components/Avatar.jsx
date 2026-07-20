import { motion } from 'framer-motion'

export const avatarChoices = {
  skins: [
    { name: 'Claro', color: '#ffd1aa' }, { name: 'Dourado', color: '#e8a36f' },
    { name: 'Moreno', color: '#b96d46' }, { name: 'Escuro', color: '#75412f' },
  ],
  hairs: [
    { name: 'Espetado', color: '#242126' }, { name: 'Loiro', color: '#e6a72e' },
    { name: 'Castanho', color: '#743f28' }, { name: 'Rosa', color: '#ef6b9d' },
  ],
  outfits: [
    { name: 'Coral', color: '#ff5d55' }, { name: 'Alga', color: '#46ad58' },
    { name: 'Oceano', color: '#3187d1' }, { name: 'Manga', color: '#ffb928' },
  ],
}

export default function Avatar({ avatar, size = 'large', mood = 'happy', eating = false, stage = 0, staticAvatar = false, className = '' }) {
  const skin = avatarChoices.skins[avatar?.skin ?? 0].color
  const hair = avatarChoices.hairs[avatar?.hair ?? 0].color
  const outfitIndex = avatar?.outfit ?? 0
  const shirt = avatarChoices.outfits[outfitIndex].color
  const girl = avatar?.gender === 'girl'
  const heightClass = size === 'small' ? 'avatar-small' : size === 'hero' ? 'avatar-hero' : 'avatar-large'
  const bodyWidth = 106 + stage * 13

  return (
    <div className={`modular-avatar ${heightClass} ${className}`} role="img" aria-label="Avatar personalizado do jogador">
      <motion.svg viewBox="0 0 260 380" animate={staticAvatar ? {} : mood === 'victory' ? { y: [0, -18, 0] } : {}} transition={{ repeat: Infinity, duration: .75 }}>
        <defs>
          <linearGradient id={`shirt-${outfitIndex}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={shirt}/><stop offset="1" stopColor="#252525" stopOpacity=".24"/></linearGradient>
          <filter id="avatarShadow"><feDropShadow dx="0" dy="7" stdDeviation="5" floodOpacity=".22"/></filter>
        </defs>
        <g filter="url(#avatarShadow)">
          <ellipse cx="130" cy="359" rx={66 + stage * 7} ry="12" fill="#31251f" opacity=".16" />
          <path d="M101 284 90 344M159 284l11 60" stroke={skin} strokeWidth="27" strokeLinecap="round" />
          <path d="M76 351h36M148 351h36" stroke="#302d31" strokeWidth="18" strokeLinecap="round" />
          <motion.path animate={{ d: `M130 190C${130-bodyWidth/2} 190 ${130-bodyWidth/2-5} 288 84 310Q130 ${319+stage*4} 176 310C${130+bodyWidth/2+5} 288 ${130+bodyWidth/2} 190 130 190Z` }} transition={{ type:'spring',stiffness:90,damping:17 }} fill={`url(#shirt-${outfitIndex})`} stroke="#312a29" strokeWidth="5" />
          {stage > 0 && <motion.ellipse initial={{ scale: .4 }} animate={{ scale: 1 }} cx="130" cy="281" rx={31+stage*9} ry={23+stage*5} fill={skin} stroke="#312a29" strokeWidth="4" />}
          <path d="M85 211 57 273M175 211l28 62" stroke={shirt} strokeWidth="25" strokeLinecap="round" /><circle cx="54" cy="279" r="15" fill={skin} stroke="#312a29" strokeWidth="4"/><circle cx="206" cy="279" r="15" fill={skin} stroke="#312a29" strokeWidth="4"/>
          <circle cx="130" cy="126" r="78" fill={skin} stroke="#312a29" strokeWidth="5"/><ellipse cx="62" cy="137" rx="14" ry="21" fill={skin}/><ellipse cx="198" cy="137" rx="14" ry="21" fill={skin}/>
          {girl ? <path d="M53 150Q37 57 92 38q41-27 82 3 45 28 33 111l-22-36-7-50-46-19-45 18-16 52Z" fill={hair} stroke="#312a29" strokeWidth="5"/> : <path d="M53 116 42 79l25 7-4-27 28 8 9-29 22 16 22-28 13 30 32-18-4 33 27-3-18 45-19-36-44 7-33-9-24 41Z" fill={hair} stroke="#312a29" strokeWidth="5" strokeLinejoin="round"/>}
          <path d="M88 112q16-11 31 0M141 112q16-11 31 0" stroke="#332b29" strokeWidth="5" strokeLinecap="round" fill="none"/>
          {mood === 'sad' ? <><path d="M92 136q13-14 26 0M143 136q13-14 26 0" stroke="#332b29" strokeWidth="5" fill="none"/><path d="M110 175q20-18 40 0" stroke="#332b29" strokeWidth="5" fill="none"/><path d="M98 145v32M163 145v32" stroke="#63bde9" strokeWidth="8" strokeLinecap="round"/></> : <><ellipse cx="105" cy="136" rx="8" ry="11" fill="#292327"/><ellipse cx="156" cy="136" rx="8" ry="11" fill="#292327"/><circle cx="108" cy="132" r="3" fill="white"/><circle cx="159" cy="132" r="3" fill="white"/><path d={eating ? 'M96 166Q130 130 164 166Q160 211 130 214Q100 211 96 166Z' : 'M106 169q24 22 48 0'} fill={eating?'#542c2b':'none'} stroke="#332b29" strokeWidth="5" strokeLinecap="round"/>{eating&&<ellipse cx="130" cy="198" rx="19" ry="8" fill="#f47b76"/>}</>}
          <circle cx="78" cy="157" r="10" fill="#ef827a" opacity=".4"/><circle cx="182" cy="157" r="10" fill="#ef827a" opacity=".4"/>
        </g>
        {mood==='victory'&&<text x="184" y="275" fontSize="70">🏆</text>}
      </motion.svg>
    </div>
  )
}
