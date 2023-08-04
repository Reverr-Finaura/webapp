import React from "react";
import vibeImg from "../../../images/Frame 6267617.svg";
import styles from "./Vibe.module.css";
import { setvibeuser } from "../../../features/userDocSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Vibe({ isLoggedIn, openModal }) {
  const userDoc=useSelector((state)=>state.userDoc)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  return (
    <div className={styles.container}>
      <img src={vibeImg} alt="img" />
      <button
        onClick={() => {
          navigate('/vibe');
          if (!isLoggedIn) {
            return openModal();
          } else {
            console.log("user logged!");
          }
        }}
      >
        Coming soon!
      </button>
    </div>
  );
}

Vibe.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default Vibe;
