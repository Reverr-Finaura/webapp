import React from "react";
import styles from "../VibeMiddlePart/vibeMiddlePart.module.css";

const FilterRedoPopUp = ({setIsPremium,SetRedo,frtext,setPremiumModalStatus}) => {
  return (
    <div className={styles.middlePopUp}>
      <div>
        <p>Unable to {frtext} Move?</p>
        <p>Upgrade to <span style={{color:"#00B3FF"}}> Premium </span>to use this feature and never miss a potential match.</p>
        <button onClick={()=>setPremiumModalStatus(true)}>Get Premium</button>
        <p style={{cursor:"pointer"}} onClick={()=>(setIsPremium(false),SetRedo(false))}>x</p>
    </div>
  );
};

export default FilterRedoPopUp;
