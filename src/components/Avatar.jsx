import { motion } from 'framer-motion'

const skins = ['#f6c89f', '#e9a66f', '#bd7448', '#7b432e']
const shirts = ['#ff6157', '#45a967', '#438ad9', '#ffbd2e']
const hairs = ['#252226', '#6e432b', '#e2a32c', '#bd5b42']

export const avatarOptions = { skins, shirts, hairs }

export default function Avatar({ avatar, size = 'large', mood = 'happy', eating = false, stage = 0, className = '' }) {
  const skin = skins[avatar?.skin ?? 0]
  const shirt = shirts[avatar?.shirt ?? 0]
  const hair = hairs[avatar?.hair ?? 0]
  const girl = avatar?.gender === 'girl'
  const width = stage === 0 ? 116 : stage === 1 ? 139 : stage === 2 ? 158 : 174
  const heightClass = size === 'small' ? 'h-52' : size === 'hero' ? 'h-[43vh]' : 'h-[34vh]'

  return (
    <motion.svg
      viewBox="0 0 260 380"
      className={`${heightClass} max-w-full overflow-visible ${className}`}
      animate={mood === 'victory' ? { y: [0, -22, 0], rotate: [-2, 2, -2] } : { y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: mood === 'victory' ? .8 : 2.4, ease: 'easeInOut' }}
      role="img"
      aria-label="Avatar do jogador"
    >
      <ellipse cx="130" cy="359" rx={stage > 1 ? 88 : 68} ry="13" fill="#33251b" opacity=".13" />
      <path d="M92 270 77 350M168 270l15 80" stroke={skin} strokeWidth="30" strokeLinecap="round" />
      <path d="M72 350h32M156 350h32" stroke="#333" strokeWidth="17" strokeLinecap="round" />
      <path d={`M130 190 C${130-width/2} 190 ${130-width/2} 287 82 310 Q130 ${327 + stage*5} 178 310 C${130+width/2} 287 ${130+width/2} 190 130 190Z`} fill={shirt} stroke="#333" strokeWidth="5" />
      {stage > 0 && <ellipse cx="130" cy="283" rx={35 + stage*13} ry={25 + stage*7} fill={skin} stroke="#333" strokeWidth="4" />}
      <path d="M80 211 52 276M180 211l28 65" stroke={shirt} strokeWidth="27" strokeLinecap="round" />
      <circle cx="49" cy="281" r="16" fill={skin} stroke="#333" strokeWidth="4" />
      <circle cx="211" cy="281" r="16" fill={skin} stroke="#333" strokeWidth="4" />
      <circle cx="130" cy="126" r="82" fill={skin} stroke="#333" strokeWidth="5" />
      <ellipse cx="61" cy="137" rx="16" ry="23" fill={skin} stroke="#333" strokeWidth="4" />
      <ellipse cx="199" cy="137" rx="16" ry="23" fill={skin} stroke="#333" strokeWidth="4" />
      {girl ? (
        <path d="M51 143Q35 56 92 39q38-29 84 3 43 22 32 104l-19-31-8-43-39-25-50 17-23 53Z" fill={hair} stroke="#333" strokeWidth="5" />
      ) : (
        <path d="M52 116 42 79l25 7-5-27 28 8 9-30 23 17 22-29 13 31 33-19-5 34 28-3-18 45-19-36-45 7-32-9-25 37Z" fill={hair} stroke="#333" strokeWidth="5" strokeLinejoin="round" />
      )}
      <path d="M91 113q15-11 29 0M141 113q15-11 29 0" stroke="#333" strokeWidth="5" strokeLinecap="round" fill="none" />
      {mood === 'sad' ? (
        <>
          <path d="M92 135q13-14 26 0M143 135q13-14 26 0" stroke="#333" strokeWidth="5" fill="none" />
          <path d="M110 174q20-18 40 0" stroke="#333" strokeWidth="5" fill="none" />
          <path d="M98 143q-8 14-2 28M164 143q8 14 2 28" stroke="#69bdea" strokeWidth="8" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="105" cy="136" rx="7" ry="10" fill="#242124" /><ellipse cx="156" cy="136" rx="7" ry="10" fill="#242124" />
          <path d={eating ? 'M96 165Q130 127 164 165Q160 213 130 216Q100 213 96 165Z' : 'M105 168q25 24 50 0'} fill={eating ? '#542c2b' : 'none'} stroke="#333" strokeWidth="5" strokeLinecap="round" />
          {eating && <ellipse cx="130" cy="198" rx="20" ry="9" fill="#f47b76" />}
        </>
      )}
      <circle cx="78" cy="157" r="10" fill="#ed8e83" opacity=".45" /><circle cx="183" cy="157" r="10" fill="#ed8e83" opacity=".45" />
      {mood === 'victory' && (
        <g transform="translate(180 190)">
          <path d="M10 8h49v40q-4 29-24 29T10 48Z" fill="#ffd43b" stroke="#9c6311" strokeWidth="4" />
          <path d="M10 18H-4q0 32 25 31M59 18h14q0 32-25 31M35 76v24M17 101h36" fill="none" stroke="#9c6311" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
    </motion.svg>
  )
}
