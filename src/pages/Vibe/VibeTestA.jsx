import React from 'react'
import NavBarFinalDarkMode from '../../components/Navbar Dark Mode/NavBarFinalDarkMode'
import VibeRightSideBar from './RightPart/VibeRightSideBar'
import style from "./vibe.module.css"

const VibeTestA = () => {
  return (
    <>
    <NavBarFinalDarkMode/>
    <div className={style.vibeContainer}>
        <div>1st</div>
        <div>2nd</div>
        <VibeRightSideBar/>
    </div>

    </>
  )
}

export default VibeTestA