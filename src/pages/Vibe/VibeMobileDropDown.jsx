import React from 'react'
import style from "./vibe.module.css"
import { useRef } from 'react';
import { useState } from 'react';

const VibeMobileDropDown = ({list,activeComp,setActiveComp}) => {
 
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState( false);
    const onClick = () => setIsActive(!isActive);
  
    
  
    return (
      <div className={style.container}>
        <div className={style.menucontainer}>
          <button onClick={onClick} className={style.menutrigger}>
            <span>{activeComp} <span className={style.greater}>&gt;</span></span>
            
          </button>
          <div
            ref={dropdownRef}
            className={`${style.menu} ${isActive ? style.active : style.inactive}`}
          >
            <ul>
            
              {
  
                  list?.map((item)=>(
                      <li onClick={()=> (setActiveComp(item),onClick())} >{item}</li>
                  ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  
}

export default VibeMobileDropDown