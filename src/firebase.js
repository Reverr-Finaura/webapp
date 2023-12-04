import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  Timestamp,
  arrayUnion,
  deleteDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import {
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  setDoc,
  collection,
  getDoc,
} from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// import { current } from "@reduxjs/toolkit";

const firebaseConfig = {
  apiKey: "AIzaSyBe_7JYNBINJITC1HGbaLxgg3f7yZ0aud4",
  authDomain: "dsquare-242c3.firebaseapp.com",
  databaseURL: "https://dsquare-242c3-default-rtdb.firebaseio.com",
  projectId: "dsquare-242c3",
  storageBucket: "dsquare-242c3.appspot.com",
  messagingSenderId: "103281255621",
  appId: "1:103281255621:web:c97b1cdbd53ad43ed1fcac",
  measurementId: "G-WS41LSXFKR",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, analytics, storage };

export const getUserFromDatabase = async (email) => {
  //let User;
  const docRef = doc(db, "Users", email);
  const docSnap = await getDoc(docRef);
  //console.log(docSnap.data(), "docSnap");
  return docSnap.data();
};

export const getUserDocByRef = async (DocumentReference) => {
  // const docRef = doc(db, "Users", DocumentReference);
  const userDocSnapshot = await getDoc(DocumentReference);
  return userDocSnapshot.data();
};

export const getMentorFromDatabase = async (email) => {
  let Mentor;
  await (
    await getDocs(
      query(collection(db, "Users"), where("email", "==", `${email}`))
    )
  ).forEach((doc) => {
    Mentor = { ...doc.data() };
  });
  return Mentor;
};

