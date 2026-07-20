import { motion } from 'framer-motion'
import Avatar, { avatarOptions } from './Avatar'

const labels = { skin: 'Tom de pele', hair: 'Cabelo', shirt: 'Roupa' }

function OptionRow({ type, value, onChange }) {
  const items = avatarOptions[`${type}s`]
  return (
    <div className="option-block">
      <span>{labels[type]}</span>
      <div className="option-row" role="radiogroup" aria-label={labels[type]}>
        {items.map((color, index) => (
          <button key={color} type="button" className={`swatch ${value === index ? 'selected' : ''}`} style={{ '--swatch': color }} onClick={() => onChange(index)} aria-label={`${labels[type]} ${index + 1}`} aria-pressed={value === index} />
        ))}
      </div>
    </div>
  )
}

export default function AvatarCreator({ avatar, setAvatar, onSave }) {
  const valid = avatar.name.trim().length >= 2
  return (
    <motion.main className="screen onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="brand"><span>すし</span><div><b>SUSHI COUNT</b><small>Quantos você aguenta?</small></div></header>
      <section className="intro">
        <p>Bem-vindo ao rodízio!</p>
        <h1>Crie seu avatar</h1>
      </section>
      <div className="avatar-stage"><div className="sunburst" /><Avatar avatar={avatar} size="small" /></div>
      <form className="creator-card" onSubmit={(event) => { event.preventDefault(); if (valid) onSave() }}>
        <label className="name-field">Nome do jogador<input value={avatar.name} maxLength={18} placeholder="Digite seu nome" onChange={(event) => setAvatar({ ...avatar, name: event.target.value })} /></label>
        <div className="gender-tabs">
          <button type="button" className={avatar.gender === 'boy' ? 'active' : ''} onClick={() => setAvatar({ ...avatar, gender: 'boy' })}>Menino</button>
          <button type="button" className={avatar.gender === 'girl' ? 'active' : ''} onClick={() => setAvatar({ ...avatar, gender: 'girl' })}>Menina</button>
        </div>
        <OptionRow type="skin" value={avatar.skin} onChange={(skin) => setAvatar({ ...avatar, skin })} />
        <OptionRow type="hair" value={avatar.hair} onChange={(hair) => setAvatar({ ...avatar, hair })} />
        <OptionRow type="shirt" value={avatar.shirt} onChange={(shirt) => setAvatar({ ...avatar, shirt })} />
        <button className="primary-button" disabled={!valid}>Salvar avatar <span>→</span></button>
      </form>
    </motion.main>
  )
}
