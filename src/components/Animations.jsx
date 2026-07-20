import { AnimatePresence, motion } from 'framer-motion'

export function EatingEffects({ bites, onDone }) {
  return (
    <AnimatePresence>
      {bites.map((bite) => <motion.div key={bite} className="flying-real-sushi" initial={{ x: 55, y: 210, scale: .72, rotate: 8, opacity: 1 }} animate={{ x: [55, 20, 0], y: [210, 20, -90], scale: [.72, .48, .15], rotate: [8, -12, -25], opacity: [1, 1, 0] }} exit={{ opacity: 0 }} transition={{ duration: .62, times: [0, .6, 1], ease: [0.22, 1, 0.36, 1] }} onAnimationComplete={() => onDone(bite)}><img src="/assets/sushi-real.png" alt="" /></motion.div>)}
      {bites.map((bite) => <motion.span key={`plus-${bite}`} className="plus-one" initial={{ y: 20, opacity: 0, scale: .5 }} animate={{ y: -60, opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }} transition={{ duration: .7 }}>+1</motion.span>)}
    </AnimatePresence>
  )
}
