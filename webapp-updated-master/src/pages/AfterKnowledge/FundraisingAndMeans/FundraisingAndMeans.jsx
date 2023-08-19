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
import NavbarFinal from "../../../components/Navbar/NavBarFinal";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import {useNavigate} from 'react-router-dom'
import image from "../../../images/arrowMark.svg"


const FundraisingAndMeans = () => {
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
    title: "Fundraising and its Means",
    para: "How are businesses supported in reality? From the various funding sources accessible to locating investors and creating the ideal pitch, we'll walk you through everything you could possible want to know.",
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
            <Hero imgUrl="FundraisingandMeans.webp" />
            <CourseIntro
              courseDetails={courseDetails}
              url="/fundraising-and-means-slides"
            />
            <CourseContent
              points={[
                "What is Fundraising and why is it important?",
                "What are the different means to raise funds?",
                "What is the role of a pitchdeck in fundraising?",
              ]}
              imgUrl="fundraising2.webp"
            />
            {/* <CourseReview /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default FundraisingAndMeans;
