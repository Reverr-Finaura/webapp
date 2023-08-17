import React, { useRef } from 'react'
import style from "./eventsform.module.css"
import NavBarFinalDarkMode from '../../../components/Navbar Dark Mode/NavBarFinalDarkMode'
import userprofilepic from "../../../images/userProfilePicture.svg"

const EventsForm = () => {
    const ref = useRef();
  return (
    <>
    <NavBarFinalDarkMode />

    <div className={style.EventsformContainer}>

        <div className={style.EventsformInnerContainer}>

            <div className={style.eventsformheader}>
                <p>Create a new <span>Event</span></p>
                <p>X</p>
            </div>

                <div className={style.eventsformmain}>
                    <div className={style.eventsformmainleft}>
                        <div className={style.eventforminputdiv}>
                            <label >Event Name</label>
                            <input className={style.eventforminp} type="text"
                            placeholder='Event Name' />
                        </div>

                        <div className={style.eventforminputdiv}>
                            <label >Banner Image</label>
                            <input id="bnrimg" style={{display:"none"}} type="file" />
                                
                                    <section className={style.eventformbnrimg}>
                                        <div>
                                        <label htmlFor='bnrimg'>Upload Files</label>
                                        </div>
                                        <div>

                                        </div>
                                    </section>
                                
                        </div>

                        {/* ///event date/// */}
                        <div className={style.eventforminputdivdate}>
                            <div>
                            <label >Event Date</label>
                            <input className={style.eventforminpdate} 
                            placeholder='Start Date'  onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}/>
                            </div>
                            <div>
                                <br />
                            <input  className={style.eventforminpdate }
                            placeholder='End Date'  onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")} />
                            </div>
                        </div>

                        {/* ///event date/// */}
                        <div className={style.eventforminputdivdate}>
                            <div>
                            <label >Event Date</label>
                            <input className={style.eventforminpdate} 
                            placeholder='Start Date'  onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}/>
                            </div>
                            <div>
                                <br />
                            <input  className={style.eventforminpdate }
                            placeholder='End Date'  onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")} />
                            </div>
                        </div>

                        {/* ///location/// */}
                   
                        <div className={style.eventforminputdiv}>
                            <label >Location</label>
                            <input className={style.eventforminp} type="text"
                            placeholder='Location of event' />
                        </div>

                        <div className={style.eventformradiodiv}>
                            <p >Event Visibility:</p>
                            <input  type="radio" id="Public" name="fav_language" value="HTML" />
                            <label for="Public">Public</label>
                                <input type="radio" id="Private" name="fav_language" value="CSS" />
                            <label for="Private">Private</label>
                        </div>
                    </div>

                    

                        {/* Right side */}
                    <div  className={style.eventsformmainright}>
                    <div  className={style.eventforminputdiv}>
                            <label >Description</label>
                            <textarea placeholder='Write about event details'></textarea>
                        </div>

                        <div style={{paddingTop:"0px"}} className={style.eventforminputdiv}>
                            <label >Create Timeline</label>
                            <div className={style.eventformcreatetimelinediv}>
                                <select className={style.select}>
                                <option value="none" selected disabled hidden>Day</option>
                                    <option value="">Mon</option>
                                    <option value="">Tue</option>
                                    <option value="">Wed</option>
                                    <option value="">Thu</option>
                                    <option value="">Fri</option>
                                    <option value="">Sat</option>
                                </select>
                                <input placeholder='time' type="time" />
                                <input placeholder='Description' type="text" />
                            </div>
                            <div className={style.capsule}>
                                <p className={style.capsulep}>Add</p>
                                </div>
                        </div>

                        <div style={{paddingTop:"0px"}} className={style.eventforminputdiv}>
                            <label >Speaker(s)</label>
                            <div style={{display:"flex",justifyContent:"space-between",width:"85%"}}>
                            <input className={style.eventforminp} type="text"
                            placeholder='contact@example.com' />
                                <p className={style.capsulep2}>Add</p>
                            </div>
                            <div className={style.userprofilepicdiv}>
                                <div>
                                    <img src={userprofilepic} alt="" />
                                </div>
                                <div>
                                    <img src={userprofilepic} alt="" />
                                </div>
                                <div>
                                    <img src={userprofilepic} alt="" />
                                </div>
                                <div>
                                    <img src={userprofilepic} alt="" />
                                </div>
                                <div>
                                    <img src={userprofilepic} alt="" />
                                </div>

                                <div className={style.moreprofilepiccount}>
                                    <span>+5</span>
                                </div>
                            </div>
                            
                             
                        </div>
                                    {/* ///set reminder// */}
                            <div className={style.eventforminputdiv}>
                            <label >Set Reminder</label>
                            <input className={style.eventforminp} type="text"
                            placeholder='contact@example.com' />
                            </div>

                            {/* ///right side last section/// */}
                            <div className={style.lastrightbtndiv}>
                               
                                <div className={style.btncontainer}>
                <div className={style.btn1}>Cancel</div>
                <div className={style.btn2}>Create event</div>
            </div>
                                
                            </div>


                    </div>


                    </div>  
                </div>
        </div>
    
    </>
  )
}

export default EventsForm