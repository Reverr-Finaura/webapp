import React, { useState,useEffect } from 'react'
import ChatsContainer from '../Chats Container/ChatsContainer'
import styles from "./MessagesCont.module.css"
import { useSelector } from 'react-redux'




const MessagesCont = () => {
  const[sorter,setSorter]=useState("Newest")
  const [width, setWidth] = useState(window.innerWidth);
  const chatData = useSelector((state) => state.chatLatest)
  console.log(chatData.chatdisplay);


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
    <div style={{display:"flex",
    justifyContent: "center",
    alignItems: "center"
}}>
      <h2 className={styles.message}>Messages</h2>
    </div>
    <div className={styles.sorterCont}>
    <p className={styles.sorterText} >Sort by</p>
    <div className={styles.messageSorterCont}>
      <select onChange={(e)=>setSorter(e.target.value)}  className={styles.sorter} name="sortBy" value={sorter}>
        <option className={styles.options} value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
      </select>
    </div>
    </div>

    <ChatsContainer sorter={sorter}/>
   </section>
   :
   <section className={styles.outerCont} style={{display:chatData.chatdisplay===false?"flex":"none"}}>
   <div style={{display:"flex",
   justifyContent: "center",
   alignItems: "center"
}}>
     <h2 className={styles.message}>Messages</h2>
   </div>
   <div className={styles.sorterCont}>
   <p className={styles.sorterText} >Sort by</p>
   <div className={styles.messageSorterCont}>
     <select onChange={(e)=>setSorter(e.target.value)}  className={styles.sorter} name="sortBy" value={sorter}>
       <option className={styles.options} value="Newest">Newest</option>
       <option value="Oldest">Oldest</option>
     </select>
   </div>
   </div>

   <ChatsContainer sorter={sorter}/>
  </section>}
    </>
  
   
  )
}

export default MessagesCont