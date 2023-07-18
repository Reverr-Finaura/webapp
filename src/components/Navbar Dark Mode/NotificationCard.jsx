import style from "./NotificationCard.module.css";
import profile from "../../images/notification-gurl.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import DefaultDP from "../../images/Defaultdp.png";

export default function NotificationCard({ item }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (
          doc.id === item?.user ||
          doc.id.toLowerCase() === item?.user.toLowerCase()
        ) {
          setUser(doc.data());
        }
      });
    }
    fetchUserDocFromFirebase();
  }, []);

  return (
    <div className={style.notificationCard}>
      <div className={style.notificationImg}>
        <img
          className={style.image}
          src={user?.image ? user?.image : DefaultDP}
          onClick={() => {
            navigate(`/userprofile/${item.user}`);
            window.scrollTo(0, 0);
          }}
        />
      </div>

      <div className={style.notificationContent}>
        <div className={style.upperPart}>
          <h3 className={style.heading}>{user?.name}</h3>
          {/* <small className={style.date}>2 min ago</small> */}
        </div>
        <p className={style.para}>
          {item?.type === "Like-Notification" ? (
            <span>liked your post</span>
          ) : item?.type === "Comment-Notification" ? (
            <span>commented on your post</span>
          ) : item?.type === "Follow-Notification" ? (
            <span>started following you</span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
