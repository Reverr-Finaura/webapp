import React, { useState } from 'react'
import style from "./matches.module.css"
import MatchesResults from './MatchesResults'
import profileimg from "../../../images/MentorProfileCard.webp"

const seewholikekdata =[
    {name: "jatin",
    designation: "ceo",
    img:profileimg },
    {name: "sheetal",
    designation: "manager",
    img:profileimg},
    {name: "dante",
    designation: "ceo",
    img:profileimg},
    {name: "nero",
    designation: "work",
    img:profileimg},
    {name: "jatin",
    designation: "ceo",
    img:profileimg},
    {name: "jatin",
    designation: "ceo",
    img:profileimg},
]

const managematches =[
    {name: "Shachin",
    designation: "Super CEO",
    img:profileimg },
    {name: "Neel",
    designation: "manager",
    img:profileimg},
    {name: "Hiyamoto",
    designation: "ceo",
    img:profileimg},
    {name: "Norton",
    designation: "work",
    img:profileimg},
    {name: "Quick",
    designation: "ceo",
    img:profileimg},
    {name: "jatin",
    designation: "ceo",
    img:profileimg},
]

const Matches = () => {
    const [data , setData] = useState(seewholikekdata)
    const [ismanage, setIsManage] = useState(false)
    const [ispremium, setIsPremium] = useState(true)
  return (
    <div className={style.MatchesContainer}>
        <div className={style.MatchesInnerContainer}>
            {
                ispremium && 
                <div onClick={()=>setIsPremium(false)} className={style.NotPremium}>
                <p>Upgrade to <span style={{color:"#00B3FF"}}> Premium </span> and receive access to exclusive features</p>
                <button>Get Premium</button>
            </div>
            }
       
                <div className={style.matchesHeader}>
                    <div>
                        <span style={{color: !ismanage && "black",cursor:"pointer"}} className={!ismanage && style.seewholikedyou} onClick={()=>(setData(seewholikekdata),setIsManage(false))}>See Who Liked You</span>
                        <span style={{color: ismanage && "black",cursor:"pointer"}} className={ismanage && style.managematches} onClick={()=>(setData(managematches),setIsManage(true))}>Manage Matches</span>
                    </div>
                </div>

                <div className={style.matchesResultContainer}>
                
                    <MatchesResults ispremium={ispremium} ismanage={ismanage} data={data}/>
                </div>

        </div>
    </div>
  )
}

export default Matches