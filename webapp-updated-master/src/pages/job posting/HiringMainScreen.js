import React from "react";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import img from "../../images/online-job-search.png";
import style from "./HiringMainScreen.module.css";

export default function HiringMainScreen() {
  return (
    <>
      <NavBarFinalDarkMode />
      <div
        className={style.upperBlock}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3%",
        }}
      >
        <div className={style.block}>
          <div className={style.leftPart}>
            <div>
              <h1 style={{ color: "#1ebbfe" }} className={style.heading}>
                Hire the best talent
              </h1>
              <h1
                style={{ color: "var(--white, #FFF)" }}
                className={style.heading}
              >
                for your team, at Reverr!
              </h1>
            </div>
            <p className={style.para}>
              Post a job and recruit skilled professionals to empower your
              business’s growth.
            </p>
            <button className={style.btn}>Hire Now</button>
          </div>
          <div className={style.rightPart}>
            <img style={{ width: "90%" }} src={img} alt='' />
          </div>
        </div>
      </div>
    </>
  );
}
