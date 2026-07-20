import { motion } from 'framer-motion'
import Avatar,{playerCharacters} from './Avatar'

export default function AvatarCreator({avatar,setAvatar,onSave}){
  const valid=avatar.name.trim().length>=2,list=playerCharacters
  const currentIndex=Math.max(0,list.findIndex((item)=>item.id===(avatar.character??list[0].id))),current=list[currentIndex]
  const change=(direction)=>{const next=(currentIndex+direction+list.length)%list.length;setAvatar({...avatar,character:list[next].id})}
  return <motion.main className="screen onboarding" initial={{opacity:0}} animate={{opacity:1}}>
    <header className="brand"><span>すし</span><div><b>SUSHI COUNT</b><small>Seu desafio começa aqui</small></div></header>
    <section className="intro"><p>Escolha seu jogador</p><h1>Seu avatar pixel</h1></section>
    <div className="avatar-stage fixed-avatar"><div className="sunburst"/><Avatar avatar={{...avatar,character:current.id}} size="small" staticAvatar/></div>
    <form className="creator-card polished pixel-creator" onSubmit={(e)=>{e.preventDefault();if(valid)onSave()}}>
      <label className="name-field">NOME DO JOGADOR<input value={avatar.name} maxLength={18} placeholder="Como podemos te chamar?" onChange={(e)=>setAvatar({...avatar,name:e.target.value})}/></label>
      <div className="pixel-character-picker"><b>PERSONAGEM</b><div><button type="button" onClick={()=>change(-1)} aria-label="Personagem anterior">‹</button><span><Avatar avatar={{...avatar,character:current.id}} size="small" staticAvatar/><strong>{current.name}</strong></span><button type="button" onClick={()=>change(1)} aria-label="Próximo personagem">›</button></div><small>{currentIndex+1} de {list.length}</small></div>
      <button className="primary-button" disabled={!valid}>Salvar e continuar <span>→</span></button>
    </form>
  </motion.main>
}
