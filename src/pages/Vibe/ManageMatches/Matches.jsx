import React, { useEffect, useState } from 'react'
import style from "./matches.module.css"
import MatchesResults from './MatchesResults'
import profileimg from "../../../images/MentorProfileCard.webp"
import { collection, getDocs, query } from 'firebase/firestore'
import { db, getUserFromDatabase } from '../../../firebase'
import { useSelector } from 'react-redux'


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
  const [likedMeData, setLikedMeData] = useState([])
    const [data , setData] = useState([])
    const [ismanage, setIsManage] = useState(false)
    const [ispremium, setIsPremium] = useState(true)
    const [matchedUser,setMatchedUsers] = useState([])
    const userDoc=useSelector((state)=>state.userDoc)


    const getWhoLikeData = async() => {
      try{
        const userRef = collection(db, "Users");
        const userQuery = query(userRef);
        const usersnapshot = await getDocs(userQuery);
        console.log("cruserEMAIL",userDoc.email);
        let whoLikedMe = [];
        usersnapshot.docs.forEach((doc) => {
          const likedBy = doc.data().liked_by;
          if(likedBy && likedBy.includes(userDoc?.email)){
            whoLikedMe.push(doc.data());
          }
        })
        console.log("fetched whoLikedMe data" , whoLikedMe);
        setLikedMeData(whoLikedMe)
        setData(whoLikedMe)
        console.log("likedmeData", likedMeData);
      }catch(error){
        console.error(error.message)
      }
    }


    useEffect(() => {
      getWhoLikeData();
    }, [userDoc])

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
                        <span style={{color: !ismanage && "black",cursor:"pointer"}} className={!ismanage && style.seewholikedyou} onClick={()=>(setData(likedMeData),setIsManage(false))}>See Who Liked You</span>
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

export default Matches;