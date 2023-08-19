import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import style from "./vibemessagedropdown.module.css"
import dots from "../../../images/dots.webp"

const list =[
    "Media","Mute notifications","Clear chat","Report","Close chat",
]

const VibeMessageDropdown = () => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState( false);
    const onClick = () => setIsActive(!isActive);
  
    
  
    return (
      <div >
        <div className={style.menucontainer}>
          <button onClick={onClick} className={style.menutrigger}>
            <img style={{width:"30px",height:"30px",transform:"rotate(90deg)"}} src={dots} alt="" />
          </button>
          <div
            ref={dropdownRef}
            className={`${style.menu} ${isActive ? style.active : style.inactive}`}
          >
            <ul>
            
              {
  
                  list?.map((item)=>(
                      <li onClick={()=> onClick()} >{item} </li>
                  ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
}

export default VibeMessageDropdown