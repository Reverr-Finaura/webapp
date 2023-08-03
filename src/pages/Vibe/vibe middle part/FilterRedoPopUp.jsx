import React from 'react'
import styles from "./vibeMiddlePart.module.css";

const FilterRedoPopUp = ({setIsPremium,SetRedo}) => {
  return (
    <div className={styles.middlePopUp}>
    <div>
        <p>Unable to Undo Move?</p>
        <p>Upgrade to <span style={{color:"#00B3FF"}}> Premium </span>to use this feature and never miss a potential match.</p>
        <button>Get Premium</button>
        <p onClick={()=>(setIsPremium(false),SetRedo(false))}>x</p>
    </div>
</div>
  )
}

export default FilterRedoPopUp