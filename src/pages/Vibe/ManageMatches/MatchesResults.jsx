import React from 'react'
import style from "./matches.module.css"

const MatchesResults = ({data,ismanage}) => {
  return (
    <div className={style.matchesreusultmiddlecontainer}>
       
        {
            data.map((item,key)=>(
                <div className={style.matchesresultinnercontainer}>
                    
                    <div className={style.singlematchresultcontainer} key={key}>
                <img style={{width:"35px",height:"35px"}} src={item.img} alt="img" />
                <div>
                <p>{item.name}</p>
                <p style={{fontSize:"15px",color:"#A7A7A7"}}>{item.designation }</p>
                </div>
                
              </div>

              <div className={style.buttonContainer}>
                {
                    ismanage ?  <button style={{background:"none",border:"2px solid #00B3FF",color:"#00B3FF"}}>Remove</button>
                    :
                    <div>
                    <button>View Profile</button>
                    <span>x</span>
                    </div>
                }
     
               
              </div>

                </div>
            ))
        }
    </div>
  )
}

export default MatchesResults