import { motion } from 'framer-motion'

export default function Sushi({ className = '', animated = false }) {
  const Component = animated ? motion.svg : 'svg'
  return (
    <Component
      viewBox="0 0 180 120"
      className={className}
      aria-label="Sushi de salmão"
      {...(animated ? { animate: { y: [0, -10, 0], rotate: [-2, 2, -2] }, transition: { repeat: Infinity, duration: 1.7 } } : {})}
    >
      <defs>
        <linearGradient id="salmon" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ff806b" />
          <stop offset="1" stopColor="#f04438" />
        </linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="5" stdDeviation="4" floodOpacity=".2" /></filter>
      </defs>
      <g filter="url(#shadow)">
        <path d="M38 62c8-19 28-29 54-29s45 9 52 29l-10 33H47Z" fill="#fff7ed" stroke="#e9d8c8" strokeWidth="4" />
        <g fill="#fff"><circle cx="55" cy="78" r="12"/><circle cx="77" cy="82" r="13"/><circle cx="101" cy="81" r="13"/><circle cx="124" cy="77" r="12"/></g>
        <path d="M29 60c9-29 34-43 65-43 33 0 56 15 62 43-29 15-94 17-127 0Z" fill="url(#salmon)" stroke="#d93d32" strokeWidth="4" />
        <path d="M52 47c14-8 27-13 42-13M80 61c18-10 31-14 47-14M112 27c10 6 18 14 24 25" fill="none" stroke="#ffb19e" strokeWidth="5" strokeLinecap="round" />
      </g>
    </Component>
  )
}
