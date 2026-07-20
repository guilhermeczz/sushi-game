import { motion } from 'framer-motion'

export const avatarChoices = {
  skins: [{ name:'Claro',color:'#ffd0a8'},{name:'Dourado',color:'#e5a06c'},{name:'Moreno',color:'#b96e48'},{name:'Escuro',color:'#70402f'}],
  hairs: [{name:'Espetado',color:'#242126'},{name:'Loiro',color:'#e4a52c'},{name:'Castanho',color:'#70402a'},{name:'Rosa',color:'#ee6a9d'}],
  outfits: [{name:'Coral',color:'#ff5d55'},{name:'Alga',color:'#42ad58'},{name:'Oceano',color:'#3188d2'},{name:'Manga',color:'#ffb928'}],
}

const boyHair = [
  'M49 122 38 82l28 7-3-30 29 9 9-33 24 20 24-31 15 35 35-18-6 35 28-4-18 47-21-37-44 5-35-10-30 43Z',
  'M48 120Q41 59 88 42q45-24 84 4 37 17 38 69l-25-34-31 2-15-22-17 20-25-12-23 46Z',
  'M48 119Q43 58 91 40q54-22 91 15 28 28 23 65l-20-37-36-14-28 14-28-10-20 43Z',
  'M48 122Q38 70 78 48q45-32 91 0 43 27 35 75l-23-35-31-19-29 14-30-11-17 45Z',
]
const girlHair = [
  'M48 148Q32 58 89 37q43-27 87 5 43 31 34 110l-25-35-7-50-49-18-45 21-13 48Z',
  'M49 148Q36 66 82 42q48-30 98 5 38 29 29 104l-25-31-8-48-46-21-46 20-12 47Z',
  'M48 149Q34 62 91 39q45-25 87 8 40 33 30 106l-24-34-7-48-45-20-48 21-12 48Z',
  'M47 147Q30 61 87 39q49-25 92 9 38 34 29 103l-27-35-5-47-48-18-45 22-13 45Z',
]

