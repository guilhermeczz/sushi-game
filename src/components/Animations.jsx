import { AnimatePresence, motion } from 'framer-motion'
import Sushi from './Sushi'

export function FlyingSushi({ id }) {
  return (
    <AnimatePresence>
      {id > 0 && (
        <motion.div key={id} className="flying-sushi" initial={{ x: 90, y: 170, scale: 1, rotate: 20, opacity: 1 }} animate={{ x: 0, y: -120, scale: .28, rotate: -25, opacity: .9 }} exit={{ opacity: 0 }} transition={{ duration: .55, ease: 'easeIn' }}>
          <Sushi />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function PlusOne({ id }) {
  return <AnimatePresence>{id > 0 && <motion.span key={id} className="plus-one" initial={{ y: 0, opacity: 1, scale: .6 }} animate={{ y: -70, opacity: 0, scale: 1.3 }} transition={{ duration: .7 }}>+1</motion.span>}</AnimatePresence>
}
