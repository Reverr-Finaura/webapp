import React from 'react'
import styles from './SpeakerProfile.module.css'
import Image1 from '../../images/IMAGE1.png'
import location from '../../images/location_outline.png'
import plus from '../../images/plus.png'
import call from '../../images/call.png'
import gmail from '../../images/gmail.png'
import linkedin from '../../images/linkedin.png'
import videocall from '../../images/video-call.png'
import facebook from '../../images/facebook.png'
import twitter from '../../images/twitter.png'
import insta from '../../images/instagram.png'
import arrow from '../../images/arrowMark.svg';
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";




const SpeakerProfile = () => {
    return (
        <>
        <NavBarFinalDarkMode />
            <div className={styles.outer}>
                <div className={styles.outerCont}>
                    <div className={styles.profile}>
                        <img src={arrow} alt="img"/>
                        profile
                    </div>
                    <div className={styles.section1}>
                        <div className={styles.imgCont}>
                            <img src={Image1} alt='img' />

                        </div>
                        <div className={styles.infoCont}>
                            <div className={styles.name}>Jatin Khurana</div>
                            <p>CEO at Reverr</p>
                            <div className={styles.location}>
                                <img src={location} alt='img' />
                                New Delhi, India
                            </div>
                            <div className={styles.button}>
                                <img src={plus} alt='img' />
                                Follow

                            </div>


                        </div>
                        <div className={styles.iconsCont}>
                            <img src={call} alt='img' />
                            <img src={gmail} alt='img' />
                            <img src={linkedin} alt='img' />

                        </div>
                    </div>
                    <div className={styles.aboutsec}>
                        <div className={styles.heading}>About Me</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <div className={styles.heading}>How can we connect</div>
                        <div className={styles.connectbtn}>
                            <div className={styles.videocall}>
                                <img src={videocall} alt='img' />
                                Video call
                            </div>
                            <div className={styles.message}>Message</div>
                        </div>

                    </div>
                    <div className={styles.edusec}>
                        <div className={styles.cont1}>
                            <div className={styles.heading}>My Education</div>
                            <ul>
                                <li>BTech,IIT Delhi</li>
                                <li>MSc, Harvard</li>
                            </ul>
                        </div>
                        <div className={styles.cont2}>
                            <div className={styles.heading}>My Experience</div>
                            <ul>
                                <li>CEO at Reverr</li>
                                <li>Lorem ipsum hgvfc vhvjub vgvfcfg szd</li>
                                <li>Lorem ipsum hgvfc vhvju</li>
                            </ul>
                        </div>

                    </div>
                    <div className={styles.contactsec}>
                        <div className={styles.heading}>Contact</div>
                        <div className={styles.contactInfo}>
                            <img src={linkedin} alt='img' />
                            /ashish-0231
                        </div>
                        <div className={styles.contactInfo}>
                            <img src={facebook} alt='img' />
                            @ashish.0876
                        </div>
                        <div className={styles.contactInfo}>
                            <img src={twitter} alt='img' />
                            @hey_ashish
                        </div>
                        <div className={styles.contactInfo}>
                            <img src={insta} alt='img' />
                            @ashish1230
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
export default SpeakerProfile;