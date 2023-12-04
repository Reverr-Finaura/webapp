import React, { useEffect, useState } from "react";
import CourseContent from "../../../components/After knowledge/Course content/CourseContent";
import CourseIntro from "../../../components/After knowledge/Course Intro/CourseIntro";
import Hero from "../../../components/After knowledge/Hero-section/Hero";
import styles from "./Knowledge.module.css";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import { useNavigate } from "react-router-dom";
import image from "../../../images/arrowMark.svg";

const BusinessModal = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const courseDetails = {
    title: "Business Model Canvas",
    para: "Find out what a business model canvas is, what makes up its components, and why early-stage startup entrepreneurs should care.",
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
              imgUrl='businessmodal1.webp'
              // heading="Idea validation and elevator pitch"
            />
            <CourseIntro
              url='/buisnessmodalslides'
              courseDetails={courseDetails}
            />
            <CourseContent
              points={[
                "What is Business Model Canvas?",
                "Understanding the components of Business Model Canvas.",
                "Why Business Model Canvas is important in the initial stages?",
              ]}
              imgUrl='businessmodal2.webp'
            />
            {/* <CourseReview /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BusinessModal;
