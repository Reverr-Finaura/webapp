import React, { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./ConnectSuggestion.module.css";
import { useNavigate } from "react-router-dom";

function ConnectSuggestion({ isLoggedIn,  openModal }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  //FETCH USER DATA FROM FIREBASE
  useEffect(() => {
    async function fetchUsers() {
      const mentorsRef = collection(db, "Users");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (
          doc.data().hasOwnProperty("name") &&
          doc.data().name !== "" &&
          doc.data().hasOwnProperty("image") &&
          doc.data().image !== ""
        ) {
          setUsers((prev) => {
            return [...prev, doc.data()];
          });
        }
      });
    }
    fetchUsers();
  }, []);

  let randomUsers = [];
  let length = users.length - 1;

  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * length);
    let randomElement = users[randomIndex];
    randomUsers.push(randomElement);
  }

  // console.log("randomUsers",randomUsers[0].userType);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <text style={{ color: "#00B3FF" }}>Suggested </text>
          <text style={{ color: "#FFFFFF" }}>For You</text>
        </div>
        {/* <span onClick={() => console.log("see all clicked")}>See All</span> */}
      </div>
      <div>
        {randomUsers.map((user, index) => (
          <div key={index}>
            <div className={styles.userRow}>
              <div>
                <img
                  src={
                    user?.image
                      ? user.image
                      : require("../../../images/userIcon.png")
                  }
                  className={styles.profileImage}
                  alt="Profile"
                />
                <div>
                  <text
                    style={{
                      fontSize: 14,
                      color: "#00b3ff",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user?.name}
                  </text>
                  <text
                    style={{
                      fontSize: 10,
                      color: "#ffffff",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user?.designation}
                  </text>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    return openModal();
                  }else{
                    //normal code
                    {
                      user?.userType === "Mentor" ? navigate(`/mentorprofile/${user?.email}`) 
                      :
                      navigate(`/userprofile/${user?.email}`)

                    }
                   
                  }
                }}
              >
                Connect
              </button>
            </div>
            <div className={styles.divider}></div>
          </div>
        ))}
      </div>
    </div>
  );
}


// Set default props using defaultProps property
ConnectSuggestion.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};


export default ConnectSuggestion;
// export default React.memo(React.forwardRef(ConnectSuggestion));

