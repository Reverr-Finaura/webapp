import React from "react";
import styles from "./Patch.module.css";

function Patch({ isLoggedIn, openModal }) {
  const handleComingsoonClick = () => {
    if (!isLoggedIn) {
      return openModal();
    } else {
      console.log("user logged!");
    }
  };
  return (
    <div
      className={styles.container}
      onClick={handleComingsoonClick}
      style={{ cursor: "pointer" }}
    >
      <img src={require("../../../images/image 827.webp")} alt='img' />
      <p
        style={{
          fontFamily: "Reem Kufi",
          marginTop: 10,
          fontSize: 25,
          fontWeight: 700,
          color: "#00B3FF",
        }}
      >
        PATCH
      </p>
      <p
        style={{
          fontFamily: "Reem Kufi",
          fontSize: 12,
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        One-on-One Networking
      </p>
      <button style={{ fontFamily: "Reem Kufi" }}>Coming Soon!</button>
    </div>
  );
}

Patch.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default Patch;
