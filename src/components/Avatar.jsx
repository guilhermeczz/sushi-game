import { useMemo } from 'react'
import { Avatar as DiceAvatar, Style } from '@dicebear/core'
import avataaars from '@dicebear/styles/avataaars.json'
import { motion } from 'framer-motion'

export const avatarChoices={
  skins:[{name:'Claro',color:'#f2d3b1'},{name:'Dourado',color:'#ecad80'},{name:'Moreno',color:'#9e5622'},{name:'Escuro',color:'#763900'}],
  hairs:[{name:'Moderno',color:'#2c1b18'},{name:'Loiro',color:'#d6b370'},{name:'Castanho',color:'#724133'},{name:'Rosa',color:'#d76c82'}],
  outfits:[{name:'Coral',color:'#ff5d55'},{name:'Alga',color:'#42ad58'},{name:'Oceano',color:'#3188d2'},{name:'Manga',color:'#ffb928'}],
}

const style=new Style(avataaars)
const boyHair=['shortCurly','shortFlat','shortRound','shavedSides']
const girlHair=['bob','curly','longButNotTooLong','frizzle']
const mouthByMood={sad:'sad',victory:'smile',happy:'smile'}
const clothes=['hoodie','overall','shirtCrewNeck','graphicShirt']

export default function Avatar({avatar,size='large',mood='happy',eating=false,stage=0,staticAvatar=false,className=''}){
  const skinIndex=avatar?.skin??0,hairIndex=avatar?.hair??0,outfitIndex=avatar?.outfit??0
  const skin=avatarChoices.skins[skinIndex].color,shirt=avatarChoices.outfits[outfitIndex].color
  const girl=avatar?.gender==='girl',heightClass=size==='small'?'avatar-small':size==='hero'?'avatar-hero':'avatar-large'
  const avatarImage=useMemo(()=>new DiceAvatar(style,{
    seed:`${girl?'girl':'boy'}-${hairIndex}-${skinIndex}`,
    topVariant:(girl?girlHair:boyHair)[hairIndex],
    hairColor:avatarChoices.hairs[hairIndex].color,
    skinColor:skin,
    clothesVariant:clothes[outfitIndex],
    clothesColor:shirt,
    mouthVariant:eating?'screamOpen':(mouthByMood[mood]||'smile'),
    eyesVariant:mood==='sad'?'cry':'happy',
    eyebrowsVariant:mood==='sad'?'sadConcerned':'defaultNatural',
    facialHairProbability:0,accessoriesProbability:0,
  }).toDataUri(),[girl,hairIndex,skinIndex,skin,outfitIndex,shirt,eating,mood])

  return <div className={`dice-avatar ${heightClass} ${className}`} role="img" aria-label="Avatar personalizado do jogador">
    <motion.div className="dice-avatar-inner" animate={staticAvatar?{}:mood==='victory'?{y:[0,-16,0]}:{}} transition={{repeat:Infinity,duration:.75}}>
      <motion.img className="dice-full" src={avatarImage} alt="" draggable="false" animate={{scaleX:1+stage*.07}} transition={{type:'spring',stiffness:95,damping:18}}/>
      {stage>0&&<motion.div className={`dice-belly stage-${stage}`} initial={{scale:.4}} animate={{scale:1}} style={{background:shirt}}/>}
      {mood==='victory'&&<span className="dice-trophy">🏆</span>}
    </motion.div>
  </div>
}
