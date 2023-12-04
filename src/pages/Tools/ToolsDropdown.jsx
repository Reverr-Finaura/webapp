import React, { useRef } from "react";
import "./toolsdropdown.css";
import { useState } from "react";
import arrowicon from "../../images/iconamoon_arrow-up-2.svg"

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
 */
export default function ToolsDropdown ({list,setDataFilter,dataFilter}) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState( false);
  const onClick = () => setIsActive(!isActive);

  

  return (
    <div className="container">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>{dataFilter}</span>
          <img
            src={arrowicon}
            alt="arrow"
          />
        </button>
        <div
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li style={{color:`${dataFilter == "All" ? "#00B3FF" : "" }`}} onClick={() => (setDataFilter("All"),setIsActive(false))}>All</li>
            {

                list.map((item)=>(
                    <li style={{color:`${dataFilter == item ? "#00B3FF" : "" }`}} onClick={()=>(setDataFilter(item),setIsActive(false))}>{item}</li>
                ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
