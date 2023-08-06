import React, { useEffect } from 'react'
import style from "./VibeRightSideBar.module.css"
import profileimg from "../../../images/MentorProfileCard.webp"
import VibeYourChat from './VibeYourChat'
import { useState } from 'react'
import SelectedChat from './SelectedChat'
import {
  createMatchedInMessagesDoc
} from "../../../firebase";

const data =[
  {
    img:profileimg,
    name: "Dante",
    message:"Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
   
  },
  {
    img:profileimg,
    name: "Dante",
    message:"Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
   
  },
  {
    img:profileimg,
    name: "Dante",
    message:"Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
   
  },
  {
    img:profileimg,
    name: "Dante",
    message:"Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
   
  },
  {
    img:profileimg,
    name: "Dante",
    message:"Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
   
  },
  {
    img:profileimg,
    name: "Dante",
    message:"Vero rerum dolorem natus sed sit commodi. Voluptate sit cupiditate ut et eos consectetur id. Dolor a sit libero dolorum sequi ratione assumenda deleniti. Velit et facere expedita modi molestiae quia itaque. Rem voluptatum ipsum ex tempore. Et eos illum minus delectus sint deleniti.",
   
  },
]



const VibeRightSideBar = () => {
  const [Chatselected, setChatSelected] = useState(false)

  useEffect(()=> {
    const createMatch = async () => {
      try {
        await createMatchedInMessagesDoc(
          "test@reverr.io",
          // "apurbar06@gmail.com",
          "ced19i053@iiitdm.ac.in"
          // "sivatharun2212@gmail.com"
        );
      } catch (error) {
        console.log("error", error);
      }
    }

    // createMatch();
  },[])

  return (
    <div className={style.RigtSidebarContainer}>
      <div className={style.UserdetailsHeader}>
        <div>
         
        <img style={{width:"40px",height:"40px"}} src={profileimg} alt="img" />
        <p>Shelly kim</p>
        </div>
       
        <p className={style.UserdetailsHeaderPtag}>View Profile &gt;</p>
      </div>

      {
        Chatselected ? <SelectedChat setChatSelected={setChatSelected} />
        :
        <VibeYourChat data={data} setChatSelected={setChatSelected}  />
      }
      



    </div>
  )
}

export default VibeRightSideBar