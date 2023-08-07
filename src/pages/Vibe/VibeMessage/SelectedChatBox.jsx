import React from 'react'
import profileimg from "../../../images/MentorProfileCard.webp"

const data =[
  {img:profileimg,msg:"hello",type:"you"},
  {img:profileimg,msg:"hi"}
]

const SelectedChatBox = () => {
  
  return (
   <>
    {
       data.map((item,key)=>(
        <div key={key} style={{ padding:"20px",display:"flex",flexDirection:item.type === "you" ?"row-reverse" : "" ,width:"100%" ,justifyContent: item.type === "you" ? "end" : "start" }}>
          <img style={{width:"30px",height:"30px",marginTop:"14px"}} src={profileimg} alt="" />
          <p style={{background:item.type === "you" ?"#00B3FF " : "#030B18" ,padding:"10px",marginRight:"4px",marginLeft:"4px",
              borderRadius: item.type === "you" ? "16px 16px 4px 16px" : "16px 16px 16px 4px"
        }}>{item.msg}</p>
        </div>
       ))
     
      }
   </>
  )
}

export default SelectedChatBox