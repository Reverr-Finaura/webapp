import React from "react";
import styles from "./NoAppoinments.module.css";
import { useNavigate } from "react-router-dom";

function NoAppoinments({ isLoggedIn, openModal }) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <p style={{ fontWeight: 500, fontSize: 15 }}>
        <span style={{ color: "#ffffff" }}>Upcoming</span>
        <span style={{ color: "#00B3FF" }}>&nbsp;Appointments</span>
      </p>
      <img
        style={{
          marginTop: 20,
        }}
        src={require("../../../images/noappoinment.png")}
        alt="img"
      />
      <p className={styles.buttomText}>
        You don’t have any appointments right now. <br />
        Schedule a new appointment.
      </p>
    </div>
  );
}

NoAppoinments.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default NoAppoinments;