export const getMentorMsgs = async (email) => {
  try {
    let clients = [];

    await (
      await getDocs(collection(db, `Messages/${email}/YourClients`))
    ).forEach((doc) => {
      clients.push({ ...doc.data(), email: doc.id });
    });

    console.log(clients);
    return clients;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const getClientMsgs = async (email) => {
  try {
    let clients = [];

    await (
      await getDocs(collection(db, `Messages/${email}/YourMentors`))
    ).forEach((doc) => {
      clients.push({ ...doc.data(), email: doc.id });
    });
    return clients;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const addMsgsInMentorDatabase = async (
  mentorEmail,
  clientEmail,
  data
) => {
  try {
    return await setDoc(
      doc(db, `Messages/${mentorEmail}/YourClients`, `${clientEmail}`),
      data
    );
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const addMsgsInClientDatabase = async (
  clientEmail,
  mentorEmail,
  data
) => {
  try {
    return await setDoc(
      doc(db, `Messages/${clientEmail}/YourMentors`, `${mentorEmail}`),
      data
    );
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const updateMsgsInMentorDatabase = async (
  mentorEmail,
  clientEmail,
  updatedData
) => {
  try {
    const docRef = `Messages/${mentorEmail}/YourClients`;
    return await updateDoc(doc(db, docRef, clientEmail), updatedData);
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const updateMsgsInClientDatabase = async (
  clientEmail,
  mentorEmail,
  updatedData
) => {
  try {
    const docRef = `Messages/${clientEmail}/YourMentors`;
    return await updateDoc(doc(db, docRef, mentorEmail), updatedData);
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const uploadMedia = async (media, path) => {
  try {
    await uploadBytesResumable(ref(storage, `${path}/${media.name}`), media);
    const getMedia = await ref(storage, `${path}/${media.name}`);
    const mediaLink = await getDownloadURL(getMedia);
    return mediaLink;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export const createMatchedInMessagesDoc = async (userId, senderId) => {
  const userRef = doc(db, "Messages", userId);
  const furtherUserRef = doc(userRef, "Matched", senderId);
  const senderRef = doc(db, "Messages", senderId);
  const furtherSenderRef = doc(senderRef, "Matched", userId);

  try {
    await setDoc(furtherUserRef, {
      messages: [{ createdAt: "", msg: "", sendBy: "" }],
    });
    await setDoc(furtherSenderRef, {
      messages: [{ createdAt: "", msg: "", sendBy: "" }],
    });
  } catch (error) {
    console.log(error.messages);
  }
};
export const deleteMatchedInMessagesDoc = async (userId, senderId) => {
  const userRef = doc(db, "Messages", userId);
  const furtherUserRef = doc(userRef, "Matched", senderId);
  const senderRef = doc(db, "Messages", senderId);
  const furtherSenderRef = doc(senderRef, "Matched", userId);

  try {
    await deleteDoc(furtherUserRef);
    await deleteDoc(furtherSenderRef);
  } catch (error) {
    console.log(error.messages);
  }
};

export const getAllMatchedUserHavingChatWith = async (userEmail, setList) => {
  // const userEmail = currentcUser?.email;
  if (!userEmail) {
    throw new Error("User email not available");
  }
  const ref = doc(db, "Messages", userEmail);

  try {
    const f = collection(ref, "Matched");
    const matchedSnapshot = await getDocs(f);
    let matchedData = matchedSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      bucket: "Matched",
    }));
    setList(matchedData);
    console.log("matched", matchedData);
  } catch (error) {
    // Handle error fetching from the 'f' collection (Matched)
    console.error("Error fetching from 'f' collection:", error);
  }
};

export const getAllUserHavingChatWith = async (currentcUser, setList) => {
  const userEmail = currentcUser?.email;
  if (!userEmail) {
    throw new Error("User email not available");
  }
  const ref = doc(db, "Messages", userEmail);

  const isMentor =
    currentcUser && currentcUser.userType?.toLowerCase() === "mentor";

  let clientData = [];
  let networkData = [];

  try {
    const c = collection(ref, isMentor ? "YourClients" : "YourMentors");
    const clientSnapshot = await getDocs(c);
    clientData = clientSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      bucket: isMentor ? "YourClients" : "YourMentors",
    }));
  } catch (clientError) {
    // Handle error fetching from the 'c' collection (YourClients or YourMentors)
    console.error("Error fetching from 'c' collection:", clientError);
  }

  try {
    const f = collection(ref, "Networks");
    const networkSnapshot = await getDocs(f);
    networkData = networkSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      bucket: "Networks",
    }));
  } catch (networkError) {
    // Handle error fetching from the 'f' collection (Networks)
    console.error("Error fetching from 'f' collection:", networkError);
  }

  const mergedData = [...clientData, ...networkData];
  setList(mergedData);

  // const list = [];
  // const ref = doc(db, "Messages", currentcUser.email);
  // const c = collection(
  //   ref,
  //   currentcUser && currentcUser.userType?.toLowerCase() === "mentor"
  //     ? "YourClients"
  //     : "YourMentors"
  // );

  // const f = collection(ref, "Networks");

  // const snap = await getDocs(f);
  // onSnapshot(f, (snapshot) => {
  //   const dummyList = [];
  //   snapshot.docs.forEach((doc) => {
  //     dummyList.push({ ...doc.data(), id: doc.id, bucket: "Networks" });
  //   });

  //   setList(dummyList);
  // });

  // const querySnapshot = await getDocs(c);
  // //SNAPSHOT IMPLEMENT
  // onSnapshot(c, (snapshot) => {
  //   const dummyList = [];
  //   snapshot.docs.forEach((doc) => {
  //     dummyList.push({
  //       ...doc.data(),
  //       id: doc.id,
  //       bucket:
  //         currentcUser && currentcUser.userType?.toLowerCase() === "mentor"
  //           ? "YourClients"
  //           : "YourMentors",
  //     });
  //   });

  //   setList(dummyList);
  // });
};

export const createNetworkInMessagesDoc = async (userId, senderId) => {
  const userRef = doc(db, "Messages", userId);
  const furtherUserRef = doc(userRef, "Networks", senderId);
  const senderRef = doc(db, "Messages", senderId);
  const furtherSenderRef = doc(senderRef, "Networks", userId);

  try {
    await setDoc(furtherUserRef, {
      messages: [{ createdAt: "", msg: "", sendBy: "" }],
    });
    await setDoc(furtherSenderRef, {
      messages: [{ createdAt: "", msg: "", sendBy: "" }],
    });
  } catch (error) {
    console.log(error.messages);
  }
};

export const createMentorInMessagesDoc = async (userId, mentorId) => {
  const userRef = doc(db, "Messages", userId);
  const furtherUserRef = doc(userRef, "YourMentors", mentorId);
  const mentorRef = doc(db, "Messages", mentorId);
  const furtherMentorRef = doc(mentorRef, "YourClients", userId);

  try {
    await setDoc(furtherUserRef, {
      messages: [{ createdAt: "", msg: "", sendBy: "" }],
    });
    await setDoc(furtherMentorRef, {
      messages: [{ createdAt: "", msg: "", sendBy: "" }],
    });
  } catch (error) {
    console.log(error.messages);
  }
};

export const SendMessage = async (
  currentcUser,
  sendTo,
  message,
  imgLink,
  bucket
) => {
  const senderRef = doc(db, "Messages", currentcUser.email);
  let furtherSenderRef;
  if (bucket === "YourClients" || bucket === "YourMentors") {
    furtherSenderRef = doc(
      senderRef,
      currentcUser && currentcUser.userType?.toLowerCase() === "mentor"
        ? "YourClients"
        : "YourMentors",
      sendTo.email
    );
  } else if (bucket === "Networks") {
    furtherSenderRef = doc(senderRef, "Networks", sendTo.email);
  } else if (bucket === "Matched") {
    furtherSenderRef = doc(senderRef, "Matched", sendTo.email);
  }
  const receiverRef = doc(db, "Messages", sendTo.email);
  let furtherReceiverRef;
  if (bucket === "YourClients" || bucket === "YourMentors") {
    furtherReceiverRef = doc(
      receiverRef,
      sendTo && sendTo.userType?.toLowerCase() === "mentor"
        ? "YourClients"
        : "YourMentors",
      currentcUser.email
    );
  } else if (bucket === "Networks") {
    furtherReceiverRef = doc(receiverRef, "Networks", currentcUser.email);
  } else if (bucket === "Matched") {
    furtherReceiverRef = doc(receiverRef, "Matched", currentcUser.email);
  }

  let timestmp = Timestamp.now();

  try {
    await updateDoc(furtherSenderRef, {
      messages: arrayUnion({
        msg: message,
        createdAt: timestmp,
        sendBy: currentcUser.email,
        imgMsg: imgLink,
        read: false,
      }),
    });

    // ref.current.scrollTo({
    //   top:ref.current.scrollHeight,
    //   behavior:"smooth"
    // });

    await updateDoc(furtherReceiverRef, {
      messages: arrayUnion({
        msg: message,
        createdAt: timestmp,
        sendBy: currentcUser.email,
        imgMsg: imgLink,
        read: false,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatereadmessage = async (currentcUser, sendTo) => {
  const senderRef = doc(db, "Messages", currentcUser.email);
  const furtherSenderRef = doc(senderRef, "Matched", sendTo);
  const chatdoc = await getDoc(furtherSenderRef);
  console.log("fufnsda", chatdoc.data());
  try {
    let updatedmessges = chatdoc.data().messages.map((m) => {
      console.log("mmmmm", m);
      if (m.read === false) {
        m.read = true;
      }
      return m;
    });
    await updateDoc(furtherSenderRef, {
      messages: updatedmessges,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ReciveMessage = async (currentcUser, sendTo, setmsg, bucket) => {
  try {
    console.log(currentcUser.email, sendTo, bucket);
    const docRef = doc(db, "Messages", currentcUser.email);
    const furtherdocRef = collection(docRef, bucket);

    onSnapshot(furtherdocRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === sendTo.email) {
          setmsg(doc.data().messages);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendNotification = async (toemail, fromemail, messaage) => {
  const obj = {
    subject: fromemail,
    message: messaage,
    email: toemail,
    type: "chat",
    date: serverTimestamp(),
  };

  const docRef = doc(db, "Users", toemail);

  try {
    await updateDoc(docRef, {
      notifications: arrayUnion(obj),
    });
  } catch (error) {
    console.log(error);
  }
};
