import React from 'react'
import NavBarFinalDarkMode from '../../components/Navbar Dark Mode/NavBarFinalDarkMode'
import VibeRightSideBar from './RightPart/VibeRightSideBar'
import style from "./vibe.module.css"
import Matches from './ManageMatches/Matches'

const VibeTestA = () => {
  return (
    <>
    <NavBarFinalDarkMode/>
    <div className={style.vibeContainer}>
    <VibeRightSideBar/>
        <div>1st</div>
        <Matches/>
        
    </div>

    </>
  )
}

export default VibeTestA