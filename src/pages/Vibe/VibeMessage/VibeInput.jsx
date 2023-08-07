import React from 'react'
import {ImAttachment} from "react-icons/im"
import styles from "./VibeMessageMain.module.css"
import {AiFillCloseCircle,AiOutlineSend} from "react-icons/ai"
import {BsEmojiFrown} from "react-icons/bs"

const VibeInput = () => {
  return (
    <section className={styles.outerCont}>
   
  
     <input
        
              type="file"
              hidden
              className="postImageUpload"
              accept='image/*'
            />
            <div className={styles.wrapperEmoji}>
      <ImAttachment  className={styles.attachmentIcon}/>
      </div>
      <BsEmojiFrown className={styles.emoji} />
      <input  style={{paddingLeft:"5%",height:"2.3em"}}  className={styles.textInp} type="text" placeholder='Send Message...' />
      <AiOutlineSend   style={{borderRadius: "30px",
      width: "60px",
      height:" 39px"}} className={styles.sendMessageBtn}/>
    </section>
  )
}

export default VibeInput