import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import NewChatContainer from '../New Chat Container/NewChatContainer'
import UserChatContainer from '../User Chat Container/UserChatContainer'
import UserTitleCont from '../User Title Cont/UserTitleCont'
import styles from "./SelectedUserCont.module.css"





const SelectedUserCont = ({setChatUserData}) => {
  const chatData=useSelector((state)=>state.chatLatest)
  console.log(chatData.chatdisplay);
  const [width, setWidth] = useState(window.innerWidth);
  

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);




  return (
    <>
    {width>500?
      <section className={styles.outerCont}>
      {!chatData.selectedUser&&<><div className={styles.innerCont}>No Chat Selected</div></>}
      {chatData.selectedUser&&<>
         <UserTitleCont/>
         <UserChatContainer/>
         <NewChatContainer />
         </>
      }
      </section>
  
      
      :
      
      <section className={styles.outerCont} style={{display:chatData.chatdisplay===true?"flex":"none",flexDirection:"column"}}>
      {!chatData.selectedUser&&<><div className={styles.innerCont}>No Chat Selected</div></>}
      {chatData.selectedUser&&<>
         <UserTitleCont/>
         <UserChatContainer/>
         <NewChatContainer />
      </>}
      </section>
  
      }
      </>
  )
}

export default SelectedUserCont