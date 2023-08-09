import React, { useEffect, useState } from "react";
import style from "./matches.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NoData from "../VibeMiddlePart/No Data Screen/NoData";

const MatchesResults = ({ data, ismanage }) => {
 
  const navigate = useNavigate();
  const HandleRemoveLikedUser = () => {};
  const HandleRemoveMatchUsers = () => {};
  return (
    
    <div className={style.matchesreusultmiddlecontainer}>
      {
      data?.map((item, key) => (
        <div className={style.matchesresultinnercontainer}>
          <div className={style.singlematchresultcontainer} key={key}>
            <img
              style={{ width: "35px", height: "35px",borderRadius:"50%" }}
              src={item.image}
              alt="img"
            />
            <div>
              <p>{item.name}</p>
              <p style={{ fontSize: "15px", color: "#A7A7A7" }}>
                {item.designation}
              </p>
            </div>
          </div>

          <div className={style.buttonContainer}>
            {ismanage ? (
              <button
                style={{
                  background: "none",
                  border: "2px solid #00B3FF",
                  color: "#00B3FF",
                }}
                onClick={() => {
                  HandleRemoveMatchUsers();
                }}
              >
                Remove
              </button>
            ) : (
              <div>
                <button
                  onClick={() => {
                    navigate(`/userprofile/${item?.email}`);
                  }}
                >
                  View Profile
                </button>
                <span
                  onClick={() => {
                    HandleRemoveLikedUser();
                  }}
                >
                  x
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesResults;
