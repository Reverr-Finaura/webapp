import React, { useState, useEffect } from "react";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const SwipeLimit = () => {
  const userEmail = "apurbar06@gmail.com";
  const [swipeLimit, setSwipeLimit] = useState({
    swipeRemaining: 10,
    swipeUpdateTime: null,
  });
  const [loadingSwipeData, setLoadingSwipeData] = useState(true);

  useEffect(() => {
    // Fetch the initial swipeLimit data from Firebase or create it if not present
    const fetchSwipeLimit = async () => {
      try {
        setLoadingSwipeData(true);
        const docRef = doc(db, "Users", userEmail);
        console.log("docRef", docRef);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          console.log("data", data);
          if (data.swipeLimit) {
            setSwipeLimit(data.swipeLimit);
          } else {
            // If swipeLimit field is not present, create it with initial values
            const updateTime = new Date().getTime() + 24 * 60 * 60 * 1000;
            // await setDoc(docRef, data, { merge: true });
            await setDoc(
              docRef,
              {
                swipeLimit: { swipeRemaining: 10, swipeUpdateTime: updateTime },
              },
              { merge: true }
            );
            setSwipeLimit({ swipeRemaining: 10, swipeUpdateTime: updateTime });
          }
        } else {
          console.log("No such document!");
        }

        setLoadingSwipeData(false);
      } catch (error) {
        console.error("Error fetching swipeLimit data:", error);
        setLoadingSwipeData(false);
      }
    };

    fetchSwipeLimit();
  }, [userEmail]);

  const handleSwipe = async () => {
    // i have still some data remaining and the update time is not reached yet
    if (
      swipeLimit.swipeRemaining > 0 &&
      swipeLimit.swipeUpdateTime > new Date().getTime()
    ) {
      // User has remaining swipes, decrease swipeRemaining by 1
      const newSwipeRemaining = swipeLimit.swipeRemaining - 1;
      setSwipeLimit((prevState) => ({
        ...prevState,
        swipeRemaining: newSwipeRemaining,
      }));
      await updateSwipeLimit({
        swipeRemaining: newSwipeRemaining,
        swipeUpdateTime: swipeLimit.swipeUpdateTime,
      });
    } else {
      // If swipeUpdateTime is already passed, reset swipeRemaining to 10 and update swipeUpdateTime
      if (swipeLimit.swipeUpdateTime <= new Date().getTime()) {
        console.log("it't time to reset");
        setSwipeLimit((prevState) => ({
          ...prevState,
          swipeRemaining: 10,
          swipeUpdateTime: new Date().getTime() + 24 * 60 * 60 * 1000,
        }));
        await updateSwipeLimit({
          swipeRemaining: 10,
          swipeUpdateTime: new Date().getTime() + 24 * 60 * 60 * 1000,
        });
      } else {
        console.log("wait for swipeUpdateTime");
      }
    }
  };

  const updateSwipeLimit = async (newSwipeLimit) => {
    try {
      await updateDoc(doc(db, "Users", userEmail), {
        swipeLimit: newSwipeLimit,
      });
    } catch (error) {
      console.error("Error updating swipeLimit on Firebase:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100wh",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loadingSwipeData ? (
        <p style={{ color: "#ffffff" }}>Loading...</p>
      ) : (
        <>
          <p style={{ color: "#ffffff" }}>
            Swipes Remaining: {swipeLimit.swipeRemaining}
            <br />
            Swipe Update Time:{" "}
            {new Date(swipeLimit.swipeUpdateTime).toLocaleString()}
          </p>
          {swipeLimit.swipeRemaining === 0 &&
          swipeLimit.swipeUpdateTime > new Date().getTime() ? (
            <p style={{ color: "#ffffff" }}>No swipe left.</p>
          ) : null}
          <button style={{ marginRight: 5 }} onClick={handleSwipe}>
            Like
          </button>
        </>
      )}
    </div>
  );
};

export default SwipeLimit;

// if (newSwipeRemaining === 0) {
//   // If remaining swipes reach 0, update swipeUpdateTime
//   const newSwipeUpdateTime = new Date().getTime() + 24 * 60 * 60 * 1000;
//   setSwipeLimit((prevState) => ({
//     ...prevState,
//     swipeUpdateTime: newSwipeUpdateTime,
//   }));
//   await updateSwipeLimit({
//     swipeRemaining: newSwipeRemaining,
//     swipeUpdateTime: newSwipeUpdateTime,
//   });
// } else {
//   // If there are remaining swipes and swipeUpdateTime is not reached yet
//   await updateSwipeLimit({
//     swipeRemaining: newSwipeRemaining,
//     swipeUpdateTime: swipeLimit.swipeUpdateTime,
//   });
// }
