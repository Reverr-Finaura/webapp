import React from 'react'
import mentordashsuppimg from "../../images/mentordashboardsupport.png"
import emailjs from "@emailjs/browser";

const MentorDashBoardSupport = () => {


  var templateParams = {
    from_name: "ReverrMentor",
    to_name: "test" + " " + "testlastName",
    to_email: "aamil.shafi13@gmail.com",
  
  };
  const sendemail = async()=>{
    try {
      const response = await emailjs.send(
        "service_lfmmz8k",
        "template_n3pcht5",
        templateParams,
        // "user_FR6AulWQMZry87FBzhKNu"
        "dVExxiI8hYMCyc0sY"
      );} catch (error) {
        console.log(error);
        // toast.error(error.text);
        // setLoading(false);
        // toast.error(error?.response?.data?.message);
      }
  }
  


  return (
    <div style={{height:"80vh"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"200px"}}>
            <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
                <p style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Need Help?</p>
                <p style={{color:"white",fontSize:"25px",fontWeight:"normal"}}>Reach out to <span style={{color:"#4CC9FF"}}>Reverr</span></p>
                <button onClick={()=>sendemail()} style={{backgroundColor:"#00B3FF",width:"140px",height:"40px",fontSize:"25px",color:"white",borderRadius:"50px"}}>Support</button>
            </div>
            <img style={{width:"400px",paddingTop:"80px"}} src={mentordashsuppimg} alt="" />
        </div>
    </div>
  )
}

export default MentorDashBoardSupport