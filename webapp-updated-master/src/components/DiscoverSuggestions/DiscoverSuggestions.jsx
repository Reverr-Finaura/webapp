// import React, { useState, useEffect } from "react";
// import ProfileCard from '../../components/ProfileCard/ProfileCard'
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "../../firebase";

// const DiscoverSuggestions = () => {

//   const [users, setUsers] = useState([]);

//   //FETCH USER DATA FROM FIREBASE
//   useEffect(() => {
//     async function fetchUsers() {
//       const mentorsRef = collection(db, "Users");
//       const q = query(mentorsRef);
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         if (
//           doc.data().hasOwnProperty("name") &&
//           doc.data().name !== "" &&
//           doc.data().hasOwnProperty("image") &&
//           doc.data().image !== ""
//         ) {
//           setUsers((prev) => {
//             return [...prev, doc.data()];
//           });
//         }
//       });
//     }
//     fetchUsers();
//   }, []);

//   let randomUsers = [];
//   let length = users.length - 1;

//   for (let i = 0; i < 4; i++) {
//     let randomIndex = Math.floor(Math.random() * length);
//     let randomElement = users[randomIndex];
//     randomUsers.push(randomElement);
//   }

// console.log(randomUsers)

//   return (
//     <section className='suggest-section'>

//     {/* Suggestions */}
//     <div className='people-suggest'>
//             <h3 style={{color:'white', marginTop:'10px', marginLeft:'12px'}}> More <span style={{color:'blue'}}>Suggestions </span> </h3>
//         </div>
//         <div className='people-card'>
//           {randomUsers.map( (user) => {
//             return(
//               <div>
//                 <ProfileCard name={user.name} post={user.designation} imgUrl={user.image}/>
//               </div>
//             )
//           })

//           }

//         </div>

//             </section>
//   )
// }

// export default DiscoverSuggestions

// import React, { useState, useEffect } from "react";
// import ProfileCard from '../../components/ProfileCard/ProfileCard'
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "../../firebase";

// const DiscoverSuggestions = () => {
//   const [users, setUsers] = useState([]);
//   const [randomUsers, setRandomUsers] = useState([]);

//   // FETCH USER DATA FROM FIREBASE
//   useEffect(() => {
//     async function fetchUsers() {
//       const mentorsRef = collection(db, "Users");
//       const q = query(mentorsRef);
//       const querySnapshot = await getDocs(q);
//       const filteredUsers = querySnapshot.docs
//         .map(doc => doc.data())
//         .filter(docData =>
//           docData.hasOwnProperty("name") &&
//           docData.name !== "" &&
//           docData.hasOwnProperty("image") &&
//           docData.image !== ""
//         );
//       setUsers(filteredUsers);
//     }
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (users.length > 0) {
//       const getRandomUsers = () => {
//         let randomUsersArr = [];
//         let length = users.length - 1;

//         for (let i = 0; i < 4; i++) {
//           let randomIndex = Math.floor(Math.random() * length);
//           let randomElement = users[randomIndex];
//           randomUsersArr.push(randomElement);
//         }

//         setRandomUsers(randomUsersArr);
//       };

//       getRandomUsers();
//     }
//   }, [users]);

//   return (
//     <section className='suggest-section'>
//       {/* Suggestions */}
//       <div className='people-suggest'>
//         <h3 style={{ color: 'white', marginTop: '10px', marginLeft: '12px' }}> More <span style={{ color: 'blue' }}>Suggestions</span> </h3>
//       </div>
//       <div className='people-card'>
//         {randomUsers.length === 4 && randomUsers.map(user => (
//           <div key={user.id}>
//             <ProfileCard name={user.name} post={user.designation} imgUrl={user.image} />
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

// export default DiscoverSuggestions;

import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import "./Suggestion.css";

const DiscoverSuggestions = ({ heading, colorheading, moreStyle }) => {
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

  return (
    <section
      className='suggest-section'
      style={
        {
          // marginTop: moreStyle ? "270px" : "",
        }
      }
    >
      {/* Suggestions */}
      <div className='alignsuggestion'>
        <div className='people-suggest'>
          <h3
            className='hpeoplesuggest'
            style={{ color: "white", padding: "20px" }}
            // style={{ color: "white", marginTop: "5px", marginLeft: "200px" }}
          >
            {" "}
            <span style={{ color: "#00B3FF" }}>{colorheading}</span>
            {heading}
            {/* More Suggestions */}{" "}
          </h3>
          {/* <p style={{color:"#00B3FF",textDecoration:"underline",marginRight:"80px",cursor:"pointer"}}>See all</p> */}
        </div>

        <div className='people-card'>
          {randomUsers.length === 8 &&
            randomUsers.map((user, index) => (
              // <div key={user.id}>
              <div key={index}>
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

export default DiscoverSuggestions;
