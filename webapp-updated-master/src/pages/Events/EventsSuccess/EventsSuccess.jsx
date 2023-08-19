import React from 'react'
import NavBarFinalDarkMode from '../../../components/Navbar Dark Mode/NavBarFinalDarkMode'
import style from "./eventssuccess.module.css"
import event1 from "../../../images/eventssuccess1.webp"
import event2 from "../../../images/eventssucces2.webp"
import eye from "../../../images/Eyeblack.svg"
const EventsSuccess = () => {
  return (
    <>
    <NavBarFinalDarkMode />

    <div className={style.EventsContainer}>

        <div className={style.EventsInnerContainer}>
           <div className={style.left}>
            <img src={event1} alt="" />
            <img src={event2} alt="" />
           </div>
           <div className={style.right}>
            <p>Your event has been <span>succesfully</span> created!</p>
            <p>Your event “Masterminds” has been created.</p>
            <p>
            26 July 2023 <br/>
            3:00 p.m to 5:00 p.m</p>

            <div className={style.btncontainer}>
                <div className={style.btn1}>Go to Homepage</div>
                <div className={style.btn2}><img style={{width:"20px"}} src={eye} alt="" />Preview</div>
            </div>
           </div>
        </div>
    </div>
    </>
  )
}

export default EventsSuccess