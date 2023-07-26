import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import "./Discoverpeople.css";
import { useSelector } from "react-redux";

// export const DiscoverPeople = () => {

//   return (
//     <section className='people-section'>

//     {/* People */}
//                 <div className='people'>
//                     <h3 className='discover-headings' style={{color:'white', marginLeft:'20px', marginTop:'15px'}}> <span style={{color:'blue'}}>People </span> you May Know</h3>
//                 </div>
//                 <div className='people-card'>
//                     <ProfileCard/>
//                     <ProfileCard/>
//                     <ProfileCard/>
//                     <ProfileCard/>
//                     <ProfileCard/>
//                     <ProfileCard/>
//                     <ProfileCard/>
//                     <ProfileCard/>
//                 </div>
//             </section>
//   )
// }

const DiscoverPeople = () => {
  const currentLoggedInUser = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  //FETCH USER DATA FROM FIREBASE
  useEffect(() => {
    async function fetchUsers() {
      const usersRef = collection(db, "Users");
      const q = query(usersRef);
      const querySnapshot = await getDocs(q);
      var isFinished = false;
      var localUsers = [];
      console.log("querySnapshot", querySnapshot);
      querySnapshot.docs.map((doc, idx) => {
        if (
          doc.data().hasOwnProperty("name") &&
          doc.data().name !== "" &&
          doc.data().hasOwnProperty("image") &&
          doc.data().image !== "" &&
          doc.data().hasOwnProperty("email") &&
          doc.data().email !== currentLoggedInUser?.user?.email &&
          (doc.data().hasOwnProperty("network") // Check if "network" array is present in doc.data()
            ? !doc.data().network.includes(currentLoggedInUser?.user?.email) // if present then only check current user's email is not included in it
            : true)
        ) {
          setUsers((prev) => {
            return [...prev, doc.data()];
          });
          localUsers.push(doc.data());
          if (idx === querySnapshot.docs.length - 1) {
            isFinished = true;
            if (localUsers.length > 0)
              getRandomUsers(8, setRandomUsers, localUsers);
          }
        }
      });
      if (isFinished) {
        localUsers = null; // This removes the reference to the localUsers array
      }
    }
    fetchUsers();
  }, [currentLoggedInUser]);

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  const getRandomUsers = (length, setUser, userArray) => {
    const modifiedArray = shuffleArray(userArray);
    setUser(modifiedArray.slice(0, length));
  };

  // useEffect(() => {
  //   if (users.length > 0) {
  //     const getRandomUsers = () => {
  //       let randomUsersArr = [];
  //       let length = users.length - 1;

  //       for (let i = 0; i < 8; i++) {
  //         let randomIndex = Math.floor(Math.random() * length);
  //         let randomElement = users[randomIndex];
  //         randomUsersArr.push(randomElement);
  //       }

  //       setRandomUsers(randomUsersArr);
  //     };

  //     getRandomUsers();
  //   }
  // }, [users]);

  // useEffect(() => {
  //   if (users.length > 0) {
  //     const shuffleArray = (arr) => {
  //       for (let i = arr.length - 1; i > 0; i--) {
  //         const j = Math.floor(Math.random() * (i + 1));
  //         [arr[i], arr[j]] = [arr[j], arr[i]];
  //       }
  //     };

  //     const getRandomUsers = () => {
  //       const randomUsersArr = users.slice(); // Create a shallow copy of the users array
  //       shuffleArray(randomUsersArr);
  //       setRandomUsers(randomUsersArr.slice(0, 8)); // Select the first 8 elements
  //     };

  //     getRandomUsers();
  //   }
  // }, [users]);

  // useEffect(() => {
  //   if (users.length > 0) {

  //     getRandomUsers(8, setRandomUsers, users);
  //   }
  // }, [users]);

  return (
    <section className="people-section">
      {/* People */}

      <div className="aling">
        <div className="people">
          <h3
            className="discover-headings"
            style={{ color: "white", marginLeft: "20px", marginTop: "15px" }}
          >
            {" "}
            <span style={{ color: "#00B3FF" }}>People</span> you May Know
          </h3>
          {/* <p style={{color:"#00B3FF",textDecoration:"underline",marginRight:"40px",cursor:"pointer"}}>See all</p> */}
        </div>

        <div className="people-card">
          {randomUsers.length === 8 &&
            randomUsers.map((user) => (
              <div className="people-card-container" key={user.id}>
                <ProfileCard
                  email={user.email}
                  name={user.name}
                  post={user.designation}
                  imgUrl={user.image}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverPeople;
