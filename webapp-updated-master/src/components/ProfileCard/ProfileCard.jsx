import React from "react";
import "./ProfileCard.css";
import { useNavigate } from "react-router-dom";

const ProfileCard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='profile-box'>
        <img
          src={props.imgUrl}
          className='suggest-img'
          alt='suggest-img'
          style={{ height: "65px", width: "65px" }}
        />
        <h3
          className='profilecardname'
          style={{
            color: "white",
            overflowWrap: "anywhere",
            fontFamily: "Reem Kufi",
          }}
        >
          {props.name}
        </h3>
        <p className='post' style={{ fontFamily: "Reem Kufi" }}>
          {props.post}
        </p>
        <button
          onClick={() => navigate(`/userprofile/${props?.email}`)}
          style={{ marginBottom: "10px", fontFamily: "Reem Kufi" }}
          type='button'
          className='schedule-btn'
        >
          Connect
        </button>
      </div>
    </>
  );
};

export default ProfileCard;
