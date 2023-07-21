import React from "react";
import { useState, useEffect } from "react";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import { useNavigate } from "react-router-dom";
import styles from "./FundingPageNew.module.css";
import fundingForm from "../../images/fundingForm.png";
import startupScore from "../../images/startupScore.png";

const FundingPageNew = () => {

    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);



    const updateWidth = () => {
        setWidth(window.innerWidth);
      };
    
      useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      }, []);

      return (
        <>
        {width >= 600 ? (
        <>
          <NavBarFinalDarkMode />
        </>
      ) : (
        <>
          <PhnSidebar />
          <KnowledgeNavbar />
        </>
      )}

      <section id="getFundingPage">
        <div className={styles.sectionContainer}>
            <h1 className={styles.whatIs}>What is <span>Funding?</span></h1>
            <p>Funding is the process of obtaining financial resources or capital to support the 
              activities and growth of a startup or <br /> business. It involves securing investments, 
              loans, or  grants from various sources such as investors, venture capitalists, <br /> banks, 
              government programs, or crowdfunding platforms. We, at Reverr will help you provide 
              funding through investors. </p>
            <h1 className={styles.getStarted}>Choose to <span>get started</span></h1>
            <div className={styles.cardsContainer}>
             <div onClick={() => navigate("/start-up")} className={styles.Card}>
              <h2>Start-Up Score</h2>
              <p>Get an analysed score for your startup.</p>
              <img src={startupScore} alt="startupScore" />
             </div>
             <div onClick={() => navigate("/funding-form")} className={styles.Card}>
              <h2>Funding Form</h2>
              <p>Fill up the funding form to apply for funds.</p>
              <img src={fundingForm} alt="fundingForm" />
             </div>
            </div>
        </div>
      </section>

        </>
      )
}


export default FundingPageNew;