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
      <table className="transaction-table">
        <tr>
          <th style={{ color: "#00B3FF" }}>Customer</th>
          <th style={{ color: "#00B3FF" }}>Session Date</th>
          {/* <th style={{ color: "#00B3FF" }}>Session Time</th> */}
          <th style={{ color: "#00B3FF" }}>Amount</th>
          <br />
          <br />
        </tr>
        {list?.map((item, idx) => (
          <tr key={idx} className="transactionrow">
            <td className="transactiond">
              <div className="transactionddiv">
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "green",
                    borderRadius: "50%",
                  }}
                  src={item.userData?.image || DefaultDP}
                  alt="image"
                />
                {item.userData ? item.userData.name : item.user}
              </div>
            </td>
            <td className="transactiond">
              {item.time ? getTimeFromDate(50000 * 1000).toDateString() : "N/A"}
            </td>
            {/* <td className="transactiond">{item.time}</td> */}
            <td className="transactiond">
              {item.orderAmount ? item.orderAmount : 0.0}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default MentorDashboardTransaction;
