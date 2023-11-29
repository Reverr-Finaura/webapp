import React from "react";
import { useState, useEffect } from "react";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import { useNavigate } from "react-router-dom";
import styles from "./FundingPageNew.module.css";
import fundingForm from "../../images/fundingForm.webp";
import startupScore from "../../images/startupScore.webp";
import findInvestor from "../../images/findInvestor.svg";
import { ToastContainer, toast } from "react-toastify";

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

  const handleFeature = () => {
    toast.info("Coming soon...");
  };

  return (
    <>
      <NavBarFinalDarkMode />
      <section id='getFundingPage'>
        <div className={styles.sectionContainer}>
          <h1 className={styles.whatIs}>
            What is <span>Funding?</span>
          </h1>
          <p>
            Funding is the process of obtaining financial resources or capital
            to support the activities and growth of a startup or <br />{" "}
            business. It involves securing investments, loans, or grants from
            various sources such as investors, venture capitalists, <br />{" "}
            banks, government programs, or crowdfunding platforms. We, at Reverr
            will help you provide funding through investors.{" "}
          </p>
          <h1 className={styles.getStarted}>
            Choose to <span>get started</span>
          </h1>
          <div className={styles.cardsContainer}>
            <div className={styles.Card} onClick={handleFeature}>
              <div className={styles.cardText}>
                <h2>Find Investors</h2>
                <p>Find investors matched just for you!</p>
              </div>
              <img
                className={styles.findInvestorImg}
                src={findInvestor}
                alt='findInvestor'
              />
            </div>
            <div onClick={() => navigate("/start-up")} className={styles.Card}>
              <div className={styles.cardText}>
                <h2>Start-Up Score</h2>
                <p>Get an analysed score for your startup.</p>
              </div>
              <img
                className={styles.startUpImg}
                src={startupScore}
                alt='startupScore'
              />
            </div>
            <div
              onClick={() => navigate("/funding-form")}
              className={styles.Card}
            >
              <div className={styles.cardText}>
                <h2>Funding Form</h2>
                <p>Fill up the funding form to apply for funds.</p>
              </div>
              <img
                className={styles.fundingImg}
                src={fundingForm}
                alt='fundingForm'
              />
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default FundingPageNew;
