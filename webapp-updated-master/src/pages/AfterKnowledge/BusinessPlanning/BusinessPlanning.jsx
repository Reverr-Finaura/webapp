import React, { useEffect, useState } from "react";
import CourseContent from "../../../components/After knowledge/Course content/CourseContent";
import CourseIntro from "../../../components/After knowledge/Course Intro/CourseIntro";
import Hero from "../../../components/After knowledge/Hero-section/Hero";
import styles from "./Knowledge.module.css";
import { useNavigate } from "react-router-dom";
import image from "../../../images/arrowMark.svg";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";

const BusinessPlanning = () => {
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
    title: "Business Planning",
    para: "A solid business strategy is the foundation of every successful venture. However, developing a strategy for your firm doesn't need to be a tedious 80-page exercise. To help you succeed, we're dissecting each element in detail.",
  };
  return (
    <>
      {/* {width>=600?<><SidebarFinal /><NavBarFinal /></>:<><PhnSidebar /> */}

      {/* <KnowledgeNavbar /></>} */}
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
              imgUrl='businessplan1.webp'
              // heading="Idea validation and elevator pitch"
            />
            <CourseIntro
              url='/buisnessplanningslides'
              courseDetails={courseDetails}
            />
            <CourseContent
              points={[
                "What is a business plan?",
                "How to draft a business plan?",
                " What are the elements of business plan and how to define each one of them?",
              ]}
              imgUrl='businessplan2.webp'
            />
            {/* <CourseReview /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BusinessPlanning;
