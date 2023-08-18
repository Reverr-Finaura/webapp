import React from 'react'
import NavBarFinalDarkMode from '../../../components/Navbar Dark Mode/NavBarFinalDarkMode'
import style from "./createevents.module.css"
import eventicon from "../../../images/mdi_event-note.svg"
import event1 from "../../../images/createevent1.webp"
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {

  const navigate = useNavigate()
  return (
    <>
    <NavBarFinalDarkMode />

    <div className={style.EventsContainer}>

        <div className={style.EventsInnerContainer}>
            <div className={style.left}>
                <p><span>Event</span> planning made effortless!</p>
                <p>Creating an event has now become easy and effortless. Manage your event seamlessly here. </p>
                <div onClick={()=>navigate("/event/eventform")} className={style.eventbutton}><img style={{width:"30px"}} src={eventicon} alt="" /><p>Create an event</p></div>
            </div>
            <div className={style.right}>
                <img  src={event1} alt="" />
            </div>
        </div>
    </div>
    </>
  )
}

export default CreateEvent