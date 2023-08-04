import styles from "./vibeMiddlePart.module.css";
import filterIcon from "../../../images/filterIcon.svg";
// import userProfilePucture from "../../../images/userProfilePicture.svg";
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
import { useState, useEffect } from "react";
import { getDocs,collection,query } from "firebase/firestore";
import { db } from "../../../firebase";
import defaultImg from "../../../images/default-profile-pic.webp";
import { useSelector } from "react-redux";




const VibeMiddlePart = () => {
    const [userData, setUserData] = useState([]);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [noMoreVibeData, setNoMoreVibeData] = useState(false)
    const currentLoggedInUser = useSelector((state) => state.user);


    const getUserData = async() => {
        try{
            const userRef = collection(db, "Users");
            const userquery = query(userRef);
            const usersnapshot = await getDocs(userquery);
            const filteredDocs = usersnapshot.docs.filter((doc) => 
                    doc.data().email !== currentLoggedInUser?.user?.email
                    && doc.data().vibeuser === "true");
            const fetchedUserData = filteredDocs.map((doc) => doc.data());
            setUserData(fetchedUserData);
            console.log("fetched User data",fetchedUserData);
            console.log("userdataV",userData);
        }catch(error){
            console.error(error.message)
        }
    }

    useEffect(() => {

        getUserData();
    }, [])


    const handleNextUserClick = () => {
        if(currentUserIndex < userData.length - 1){
            console.log(userData);
            setCurrentUserIndex(currentUserIndex + 1)
        }else{
            setNoMoreVibeData(true);
        }
    }


    const howToMeetImages = {
        "Video Call" : videoCall,
        "Phone Call" : phoneCall,
        "At Coffee" : atCoffee,
    }

    return <>
    {noMoreVibeData === false ? 
(<div className={styles.middleContainer}>
    <div className={styles.filterContainer}>
    <div className={styles.undoMoveCont}>
            <div className={styles.innerUndoMove}>
                <img className={styles.undoMoveImg} src={undoMoveIcon} alt="undoMoveIcon" />
                <p className={styles.undoMoveText}>Undo Move</p>
            </div>
        </div>
        <img className={styles.filterIcon} src={filterIcon} alt="filterIcon" />
    </div>
    {userData.length > 0 &&
    <div className={styles.vibeinfo}>
    <div className={styles.userDetailsContainer}>
        <div className={styles.imgContainer}>
        <img className={styles.userProfilePucture} src={userData[currentUserIndex].image ? userData[currentUserIndex].image : defaultImg} alt="userProfilePucture" />
        </div>
        <h2 className={styles.userName}>{userData[currentUserIndex].name}</h2>
        <h3 className={styles.userPosition}>{userData[currentUserIndex].designation}</h3>
        {userData[currentUserIndex].state || userData[currentUserIndex].country  ?
        (<div className={styles.locationCont}>
        <img className={styles.locationIcon} src={location} alt="location" />
        <p className={styles.location} >{userData[currentUserIndex].state}{", "}{userData[currentUserIndex].country}</p>
        </div>) : null}
    </div>
    <div className={styles.details}>
        {userData[currentUserIndex]?.about &&
            <div className={styles.aboutMe}>
            <h2 className={styles.Heading}>About Me</h2>
            <p className={styles.aboutDetails}>{userData[currentUserIndex].about}</p>
        </div>}
        {userData[currentUserIndex]?.here_for && userData[currentUserIndex]?.here_for.length > 0 ? 
           (<div className={styles.whyamIHere}>
            <h2 className={styles.Heading}>Why am i here</h2>
            <div className={styles.whyamIHereCont}>
                {userData[currentUserIndex]?.here_for.map((item, index) => {
                    return <div key={index} className={styles.whyamIHereItem}>
                        <p className={styles.whyhereText}>{item}</p>
                    </div>
                })}
            </div>
        </div>) : null}
        {userData[currentUserIndex]?.experience && userData[currentUserIndex]?.experience.length > 0 && userData[currentUserIndex]?.experience[0]?.designation && userData[currentUserIndex]?.experience[0]?.company !== "" ?
            (<div className={styles.designation}>
            <h2 className={styles.Heading}>Current Designation</h2>
            <div className={styles.designationDetailsCont}>
            <h3 className={styles.designationInfo}>{userData[currentUserIndex].experience[0].designation ? userData[currentUserIndex].experience[0].designation : ""}</h3>
            <p className={styles.designationDetails}>{userData[currentUserIndex].experience[0].company ? userData[currentUserIndex].experience[0].company : ""}</p>
            </div>
        </div>) : null}
        {userData[currentUserIndex]?.education && userData[currentUserIndex]?.education.length > 0 && userData[currentUserIndex]?.education[0]?.institute && userData[currentUserIndex]?.education[0]?.degree !== "" ?
            (<div className={styles.education}>
            <h2 className={styles.Heading}>Education</h2>
            <div className={styles.educationCont}>
            <h3 className={styles.educationInstitute}>{userData[currentUserIndex].education[0].institute ? userData[currentUserIndex].education[0].institute : ""}</h3>
            <p className={styles.designationDetails}>{userData[currentUserIndex].education[0].degree ? userData[currentUserIndex].education[0].degree : ""}</p>
            </div>
        </div>) : null}
            {userData[currentUserIndex]?.Vibe_Data?.How_To_Meet && userData[currentUserIndex]?.Vibe_Data?.How_To_Meet?.length > 0 ?
            (<div className={styles.howCanWeMeet}>
            <h2 className={styles.Heading}>How can we meet?</h2>
            <div className={styles.meetingTypeCont}>
                {userData[currentUserIndex].Vibe_Data.How_To_Meet.map((type, index) => {
                    const imageURL = howToMeetImages[type]
                    return <div key={index} className={styles.typeContainer}>
                        <img className={styles.meetingTypeImg} src={imageURL} alt={type} />
                        <p className={styles.meetingType}>{type}</p>
                    </div>
                })}
            </div>
            </div>) : null}

            <div className={styles.findMeOn}>
                {(userData[currentUserIndex]?.phone || userData[currentUserIndex]?.email || userData[currentUserIndex]?.linkedin || userData[currentUserIndex]?.twitter) !== "" &&
            <><h2 className={styles.Heading}>Find Me On</h2>
            <div className={styles.findmeOnWraper}>
                {userData[currentUserIndex].phone !== "" && 
                <div className={styles.findmeCont}>
                <img src={phoneIcon} alt="phoneIcon" />
                <p className={styles.findmeDetails}>{userData[currentUserIndex].countryCode} {userData[currentUserIndex].phone}</p>    
                </div>}
                    {userData[currentUserIndex].email !== "" &&
                <div className={styles.findmeCont}>
                <img src={emailIcon} alt="emailIcon" />
                <p className={styles.findmeDetails}>{userData[currentUserIndex].email}</p>
                </div>}
                    {userData[currentUserIndex].linkedin !== "" && 
                <div className={styles.findmeCont}>
                <img src={linkedinIcon} alt="linkedinIcon" />
                <p className={styles.findmeDetails}>{userData[currentUserIndex].linkedin}</p>
                </div>}
                    {userData[currentUserIndex].twitter !== "" && 
                <div className={styles.findmeCont}>
                <img src={twitterIcon} alt="twitterIcon" />
                <p className={styles.findmeDetails}>{userData[currentUserIndex].twitter}</p>
                </div>}
            </div></>}
            </div>
    </div>
</div>}
    <div className={styles.likeHandshake}>
        <div className={styles.innerContainer}>
            <div className={styles.Cont} >
                    <img className={styles.likehandShakeImg} onClick={handleNextUserClick} src={nopeIcon} alt="nopeIcon" />
                    <p className={styles.text}>Nope</p>
            </div>
            <div className={styles.Cont}>
            <img className={styles.likehandShakeImg} src={handShakeIcon} alt="handShakeIcon" />
                    <p className={styles.text}>Handshake</p>
            </div>
            <div className={styles.Cont}>
            <img className={styles.likehandShakeImg} onClick={handleNextUserClick} src={blueLikeIcon} alt="blueLikeIcon" />
                    <p className={styles.text}>Like</p>
            </div>
        </div>
        <div className={styles.background}>

        </div>
    </div>
</div>) : <h1>no data</h1>}
        
    </>
}

export default VibeMiddlePart;