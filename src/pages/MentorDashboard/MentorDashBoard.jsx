import React, { useEffect } from "react";
import "./mentordashboard.css";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import { useState } from "react";
import MentorDashboardTransaction from "./MentorDashboardTransaction";
import MentorDashBoardSupport from "./MentorDashBoardSupport";
import MentorDashBoardCalendy from "./MentorDashBoardCalendy";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";

const list = ["Transactions", "Support", "Calendly Overview"];

const MentorDashBoard = () => {
  const [toolname, setToolName] = useState("Transactions");

  const [paymentList, setPaymentList] = useState([]);
  const userDoc = useSelector((state) => state.userDoc);

  useEffect(() => {
    // setArrayToBeMapped(mentorArray);
    const fetchData = async () => {
      let paymentIds = userDoc?.Payments || [];
      paymentIds.map(async (item) => {
        const mentorsRef = collection(db, "Payments");
        const q = query(mentorsRef);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.id === item) {
            setPaymentList((prev) => {
              return [...prev, doc.data()];
            });
          }
        });
      });
    };
    fetchData();
  }, []);

  console.log("paymentListArrayyy", paymentList);

  return (
    <>
      <div
        style={{
          backgroundColor: "#030b18",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <NavBarFinalDarkMode />
        </div>

        <div style={{ height: "100vh", paddingTop: "120px" }}>
          <p
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "bold",
              paddingLeft: "140px",
              paddingBottom: "40px",
            }}
          >
            Mentor <span style={{ color: "#00B3FF" }}>Dashboard</span>
          </p>

          {/* toolbar */}
          <div className="toolbar">
            <div className="inner-toolbar">
              {list.map((item) => (
                <p
                  onClick={() => setToolName(item)}
                  style={{
                    color: `${item === toolname ? "#00B3FF" : "white"}`,
                    textDecoration: `${item === toolname ? "underline" : ""}`,
                    cursor: "pointer",
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* //body */}
          <div>
            {toolname === "Transactions" ? (
              <MentorDashboardTransaction paymentList={paymentList} />
            ) : toolname === "Support" ? (
              <MentorDashBoardSupport />
            ) : toolname === "Calendly Overview" ? (
              <MentorDashBoardCalendy />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorDashBoard;
