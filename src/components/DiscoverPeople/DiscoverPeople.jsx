import React, { useState, useEffect } from "react";
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./Discoverpeople.css";
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


  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  // FETCH USER DATA FROM FIREBASE
  useEffect(() => {
    async function fetchUsers(cUser) {
      const mentorsRef = collection(db, "Users");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      const filteredUsers = querySnapshot.docs
        .map(doc => doc.data())
        .filter(docData =>
          docData.hasOwnProperty("name") &&
          docData.name.trim() !== "" &&
          docData.hasOwnProperty("image") &&
          docData.image.trim() !== "" &&
          docData.hasOwnProperty("designation") &&
          docData.designation.trim() !== "" &&
          docData.email !== cUser?.user?.email
        );
      setUsers(filteredUsers);
    }
    fetchUsers(user);
  }, []);

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


  useEffect(() => {
    if (users.length > 0) {
      const getRandomUsers = () => {
        const randomUsersArr = [];
        const userIndices = new Set();
  
        while (randomUsersArr.length < 8) {
          const randomIndex = Math.floor(Math.random() * users.length);
          if (!userIndices.has(randomIndex)) {
            userIndices.add(randomIndex);
            const randomElement = users[randomIndex];
            randomUsersArr.push(randomElement);
          }
        }
  
        setRandomUsers(randomUsersArr);
      };
  
      getRandomUsers();
    }
  }, [users]);
  





  return (
    <section className='people-section'> 


    {/* People */}
    
    <div className="aling">
    
                <div className='people'>
                    <h3 className='discover-headings' style={{color:'white', marginLeft:'20px', marginTop:'15px'}}> <span style={{color:"#00B3FF"}}>People</span>  you May Know</h3>
                    <p style={{color:"#00B3FF",textDecoration:"underline",marginRight:"40px",cursor:"pointer"}}>See all</p>
                </div>
             
                 
                <div className='people-card'>
                  {randomUsers.length === 8 && randomUsers.map(user => (
                    <div key={user.id}>
                      <ProfileCard email={user.email} name={user.name} post={user.designation} imgUrl={user.image} />
                     </div>
                      )
                    )
                  }               
                  </div>
                 </div>

            </section>
    )
}

export default DiscoverPeople