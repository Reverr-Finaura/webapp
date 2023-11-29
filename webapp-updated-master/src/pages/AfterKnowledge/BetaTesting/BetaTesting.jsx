import React, { useEffect, useState } from "react";

import CourseContent from "../../../components/After knowledge/Course content/CourseContent";
import CourseIntro from "../../../components/After knowledge/Course Intro/CourseIntro";
import Hero from "../../../components/After knowledge/Hero-section/Hero";
import styles from "./Knowledge.module.css";
import { useNavigate } from "react-router-dom";
import image from "../../../images/arrowMark.svg";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";

const BetaTesting = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const courseDetails = {
    title: "Beta Testing-Learn from the basic level to the best",
    para: "Prior to releasing your MVP, become proficient at conducting a beta test. Also read about how to get ready for obstacles both known and unknown while beta testing the product of your firm.",
  };
  return (
    <>
      <NavBarFinalDarkMode />
      <div className={styles.buttonWrapper}>
        <img className={styles.arrowClass} src={image} alt='img' />
        <button
          className={styles.backButton}
          onClick={() => navigate("/knowledge")}
        >
          {" "}
          Back
        </button>
      </div>

      <div className={styles.knowledge}>
        {/* <KnowledgeNavbar /> */}
        <div className={styles.body}>
          {/* <Sidebar isVisible={width >= 600 ? true : false} /> */}
          <div className={styles.content}>
            <Hero
              imgUrl='betatesting.webp'
              // heading="Idea validation and elevator pitch"
            />
            <CourseIntro
              url='/betatestingslides'
              courseDetails={courseDetails}
            />
            <CourseContent
              points={[
                "Why should you not be in a hurry to launch your MVP?",
                "Why beta test?",
                "A/B testing?",
              ]}
              imgUrl='betaimg2.webp'
            />
            {/* <CourseReview /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BetaTesting;
