import React, { useEffect } from "react";
import styles from "./Patch.module.css";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";


function Patch({ isLoggedIn, openModal }) {

  const blogUser = useSelector((state) => state.blogUser);
  console.log("blogUSER", blogUser);
  const navigate = useNavigate();

  const handleComingsoonClick = () => {
    if (!isLoggedIn) {
      return openModal();
    } else {
      //normal code
      console.log("user logged!");
    };
    const storedBlogUser = localStorage.getItem("blogUser");
    if(storedBlogUser !== null){
      navigate("/blogdashboard");
    }else{
      navigate("/blogsignin");
    }
  }
  return (
    <div className={styles.container}>
      {/* <img src={vibeImg} alt="img" />
      <button onClick={() => console.log("vibe clicked")}>
        Explore VIBE &nbsp;&gt;
      </button> */}
      <img
        // style={{ marginTop: 40 }}
        src={require("../../../images/image 827.webp")}
        alt="img"
      />
      <text
        style={{
          marginTop: 10,
          fontSize: 25,
          fontWeight: 700,
          color: "#00B3FF",
        }}
      >
        PATCH
      </text>
      <text
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        One-on-One Networking
      </text>
      <button
        onClick={handleComingsoonClick}
      >
        Coming Soon!
      </button>
    </div>
  );
}

Patch.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default Patch;
