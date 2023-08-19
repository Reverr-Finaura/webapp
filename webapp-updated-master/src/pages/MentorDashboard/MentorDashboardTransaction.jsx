import React, { useEffect, useState } from "react";
import "./mentordashtransaction.css";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import DefaultDP from "../../images/Defaultdp.png";

const data = [
  {
    name: "Darrell Steward",
    date: "May 6, 2012",
    time: "03:48 am",
    amount: "$ 6,223.07",
  },
  {
    name: "Darrell Steward",
    date: "May 6, 2012",
    time: "03:48 am",
    amount: "$ 6,223.07",
  },
  {
    name: "Darrell Steward",
    date: "May 6, 2012",
    time: "03:48 am",
    amount: "$ 6,223.07",
  },
  {
    name: "Darrell Steward",
    date: "May 6, 2012",
    time: "03:48 am",
    amount: "$ 6,223.07",
  },
  {
    name: "Darrell Steward",
    date: "May 6, 2012",
    time: "03:48 am",
    amount: "$ 6,223.07",
  },
  {
    name: "Darrell Steward",
    date: "May 6, 2012",
    time: "03:48 am",
    amount: "$ 6,223.07",
  },
  {
    name: "Darrell Steward",
    date: "May 6, 2012",
    time: "03:48 am",
    amount: "$ 6,223.07",
  },
];

const MentorDashboardTransaction = ({ paymentList }) => {
  // console.log("PaymentList", paymentList);
  const [list, setList] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    async function fetchMentorExpertise(item) {
      const mentorsRef = collection(db, "Users");
      const q = query(mentorsRef);

      try {
        const querySnapshot = await getDocs(q);
        const foundDoc = querySnapshot.docs.find((doc) => doc.id === item.user);
        if (foundDoc) {
          return foundDoc.data();
        }
        return null; // Return null if the document is not found
      } catch (error) {
        // Handle any errors that might occur during the data fetching process
        console.error("Error fetching mentor data:", error);
        return null;
      }
    }

    async function fetchDataForPaymentList() {
      const newDataList = await Promise.all(
        paymentList.map(async (item) => {
          const userData = await fetchMentorExpertise(item);
          return userData ? { ...item, userData } : item;
        })
      );
      setList(newDataList);
    }

    fetchDataForPaymentList();
  }, [paymentList]);

  console.log(list);

  function getTimeFromDate(milliseconds) {
    const date = new Date(milliseconds);
    return date;
  }

  return (
    <div className="transactioncontainer">
      <div className="table-top">
        <div className="table-header" style={{ color: "#00B3FF" }}>
          Customer
        </div>
        <div className="table-header" style={{ color: "#00B3FF" }}>
          Session Date
        </div>
        <div className="table-header" style={{ color: "#00B3FF" }}>
          Amount
        </div>
      </div>
      {list?.map((item, idx) =>
        width >= 480 ? (
          <div key={idx} className="transactionrow">
            <div className="transactiond">
              <div className="transactionddiv">
                <img src={item.userData?.image || DefaultDP} alt="image" />
                <span>{item.userData ? item.userData.name : item.user}</span>
              </div>
            </div>
            <div className="right">
              <div className="transactiond">
                {item.time
                  ? getTimeFromDate(50000 * 1000).toDateString()
                  : "N/A"}
              </div>
              <div className="transactiond">
                {item.orderAmount ? item.orderAmount : 0.0}
              </div>
            </div>
          </div>
        ) : (
          <div key={idx} className="transactionrow">
            <div className="left">
              <div className="profile">
                <img src={item.userData?.image || DefaultDP} alt="image" />
              </div>
            </div>
            <div className="right">
              <div className="right-item">
                <span style={{ color: "#00B3FF" }}>Customer:</span>
                <span>{item.userData ? item.userData.name : item.user}</span>
              </div>
              <div className="right-item">
                <span style={{ color: "#00B3FF" }}>Session Date:</span>
                {item.time
                  ? getTimeFromDate(50000 * 1000).toDateString()
                  : "N/A"}
              </div>
              <div className="right-item">
                <span style={{ color: "#00B3FF" }}>Amount:</span>
                {item.orderAmount ? item.orderAmount : 0.0}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MentorDashboardTransaction;
