import React from 'react'
import style from "./VibeRightSideBar.module.css"

const VibeYourChat = ({data,setChatSelected}) => {
  return (
    <div className={style.Userdisplay}>
        <div className={style.Userdisplaycapsule}>Your Chats</div>

        <div className={style.messageboxcontainer}>
          {
            data.map((item,key)=>(
              <div onClick={()=>setChatSelected(true)} className={style.singlemessageboxcontainer} key={key}>
                <img style={{width:"30px",height:"30px"}} src={item.img} alt="img" />
                <div>
                <p>{item.name}</p>
                <p style={{fontSize:"15px",color:"#A7A7A7"}}>{item.message.slice(0,25) }...</p>
                </div>
                
              </div>
            ))
          }
          
        </div>
      </div>
  )
}

export default VibeYourChat