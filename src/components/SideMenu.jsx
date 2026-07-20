import { AnimatePresence, motion } from 'framer-motion'

export default function SideMenu({ open, setOpen, theme, setTheme, onEditProfile, onReset }) {
  return (
    <>
      <button className="menu-trigger" onClick={() => setOpen(true)} aria-label="Abrir configurações"><span /><span /><span /></button>
      <AnimatePresence>
        {open && <>
          <motion.button className="menu-backdrop" aria-label="Fechar menu" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="side-menu" initial={{ x: '-105%' }} animate={{ x: 0 }} exit={{ x: '-105%' }} transition={{ type: 'spring', damping: 25, stiffness: 240 }}>
            <header><span>すし</span><div><b>SUSHI COUNT</b><small>Central do jogador</small></div></header>
            <nav>
              <button onClick={() => { onEditProfile(); setOpen(false) }}><i>✎</i><span><b>Nome e avatar</b><small>Personalize seu jogador</small></span><em>›</em></button>
              <div className="theme-setting"><i>{theme === 'dark' ? '☾' : '☀'}</i><span><b>Aparência</b><small>Escolha o tema do app</small></span></div>
              <div className="theme-switch"><button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}>Claro</button><button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}>Escuro</button></div>
            </nav>
            <div className="menu-spacer" />
            <button className="reset-app" onClick={onReset}><i>↻</i><span><b>Reiniciar tudo</b><small>Apaga jogador e progresso</small></span></button>
            <p>Versão 2.0 · Feito para o rodízio</p>
          </motion.aside>
        </>}
      </AnimatePresence>
    </>
  )
}
