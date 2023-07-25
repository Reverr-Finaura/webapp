import React, { useEffect, useState } from "react";
import CourseContent from "../../../components/After knowledge/Course content/CourseContent";
import CourseIntro from "../../../components/After knowledge/Course Intro/CourseIntro";
import CourseReview from "../../../components/After knowledge/Course review/CourseReview";
import Hero from "../../../components/After knowledge/Hero-section/Hero";
import Header from "../../../components/Header/Header";
import Footer from "../../Footer/Footer";
import styles from "./Knowledge.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import {useNavigate} from 'react-router-dom'
import image from "../../../images/arrowMark.svg"
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";

const BuildAudience = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate=useNavigate();

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const courseDetails = {
    title: "Building an Audience",
    para: "Finding the first 100 consumers for your product or service is typically regarded as the hardest phase. This class, which was especially created to assist your new firm, will outline exactly how to find your first customers and how to go from there.",
  };
  return (
    <>
      <NavBarFinalDarkMode />
      <div className={styles.buttonWrapper}>
    <img className={styles.arrowClass} src={image} alt="img" />
    <button className={styles.backButton} onClick={()=>navigate('/knowledge')} > Back</button>
  </div> 
      <div className={styles.knowledge}>
        {/* <KnowledgeNavbar /> */}
        <div className={styles.body}>
          {/* <Sidebar isVisible={width >= 600 ? true : false} /> */}
          <div className={styles.content}>
            <Hero
              imgUrl="audience1.webp"
              // heading="Idea validation and elevator pitch"
            />
            <CourseIntro
              url="/buildingaudienceslides"
              courseDetails={courseDetails}
            />
            <CourseContent
              points={[
                "Who is your target customer?",
                "What are the means and channels to reach your audience?",
                "How to develop a long term marketing strategy?",
              ]}
              imgUrl="audience2.webp"
            />
            {/* <CourseReview /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BuildAudience;
