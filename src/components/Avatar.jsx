import { motion } from 'framer-motion'

export const pixelCharacters={
  boy:[{id:0,name:'Clássico'},{id:1,name:'Street'},{id:2,name:'Careca'},{id:3,name:'Urban'}],
  girl:[{id:4,name:'Clássica'},{id:5,name:'Sunny'},{id:6,name:'Fun'},{id:7,name:'Afro'}],
}
const xPositions=['0%','33.333%','66.666%','100%']
const xCorrections=['0%','1.5%','10%','16%']
export default function Avatar({avatar,size='large',mood='happy',eating=false,stage=0,staticAvatar=false,className=''}){
  const fallback=avatar?.gender==='girl'?4:0,id=avatar?.character??fallback,col=id%4,row=id>=4?1:0
  const sheet=id===2?"url('/assets/pixel-avatars-v2.png')":"url('/assets/pixel-avatars.png')"
  const heightClass=size==='small'?'avatar-small':size==='hero'?'avatar-hero':'avatar-large'
  return <div className={`premium-pixel-avatar ${heightClass} ${className}`} role="img" aria-label="Avatar pixel art do jogador">
    <motion.div className="premium-pixel-inner" animate={staticAvatar?{}:mood==='victory'?{y:[0,-14,0]}:{}} transition={{repeat:Infinity,duration:.7}}>
      <div className="premium-pixel-sprite" style={{backgroundImage:sheet,backgroundPosition:`${xPositions[col]} ${row?'100%':'0%'}`,left:xCorrections[col]}}/>
      {stage>0&&<motion.div key={`rank-${stage}`} className={`rank-accessory rank-${stage}`} initial={{scale:.45,opacity:0,y:-10}} animate={{scale:[.45,1.14,1],opacity:1,y:0}} transition={{duration:.55,ease:'easeOut'}} aria-hidden="true"><i>{stage>=3?'★':''}</i></motion.div>}
      {stage>0&&<motion.div key={`plates-${stage}`} className={`plate-stack plates-${stage} mood-${mood}`} initial={{x:18,opacity:0}} animate={{x:0,opacity:1}} aria-label={`${stage} pratos conquistados`}>{Array.from({length:stage},(_,index)=><i key={index}/>)}</motion.div>}
      {eating&&<motion.span className="pixel-eating" initial={{scale:.3}} animate={{scale:1}}>🍣</motion.span>}
      {mood==='sad'&&<span className="premium-tears">💧  💧</span>}
      {mood==='victory'&&<span className="premium-trophy">🏆</span>}
    </motion.div>
  </div>
}
