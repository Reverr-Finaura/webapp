import React from "react";
import CourseContent from "../../../components/After knowledge/Course content/CourseContent";
import CourseIntro from "../../../components/After knowledge/Course Intro/CourseIntro";
import CourseReview from "../../../components/After knowledge/Course review/CourseReview";
import Hero from "../../../components/After knowledge/Hero-section/Hero";
import Header from "../../../components/Header/Header";
import Footer from "../../Footer/Footer";

const NDAgreements = () => {
  const courseDetails = {
    title: "Non-Disclosure Agreements",
    para: "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop anywhere you like on your page.",
  };
  return (
    <>
      <Header theme="black" />
      <Hero
        imgUrl="nda.svg"
        // heading="Idea validation and elevator pitch"
      />
      <CourseIntro courseDetails={courseDetails} />
      <CourseContent imgUrl="nda2.svg" />
      <CourseReview />
      <Footer />
    </>
  );
};

export default NDAgreements;
