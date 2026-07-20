import NiceAvatar from 'react-nice-avatar'
import { motion } from 'framer-motion'

export const hairChoicesByGender={
  boy:[{name:'Volumoso',style:'thick',color:'#2c1b18'},{name:'Moicano',style:'mohawk',color:'#1d2028'},{name:'Clássico',style:'normal',color:'#724133'}],
  girl:[{name:'Longo',style:'womanLong',color:'#2c1b18'},{name:'Curto',style:'womanShort',color:'#724133'},{name:'Longo rosa',style:'womanLong',color:'#d76c82'}],
}
export const avatarChoices={
  skins:[{name:'Claro',color:'#f5c6a5'},{name:'Dourado',color:'#e8a273'},{name:'Moreno',color:'#ad6848'},{name:'Escuro',color:'#70402f'}],
  hairs:hairChoicesByGender.boy,
  outfits:[{name:'Coral',color:'#ff5d55',style:'hoody'},{name:'Alga',color:'#42ad58',style:'short'},{name:'Oceano',color:'#3188d2',style:'polo'},{name:'Manga',color:'#ffb928',style:'hoody'}],
}

export default function Avatar({avatar,size='large',mood='happy',eating=false,stage=0,staticAvatar=false,className=''}){
  const skin=avatarChoices.skins[avatar?.skin??0]
  const hairs=hairChoicesByGender[avatar?.gender==='girl'?'girl':'boy']
  const hair=hairs[(avatar?.hair??0)%hairs.length]
  const outfit=avatarChoices.outfits[avatar?.outfit??0]
  const heightClass=size==='small'?'avatar-small':size==='hero'?'avatar-hero':'avatar-large'
  const config={
    sex:avatar?.gender==='girl'?'woman':'man',faceColor:skin.color,hairColor:hair.color,hairStyle:hair.style,
    shirtColor:outfit.color,shirtStyle:outfit.style,earSize:avatar?.gender==='girl'?'small':'big',
    eyeStyle:mood==='sad'?'smile':'circle',eyeBrowStyle:mood==='sad'?'up':'up',noseStyle:avatar?.gender==='girl'?'round':'short',
    mouthStyle:eating?'laugh':mood==='sad'?'peace':'smile',glassesStyle:'none',hatStyle:'none',bgColor:'transparent',shape:'rounded',
  }
  return <div className={`nice-game-avatar ${heightClass} ${className}`} role="img" aria-label={`Avatar ${config.sex==='woman'?'feminino':'masculino'} personalizado`}>
    <motion.div className="nice-avatar-inner" animate={staticAvatar?{}:mood==='victory'?{y:[0,-16,0]}:{}} transition={{repeat:Infinity,duration:.75}}>
      <motion.div className="nice-avatar-art" animate={{scaleX:1+stage*.06}} transition={{type:'spring',stiffness:100,damping:18}}><NiceAvatar style={{width:'100%',height:'100%'}} {...config}/></motion.div>
      {stage>0&&<motion.div className={`nice-belly stage-${stage}`} initial={{scale:.35}} animate={{scale:1}} style={{background:outfit.color}}/>}
      {mood==='sad'&&<><span className="nice-tear left">💧</span><span className="nice-tear right">💧</span></>}
      {mood==='victory'&&<span className="nice-trophy">🏆</span>}
    </motion.div>
  </div>
}
