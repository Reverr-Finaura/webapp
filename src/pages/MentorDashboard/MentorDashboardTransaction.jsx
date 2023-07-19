import React from 'react'
import "./mentordashtransaction.css"

const data = [
    {
        name:"Darrell Steward",
        date:"May 6, 2012",
        time:"03:48 am",
        amount:"$ 6,223.07"
    },
    {
        name:"Darrell Steward",
        date:"May 6, 2012",
        time:"03:48 am",
        amount:"$ 6,223.07"
    },
    {
        name:"Darrell Steward",
        date:"May 6, 2012",
        time:"03:48 am",
        amount:"$ 6,223.07"
    },
    {
        name:"Darrell Steward",
        date:"May 6, 2012",
        time:"03:48 am",
        amount:"$ 6,223.07"
    },
    {
        name:"Darrell Steward",
        date:"May 6, 2012",
        time:"03:48 am",
        amount:"$ 6,223.07"
    },
    {
        name:"Darrell Steward",
        date:"May 6, 2012",
        time:"03:48 am",
        amount:"$ 6,223.07"
    },
    {
        name:"Darrell Steward",
        date:"May 6, 2012",
        time:"03:48 am",
        amount:"$ 6,223.07"
    },
]

const MentorDashboardTransaction = () => {
  return (
    <div className='transactioncontainer'>
        

        <table  className='transaction-table'>
        <tr>
    <th style={{color:"#00B3FF"}}>Customer</th>
    <th style={{color:"#00B3FF"}}>Session Date</th>
    <th style={{color:"#00B3FF"}}>Session Time</th>
    <th style={{color:"#00B3FF"}}>Amount</th>
    <br />
    <br />
  </tr>
        {
            data.map((item)=>(
    <tr  className='transactionrow'>
    <td className='transactiond'>
        <div className='transactionddiv'>

        
        <img style={{width:"40px",height:"40px",backgroundColor:"green",borderRadius:"50%"}} src="" alt="" />
        {item.name}
        </div>
        </td>
    <td className='transactiond'>{item.date}</td>
    <td className='transactiond'>{item.time}</td>
    <td className='transactiond'>{item.amount}</td>
   
  </tr>
            ))
        }

        </table>






    </div>
  )
}

export default MentorDashboardTransaction