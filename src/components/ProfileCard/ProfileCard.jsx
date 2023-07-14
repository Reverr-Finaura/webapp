import React from 'react'
import './ProfileCard.css'
import { useNavigate } from 'react-router-dom'

const ProfileCard = (props) => {
  const navigate = useNavigate()
  return (
    <>
        <div className='profile-box'>
            <img src={props.imgUrl} className='suggest-img' alt="Image" style={{height:'65px', width:'65px'}}/>
            <h3 style={{color:'white', overflowWrap:'anywhere'}}>{props.name}</h3>
            <p className='post' style={{color:'white'}}>{props.post}</p>     
            <button onClick={()=>navigate(`/userprofile/${props.email}`)} style={{marginBottom:'10px'}} type="button" className="schedule-btn">Connect</button>  
        </div>
    </>
  )
}

export default ProfileCard






