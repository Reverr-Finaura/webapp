import React from "react";
import mentordashsuppimg from "../../images/mentordashboardsupport.png";
import emailjs from "@emailjs/browser";
import "./MentorSupport.css";

const MentorDashBoardSupport = () => {
  var templateParams = {
    from_name: "ReverrMentor",
    to_name: "test" + " " + "testlastName",
    to_email: "aamil.shafi13@gmail.com",
  };
  const sendemail = async () => {
    try {
      const response = await emailjs.send(
        "service_lfmmz8k",
        "template_n3pcht5",
        templateParams,
        // "user_FR6AulWQMZry87FBzhKNu"
        "dVExxiI8hYMCyc0sY"
      );
    } catch (error) {
      console.log(error);
      // toast.error(error.text);
      // setLoading(false);
      // toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="support-container">
      <img
        className="support-image"
        src={mentordashsuppimg}
        alt="Support Illustration"
      />
      <div className="support-content">
        <p className="support-heading">Need Help?</p>
        <p className="support-text">
          Reach out to <span className="highlight">Reverr</span>
        </p>
        <button className="support-button" onClick={() => sendemail()}>
          Support
        </button>
      </div>
    </div>
  );
};

export default MentorDashBoardSupport;
