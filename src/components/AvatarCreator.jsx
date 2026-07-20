import { motion } from 'framer-motion'
import Avatar, { avatarRoster } from './Avatar'

export default function AvatarCreator({ avatar, setAvatar, onSave }) {
  const valid = avatar.name.trim().length >= 2
  const choices = avatarRoster.filter((item) => item.gender === avatar.gender)
  const selectGender = (gender) => setAvatar({ ...avatar, gender, character: gender === 'girl' ? 4 : 0 })
  return (
    <motion.main className="screen onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="brand"><span>すし</span><div><b>SUSHI COUNT</b><small>Quantos você aguenta?</small></div></header>
      <section className="intro"><p>Bem-vindo ao rodízio!</p><h1>Escolha seu jogador</h1></section>
      <div className="avatar-stage"><div className="sunburst" /><Avatar avatar={avatar} size="small" /></div>
      <form className="creator-card polished" onSubmit={(event) => { event.preventDefault(); if (valid) onSave() }}>
        <label className="name-field">NOME DO JOGADOR<input value={avatar.name} maxLength={18} placeholder="Como podemos te chamar?" onChange={(event) => setAvatar({ ...avatar, name: event.target.value })} /></label>
        <div className="gender-tabs">
          <button type="button" className={avatar.gender === 'boy' ? 'active' : ''} onClick={() => selectGender('boy')}>Meninos</button>
          <button type="button" className={avatar.gender === 'girl' ? 'active' : ''} onClick={() => selectGender('girl')}>Meninas</button>
        </div>
        <div className="character-grid">
          {choices.map((item) => (
            <button key={item.id} type="button" className={avatar.character === item.id ? 'selected' : ''} onClick={() => setAvatar({ ...avatar, character: item.id })} aria-label={`Avatar ${item.label}`}>
              <Avatar avatar={{ ...avatar, character: item.id }} size="small" /><span>{item.label}</span>
            </button>
          ))}
        </div>
        <button className="primary-button" disabled={!valid}>Entrar no rodízio <span>→</span></button>
      </form>
    </motion.main>
  )
}
