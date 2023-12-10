import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
// import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import { db } from "../../../firebase";
import styles from "./PPTTemplatesViewer.module.css";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";
import { DocumentViewer } from "react-documents";
import load from "../../../images/Pulse-1s-200px.svg";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";

const PPTTemplatesViewer = () => {
  const pptId = useParams().id;
  const [pptLink, setPPtLink] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [isSideBarCalled, setIsSideBarCalled] = useState(true);

  //UPDATE WIDTH
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  //FETCH PARTICULAR PPT LINK FROM FIREBASE
  useEffect(() => {
    async function fetchPptLinkFromFirebase() {
      const userDataRef = collection(db, "PptTemplates");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === pptId) {
          setPPtLink(doc.data().link);
          setIsSideBarCalled(false);
        }
      });
    }
    fetchPptLinkFromFirebase();
  }, [pptId]);

  return (
    <>
      {width >= 600 ? (
        <>
          <div
            style={{ transform: isSideBarCalled ? "translateX(0)" : "" }}
            className={styles.animatedSideBar}
          >
            {isSideBarCalled ? (
              <BsArrowLeftSquareFill
                onClick={() => setIsSideBarCalled((e) => !e)}
                style={{ color: "#276acf" }}
                className={styles.arroww}
              />
            ) : (
              <BsArrowRightSquareFill
                onClick={() => setIsSideBarCalled((e) => !e)}
                style={{
                  color: "#276acf",
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
                className={styles.arroww}
              />
            )}
            <SidebarFinal />
          </div>
          {/* <NavBarFinal /> */}
          <NavBarFinalDarkMode />
        </>
      ) : (
        <>
          <PhnSidebar />
          {/* <KnowledgeNavbar /> */}
          <div style={{ marginBottom: "150px" }}>
            <NavBarFinalDarkMode />
          </div>
        </>
      )}
      {pptLink !== "" ? (
        <>
          <section className={styles.outerCont}>
            <DocumentViewer
              className={styles.pptViewerOuterCont}
              url={pptLink}
              viewer='url'
            ></DocumentViewer>
          </section>
        </>
      ) : (
        <>
          <div className={styles.outerContLoading}>
            <h1 style={{ color: "white" }}>Loading......</h1>
            <img className={styles.loadIcon} src={load} alt='loading' />
          </div>
        </>
      )}
    </>
  );
};

export default PPTTemplatesViewer;
