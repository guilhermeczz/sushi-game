import { motion } from 'framer-motion'

export const pixelCharacters={
  boy:[{id:0,name:'Clássico'},{id:1,name:'Street'},{id:2,name:'Careca'},{id:3,name:'Urban'}],
  girl:[{id:4,name:'Clássica'},{id:5,name:'Sunny'},{id:6,name:'Fun'},{id:7,name:'Afro'}],
}
const xPositions=['0%','33.333%','66.666%','100%']
const xCorrections=['0%','1.5%','10%','16%']
const shirtColors=['#181818','#f06420','#536f2c','#2273b6','#ef6e93','#efad24','#28628e','#28628e']
const skinColors=['#f0a06b','#f0a06b','#e99a62','#e99a62','#f0a06b','#f0a06b','#f0a06b','#92502d']
export default function Avatar({avatar,size='large',mood='happy',eating=false,stage=0,staticAvatar=false,className=''}){
  const fallback=avatar?.gender==='girl'?4:0,id=avatar?.character??fallback,col=id%4,row=id>=4?1:0
  const sheet=id===2?"url('/assets/pixel-avatars-v2.png')":"url('/assets/pixel-avatars.png')"
  const heightClass=size==='small'?'avatar-small':size==='hero'?'avatar-hero':'avatar-large'
  return <div className={`premium-pixel-avatar ${heightClass} ${className}`} role="img" aria-label="Avatar pixel art do jogador">
    <motion.div className="premium-pixel-inner" animate={staticAvatar?{}:mood==='victory'?{y:[0,-14,0]}:{}} transition={{repeat:Infinity,duration:.7}}>
      <div className="premium-pixel-sprite" style={{backgroundImage:sheet,backgroundPosition:`${xPositions[col]} ${row?'100%':'0%'}`,left:xCorrections[col]}}/>
      {stage>0&&<motion.div key={stage} className={`growing-pixel-belly belly-${stage}`} style={{'--belly-shirt':shirtColors[id],'--belly-skin':skinColors[id]}} initial={{scale:.65,opacity:0}} animate={{scale:[.65,1.08,1],opacity:1}} transition={{duration:.55,ease:'easeOut'}}><span aria-hidden="true" /></motion.div>}
      {eating&&<motion.span className="pixel-eating" initial={{scale:.3}} animate={{scale:1}}>🍣</motion.span>}
      {mood==='sad'&&<span className="premium-tears">💧  💧</span>}
      {mood==='victory'&&<span className="premium-trophy">🏆</span>}
    </motion.div>
  </div>
}
