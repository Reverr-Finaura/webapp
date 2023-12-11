import React, { useEffect, useState } from "react";
import styles from "./ArticleNavigation.module.css";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../images/arrowMark.svg";
import { Trash } from "react-bootstrap-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const ArticleNavigation = () => {
  const { id } = useParams();
  const [info, setinfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAll, setshowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      setLoading(true);
      const docRef = doc(db, "Blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setinfo({ ...docSnap.data() });
        setLoading(false);
      }
    }
    fetchUserDocFromFirebase();
  }, [id]);

  return (
    <>
      <NavBarFinalDarkMode />
      <section className={styles.sectionContainer}>
        <div className={styles.buttonWrapper} onClick={() => navigate(-1)}>
          <img className={styles.arrowClass} src={image} alt='img' />
          <div className={styles.backButton}> Back</div>
        </div>
        {loading ? (
          <p>Loading..</p>
        ) : (
          <div className={styles.Main_CardContainer}>
            <div className={styles.Card_HeadingContainer}>
              <div className={styles.Card_Heading}>
                <h1 className={styles.blogHeading}>{info.heading}</h1>
              </div>
              {/* <div className={styles.Card_Actions}>
                <h2>
                  <Trash
                    title='Click to delete'
                    onClick={() => {
                      console.log(id);
                      // deleteBlogInDatabse(id);
                      // dispatch(deleteBlog(id));
                      // deleteMedia(imageName);
                    }}
                  />
                </h2>
              </div> */}
            </div>
            <div className={styles.Card_ImgContainer}>
              <img src={info.image.imageUrl} alt={info.image.imageName} />
            </div>
            <div className={styles.Card_ContentContainer}>
              <p style={{ color: "white" }}>
                <ReactQuill
                  value={info.body}
                  readOnly={true}
                  theme={"bubble"}
                />
              </p>
            </div>
            <div className={styles.Card_CreditContainer}>
              <cite className={styles.authorInfo}>
                {info.author} | {info.publishedOn}
              </cite>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ArticleNavigation;
