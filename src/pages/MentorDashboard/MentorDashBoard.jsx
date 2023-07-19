import React from 'react'
import "./mentordashboard.css"
import NavBarFinalDarkMode from '../../components/Navbar Dark Mode/NavBarFinalDarkMode'
import { useState } from 'react'
import MentorDashboardTransaction from './MentorDashboardTransaction'
import MentorDashBoardSupport from './MentorDashBoardSupport'
import MentorDashBoardCalendy from './MentorDashBoardCalendy'

const list = [
    "Transactions", "Support", "Calendly Overview"
]

const MentorDashBoard = () => {

    const [toolname , setToolName] = useState("Transactions")
  return (
    <>
        <div style={{backgroundColor:'#030b18',display:"flex",flexDirection:"column"}}>
            <div>
            <NavBarFinalDarkMode />
            </div>
        
        <div style={{height:"100vh",paddingTop:"120px"}}>
        <p style={{color:"white",fontSize:"30px",fontWeight:"bold",paddingLeft:"140px",paddingBottom:"40px"}}>Mentor <span style={{color:"#00B3FF"}}>Dashboard</span></p>
        
            {/* toolbar */}
            <div className='toolbar' >
                <div className='inner-toolbar'>

                
                {
                    list.map((item)=>(
                        <p onClick={()=>setToolName(item)}
                         style={{color:`${item === toolname ? "#00B3FF" : "white"}`,
                         textDecoration:`${item === toolname ? "underline" : ""}`
                         ,cursor:"pointer",}}>{item}</p>
                    ))
                }
                </div>
            </div>

            {/* //body */}
            <div>
                {
                    toolname === "Transactions" ?
                    <MentorDashboardTransaction/>
                     : 

                    toolname === "Support" ?
                    <MentorDashBoardSupport/> 
                    :
                    toolname === "Calendly Overview" ?
                    <MentorDashBoardCalendy/> : ""
                }
            </div>



        </div>

        </div>
    </>
  )
}

export default MentorDashBoard