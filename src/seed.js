// const uuid = () => {
//   const val1 = Date.now().toString(36);
//   const val2 = Math.random().toString(36).substring(2);

//   return val1 + val2;
// };
// const [mentorList,setMentorList] = useState([]);
// useEffect(()=>{
//   async function mentorVendorId() {
//     const mentorsRef = collection(db, "Users");
//     const q = query(mentorsRef);
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach(async (doc) => {
//       if (doc.data().userType === "Mentor" || doc.data().userType === "mentor") {
//         setMentorList((prev) => {
//           return [...prev, doc.data().email];
//         })
//         let vendorId = uuid();
//         await updateDoc(doc.ref, {
//           vendorId: vendorId,
//         });
//       }
//     });
//   }
//   mentorVendorId();
// },[])

// console.log("MentorList",mentorList);