export default function Avatar({avatar,size='large',mood='happy',eating=false,stage=0,staticAvatar=false,className=''}){
  const skinIndex=avatar?.skin??0,hairIndex=avatar?.hair??0,outfitIndex=avatar?.outfit??0
  const skin=avatarChoices.skins[skinIndex].color,hair=avatarChoices.hairs[hairIndex].color,shirt=avatarChoices.outfits[outfitIndex].color
  const girl=avatar?.gender==='girl', heightClass=size==='small'?'avatar-small':size==='hero'?'avatar-hero':'avatar-large'
  const bodyWidth=108+stage*14, hairShape=(girl?girlHair:boyHair)[hairIndex]
  return <div className={`modular-avatar ${heightClass} ${className}`} role="img" aria-label="Avatar personalizado do jogador">
    <motion.svg viewBox="0 0 260 380" animate={staticAvatar?{}:mood==='victory'?{y:[0,-18,0]}:{}} transition={{repeat:Infinity,duration:.75}}>
      <defs>
        <linearGradient id={`skin-${skinIndex}`} x1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".25"/><stop offset=".5" stopColor={skin}/><stop offset="1" stopColor="#8e4f3d" stopOpacity=".24"/></linearGradient>
        <linearGradient id={`shirt-${outfitIndex}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".2"/><stop offset=".25" stopColor={shirt}/><stop offset="1" stopColor={shirt}/></linearGradient>
        <linearGradient id={`hair-${hairIndex}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".18"/><stop offset=".25" stopColor={hair}/><stop offset="1" stopColor="#171318" stopOpacity=".35"/></linearGradient>
        <filter id="softShadow"><feDropShadow dx="0" dy="7" stdDeviation="5" floodOpacity=".22"/></filter>
      </defs>
      <g filter="url(#softShadow)" strokeLinejoin="round">
        <ellipse cx="130" cy="357" rx={68+stage*7} ry="12" fill="#32251e" opacity=".14"/>
        <path d="M101 278 91 342M159 278l10 64" stroke={skin} strokeWidth="29" strokeLinecap="round"/>
        <path d="M76 348q16-13 37 0v9H76ZM147 348q20-13 37 0v9h-37Z" fill="#fff" stroke="#2d2a2e" strokeWidth="5"/><path d="M80 347h27M151 347h27" stroke={shirt} strokeWidth="4"/>
        <motion.path animate={{d:`M130 188C${130-bodyWidth/2} 188 ${130-bodyWidth/2-5} 279 82 308Q130 ${320+stage*4} 178 308C${130+bodyWidth/2+5} 279 ${130+bodyWidth/2} 188 130 188Z`}} transition={{type:'spring',stiffness:90,damping:17}} fill={shirt} stroke="#30282a" strokeWidth="5"/>
        <path d="M100 197q30 18 60 0" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="4"/>
        <path d="M83 210 55 273M177 210l28 63" stroke={shirt} strokeWidth="27" strokeLinecap="round"/><circle cx="52" cy="279" r="16" fill={`url(#skin-${skinIndex})`} stroke="#30282a" strokeWidth="4"/><circle cx="208" cy="279" r="16" fill={`url(#skin-${skinIndex})`} stroke="#30282a" strokeWidth="4"/>
        {stage>0&&<motion.ellipse initial={{scale:.4}} animate={{scale:1}} cx="130" cy="280" rx={31+stage*9} ry={23+stage*5} fill={`url(#skin-${skinIndex})`} stroke="#30282a" strokeWidth="4"/>}
        <ellipse cx="61" cy="137" rx="16" ry="23" fill={skin} stroke="#30282a" strokeWidth="4"/><ellipse cx="199" cy="137" rx="16" ry="23" fill={skin} stroke="#30282a" strokeWidth="4"/>
        <circle cx="130" cy="124" r="80" fill={`url(#skin-${skinIndex})`} stroke="#30282a" strokeWidth="5"/>
        <path d={hairShape} fill={`url(#hair-${hairIndex})`} stroke="#30282a" strokeWidth="5"/>
        {girl&&<path d="M53 115q-11 60 14 91M205 114q12 62-13 94" stroke={hair} strokeWidth="19" strokeLinecap="round"/>}
        <path d="M87 111q17-12 32 0M141 111q17-12 32 0" stroke="#352b2a" strokeWidth="5" strokeLinecap="round" fill="none"/>
        {mood==='sad'?<><path d="M91 136q14-14 28 0M141 136q14-14 28 0" stroke="#352b2a" strokeWidth="5" fill="none"/><path d="M109 174q21-19 42 0" stroke="#352b2a" strokeWidth="5" fill="none"/><path d="M97 145v33M164 145v33" stroke="#5fc1ee" strokeWidth="8" strokeLinecap="round"/></>:<><ellipse cx="105" cy="136" rx="11" ry="15" fill="#31282a"/><ellipse cx="156" cy="136" rx="11" ry="15" fill="#31282a"/><ellipse cx="108" cy="131" rx="4" ry="5" fill="#fff"/><ellipse cx="159" cy="131" rx="4" ry="5" fill="#fff"/><path d={eating?'M95 166Q130 128 165 166Q160 213 130 216Q100 213 95 166Z':'M105 169q25 24 50 0'} fill={eating?'#52282b':'none'} stroke="#352b2a" strokeWidth="5" strokeLinecap="round"/>{eating&&<ellipse cx="130" cy="199" rx="20" ry="9" fill="#f17477"/>}</>}
        <ellipse cx="79" cy="158" rx="12" ry="8" fill="#ee7d78" opacity=".38"/><ellipse cx="181" cy="158" rx="12" ry="8" fill="#ee7d78" opacity=".38"/>
        <path d="M128 145q-5 9 3 10" fill="none" stroke="#a9614e" strokeWidth="3" strokeLinecap="round" opacity=".55"/>
        <circle cx="130" cy="237" r="15" fill="#fff" opacity=".92"/><text x="130" y="243" textAnchor="middle" fontSize="17">🍣</text>
      </g>
      {mood==='victory'&&<text x="180" y="274" fontSize="72">🏆</text>}
    </motion.svg>
  </div>
}
