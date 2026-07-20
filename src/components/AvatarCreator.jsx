import { motion } from 'framer-motion'
import Avatar, { avatarModels } from './Avatar'

export default function AvatarCreator({ avatar, setAvatar, onSave }) {
  const valid = avatar.name.trim().length >= 2
  const models = avatarModels.filter((model) => model.gender === avatar.gender)
  const selected = avatar.character ?? (avatar.gender === 'girl' ? 4 : 0)
  const changeGender = (gender) => setAvatar({ ...avatar, gender, character: gender === 'girl' ? 4 : 0 })

  return (
    <motion.main className="screen onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="brand"><span>すし</span><div><b>SUSHI COUNT</b><small>Seu desafio começa aqui</small></div></header>
      <section className="intro"><p>Escolha seu jogador</p><h1>Monte seu avatar</h1></section>
      <div className="avatar-stage"><div className="sunburst" /><Avatar avatar={{ ...avatar, character: selected }} size="small" staticAvatar /></div>
      <form className="creator-card polished" onSubmit={(event) => { event.preventDefault(); if (valid) onSave() }}>
        <label className="name-field">NOME DO JOGADOR<input value={avatar.name} maxLength={18} placeholder="Como podemos te chamar?" onChange={(event) => setAvatar({ ...avatar, name: event.target.value })} /></label>
        <div className="gender-tabs"><button type="button" className={avatar.gender === 'boy' ? 'active' : ''} onClick={() => changeGender('boy')}>Menino</button><button type="button" className={avatar.gender === 'girl' ? 'active' : ''} onClick={() => changeGender('girl')}>Menina</button></div>
        <div className="model-section"><div><b>ESCOLHA O ESTILO</b><small>Toque para experimentar</small></div><div className="model-picker">
          {models.map((model) => <button key={model.id} type="button" className={selected === model.id ? 'selected' : ''} onClick={() => setAvatar({ ...avatar, character: model.id })} aria-label={`${model.name}, ${model.outfit}`}>
            <Avatar avatar={{ ...avatar, character: model.id }} size="small" staticAvatar />
            <span><b>{model.name}</b><small>{model.outfit}</small></span>
          </button>)}
        </div></div>
        <button className="primary-button" disabled={!valid}>Salvar e continuar <span>→</span></button>
      </form>
    </motion.main>
  )
}
