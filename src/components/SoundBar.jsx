import { useState } from 'react'
import { TbMusic, TbMusicOff } from "react-icons/tb";
const SoundBar = () => {
  const [music, setMusic] = useState(true);
    const toggleMusic = () => {
      setMusic(!music);
      localStorage.setItem("music", music);
    };
  return (
  <div className='sound'>
    <button className='playBtn' onClick={toggleMusic}>
      {music ? (
      <TbMusicOff size={28} color='red'/>
       ): (
      <TbMusic size={28} color='chartreuse'/>
      )}
    </button>
  </div>
  )
}

export default SoundBar
