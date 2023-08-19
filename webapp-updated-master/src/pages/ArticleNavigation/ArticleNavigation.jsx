import React, { useEffect, useState } from "react";
import styles from "./ArticleNavigation.module.css";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import image from '../../images/arrowMark.svg'


const ArticleNavigation = () => {
    const [info, setinfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [showAll,setshowAll]=useState(false);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        async function fetchUserDocFromFirebase() {
            const userDataRef = collection(db, "Blogs");
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
                <div className={styles.container}>
                    <div className={styles.headingCont}>
                        <h1 className={styles.h1Heading}>{info.heading}</h1>
                    </div>
                    <div className={styles.imageCont}>
                        <img className={styles.image} src={info?.image?.imageUrl} alt="img" />
                    </div>
                    
                        { showAll ?<div> <p className={styles.lowerText}>{info.body}</p> <a className={styles.acont} onClick={()=>setshowAll(!showAll)}>Read less</a></div>:
                       <div> <p className={styles.lowerText}>{info.body.substring(0,1400).concat('...')}</p> <a className={styles.acont}  onClick={()=>setshowAll(!showAll)}>Read more</a></div>
                    
            }
    
                </div>
                                    
            )
        }
        </section>
        

    </>

    )

}


export default ArticleNavigation;