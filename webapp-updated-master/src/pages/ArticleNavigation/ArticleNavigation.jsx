import React, { useEffect, useState } from "react";
import styles from "./ArticleNavigation.module.css";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import image from '../../images/arrowMark.svg'
import { Trash } from "react-bootstrap-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const ArticleNavigation = () => {
    const [info, setinfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [showAll,setshowAll]=useState(false);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        async function fetchUserDocFromFirebase() {
            const userDataRef = collection(db, "Blogs2");
            const q = query(userDataRef);
            const querySnapshot = await getDocs(q);

            const temp = querySnapshot.docs.filter((doc) => {
                if (doc.id === id) { setinfo(doc.data()); setLoading(false) }
            })

        }
        fetchUserDocFromFirebase();
    }, [id]);
    console.log(info);
   

             
    


    return (<>
        <NavBarFinalDarkMode />
        <section className={styles.sectionContainer}>
        <div className={styles.buttonWrapper} onClick={() => navigate(-1)}>
            <img className={styles.arrowClass} src={image} alt="img" />
            <div className={styles.backButton} > Back</div>
        </div>
        {loading ? (
            <p>Loading..</p>) :
            (
                <div className={styles.Main_CardContainer}>
      {/* <div className={styles.Card_ImgContainer}>
        <img src={imageUrl} alt="blog-img" />
      </div> */}
      <div className={styles.Card_HeadingContainer}>
        <div className={styles.Card_Heading}>
          <h1 className={styles.blogHeading}>{info.heading}</h1>
        </div>
        <div className={styles.Card_Actions}>
          <h2>
            <Trash
              title="Click to delete"
              onClick={() => {
                console.log(id);
                // deleteBlogInDatabse(id);
                // dispatch(deleteBlog(id));
                // deleteMedia(imageName);
              }}
            />
          </h2>
        </div>
      </div>
      <div className={styles.Card_ContentContainer}>
        <p>
        <ReactQuill value={info.body} readOnly={true} theme={"bubble"} />
        </p>
        {/* <p>{body}</p> */}
      </div>
      <div className={styles.Card_CreditContainer}>
        <cite className={styles.authorInfo}>
          {info.author} | {info.publishedOn}
        </cite>
      </div>
    </div>        
            )
        }
        </section>
        

    </>

    )

}


export default ArticleNavigation;