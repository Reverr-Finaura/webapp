import styles from "./vibeMiddlePart.module.css";
import filterIcon from "../../../images/filterIcon.svg";
import userProfilePucture from "../../../images/userProfilePicture.svg";
import location from "../../../images/location.svg";
import videoCall from "../../../images/videocallimg.svg";
import phoneCall from "../../../images/phonecallimg.svg";
import atCoffee from "../../../images/atcoffeeimg.svg";
import phoneIcon from "../../../images/phoneMiniIcon.svg";
import emailIcon from "../../../images/emailMiniIcon.svg";
import linkedinIcon from "../../../images/linkedinMiniIcon.svg";
import twitterIcon from "../../../images/twitterMiniIcon.svg";
import nopeIcon from "../../../images/nopeIcon.svg";
import handShakeIcon from "../../../images/handshakeIcon.svg";
import blueLikeIcon from "../../../images/bluelikeIcon.svg";
import undoMoveIcon from "../../../images/undoMoveIcon.svg";
import FilterRedoPopUp from "../vibemiddleparta/FilterRedoPopUp";
import { useState } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";

const VibeMiddlePart = () => {
  const [ispremium, setIsPremium] = useState(false);
  const [redo, SetRedo] = useState(false);
  const [frtext, setFRText] = useState("")

  const data = {
    userphoto: userProfilePucture,
    userName: "jatin khurana",
    position: "CEO at Reverr",
    location: "New Delhi, India",
    aboutMe:
      "'I like being aware of new things around me'I am a marketing research , looking for mentorship. I am an IIM Bangalore graduateand have worked with Fintech  for 5 years.",
    whyamIHere: ["Finance", "Marketing"],
    designation: {
      currentDesignation: "Chief Executive Officer",
      designationInfo: "Reverr, Mastork",
    },
    education: {
      institute: "IIM Bangalore",
      degree: "MBA",
    },
    howCanWeMeet: [
      {
        type: "Video Call",
        img: videoCall,
      },
      {
        type: "Phone Call",
        img: phoneCall,
      },
      {
        type: "At Coffee",
        img: atCoffee,
      },
    ],
    findMeOn: {
      phone: "+91 22754 28912",
      email: "jatink@gmail.com",
      linkedIn: "@jatinkhurana",
      twitter: "@jatinkhurana",
    },
  };

  const userDoc = useSelector((state) => state.userDoc);
  // console.log(userDoc?.vibeuser);
  const CheckisPremium = () => {
    if (!ispremium) {
      return SetRedo(true);
    }
    // if (!userDoc?.vibeuser) {
    //   return SetRedo(true);
    // }
  };

  const HandShakeUser = async (userEmail) => {};

  const NopeUser = async (userEmail) => {
    userEmail = "raman2@gmail.com";
    FlushUser(userEmail);
  };

  const LikeUser = async (userEmail) => {
    userEmail = "raman@gmail.com";
    const docRef = doc(db, "Users", userDoc?.email);
    const otherDocRef = doc(db, "Users", userEmail);
    try {
      const docSnap = await getDoc(docRef);
      const otherDocSnap = await getDoc(otherDocRef);
      console.log("HIIIIII");

      if (docSnap.exists()) {
        let liked_by;

        if (!docSnap.data().liked_by) {
          liked_by = [];
        } else {
          liked_by = docSnap.data().liked_by;
        }

        await updateDoc(docRef, {
          liked_by: [...liked_by, userEmail],
        });
      }

      if (otherDocSnap.exists()) {
        let likes;

        if (!otherDocSnap.data().likes) {
          likes = [];
        } else {
          likes = otherDocSnap.data().likes;
        }

        await updateDoc(otherDocRef, {
          likes: [...likes, userDoc?.email],
        });
      } else {
        console.log("No such document!");
      }
      FlushUser(userEmail);
    } catch (e) {
      console.log("Error getting document:", e);
    }
  };

  const FlushUser = async (email) => {
    const docRef = doc(db, "Users", userDoc?.email);
    try {
      const docSnap = await getDoc(docRef);
      console.log("HIIIIII");
      let passed_email;

      if (!docSnap.data().passed_email) {
        passed_email = [];
      } else {
        passed_email = docSnap.data().passed_email;
      }

      updateDoc(docRef, {
        passed_email: [...passed_email, email],
      });
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.log("Error getting document:", e);
    }
    // const userDocument = await getDoc(userDocumentRef);
  };

  //   FlushUser();
  return (
    <>
      <div
        style={{ overflowY: !redo ? "scroll" : "hidden" }}
        className={styles.middleContainer}
      >
        {/* ////Not Premium Pop-UP//// */}
        {
           !ispremium && redo &&  <FilterRedoPopUp frtext={frtext} SetRedo={SetRedo} setIsPremium={setIsPremium}/>
        }

        <div className={styles.filterContainer}>
          <div onClick={()=>(CheckisPremium(),setFRText("Undo"))} className={styles.undoMoveCont}>
            <div className={styles.innerUndoMove}>
              <img
                className={styles.undoMoveImg}
                src={undoMoveIcon}
                alt="undoMoveIcon"
              />
              <p className={styles.undoMoveText}>Undo Move</p>
            </div>
          </div>
          <img
           onClick={()=>(CheckisPremium(),setFRText("Filter"))}
            className={styles.filterIcon}
            src={filterIcon}
            alt="filterIcon"
          />
        </div>
        <div className={styles.vibeinfo}>
          <div className={styles.userDetailsContainer}>
            <img
              className={styles.userProfilePucture}
              src={data.userphoto}
              alt="userProfilePucture"
            />
            <h2 className={styles.userName}>{data.userName}</h2>
            <h3 className={styles.userPosition}>{data.position}</h3>
            <div className={styles.locationCont}>
              <img
                className={styles.locationIcon}
                src={location}
                alt="location"
              />
              <p className={styles.location}>{data.location}</p>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.aboutMe}>
              <h2 className={styles.Heading}>About Me</h2>
              <p className={styles.aboutDetails}>{data.aboutMe}</p>
            </div>
            <div className={styles.whyamIHere}>
              <h2 className={styles.Heading}>Why am i here</h2>

              <div className={styles.whyamIHereCont}>
                {data.whyamIHere.map((item) => {
                  return <div className={styles.whyamIHereItem}>{item}</div>;
                })}
              </div>
            </div>
            <div className={styles.designation}>
              <h2 className={styles.Heading}>Current Designation</h2>
              <div className={styles.designationDetailsCont}>
                <h3 className={styles.designationInfo}>
                  {data.designation.currentDesignation}
                </h3>
                <p className={styles.designationDetails}>
                  {data.designation.designationInfo}
                </p>
              </div>
            </div>
            <div className={styles.education}>
              <h2 className={styles.Heading}>Education</h2>
              <div className={styles.educationCont}>
                <h3 className={styles.educationInstitute}>
                  {data.education.institute}
                </h3>
                <p className={styles.designationDetails}>
                  {data.education.degree}
                </p>
              </div>
            </div>
            <div className={styles.howCanWeMeet}>
              <h2 className={styles.Heading}>How can we meet?</h2>
              <div className={styles.meetingTypeCont}>
                {data.howCanWeMeet.map((type) => {
                  return (
                    <div className={styles.typeContainer}>
                      <img
                        className={styles.meetingTypeImg}
                        src={type.img}
                        alt={type.type}
                      />
                      <p className={styles.meetingType}>{type.type}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.findMeOn}>
              <h2 className={styles.Heading}>Find Me On</h2>
              <div className={styles.findmeOnWraper}>
                <div className={styles.findmeCont}>
                  <img src={phoneIcon} alt="phoneIcon" />
                  <p className={styles.findmeDetails}>{data.findMeOn.phone}</p>
                </div>
                <div className={styles.findmeCont}>
                  <img src={emailIcon} alt="emailIcon" />
                  <p className={styles.findmeDetails}>{data.findMeOn.email}</p>
                </div>
                <div className={styles.findmeCont}>
                  <img src={linkedinIcon} alt="linkedinIcon" />
                  <p className={styles.findmeDetails}>
                    {data.findMeOn.linkedIn}
                  </p>
                </div>
                <div className={styles.findmeCont}>
                  <img src={twitterIcon} alt="twitterIcon" />
                  <p className={styles.findmeDetails}>
                    {data.findMeOn.twitter}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.likeHandshake}>
          <div className={styles.innerContainer}>
            <div className={styles.Cont} onClick={NopeUser}>
              <img
                className={styles.likehandShakeImg}
                src={nopeIcon}
                alt="nopeIcon"
              />
              <p className={styles.text}>Nope</p>
            </div>
            <div className={styles.Cont} onClick={HandShakeUser}>
              <img
                className={styles.likehandShakeImg}
                src={handShakeIcon}
                alt="handShakeIcon"
              />
              <p className={styles.text}>Handshake</p>
            </div>
            <div className={styles.Cont} onClick={LikeUser}>
              <img
                className={styles.likehandShakeImg}
                src={blueLikeIcon}
                alt="blueLikeIcon"
              />
              <p className={styles.text}>Like</p>
            </div>
          </div>
          <div className={styles.background}></div>
        </div>
      </div>
    </>
  );
};

export default VibeMiddlePart;
