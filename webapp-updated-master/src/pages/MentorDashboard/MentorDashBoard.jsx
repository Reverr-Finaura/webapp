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
import DropdownArrow from "../../images/dropdown-arrow.svg";

const list = ["Transactions", "Support", "Calendly Overview"];

const MentorDashBoard = () => {
  const [toolname, setToolName] = useState("Transactions");

  const [paymentList, setPaymentList] = useState([]);
  const userDoc = useSelector((state) => state.userDoc);

  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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

        <div
          style={{ height: "100vh", paddingTop: "120px" }}
          className="mentor-dashboard"
        >
          {width > 480 ? (
            <>
              <p>
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
                        textDecoration: `${
                          item === toolname ? "underline" : ""
                        }`,
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="dashboard-title">
                <p>
                  Mentor <span style={{ color: "#00B3FF" }}>Dashboard</span>
                </p>
                {/* toolbar */}
                <div className="dropdown">
                  {/* Assuming you have a state to handle the selected tool */}
                  <select
                    className="toolbar-dropdown"
                    value={toolname}
                    onChange={(e) => setToolName(e.target.value)}
                  >
                    {list.map((item) => (
                      <option
                        key={item}
                        value={item}
                        style={{ color: "white" }}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                  <img
                    className="dropdown-arrow"
                    src={DropdownArrow}
                    alt="arrow"
                  />
                </div>
              </div>
            </>
          )}

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
