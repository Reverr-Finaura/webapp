import React from "react";
import mentordashsuppimg from "../../images/mentordashboardsupport.png";
import emailjs from "@emailjs/browser";
import "./MentorSupport.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const MentorDashBoardSupport = () => {
  const userDoc = useSelector((state) => state.userDoc);
  console.log(userDoc);
  var templateParams = {
    from_name: userDoc?.name,
    from_email: userDoc?.email,
    from_number: userDoc?.phone,
    to_email: "connect@reverr.io",
  };
  const sendemail = async () => {
    try {
      const emailResponse = await emailjs.send(
        "service_lfmmz8k",
        "template_1b3jyun",
        templateParams,
        // "user_FR6AulWQMZry87FBzhKNu"
        "dVExxiI8hYMCyc0sY"
      );
      toast.success(
        "Your query has been submitted. We will get back to you soon."
      );
    } catch (error) {
      console.log(error.message);
      toast.error(error.text);
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
