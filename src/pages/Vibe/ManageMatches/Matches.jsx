import React, { useEffect, useState } from 'react'
import style from "./matches.module.css"
import MatchesResults from './MatchesResults'
import profileimg from "../../../images/MentorProfileCard.webp"
import { collection } from 'firebase/firestore'
import { db, getUserFromDatabase } from '../../../firebase'
import { useSelector } from 'react-redux'

const seewholikekdata =[
    {name: "jatin",
    designation: "ceo",
    image:profileimg },
    {name: "sheetal",
    designation: "manager",
    image:profileimg},
    {name: "dante",
    designation: "ceo",
    image:profileimg},
    {name: "nero",
    designation: "work",
    image:profileimg},
    {name: "jatin",
    designation: "ceo",
    image:profileimg},
    {name: "jatin",
    designation: "ceo",
    image:profileimg},
]

const managematches =[
    {name: "Shachin",
    designation: "Super CEO",
    image:profileimg },
    {name: "Neel",
    designation: "manager",
    image:profileimg},
    {name: "Hiyamoto",
    designation: "ceo",
    image:profileimg},
    {name: "Norton",
    designation: "work",
    image:profileimg},
    {name: "Quick",
    designation: "ceo",
    image:profileimg},
    {name: "jatin",
    designation: "ceo",
    image:profileimg},
]

const Matches = () => {
    const [data , setData] = useState(seewholikekdata)
    const [ismanage, setIsManage] = useState(false)
    const [ispremium, setIsPremium] = useState(true)
    const [likedUser,setLikedUsers] = useState([]);
    const [matchedUser,setMatchedUsers] = useState([])
    const userDoc=useSelector((state)=>state.userDoc)

    useEffect(()=>{
      async function FetchLikedUsers() {
        const userData = getUserFromDatabase(userDoc.email)
        setLikedUsers(userData.likedUsers);
      } 
      FetchLikedUsers();
    },[])

    async function FetchLikedUsers() {
      const userData = getUserFromDatabase(userDoc.email)
      setLikedUsers(userData.likedUsers);
    } 

    async function FetchMatchesUsers() {
      const userData = getUserFromDatabase(userDoc.email)
      setMatchedUsers(userData.matchedUsers);
    } 

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