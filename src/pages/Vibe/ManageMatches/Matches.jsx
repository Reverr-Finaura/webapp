import React, { useEffect, useState } from "react";
import style from "./matches.module.css";
import MatchesResults from "./MatchesResults";
import Upgrade from "../../Upgrade/Upgrade";
import profileimg from "../../../images/MentorProfileCard.webp";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";
// import NoData from "../VibeMiddlePart/No Data Screen/NoData";

const managematches = [
  { name: "Shachin", designation: "Super CEO", image: profileimg },
  { name: "Neel", designation: "manager", image: profileimg },
  { name: "Hiyamoto", designation: "ceo", image: profileimg },
  { name: "Norton", designation: "work", image: profileimg },
  { name: "Quick", designation: "ceo", image: profileimg },
  { name: "jatin", designation: "ceo", image: profileimg },
];

const Matches = ({
  mobile,
  manage,
  isPremium,
  updateUserVibeChat,
  setUpdateUserVibeChat,
}) => {
  const [likedMeData, setLikedMeData] = useState([]);
  const [data, setData] = useState([]);
  const [ismanage, setIsManage] = useState(false);
  const [ispremium, setIsPremium] = useState(true);
  const [premiumModalStatus, setPremiumModalStatus] = useState(false);
  const [matchedUser, setMatchedUsers] = useState([]);
  const userDoc = useSelector((state) => state.userDoc);
  const currentLoggedInUser = useSelector((state) => state.user);

  const getWhoLikeData = async () => {
    try {
      const userRef = collection(db, "Users");
      const userQuery = query(userRef);
      const usersnapshot = await getDocs(userQuery);
      let whoLikedMe = [];
      usersnapshot.docs.forEach((doc) => {
        const likedBy = doc.data().likes;
        if (likedBy && likedBy.includes(currentLoggedInUser?.user?.email)) {
          whoLikedMe.push(doc.data());
        }
      });
      setLikedMeData(whoLikedMe);
      setData(whoLikedMe);
    } catch (error) {
      console.error(error.message);
    }
  };
  console.log(data);

  useEffect(() => {
    getWhoLikeData();
    if (manage && mobile) {
      setMatchedData();
      setIsManage(true);
    } else if (!manage && mobile) {
      setData(likedMeData);
      setIsManage(false);
    }
  }, [userDoc, manage]);

  const setMatchedData = async () => {
    let matched_users = userDoc?.matched_user || [];
    try {
      const promises = matched_users.map(async (user) => {
        const docRef = doc(db, "Users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          return userData;
        } else {
          return null;
        }
      });

      const userDataArray = await Promise.all(promises);
      const filteredUserDataArray = userDataArray.filter(
        (userData) => userData !== null
      );
      setData((prev) => [...filteredUserDataArray]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  console.log("premium", isPremium);

  return (
    <>
      {premiumModalStatus ? (
        <div class={style.overlay}>
          <div className={style.premiumModal}>
            <div
              onClick={() => setPremiumModalStatus(false)}
              className={style.closebtnModal}
            >
              close
            </div>
            <Upgrade />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={style.MatchesContainer}>
        <div className={style.MatchesInnerContainer}>
          {/* {!isPremium && (
            <div className={style.NotPremium}>
              <p>
                Upgrade to <span style={{ color: "#00B3FF" }}> Premium </span>{" "}
                and receive access to exclusive features
              </p>
              <button onClick={() => setPremiumModalStatus(true)}>
                Get Premium
              </button>
            </div>
          )} */}

          {!mobile ? (
            <div className={style.matchesHeader}>
              <div>
                <span
                  style={{
                    color: !ismanage && "black",
                    cursor: "pointer",
                    padding: "5px 10px",
                  }}
                  className={!ismanage && style.seewholikedyou}
                  onClick={() => (setData(likedMeData), setIsManage(false))}
                >
                  See Who Liked You
                </span>
                <span
                  style={{
                    color: ismanage && "black",
                    cursor: "pointer",
                    padding: "5px 10px",
                  }}
                  className={ismanage && style.managematches}
                  onClick={() => (setMatchedData(), setIsManage(true))}
                >
                  Manage Matches
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* {data?.length < 1 ? <NoData matches={false}/> : */}
          {data?.length < 1 && ismanage === true ? (
            <p style={{ cursor: "default" }}> No Matches Found</p>
          ) : (
            <div className={style.matchesResultContainer}>
              <MatchesResults
                isPremium={isPremium}
                ismanage={ismanage}
                data={data}
                setData={setData}
                updateUserVibeChat={updateUserVibeChat}
                setUpdateUserVibeChat={setUpdateUserVibeChat}
              />
            </div>
          )}

          {/* <div className={style.matchesHeader}>
          <div>
            <span
              style={{ color: !ismanage && "black", cursor: "pointer" }}
              className={!ismanage && style.seewholikedyou}
              onClick={() => (setData(likedMeData), setIsManage(false))}
            >
              See Who Liked You
            </span>
            <span
              style={{ color: ismanage && "black", cursor: "pointer" }}
              className={ismanage && style.managematches}
              onClick={() => (setMatchedData(), setIsManage(true))}
            >
              Manage Matches
            </span>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Matches;
