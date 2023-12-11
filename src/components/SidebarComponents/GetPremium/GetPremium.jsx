import React, { useState } from "react";
import styles from "./GetPremium.module.css";
import Upgrade from "../../../pages/Upgrade/Upgrade";

function GetPremium() {
  const [premiumModalStatus, setPremiumModalStatus] = useState(false);

  return (
    <>
      {premiumModalStatus ? (
        <div class={styles.overlay}>
          <div className={styles.premiumModal}>
            <div
              onClick={() => setPremiumModalStatus(false)}
              className={styles.closebtnModal}
            >
              close
            </div>
            <Upgrade />
          </div>
        </div>
      ) : null}
      <div className={styles.container}>
        <div
          style={{
            alignItems: "center",
            fontWeight: 500,
            fontSize: 15,
            textAlign: "center",
          }}
        >
          <p style={{ color: "#ffffff" }}>
            Upgrade to <span style={{ color: "#00B3FF" }}>&nbsp;Premium</span>{" "}
            and receive exclusive access
          </p>
        </div>
        {/* <span
          style={{
            fontWeight: 500,
            fontSize: 15,
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          and receive exclusive access
        </span> */}
        <button onClick={() => setPremiumModalStatus(true)}>
          Get Premium &nbsp;&gt;
        </button>
      </div>
    </>
  );
}

export default GetPremium;
