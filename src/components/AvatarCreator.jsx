import { motion } from 'framer-motion'
import Avatar, { avatarChoices, hairChoicesByGender } from './Avatar'

export default function AvatarCreator({ avatar, setAvatar, onSave }) {
  const valid = avatar.name.trim().length >= 2
  const hairOptions=hairChoicesByGender[avatar.gender==='girl'?'girl':'boy']
  const change = (key, direction) => {
    const options = key==='hair'?hairOptions:avatarChoices[`${key}s`]
    setAvatar({ ...avatar, [key]: ((avatar[key] ?? 0) + direction + options.length) % options.length })
  }
  return (
    <motion.main className="screen onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="brand"><span>すし</span><div><b>SUSHI COUNT</b><small>Seu desafio começa aqui</small></div></header>
      <section className="intro"><p>Crie um jogador único</p><h1>Monte seu avatar</h1></section>
      <div className="avatar-stage fixed-avatar"><div className="sunburst"/><Avatar avatar={avatar} size="small" staticAvatar /></div>
      <form className="creator-card polished" onSubmit={(event)=>{event.preventDefault();if(valid)onSave()}}>
        <label className="name-field">NOME DO JOGADOR<input value={avatar.name} maxLength={18} placeholder="Como podemos te chamar?" onChange={(event)=>setAvatar({...avatar,name:event.target.value})}/></label>
        <div className="gender-tabs"><button type="button" className={avatar.gender==='boy'?'active':''} onClick={()=>setAvatar({...avatar,gender:'boy',hair:0})}>Menino</button><button type="button" className={avatar.gender==='girl'?'active':''} onClick={()=>setAvatar({...avatar,gender:'girl',hair:0})}>Menina</button></div>
        <ChoiceCarousel label="Tom de pele" option={avatarChoices.skins[avatar.skin??0]} type="skin" onPrev={()=>change('skin',-1)} onNext={()=>change('skin',1)}/>
        <ChoiceCarousel label="Cabelo" option={hairOptions[(avatar.hair??0)%hairOptions.length]} type="hair" onPrev={()=>change('hair',-1)} onNext={()=>change('hair',1)}/>
        <ChoiceCarousel label="Roupa" option={avatarChoices.outfits[avatar.outfit??0]} type="outfit" onPrev={()=>change('outfit',-1)} onNext={()=>change('outfit',1)}/>
        <button className="primary-button" disabled={!valid}>Salvar e continuar <span>→</span></button>
      </form>
    </motion.main>
  )
}

function ChoiceCarousel({label,option,type,onPrev,onNext}){return <div className="choice-carousel"><b>{label}</b><div><button type="button" onClick={onPrev} aria-label={`Anterior: ${label}`}>‹</button><span className={`choice-preview ${type}`} style={{'--preview':option.color}}>{type==='hair'&&<i/>}{type==='outfit'&&<i/>}</span><strong>{option.name}</strong><button type="button" onClick={onNext} aria-label={`Próximo: ${label}`}>›</button></div></div>}
