import { motion } from 'framer-motion'
import Avatar, { customization } from './Avatar'

const hairNames = ['Preto', 'Loiro', 'Castanho', 'Boné']
const girlHairNames = ['Liso', 'Coques', 'Rosa', 'Cacheado']
const outfitColors = ['#282828', '#f06422', '#4caf50', '#287dc1']

export default function AvatarCreator({ avatar, setAvatar, onSave }) {
  const valid = avatar.name.trim().length >= 2
  const changeGender = (gender) => setAvatar({ ...avatar, gender, hair: 0, outfit: 0 })
  return (
    <motion.main className="screen onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="brand"><span>すし</span><div><b>SUSHI COUNT</b><small>Seu desafio começa aqui</small></div></header>
      <section className="intro"><p>Monte seu jogador</p><h1>Crie seu avatar</h1></section>
      <div className="avatar-stage"><div className="sunburst" /><Avatar avatar={avatar} size="small" /></div>
      <form className="creator-card polished" onSubmit={(event) => { event.preventDefault(); if (valid) onSave() }}>
        <label className="name-field">NOME DO JOGADOR<input value={avatar.name} maxLength={18} placeholder="Como podemos te chamar?" onChange={(event) => setAvatar({ ...avatar, name: event.target.value })} /></label>
        <div className="gender-tabs"><button type="button" className={avatar.gender === 'boy' ? 'active' : ''} onClick={() => changeGender('boy')}>Menino</button><button type="button" className={avatar.gender === 'girl' ? 'active' : ''} onClick={() => changeGender('girl')}>Menina</button></div>
        <Customizer label="Tom de pele">{customization.skins.map((color, index) => <button key={color} type="button" className={`custom-dot skin ${avatar.skin === index ? 'selected' : ''}`} style={{ '--choice': color }} onClick={() => setAvatar({ ...avatar, skin: index })} aria-label={`Tom de pele ${index + 1}`} />)}</Customizer>
        <Customizer label="Cabelo">{[0,1,2,3].map((value) => <button key={value} type="button" className={`text-choice ${avatar.hair === value ? 'selected' : ''}`} onClick={() => setAvatar({ ...avatar, hair: value })}>{avatar.gender === 'girl' ? girlHairNames[value] : hairNames[value]}</button>)}</Customizer>
        <Customizer label="Roupa">{outfitColors.map((color, index) => <button key={color} type="button" className={`custom-dot outfit ${avatar.outfit === index ? 'selected' : ''}`} style={{ '--choice': color }} onClick={() => setAvatar({ ...avatar, outfit: index })} aria-label={`Roupa ${index + 1}`} />)}</Customizer>
        <button className="primary-button" disabled={!valid}>Salvar e continuar <span>→</span></button>
      </form>
    </motion.main>
  )
}

function Customizer({ label, children }) { return <div className="customizer"><b>{label}</b><div>{children}</div></div> }
