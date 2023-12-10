import React from "react";
import vibeImg from "../../../images/Frame 6267617.svg";
import styles from "./Vibe.module.css";
import { useNavigate } from "react-router-dom";

function Vibe({ isLoggedIn, openModal }) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img src={vibeImg} alt='img' />
      <button
        style={{ fontFamily: "Reem Kufi" }}
        onClick={() => {
          navigate("/vibe");
          if (!isLoggedIn) {
            return openModal();
          } else {
            console.log("user logged!");
          }
        }}
      >
        View
      </button>
    </div>
  );
}

Vibe.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default Vibe;
