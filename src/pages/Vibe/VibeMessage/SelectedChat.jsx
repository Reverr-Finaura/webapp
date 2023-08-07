import React from 'react'
import style from "./VibeMessageMain.module.css"
import profileimg from "../../../images/MentorProfileCard.webp"
import SelectedChatBox from './SelectedChatBox'
import VibeInput from './VibeInput'

const SelectedChat = ({setChatSelected}) => {
  return (
    <div className={style.SelectedChatContainer} >
        
        <div className={style.SelectedChatHeader}>
        <div>
          <span onClick={()=>setChatSelected(false)} style={{cursor:"pointer"}}> &lt;</span>
        <img style={{width:"40px",height:"40px"}} src={profileimg} alt="img" />
        <p>Shelly kim</p>
        </div>  
        <p  >:</p>
      </div>
      <hr style={{width:"100%",color:"#A7A7A7"}} />

     <div className={style.scrollnone} style={{width:"100%",height:"80%",overflowY:"scroll"}}>
        <SelectedChatBox />
     </div>

     <div>
      <VibeInput/>
     </div>
        
        </div>
  )
}

export default SelectedChat